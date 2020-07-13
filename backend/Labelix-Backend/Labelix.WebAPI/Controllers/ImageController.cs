using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Contract = Labelix.Contracts.Persistence.IImage;
using Model = Labelix.Transfer.Persistence.Image;
namespace Labelix.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : GenericController<Contract, Model>
    {
        [HttpGet("{id}")]
        public Task<Model> GetAsync(int id)
        {
            return GetModelByIdAsync(id);
        }
        [HttpGet("all")]
        public Task<IEnumerable<Model>> GetAllAsync()
        {
            return GetModelsAsync();
        }
		[HttpGet("count")]
		public Task<int> GetCountAsync()
		{
			return CountAsync();
		}
		[HttpPost("create")]
		public Task<Model> PostAsync(Model model)
		{
			return InsertModelAsync(model);
		}
		[HttpPut("update")]
		public Task<Model> PutAsync(Model model)
		{
			return UpdateModelAsync(model);
		}
		[HttpDelete("delete-{id}")]
		public Task DeleteAsync(int id)
		{
			return DeleteModelAsync(id);
		}
	}
}
