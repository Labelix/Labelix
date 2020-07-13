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
        public ProjectController projectController = new ProjectController();

        [HttpPost("UploadImage")]
        public async Task<HttpResponseMessage> ImageUploadAsync(Data data)
        {
            try
            {
                var bytes = ImageExtensions.Base64ToByte(data.Base64);
                Project project = await projectController.GetAsync(data.ProjectId);
                Image image = new Image();

                //Queries whether the directory (for images) of the respective project exists and creates it if not.
                string dir_path = $"./Ressources/Images/{project.Id}_{project.Name}";
                if (!System.IO.Directory.Exists(dir_path))
                {
                    System.IO.Directory.CreateDirectory(dir_path);
                }

                //Queries whether the image exists 
                //  -if so, it will only be updated
                //  -if no, a database entry is made with the respective path
                string img_path = $"./Ressources/Images/{project.Id}_{project.Name}/{data.Name}.{data.Format}";
                if (!System.IO.File.Exists(img_path))
                {
                    image.ImagePath = img_path;
                    image.ProjectImageId = data.ProjectId;
                    await imageController.PostAsync(image);
                }

                //the image is saved
                System.IO.File.WriteAllBytes(img_path, bytes);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception er)
            {
                Console.WriteLine(er.ToString());
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }



        }

        [HttpPost("UploadCoco")]
        public async Task<HttpResponseMessage> CocoUploadAsync(Data data)
        {
            try
            {
                Project project = await projectController.GetAsync(data.ProjectId);

                //Queries whether the directory (for labels) of the respective project exists and creates it if not.
                string dir_path = $"./Ressources/Labels/{project.Id}_{project.Name}";
                if (!System.IO.Directory.Exists(dir_path))
                {
                    System.IO.Directory.CreateDirectory(dir_path);
                }

                //Queries whether the image exists 
                //  -if so, it will only be updated
                //  -if no, a database entry is made with the respective path
                string label_path = $"{dir_path}/{data.Name}.json";
                if (!System.IO.File.Exists(label_path))
                {
                    project.LabeledPath = label_path;
                    await projectController.PutAsync(project);
                }
                System.IO.File.WriteAllText(label_path, data.Base64);
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