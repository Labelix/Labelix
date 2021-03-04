using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Labelix.Contracts.Client;
using Labelix.Contracts.Client.Buisiness;
using Labelix.Contracts.Persistence;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Business
{
    internal class UserManagementController : IUserManagementController
    {
        private readonly IControllerAccess<IProject_User> project_userController = Factory.Create<IProject_User>();
        private readonly IControllerAccess<IUser> userController = Factory.Create<IUser>();

        #region API-Methods


        public async Task AddUserToProject(int projectId, IUser model)
        {
            await project_userController.InsertAsync(new Project_User { UserIdKey = model.Id, ProjectKey = projectId });
            await project_userController.SaveChangesAsync();
        }

        public async Task RemoveUserFromProject(int projectId, IUser model)
        {
            var projectUser =
                (await project_userController.GetAllWhereAsync(
                    e => e.UserIdKey == model.Id && e.ProjectKey == projectId))
                .FirstOrDefault();
            if (model != null) await project_userController.DeleteAsync(model.Id);
            await project_userController.SaveChangesAsync();
        }

        public async Task<IEnumerable<IUser>> GetByProjectId(int id)
        {
            var users = await GetUsersOfProject(id);
            return await userController.GetAllWhereAsync(e => users.Contains(e.Id));
        }

        #endregion

        #region intern-Methods

        public async Task<IUser> GetUserId(string userKeyCloakId)
        {
            var res = (await userController.GetAllWhereAsync(s => s.KeycloakId == userKeyCloakId)).FirstOrDefault();
            if (res == null)
                return await CreateNewUser(userKeyCloakId);
            return res;
        }

        public async Task<IUser> CreateNewUser(string userKeyCloakId)
        {
            IUser model = new User {KeycloakId = userKeyCloakId};
            model = await userController.InsertAsync(model);
            await userController.SaveChangesAsync();
            return model;
        }

        public async Task<int[]> GetUsersOfProject(int projectId)
        {
            var projectUsers = await project_userController.GetAllWhereAsync(e => e.ProjectKey == projectId);
            var result = new List<int>();
            foreach (var projectUser in projectUsers) result.Add(projectUser.UserIdKey);
            return result.ToArray();
        }

        #endregion
    }
}