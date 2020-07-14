using Labelix.Transfer.Persistence;
using Microsoft.AspNetCore.Mvc;
using DockerUtils;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Text;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using Microsoft.AspNetCore.Routing;

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
            string dirName, tempPath, tempDir;

            tempPath = Path.GetTempPath();
            
            
            do
            {
                dirName = Path.GetRandomFileName();
                tempDir = Path.Combine(tempPath, dirName);
            } while (Directory.Exists(tempDir));

            Directory.CreateDirectory(tempDir);

            string inDir, outDir;

            inDir = Path.Combine(tempDir, "in");
            outDir = Path.Combine(tempDir, "out");
            Directory.CreateDirectory(inDir);
            Directory.CreateDirectory(outDir);

            var options = new List<string>();
            
            options.Add("--rm");
            
            options.Add($"-v {inDir}:{config.InputDirectory}");
            options.Add($"-v {outDir}:{config.OutputDirectory}");

            var optionsString = string.Join(" ", options.ToArray());

            var res = await DockerUtils.DockerUtils.DockerRunAsync(config.DockerImageName, optionsString, config.Parameter);

            Directory.Delete(tempDir, true);
            
            
            return res;
        }

    }
}
