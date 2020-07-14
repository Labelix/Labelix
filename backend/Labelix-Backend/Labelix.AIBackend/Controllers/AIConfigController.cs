using Labelix.Transfer.Persistence;
using Microsoft.AspNetCore.Mvc;
using DockerUtils;
using System.Threading.Tasks;
using System.Diagnostics;

namespace Labelix.AIBackend.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AIConfigController : ControllerBase
    {
        [HttpGet]
        public async Task<string> Get()
        {
            var (err, stdout) = await DockerUtils.DockerUtils.DockerPsAsync();
            return stdout;
        }

        [HttpPost]
        public async Task<int> PostAsync([FromBody] AIConfig config)
        {
            var res = await DockerUtils.DockerUtils.DockerRunAsync(config.DockerImageName, "--rm", config.Parameter);
            Debug.WriteLine($"{System.Reflection.MethodBase.GetCurrentMethod().Name}: {res}");
            return res;
        }

    }
}
