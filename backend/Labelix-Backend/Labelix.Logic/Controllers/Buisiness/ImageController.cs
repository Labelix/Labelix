using System.Linq;
using System.Threading.Tasks;
using Labelix.Contracts.Client;
using Labelix.Contracts.Client.Buisiness;
using Labelix.Contracts.Persistence;

namespace Labelix.Logic.Controllers.Buisiness
{
    internal class ImageController : IImageController
    {
        private readonly IControllerAccess<IImage> imageController = Factory.Create<IImage>();

        #region API-Methods

        public Task<IData> GetImageAsync(int id)
        {
            return Base64Controller.GetPictureAsync(id);
        }

        public async Task<IData> GetFirstImageOfProject(int projectId)
        {
            var image = (await imageController.GetAllWhereAsync(e => e.ProjectId == projectId)).FirstOrDefault();
            return await GetImageAsync(image.Id);
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