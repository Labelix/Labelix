using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Labelix.Contracts.Persistence;

namespace Labelix.Contracts.Client.Buisiness
{
    public interface IProjectController
    {
        Task<IEnumerable<IData>> GetImagesForProject(int projectId);
        Task<IProject> GetProjectWithLabelAsync(int id);
        Task<IEnumerable<IProject>> GetAllAsync(string keycloakUser);

        Task<IProject> CreateAsync(IProject project, IEnumerable<int> aiConfigs, IEnumerable<IData> images,
            string keycloakUser);

        Task<IProject> UpdateProjectAsync(IProject project);
        Task DeleteAsync(int id);
    }
}
