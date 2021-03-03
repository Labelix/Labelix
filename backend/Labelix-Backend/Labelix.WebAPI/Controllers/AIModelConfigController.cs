using Labelix.Transfer.Persistence;
using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Labelix.Logic;
using Microsoft.AspNetCore.Authorization;
using Contract = Labelix.Contracts.Persistence.IAIModelConfig;
using Model = Labelix.Transfer.Persistence.AIModelConfig;

namespace Labelix.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AIModelConfigController : GenericController<Contract, Model>
    {

        [Authorize(Roles = "user")]
        [HttpGet("{id}")]
        public Task<Model> GetAsync(int id)
        {
            return GetModelByIdAsync(id);
        }

        [Authorize(Roles = "user")]
        [HttpGet("all")]
        public Task<IEnumerable<Model>> GetAllAsync()
        {
            return GetModelsAsync();
        }

        [Authorize(Roles = "user")]
        [HttpGet("count")]
        public Task<int> GetCountAsync()
        {
            return CountAsync();
        }

        [Authorize(Roles = "admin")]
        [HttpPost("create")]
        public Task<Model> PostAsync(Model model)
        {
            return InsertModelAsync(model);
        }

        [Authorize(Roles = "admin")]
        [HttpPut("update")]
        public Task<Model> PutAsync(Model model)
        {
            return UpdateModelAsync(model);
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("delete-{id}")]
        public Task DeleteAsync(int id)
        {
            return DeleteModelAsync(id);
        }

        [Authorize(Roles = "user")]
        [HttpGet("ByProjectId-{projectId}")]
        public async Task<IEnumerable<Model>> GetAIConfigByProjectIdAsync(int projectId)
        {
            return (await Factory.CreateAiModelConfigController().GetAIConfigByProjectIdAsync(projectId)).Select(ToModel);
        }

        [Authorize(Roles = "admin")]
        [HttpPut("AddToProject-{projectId}")]
        public Task AddAIConfigToProjectAsync(int projectId, Model model)
        {
            return Factory.CreateAiModelConfigController().AddAIConfigToProjectAsync(projectId, model);
        }

        [Authorize(Roles = "admin")]
        [HttpPut("RemoveFromProject-{projectId}")]
        public Task RemoveAIConfigFromProjectAsync(int projectId, Model model)
        {
            return Factory.CreateAiModelConfigController().RemoveAIConfigFromProjectAsync(projectId, model);
        }
    }
}