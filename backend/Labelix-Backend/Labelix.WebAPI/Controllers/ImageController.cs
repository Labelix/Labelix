using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Contract = Labelix.Contracts.Persistence.IImage;
using Model = Labelix.Transfer.Persistence.Image;
namespace Labelix.WebAPI.Controllers
{
    public class ImageController : GenericController<Contract, Model>
    {
        [HttpGet("/api/Image/{id}")]
        public Task<Model> GetAsync(int id)
        {
            return GetModelByIdAsync(id);
        }
    }
}
