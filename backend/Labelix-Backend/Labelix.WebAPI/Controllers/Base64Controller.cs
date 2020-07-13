using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using CommonBase.Extensions;
using Labelix.WebAPI.Modules;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Labelix.WebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Base64Controller : ControllerBase
    {
        [HttpPost("UploadImage")]
        public HttpResponseMessage ImageUpload(Data data)
        {
            try
            {
                var bytes = ImageExtensions.Base64ToByte(data.Base64);
                System.IO.File.WriteAllBytes($"./Resources/Images/{data.Name}.{data.Format}", bytes);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch(Exception er)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
            
        }
    }


}