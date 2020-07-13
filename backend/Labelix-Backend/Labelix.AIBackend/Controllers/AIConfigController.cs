using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Labelix.Transfer.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace Labelix.AIBackend.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AIConfigController : ControllerBase
    {

        [HttpGet]
        public string Get()
        {
            return $"Controller works!";
        }

        [HttpPost]
        public AIConfig Post([System.Web.Http.FromBody] AIConfig config)
        {
            System.Diagnostics.Debug.WriteLine(config);

            return config;
        }

    }
}
