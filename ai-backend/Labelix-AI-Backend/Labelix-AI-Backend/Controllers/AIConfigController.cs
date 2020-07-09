using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Labelix_AI_Backend.Transfer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Labelix_AI_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AIConfigController : ControllerBase
    {

        private readonly ILogger<AIConfigController> _logger;

        public AIConfigController(ILogger<AIConfigController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Get()
        {
            return "Works";
        }


        [HttpPost]
        public AIConfig Post([FromBody] AIConfig config)
        {
            System.Diagnostics.Debug.WriteLine(config);
            return config;
        }



    }
}
