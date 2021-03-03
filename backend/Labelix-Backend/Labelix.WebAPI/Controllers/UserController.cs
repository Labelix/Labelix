using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Labelix.Logic;
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
            return Factory.CreateUserManagementController().AddUserToProject(projectId, model);
        }
        [Authorize(Roles = "admin")]
        [HttpPut("removeUserFromProject-{projectId}")]
        public Task RemoveUserFromProject(int projectId, Model model)
        {
            return Factory.CreateUserManagementController().RemoveUserFromProject(projectId, model);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("allByProjectId-{id}")]
        public async Task<IEnumerable<Model>> GetByProjectId(int id)
        {
            return (await Factory.CreateUserManagementController().GetByProjectId(id)).Select(ToModel);
        }
    }
}
