using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CommonBase.Extensions;
using Labelix.Contracts.Client;
using Labelix.Contracts.Client.Buisiness;
using Labelix.Contracts.Persistence;
using Labelix.Logic.Controllers.Business;
using Labelix.Logic.Entities.Business;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Buisiness
{
    internal class ProjectController : IProjectController
    {
        private readonly IControllerAccess<IImage> imageController = Factory.Create<IImage>();

        private readonly IControllerAccess<IProject_AIModelConfig> projectAIModelConfigController =
            Factory.Create<IProject_AIModelConfig>();

        private readonly IControllerAccess<IProject> projectController = Factory.Create<IProject>();
        private readonly IControllerAccess<IProject_User> projectUserController = Factory.Create<IProject_User>();
        private readonly IControllerAccess<IUser> userController = Factory.Create<IUser>();
        private readonly UserManagementController userManagementController = new UserManagementController();

        #region intern-Methods

        private async Task<int[]> GetUserIdsOfProject(string keyCloakId)
        {
            if (keyCloakId == null) throw new ArgumentNullException();
            var internId = (await userController.GetAllWhereAsync(e => e.KeycloakId == keyCloakId)).FirstOrDefault().Id;
            return (await projectUserController.GetAllWhereAsync(e => e.UserIdKey == internId))
                .Select(e => e.ProjectKey).ToArray();
        }

        #endregion

        #region API-Methods

        public async Task<IProject> GetProjectWithLabelAsync(int id)
        {
            var project = await projectController.GetByIdAsync(id);
            if (!project.LabeledPath.IsNullOrEmpty())
                project.LabeledPath = await File.ReadAllTextAsync(project.LabeledPath);
            return project;
        }

        public async Task<IEnumerable<IData>> GetImagesForProject(int projectId)
        {
            var images = (await imageController.GetAllWhereAsync(i => i.ProjectId == projectId)).ToList();
            var projectImages = new List<IData>();
            foreach (var item in images) projectImages.Add(await Base64Controller.GetPictureAsync(item.Id));

            return projectImages;
        }

        public async Task<IEnumerable<IProject>> GetAllAsync(string keycloakUser)
        {
            var projectsToGet = await GetUserIdsOfProject(keycloakUser);
            var models = (await projectController.GetAllWhereAsync(e => projectsToGet.Contains(e.Id))).ToList();
            models.ForEach(e => e.LabeledPath = "");
            return models;
        }

        public async Task<IProject> CreateAsync(IProject project, IEnumerable<int> aiConfigs, IEnumerable<IData> images,
            string keycloakUser)
        {
            var user = await userManagementController.GetUserId(keycloakUser);
            var result = await projectController.InsertAsync(project);

            foreach (var item in aiConfigs)
                await projectAIModelConfigController.InsertAsync(new Project_AIModelConfig
                    {AIConfigKey = item, ProjectKey = project.Id});
            foreach (var image in images)
            {
                image.ProjectId = project.Id;
                await Base64Controller.ImageUploadAsync(image);
            }

            await projectUserController.InsertAsync(new Project_User {ProjectKey = project.Id, UserIdKey = user.Id});
            return project;
        }

        public async Task<IProject> UpdateProjectAsync(IProject project)
        {
            var oldProject = await projectController.GetByIdAsync(project.Id);
            var oldProjectWithLabel = await GetProjectWithLabelAsync(project.Id);
            project.LabeledPath = oldProject.LabeledPath;
            if (oldProjectWithLabel.LabeledPath != project.LabeledPath)
                project.LabeledPath = await Base64Controller.CocoUploadAsync(new Data
                {
                    ProjectId = project.Id, Name = project.Name, Format = "json", Base64 = project.LabeledPath,
                    Height = 0, Width = 0
                });
            if (oldProject.LabeledPath != project.LabeledPath) File.Delete(oldProject.LabeledPath);
            var respondModel = await projectController.UpdateAsync(project);
            return respondModel;
        }

        public async Task DeleteAsync(int id)
        {
            var project = await projectController.GetByIdAsync(id);
            File.Delete(project.LabeledPath);
            Directory.Delete($"./Ressources/Images/{project.Id}_{project.Name}", true);
            await projectController.DeleteAsync(id);
        }

        #endregion
    }
}