using Labelix.Transfer.Persistence;
using Microsoft.AspNetCore.Mvc;
using DockerUtils;
using System.Threading.Tasks;

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
        public async Task<int> PostAsync([FromBody] AIConfig config)
        {
            var res = await DockerUtils.DockerUtils.DockerRunAsync(config.DockerImageName, "--rm", config.Parameter);
            return res;
        }

    }
}
