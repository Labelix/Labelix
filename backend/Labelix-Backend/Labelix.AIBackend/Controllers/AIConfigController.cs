﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CommonBase.Extensions;
using CommonBase.Helpers;
using DockerAccess;
using Labelix.Transfer.Modules;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> PostAsync([FromBody] AILabelingInfo info)
        {
            string tempPath, tempDir;
            tempPath = Path.GetTempPath();

            // Remove Base64 header that might be added by the fronted creating the Base64 code         
            info.data.ForEach((x) => x.Base64 = x.Base64.Replace("data:image/png;base64,", ""));


            tempDir = PathHelper.GetRandomFileNameSecure(tempPath);
            var (inDir, outDir) = CreateFolders(tempDir);


            info.data.ForEach((x) =>
            {
                var bytes = x.Base64.Base64ToByte();
                System.IO.File.WriteAllBytes(Path.Combine(inDir, x.Name), bytes);
            });

            // Combine options
            List<string> options;

            options = new List<string>();
            options.Add("--rm");
            options.Add(info.config.Options);
            options.Add($"-v {inDir}:{info.config.InputDirectory}");
            options.Add($"-v {outDir}:{info.config.OutputDirectory}");
            var optionsString = string.Join(" ", options.ToArray());

            var res = await Docker.RunAsync(info.config.DockerImageName, optionsString, info.config.Parameter);

            // Open Dolphin (file explorer) for debugging purposes
            // await ProcessHelper.RunProcessAsync("dolphin", $"{inDir} {outDir}");
            
            IActionResult actionResult;

            try
            {
                var filePaths = Directory.GetFiles(outDir);

                var projectId = info.data.First().ProjectId;
                
                var files = filePaths.Select(path => EncodeImage(projectId, path));
                
                actionResult = Ok(await Task.WhenAll(files));

            }
            catch (Exception e)
            {
                actionResult = BadRequest(e.Message);
            }


            // Delete temporaryDirectory and return
            Directory.Delete(tempDir, true);
            return actionResult;
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

        private static async Task<Data> EncodeImage(int projectId, string fileName)
        {
            var file = (await System.IO.File.ReadAllBytesAsync(fileName)).ImageToBase64();
            
            var bmp = new Bitmap(fileName);

            var bytes = bmp.ConvertBitmapToBitmask();
            
            var data = new Data(projectId, Path.GetFileName(fileName), Path.GetExtension(fileName), bytes.ImageToBase64(), bmp.Width, bmp.Height );
            return data;
        }
        #endregion
    }
}