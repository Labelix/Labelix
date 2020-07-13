using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Labelix.DockerUtils;
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
            return DockerUtils.DockerUtils.DockerRun(config.DockerImageName, config.Parameter);
        }

    }
}
