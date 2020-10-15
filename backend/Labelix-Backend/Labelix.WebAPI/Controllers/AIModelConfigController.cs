using Labelix.Transfer.Persistence;
using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Contract = Labelix.Contracts.Persistence.IAIModelConfig;
using Model = Labelix.Transfer.Persistence.AIModelConfig;

namespace Labelix.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AIModelConfigController : GenericController<Contract, Model>
    {
        readonly Project_AIModelConfigController project_AIConfig = new Project_AIModelConfigController();

        [HttpGet("{id}")]
        public Task<Model> GetAsync(int id)
        {
            return GetModelByIdAsync(id);
        }
        [HttpGet("all")]
        public Task<IEnumerable<Model>> GetAllAsync()
        {
            return GetModelsAsync();
        }
        [HttpGet("count")]
        public Task<int> GetCountAsync()
        {
            return CountAsync();
        }
        [HttpPost("create")]
        public Task<Model> PostAsync(Model model)
        {
            return InsertModelAsync(model);
        }
        [HttpPut("update")]
        public Task<Model> PutAsync(Model model)
        {
            return UpdateModelAsync(model);
        }
        [HttpDelete("delete-{id}")]
        public Task DeleteAsync(int id)
        {
            return DeleteModelAsync(id);
        }
        [HttpGet("ByProjectId-{projectId}")]
        public async Task<IEnumerable<Model>> GetByProjectId(int projectId)
        {
            Project_AIModelConfig configIdss = await project_AIConfig.GetAsync(1);
            IEnumerable<Project_AIModelConfig> configIds = await project_AIConfig.GetByProjectIdAsync(projectId);
            List<int> ids = new List<int>();
            configIds.ToList().ForEach(e => ids.Add(e.AIConfigKey));
            IEnumerable<Model> configs = await GetAllAsync();
            return configs.Where(c => ids.Contains(c.Id));
        }

    }
}