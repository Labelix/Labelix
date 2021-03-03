using System.Collections.Generic;
using System.Threading.Tasks;
using Labelix.Contracts.Persistence;

namespace Labelix.Contracts.Client.Buisiness
{
    public interface IAIModelConfigController
    {
        Task RemoveAIConfigFromProjectAsync(int projectId, IAIModelConfig model);
        Task AddAIConfigToProjectAsync(int projectId, IAIModelConfig model);
        Task<IEnumerable<IAIModelConfig>> GetAIConfigByProjectIdAsync(int projectId);
    }
}