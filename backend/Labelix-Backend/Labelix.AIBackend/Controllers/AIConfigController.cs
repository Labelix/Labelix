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

        [HttpGet]
        public string Get()
        {
            return $"Controller works!";
        }

        [HttpPost]
        public AIConfig Post([System.Web.Http.FromBody] AIConfig config)
        {
            System.Diagnostics.Debug.WriteLine(config);

            var processInfo = new ProcessStartInfo("docker.exe", $"run -it --rm hello-world");

            processInfo.CreateNoWindow = false;
            processInfo.UseShellExecute = false;
            //processInfo.RedirectStandardOutput = true;
            //processInfo.RedirectStandardError = true;

            int exitCode;
            using var process = new Process();

                process.StartInfo = processInfo;
                // process.OutputDataReceived += new DataReceivedEventHandler(logOrWhatever());
                // process.ErrorDataReceived += new DataReceivedEventHandler(logOrWhatever());

                process.Start();

                process.WaitForExit();
            exitCode = process.ExitCode;
            



            return config;
        }

    }
}
