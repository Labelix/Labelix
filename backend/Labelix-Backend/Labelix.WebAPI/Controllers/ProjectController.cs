using Labelix.Transfer.Modules;
using Labelix.Transfer.Persistence;
using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contract = Labelix.Contracts.Persistence.IProject;
using Model = Labelix.Transfer.Persistence.Project;

namespace Labelix.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : GenericController<Contract, Model>
    {
        readonly ImageController imageController = new ImageController();
        readonly  Base64Controller base64Controller = new Base64Controller();

        [HttpGet("{id}")]
        public async Task<Model> GetAsync(int id)
        {
            Project project = await GetModelByIdAsync(id);
            List<Image> images = (await imageController.GetByProjectId(project.Id)).ToList();
            List<Data> projectImages = new List<Data>();
            foreach (var item in images)
            {
                projectImages.Add(await imageController.GetAsyncPicture(item.Id));
            }
            project.LabeledPath = System.IO.File.ReadAllText(project.LabeledPath);
            project.Images = projectImages;
            return project;
        }
        public Task<Model> GetAsyncOnlyProject(int id)
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
        public async Task<Model> PutAsync(Model model)
        {
            Model oldProject = await GetAsyncOnlyProject(model.Id);
            Model oldProjectConverted = await GetAsync(model.Id);
            if (oldProjectConverted.LabeledPath != model.LabeledPath)
            {
                System.IO.File.WriteAllText(oldProject.LabeledPath, model.LabeledPath);
            }

            if (oldProjectConverted.Images != model.Images)
            {
                await imageController.DeleteByProjectId(oldProjectConverted.Id);
                var images = new MultipleData()
                {
                    Data = model.Images
                };
                await base64Controller.MultipleImageUpload(images);
            }
            Model newModel = new Project()
            {
                CreationDate = model.CreationDate,
                Description = model.Description,
                FinishedAnnotation = model.FinishedAnnotation,
                LabeledPath =  $"./Ressources/Images/{model.Id}_{model.Name}",
                Name = model.Name,
                Timestamp = model.Timestamp
            };
            return await UpdateModelAsync(newModel); 
        }
        [HttpDelete("delete-{id}")]
        public Task DeleteAsync(int id)
        {
            return DeleteModelAsync(id);
        }
    }
}