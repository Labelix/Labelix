using System;
using Labelix.Transfer.Modules;
using Labelix.Transfer.Persistence;
using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonBase.Extensions;
using Contract = Labelix.Contracts.Persistence.IProject;
using Model = Labelix.Transfer.Persistence.Project;

namespace Labelix.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : GenericController<Contract, Model>
    {

        

        [HttpGet("{id}")]
        public async Task<Model> GetAsync(int id)
        {
            ImageController imageController = new ImageController();
            Project project = await GetModelByIdAsync(id);
            List<Image> images = (await imageController.GetByProjectId(project.Id)).ToList();
            List<Data> projectImages = new List<Data>();
            foreach (var item in images)
            {
                projectImages.Add(await imageController.GetAsyncPicture(item.Id));
            }
            if (!project.LabeledPath.IsNullOrEmpty()) project.LabeledPath = System.IO.File.ReadAllText(project.LabeledPath);
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
        public async Task<IActionResult> PostAsync(ProjectInsert model)
        {
            try
            {
                Project_AIModelConfigController aiModelConfigController = new Project_AIModelConfigController();
                Project project = new Project();
                project.CopyProperties(model);
                project = await InsertModelAsync(project);
                foreach (var item in model.AiModelConfigIds)
                {
                    await aiModelConfigController.PostAsync(new Project_AIModelConfig(item, project.Id));
                }
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500);
            }
            
        }
        [HttpPut("update")]
        public async Task<Model> PutAsync(Model model)
        {
            ImageController imageController = new ImageController();
            Model oldProject = await GetAsyncOnlyProject(model.Id);
            Model oldProjectConverted = await GetAsync(model.Id);
            if (oldProjectConverted.LabeledPath != model.LabeledPath)
            {
                if(!oldProject.LabeledPath.IsNullOrEmpty()) System.IO.File.Delete(oldProject.LabeledPath);
                await Base64Controller.CocoUploadAsync(new Data(model.Id, model.Name, "", model.LabeledPath));
            }

            if (oldProjectConverted.Images != model.Images)
            {
                await imageController.DeleteByProjectId(oldProjectConverted.Id);
                var images = new MultipleData()
                {
                    Data = model.Images
                };
                await Base64Controller.MultipleImageUpload(images);
            }
            Model newModel = new Project()
            {
                CreationDate = model.CreationDate,
                Description = model.Description,
                FinishedAnnotation = model.FinishedAnnotation,
                LabeledPath = $"./Ressources/Labels/{model.Id}_{model.Name}",
                Name = model.Name,
                Timestamp = model.Timestamp,
                Id = model.Id
            };
            await UpdateModelAsync(newModel);
            newModel.LabeledPath = System.IO.File.ReadAllText(newModel.LabeledPath);
            return newModel;
        }
        [HttpDelete("delete-{id}")]
        public Task DeleteAsync(int id)
        {
            return DeleteModelAsync(id);
        }
    }
}