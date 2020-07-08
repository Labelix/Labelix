using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Labelix.WebApi.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Contract = Labelix.Contracts.Persistence.ILabel;
using Model = Labelix.Transfer.Persistence.Label;

namespace Labelix.WebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LabelController : GenericController<Contract, Model>
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
    }
}