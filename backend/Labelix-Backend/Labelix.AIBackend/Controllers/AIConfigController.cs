using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Routing;
using PathHelper = CommonBase.Helpers.PathHelper;
using Labelix.Transfer.Modules;
using CommonBase.Extensions;
using DockerAccess;

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
            var (err, stdout) = await Docker.PsAsync();
            return stdout;
        }

        [HttpPost]
        public async Task<int> PostAsync([FromBody] AILabelingInfo info)
        {
            string tempPath, tempDir;
            tempPath = Path.GetTempPath();

            info.data.ForEach((x) => x.Base64 = x.Base64.Replace("data:image/png;base64,", ""));

            tempDir = PathHelper.GetRandomFileNameSecure(tempPath);

            var (inDir, outDir) = CreateFolders(tempDir);

            List<string> options;

            info.data.ForEach((x) => {
                var bytes = x.Base64.Base64ToByte();
                System.IO.File.WriteAllBytes(Path.Combine(inDir, x.Name), bytes);
            });

            options = new List<string>();
            options.Add("--rm");
            options.Add($"-v {inDir}:{info.config.InputDirectory}");
            options.Add($"-v {outDir}:{info.config.OutputDirectory}");
            var optionsString = string.Join(" ", options.ToArray());

            var res = await Docker.RunAsync(info.config.DockerImageName, optionsString, info.config.Parameter);

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
