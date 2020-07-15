using CommonBase.Extensions;
using CommonBase.Helpers;
using Labelix.Transfer.Persistence;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;

namespace DockerAccess
{
    public static partial class Docker
    {
        public async static Task<int> RunAsync(string image, string options = "", string command = "", string arguments = "") 
        {
            var res =  await ProcessHelper.RunProcessAsync("docker", $"run {options} {image} {command} {arguments}");

            return res.Item1;
        }

        public static int Run(string image, string options = "", string command = "", string arguments = "")
        {
            return RunAsync(image, options, command, arguments).Result;
        }

        public async static Task<(int, string)> PsAsync()
        {
            var (err, stdout, stderr) = await ProcessHelper.RunProcessAsync("docker", $"ps");
            return (err, await stdout.ReadToEndAsync());
        }

        public static (int, string) Ps()
        {
            return PsAsync().Result;
        }
    }
}
