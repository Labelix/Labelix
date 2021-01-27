using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Labelix.Logic;
using Labelix.WebApi.Controllers;
using Contract = Labelix.Contracts.Persistence.IProject_User;
using Model = Labelix.Transfer.Persistence.ProjectUser;

namespace Labelix.WebAPI.Controllers
{
    public class UserProjectController : GenericController<Contract, Model>
    {
        public async Task<int[]> GetByProjectForUser(string userKeyCloakId)
        {
            UserController userController = new UserController();
            int internUserId = (await userController.GetUserId(userKeyCloakId)).Id;
            var projectUsers = await GetAllWhereAsync(e => e.UserIdKey == internUserId);
            List<int> result = new List<int>();
            foreach (var projectUser in projectUsers)
            {
                result.Add(projectUser.ProjectKey);
            }

            return result.ToArray();
        }

        public Task<Model> PostAsync(Model model)
        {
            return InsertModelAsync(model);
        }

        public Task AddUserToProject(int userId, int projectId)
        {
            return PostAsync(new Model {UserIdKey = userId, ProjectKey = projectId});
        }

        public async Task<int[]> GetUsersOfProject(int projectId)
        {
            IEnumerable<Model> projectUsers = await GetAllWhereAsync(e => e.ProjectKey == projectId);
            List<int> result = new List<int>();
            foreach (var projectUser in projectUsers)
            {
                result.Add(projectUser.UserIdKey);
            }
            return result.ToArray();
        }

        public async Task RemoveUserFromProject(int userId, int projectId)
        {
            Model model = (await GetAllWhereAsync(e => e.UserIdKey == userId && e.ProjectKey == projectId))
                .FirstOrDefault();
            await DeleteModelAsync(model.Id);
        }
    }
}
