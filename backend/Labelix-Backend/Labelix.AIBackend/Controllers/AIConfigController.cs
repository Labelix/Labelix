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
        public int Post([FromBody] AIConfig config)
        {
            //return DockerHelpers.DockerRun(config);
            return 0;
        }

    }
}
