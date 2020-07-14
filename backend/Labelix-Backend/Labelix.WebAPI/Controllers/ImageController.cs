using CommonBase.Extensions;
using Labelix.Transfer.Modules;
using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Contract = Labelix.Contracts.Persistence.IImage;
using Model = Labelix.Transfer.Persistence.Image;
namespace Labelix.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : GenericController<Contract, Model>
    {
        [HttpGet("{id}")]
        public async Task<Data> GetAsync(int id)
        {
            Model image = await GetModelByIdAsync(id);
			byte[] bytes = System.IO.File.ReadAllBytes(image.ImagePath);
			string base64 = bytes.ImageToBase64();
			Data data = new Data();
			data.Base64 = base64;
			string[] pathParts = image.ImagePath.Split('/');
			data.Name = pathParts[pathParts.Length - 1];
			data.Format = data.Name.Split('.')[1];
			data.ProjectId = image.ProjectId;

			return GetXMLOfBase(data);
        }

		//Sets the base64 to xml variant
		private Data GetXMLOfBase(Data data)
		{
			data.Base64 = $"data:image/{data.Format};base64,{data.Base64}";
			return data;
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
		[HttpGet("GetByProjectId-{projectId}")]
		public async Task<IEnumerable<Model>> GetByProjectId(int projectId)
		{
			IEnumerable<Model> entities = await GetAllAsync();

			return entities.Where(i => i.ProjectId == projectId);
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
