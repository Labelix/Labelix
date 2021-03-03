using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Labelix.Contracts.Client;
using Labelix.Contracts.Client.Buisiness;
using Labelix.Contracts.Persistence;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Buisiness
{
    internal class AIConfigController : IAIModelConfigController
    {
        private readonly IControllerAccess<IAIModelConfig> aiModelConfigController = Factory.Create<IAIModelConfig>();

        private readonly IControllerAccess<IProject_AIModelConfig> project_AiModelConfigController =
            Factory.Create<IProject_AIModelConfig>();

        #region MyRegion

        public async Task<IEnumerable<IAIModelConfig>> GetAIConfigByProjectIdAsync(int projectId)
        {
            var configIds = await project_AiModelConfigController.GetAllWhereAsync(e => e.ProjectKey == projectId);
            return await aiModelConfigController.GetAllWhereAsync(e => configIds.Any(c => c.AIConfigKey == e.Id));
        }

        public Task AddAIConfigToProjectAsync(int projectId, IAIModelConfig model)
        {
            return project_AiModelConfigController.InsertAsync(new Project_AIModelConfig
                {AIConfigKey = model.Id, ProjectKey = projectId});
        }

        public async Task RemoveAIConfigFromProjectAsync(int projectId, IAIModelConfig model)
        {
            var item = (await project_AiModelConfigController.GetAllWhereAsync(e =>
                e.ProjectKey == projectId && e.AIConfigKey == model.Id)).FirstOrDefault();
            if (item != null) await project_AiModelConfigController.DeleteAsync(item.Id);
        }

        #endregion
    }
}