﻿using CommonBase.Extensions;
using Labelix.Transfer.Modules;
using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<Model> GetImageAsync(int id)
        {
            return await GetModelByIdAsync(id);
        }
        [Authorize(Roles = "user")]
        [HttpGet("picture-{id}")]
        public async Task<Data> GetAsyncPicture(int id)
        {
            Model image = await GetModelByIdAsync(id);
            byte[] bytes = System.IO.File.ReadAllBytes(image.ImagePath);
            string base64 = bytes.ImageToBase64();
            string[] pathParts = image.ImagePath.Split('/');
            Data data = new Data
            {
                Id = id,
                Base64 = base64,
                Name = pathParts[^1],
                ProjectId = image.ProjectId,
                Width = image.Width,
                Height = image.Height
            };
            data.Format = data.Name.Split('.')[1];
            return GetXMLOfBase(data);
        }

        //Sets the base64 to xml variant
        private Data GetXMLOfBase(Data data)
        {
            data.Base64 = $"data:image/{data.Format};base64,{data.Base64}";
            return data;
        }

        [Authorize(Roles = "user")]
        [HttpGet("FirstOfProject-{projectId}")]
        public async Task<Data> FirstOfProject(int projectId)
        {
            Model image = (await GetAllAsync()).FirstOrDefault(e => e.ProjectId == projectId);
            byte[] bytes = System.IO.File.ReadAllBytes(image?.ImagePath);
            string base64 = bytes.ImageToBase64();
            string[] pathParts = image?.ImagePath.Split('/');
            Data data = new Data
            {
                Id = image.Id,
                Base64 = base64,
                Name = pathParts[^1],
                ProjectId = image.ProjectId,
                Width = image.Width,
                Height = image.Height
            };
            data.Format = data.Name.Split('.')[1];
            return GetXMLOfBase(data);
        }
        [Authorize(Roles = "admin")]
        [HttpGet("all")]
        public Task<IEnumerable<Model>> GetAllAsync()
        {
            return GetModelsAsync();
        }
        [Authorize(Roles = "user")]
        [HttpGet("count")]
        public Task<int> GetCountAsync()
        {
            return CountAsync();
        }
        public async Task<IEnumerable<Model>> GetByProjectId(int projectId)
        {
            IEnumerable<Model> entities = await GetAllAsync();
            return entities.Where(i => i.ProjectId == projectId);
        }
        [Authorize(Roles = "admin")]
        [HttpPost("create")]
        public async Task<IActionResult> PostAsync(Data data)
        {
            await Base64Controller.ImageUploadAsync(data);
            return Ok();
        }

        public async Task<IActionResult> SetImage(Model image)
        {
            await InsertModelAsync(image);
            return Ok();
        }

        [Authorize(Roles = "admin")]
        [HttpPut("update")]
        public Task<Model> PutAsync(Model model)
        {
            return UpdateModelAsync(model);
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("delete-{id}")]
        public Task DeleteAsync(int id)
        {
            return DeleteModelAsync(id);
        }

        public async Task<IActionResult> DeleteByProjectId(int projectId)
        {
            IEnumerable<Model> entities = await GetByProjectId(projectId);
            foreach (var img in entities)
            {
                System.IO.File.Delete(img.ImagePath);
                await DeleteAsync(img.Id);
            }

            return Ok();
        }
    }
}
