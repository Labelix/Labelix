using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using CommonBase.Extensions;
using Labelix.Transfer.Modules;
using Labelix.Transfer.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Labelix.WebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Base64Controller : ControllerBase
    {
        public ImageController imageController = new ImageController();

        [HttpPost("UploadImage")]
        public async Task<HttpResponseMessage> ImageUploadAsync(Data data)
        {
            try
            {
                var bytes = ImageExtensions.Base64ToByte(data.Base64);

                Image image = new Image();
                if (!System.IO.File.Exists($"./Resources/Images/{data.Name}.{data.Format}"))
                {
                    image.ImagePath = $"./Resources/Images/{data.Name}.{data.Format}";
                    await imageController.PostAsync(image);
                }
                System.IO.File.WriteAllBytes($"./Resources/Images/{data.Name}.{data.Format}", bytes);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception er)
            {
                Console.WriteLine(er.ToString());
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }



        }

        [HttpPost("UploadCoco")]
        public HttpResponseMessage CocoUpload(Data data)
        {
            try
            {
                System.IO.File.WriteAllText($"./Resources/LabeldImages/{data.Name}.json", data.Base64);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception er)
            {
                Console.WriteLine(er.ToString());
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }
    }


}