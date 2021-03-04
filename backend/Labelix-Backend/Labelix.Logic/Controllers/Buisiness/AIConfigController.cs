using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CommonBase.Security;
using Labelix.Contracts.Client;
using Labelix.Contracts.Client.Buisiness;
using Labelix.Contracts.Persistence;
using Labelix.Logic.Controllers.Persistence;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Buisiness
{
    class AIConfigController : IAIModelConfigController
    {
        private readonly IControllerAccess<IAIModelConfig> aiModelConfigController = Factory.Create<IAIModelConfig>();
        private readonly IControllerAccess<IProject_AIModelConfig> project_AiModelConfigController = Factory.Create<IProject_AIModelConfig>();
        #region MyRegion

        public async Task<IEnumerable<IAIModelConfig>> GetAIConfigByProjectIdAsync(int projectId)
        {
            IEnumerable<IProject_AIModelConfig> configIds = await project_AiModelConfigController.GetAllWhereAsync(e => e.ProjectKey == projectId);
            return await aiModelConfigController.GetAllWhereAsync(e => configIds.Any(c => c.AIConfigKey == e.Id));
        }

        public async Task AddAIConfigToProjectAsync(int projectId, IAIModelConfig model)
        {
            await project_AiModelConfigController.InsertAsync(new Project_AIModelConfig{AIConfigKey = model.Id, ProjectKey = projectId});
            await project_AiModelConfigController.SaveChangesAsync();
        }
        public async Task RemoveAIConfigFromProjectAsync(int projectId, IAIModelConfig model)
        {
            var item = (await project_AiModelConfigController.GetAllWhereAsync(e =>
                e.ProjectKey == projectId && e.AIConfigKey == model.Id)).FirstOrDefault();
            if (item != null) await project_AiModelConfigController.DeleteAsync(item.Id);
            await project_AiModelConfigController.SaveChangesAsync();
        }

        #endregion
    }
}
