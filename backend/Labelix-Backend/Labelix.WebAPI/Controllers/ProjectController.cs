using System;
using Labelix.Transfer.Modules;
using Labelix.Transfer.Persistence;
using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonBase.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Razor.Language.Intermediate;
using Contract = Labelix.Contracts.Persistence.IProject;
using Model = Labelix.Transfer.Persistence.Project;

namespace Labelix.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : GenericController<Contract, Model>
    {
        [Authorize(Roles = "user")]
        [HttpGet("{id}")]
        public async Task<Model> GetAsync(int id)
        {
            ImageController imageController = new ImageController();
            Project project = await GetModelByIdAsync(id);
            List<Image> images = (await imageController.GetByProjectId(project.Id)).ToList();
            List<Data> projectImages = new List<Data>();
            foreach (var item in images)
            {
                projectImages.Add(await imageController.GetAsyncPicture(item.Id));
            }
            if (!project.LabeledPath.IsNullOrEmpty()) project.LabeledPath = System.IO.File.ReadAllText(project.LabeledPath);
            project.Images = projectImages;
            return project;
        }
        public Task<Model> GetAsyncOnlyProject(int id)
        {
            return GetModelByIdAsync(id);
        }

        [Authorize(Roles = "user")]
        [HttpGet("all")]
        public async Task<IEnumerable<Model>> GetAllAsync()
        {
            var keycloakUser = this.User.Claims.GetUserId();
            var userProjectController = new UserProjectController();
            int[] projectsToGet = await userProjectController.GetByProjectForUser(keycloakUser);
            List<Model> models = (await GetAllWhereAsync(e => projectsToGet.Contains(e.Id))).ToList();
            models.ForEach(e => e.LabeledPath = "");
            return models;
        }

        [Authorize(Roles = "user")]
        [HttpGet("count")]
        public Task<int> GetCountAsync()
        {
            return CountAsync();
        }

        [Authorize(Roles = "admin")]
        [HttpPost("create")]
        public async Task<Project> PostAsync(ProjectInsert model)
        {
                var keycloakUser = this.User.Claims.GetUserId();
                var user = await new UserController().GetUserId(keycloakUser);
                Project_AIModelConfigController aiModelConfigController = new Project_AIModelConfigController();
                Project project = new Project();
                project.CopyProperties(model);
                project = await InsertModelAsync(project);
                foreach (var item in model.AiModelConfigIds)
                {
                    await aiModelConfigController.PostAsync(new Project_AIModelConfig(item, project.Id));
                }
                var images = new MultipleData()
                {
                    Data = model.Images
                };
                foreach (var data in images.Data)
                {
                    data.ProjectId = project.Id;
                }
                await Base64Controller.MultipleImageUpload(images);
                await new UserProjectController().PostAsync(new ProjectUser
                    {ProjectKey = project.Id, UserIdKey = user.Id});
                return project;
            
            
        }

        [Authorize(Roles = "user")]
        [HttpPut("update")]
        public async Task<Model> PutAsync(Model model)
        {
            Model oldProject = await GetAsyncOnlyProject(model.Id);
            Model oldProjectConverted = await GetAsync(model.Id);
            string labelPath= oldProject.LabeledPath;
            if (oldProjectConverted.LabeledPath != model.LabeledPath)
            {
                labelPath = await Base64Controller.CocoUploadAsync(new Data(model.Id, model.Name, "", model.LabeledPath,0,0));
            }
            //List<Data> removes1 = new List<Data>();
            //List<Data> removes2 = new List<Data>();

            //foreach (Data data in model.Images)
            //{
            //    bool done = false;

            //    if (oldProjectConverted.Images != null)
            //    {
            //        foreach (var image in oldProjectConverted.Images)
            //        {
            //            if (image.Base64 == data.Base64 && image.Id == data.Id)
            //            {
            //                removes1.Add(data);
            //                removes2.Add(image);
            //                done = true;
            //            }
            //        }
            //    }
            //    if(!done)
            //    {
            //        await Base64Controller.ImageUploadAsync(data);
            //    }
            //}

            //foreach (var data in removes1)
            //{
            //    model.Images.Remove(data);
            //}

            //foreach (var data in removes2)
            //{
            //    oldProjectConverted.Images?.Remove(data);
            //}

            //if (oldProjectConverted.Images != null)
            //{
            //    foreach (var data in oldProjectConverted.Images)
            //    {
            //        await Base64Controller.RemoveImageAsync(data);
            //    }
            //}
            
            Model newModel = new Project()
            {
                CreationDate = model.CreationDate,
                Description = model.Description,
                FinishedAnnotation = model.FinishedAnnotation,
                LabeledPath = labelPath,
                Name = model.Name,
                Timestamp = model.Timestamp,
                Id = model.Id
            };
            Model respondModel = await UpdateModelAsync(newModel);
            string dir_path = $"./Ressources/Labels/{newModel.Id}_{newModel.Name}";
            if (System.IO.File.Exists(dir_path)) respondModel.LabeledPath = System.IO.File.ReadAllText(dir_path);
            return respondModel;
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("delete-{id}")]
        public Task DeleteAsync(int id)
        {
            return DeleteModelAsync(id);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("uploadCoco")]
        public Task UploadSingleCoco(Data data)
        {
            return Base64Controller.CocoUploadAsync(data);
        }
    }
}