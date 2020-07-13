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
        public const string PATH = @"C:/Program Files/Docker/Docker/resources/bin/docker.exe";


        [HttpGet]
        public string Get()
        {
            return $"Controller works!";
        }

        [HttpPost]
        public int Post([System.Web.Http.FromBody] AIConfig config)
        {
            //var exists = File.Exists(PATH);
            //Debug.WriteLine($"File found: {exists}");

            var processInfo = new ProcessStartInfo(@"C:/Program Files/Docker/Docker/resources/bin/docker.exe", $"run -it --rm {config.DockerImageName} {config.Parameter}");

            processInfo.CreateNoWindow = true;
            processInfo.UseShellExecute = false;
            //processInfo.RedirectStandardOutput = true;
            //processInfo.RedirectStandardError = true;

            int exitCode;
            using var process = new Process();

            process.StartInfo = processInfo;
            //process.OutputDataReceived += new DataReceivedEventHandler(logOrWhatever());
            //process.ErrorDataReceived += new DataReceivedEventHandler(logOrWhatever());

            process.Start();

            process.WaitForExit();
            exitCode = process.ExitCode;




            return exitCode;
        }

    }
}
