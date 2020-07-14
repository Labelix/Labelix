using CommonBase.Extensions;
using CommonBase.Helpers;
using Labelix.Transfer.Persistence;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;

namespace DockerUtils
{
    public static partial class DockerUtils
    {
        public static Task<int> DockerRunAsync(string image, string options = "", string command = "", string arguments = "") 
        {
            return ProcessHelper.RunProcessAsync(@"C:/Program Files/Docker/Docker/resources/bin/docker.exe", $"run {options} {image} {command} {arguments}");
        }

        public static int DockerRun(string image, string options = "", string command = "", string arguments = "") {
            return DockerRunAsync(image, options, command, arguments).Result;
        }

        //TODO Change parameters of ProcessHelper to tuple where seccond value equals the stdout. 
        //public static Task<(int, string)> DockerPsAsync()
        //{
        //    return ProcessHelper.RunProcessAsync("docker", $"ps");
        //}

        //public static (int, string) DockerPs()
        //{
        //    return DockerPsAsync().Result;
        //}
    }
}
