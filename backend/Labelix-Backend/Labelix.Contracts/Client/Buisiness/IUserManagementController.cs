using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Labelix.Contracts.Persistence;

namespace Labelix.Contracts.Client.Buisiness
{
    public interface IUserManagementController
    {
        Task AddUserToProject(int projectId, IUser model);
        Task RemoveUserFromProject(int projectId, IUser model);
        Task<IEnumerable<IUser>> GetByProjectId(int id);
    }
}
