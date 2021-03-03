using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Labelix.Contracts.Persistence;

namespace Labelix.Contracts.Client.Buisiness
{
    public interface IImageController
    {
        Task DeleteAsync(int id);
        Task UploadImageAsync(IData data);
        Task<IData> GetFirstImageOfProject(int projectId);
        Task<IData> GetImageAsync(int id);
    }
}
