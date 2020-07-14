using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Labelix.Transfer.Persistence;
using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Contract = Labelix.Contracts.Persistence.IProject;
using Model = Labelix.Transfer.Persistence.Project;

namespace Labelix.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : GenericController<Contract, Model>
    {
		ImageController imageController = new ImageController();

        [HttpGet("{id}")]
        public async Task<Model> GetAsync(int id)
        {
            Project project = await GetModelByIdAsync(id);
			project.Images = (await imageController.GetByProjectId(project.Id)).ToList();
			return project;
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