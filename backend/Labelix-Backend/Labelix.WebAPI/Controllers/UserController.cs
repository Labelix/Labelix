using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Contract = Labelix.Contracts.Persistence.IUser;
using Model = Labelix.Transfer.Persistence.User;

namespace Labelix.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : GenericController<Contract, Model>
    {
        public async Task<Contract> GetUserId(string userKeyCloakId)
        {
            var res = (await GetAllWhereAsync(s => s.KeycloakId == userKeyCloakId)).FirstOrDefault();
            if (res == null)
            {
                return await CreateNewUser(userKeyCloakId);
            }
            else
            {
                return res;
            }
        }

        public async Task<Contract>CreateNewUser(string userKeyCloakId)
        {
            Model model = new Model {KeycloakId = userKeyCloakId};
            return await InsertModelAsync(model);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("all")]
        public Task<IEnumerable<Model>> GetUsers()
        {
            return GetModelsAsync();
        }

        [Authorize(Roles = "admin")]
        [HttpPut("addUserToProject-{projectId}")]
        public Task AddUserToProject(int projectId , Model model)
        {
            return new UserProjectController().AddUserToProject(model.Id, projectId);
        }
        [Authorize(Roles = "admin")]
        [HttpPut("removeUserFromProject-{projectId}")]
        public Task RemoveUserFromProject(int projectId, Model model)
        {
            return new UserProjectController().RemoveUserFromProject(model.Id, projectId);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("allByProjectId-{id}")]
        public async Task<IEnumerable<Model>> GetByProjectId(int id)
        {
            int[] users = await new UserProjectController().GetUsersOfProject(id);
            return await GetAllWhereAsync(e => (users).Contains(e.Id));
        }
    }
}
