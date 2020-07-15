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
using Microsoft.Extensions.Configuration.UserSecrets;
using CommonBase.Helpers;
using PathHelper = CommonBase.Helpers.PathHelper;

namespace Labelix.AIBackend.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AIConfigController : ControllerBase
    {
        #region CRUD
        [HttpGet]
        public async Task<string> Get()
        {
            var (err, stdout) = await DockerUtils.DockerUtils.DockerPsAsync();
            return stdout;
        }

        [HttpPost]
        public async Task<int> PostAsync([FromBody] AIConfig config)
        {


            string tempPath, tempDir;
            tempPath = Path.GetTempPath();

            tempDir = PathHelper.GetRandomFileNameSecure(tempPath);

            var (inDir, outDir) = CreateFolders(tempDir);

            List<string> options;

            options = new List<string>();
            options.Add("--rm");
            options.Add($"-v {inDir}:{config.InputDirectory}");
            options.Add($"-v {outDir}:{config.OutputDirectory}");
            var optionsString = string.Join(" ", options.ToArray());

            var res = await DockerUtils.DockerUtils.DockerRunAsync(config.DockerImageName, optionsString, config.Parameter);

            Directory.Delete(tempDir, true);


            return res;
        } 
        #endregion

        #region Static Methods
        private static (string, string) CreateFolders(string tempDir)
        {
            string inDir, outDir;

            inDir = Path.Combine(tempDir, "in");
            outDir = Path.Combine(tempDir, "out");

            Directory.CreateDirectory(inDir);
            Directory.CreateDirectory(outDir);

            return (inDir, outDir);
        } 
        #endregion
    }
}
