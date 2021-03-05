using System;
using Labelix.Transfer.Modules;
using Labelix.Transfer.Persistence;
using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonBase.Extensions;
using Labelix.Contracts.Persistence;
using Labelix.Logic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Razor.Language.Intermediate;
using Contract = Labelix.Contracts.Persistence.IProject;
using Model = Labelix.Transfer.Persistence.Project;

namespace Labelix.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : GenericController<Contract, Model>
    {
        [Authorize(Roles = "user")]
        [HttpGet("{id}")]
        public async Task<Model> GetWithImagesAsync(int id)
        {
            Project project = ToModel(await Factory.CreateProjectController().GetProjectWithLabelAsync(id));
            project.Images =
                (await Factory.CreateProjectController().GetImagesForProject(project.Id)).Select(e => new Data().CopyProperties(e)).ToList();
            return project;
        }

        [Authorize(Roles = "user")]
        [HttpGet("all")]
        public async Task<IEnumerable<Model>> GetAllAsync()
        {
            var keycloakUser = this.User.Claims.GetUserId();
            return (await Factory.CreateProjectController().GetAllAsync(keycloakUser)).Select(ToModel);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("create")]
        public async Task<Project> PostAsync(ProjectInsert model)
        {
                var keycloakUser = this.User.Claims.GetUserId();
                return ToModel(await Factory.CreateProjectController().CreateAsync(model, model.AiModelConfigIds, model.Images, keycloakUser));
        }

        [Authorize(Roles = "user")]
        [HttpPut("update")]
        public async Task<Model> PutAsync(Model model)
        {
            return ToModel(await Factory.CreateProjectController().UpdateProjectAsync(model));
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("delete-{id}")]
        public Task DeleteAsync(int id)
        {
            return Factory.CreateProjectController().DeleteAsync(id);
        }
    }
}