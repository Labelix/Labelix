using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Labelix.Contracts.Persistence;

namespace Labelix.Contracts.Client.Buisiness
{
    public interface IAIModelConfigController
    {
        Task RemoveAIConfigFromProject(int projectId, IAIModelConfig model);
        Task AddAIConfigToProject(int projectId, IAIModelConfig model);
        Task<IEnumerable<IAIModelConfig>> GetAIConfigByProjectId(int projectId);
    }
}
