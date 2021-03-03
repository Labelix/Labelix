using CommonBase.Extensions;
using Labelix.Transfer.Modules;
using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Labelix.Logic;
using Microsoft.AspNetCore.Authorization;
using Contract = Labelix.Contracts.Persistence.IImage;
using Model = Labelix.Transfer.Persistence.Image;
namespace Labelix.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : GenericController<Contract, Model>
    {
        [Authorize(Roles = "user")]
        [HttpGet("{id}")]
        public async Task<Data> GetImageAsync(int id)
        {
            return new Data().CopyProperties(await Factory.CreateImageController().GetImageAsync(id));
        }

        [Authorize(Roles = "user")]
        [HttpGet("FirstOfProject-{projectId}")]
        public async Task<Data> GetFirstImageOfProject(int projectId)
        {
            return new Data().CopyProperties(await Factory.CreateImageController().GetFirstImageOfProject(projectId));
        }

        [Authorize(Roles = "admin")]
        [HttpPost("create")]
        public Task UploadImageAsync(Data data)
        {
            return Factory.CreateImageController().UploadImageAsync(data);
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("delete-{id}")]
        public Task DeleteAsync(int id)
        {
            return Factory.CreateImageController().DeleteAsync(id);
        }
    }
}
