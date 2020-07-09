using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpPut]
        public void Put([FromBody] string j)
        {
        }



    }
}
