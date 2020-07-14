﻿using CommonBase.Extensions;
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
        public async static Task<int> DockerRunAsync(string image, string options = "", string command = "", string arguments = "") 
        {
            var res =  await ProcessHelper.RunProcessAsync(@"C:/Program Files/Docker/Docker/resources/bin/docker.exe", $"run {options} {image} {command} {arguments}");
            return res.Item1;
        }

        public static int DockerRun(string image, string options = "", string command = "", string arguments = "") {
            return DockerRunAsync(image, options, command, arguments).Result;
        }

        public static Task<(int, string)> DockerPsAsync()
        {
            return ProcessHelper.RunProcessAsync("docker", $"ps");
        }

        public static (int, string) DockerPs()
        {
            return DockerPsAsync().Result;
        }
    }
}
