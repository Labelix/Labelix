using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Contract = Labelix.Contracts.Persistence.IProject_AIModelConfig;
using Model = Labelix.Transfer.Persistence.Project_AIModelConfig;

namespace Labelix.WebAPI.Controllers
{
    public class Project_AIModelConfigController : GenericController<Contract, Model>
    {
        public Task<Model> GetAsync(int id)
        {
            return GetModelByIdAsync(id);
        }
        public Task<IEnumerable<Model>> GetAllAsync()
        {
            return GetModelsAsync();
        }
        public Task<int> GetCountAsync()
        {
            return CountAsync();
        }
        public Task<Model> PostAsync(Model model)
        {
            return InsertModelAsync(model);
        }
        public Task<Model> PutAsync(Model model)
        {
            return UpdateModelAsync(model);
        }
        public Task DeleteAsync(int id)
        {
            return DeleteModelAsync(id);
        }
        public async Task<IEnumerable<Model>> GetByProjectIdAsync(int projectId)
        {
            return (await GetAllAsync()).Where(e => e.ProjectKey == projectId);
        }
    }
}