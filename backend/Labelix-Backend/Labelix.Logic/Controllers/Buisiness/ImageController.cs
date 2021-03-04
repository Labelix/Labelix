using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CommonBase.Extensions;
using CommonBase.Security;
using Labelix.Contracts.Client;
using Labelix.Contracts.Client.Buisiness;
using Labelix.Contracts.Persistence;
using Labelix.Logic.Entities.Business;

namespace Labelix.Logic.Controllers.Buisiness
{
    internal class ImageController : IImageController
    {
        private readonly IControllerAccess<IImage> imageController = Factory.Create<IImage>();
        #region API-Methods
        public Task<IData> GetImageAsync(int id)
        {
            return Base64Controller.GetPictureByIdAsync(id);
        }

        public async Task<IData> GetFirstImageOfProject(int projectId)
        {
            IImage image = (await imageController.GetAllWhereAsync(e => e.ProjectId == projectId)).FirstOrDefault();
            return Base64Controller.GetPictureAsync(image);
        }

        public Task UploadImageAsync(IData data)
        {
            return Base64Controller.ImageUploadAsync(data);
        }

        public Task DeleteAsync(int id)
        {
            return Base64Controller.RemoveImageAsync(id);
        }
        #endregion
    }
}
