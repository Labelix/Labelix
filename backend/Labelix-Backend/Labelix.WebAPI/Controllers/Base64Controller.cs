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
    [Route("api/[controller]")]
    [ApiController]
    public class Base64Controller : ControllerBase
    {
        public ImageController imageController = new ImageController();
        public ProjectController projectController = new ProjectController();

        [HttpPost("UploadImage")]
        public async Task<IActionResult> ImageUploadAsync(Data data)
        {
            try
            {
                data = GetBase64OutOfXML(data);
                var bytes = data.Base64.Base64ToByte();
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
                string img_path = $"./Ressources/Images/{project.Id}_{project.Name}/{data.Name}";
                if (!System.IO.File.Exists(img_path))
                {
                    image.ImagePath = img_path;
                    image.ProjectImageId = data.ProjectId;
                    await imageController.PostAsync(image);
                }

                //the image is saved
                System.IO.File.WriteAllBytes(img_path, bytes);
                return Ok();
            }
            catch (Exception er)
            {
                Console.WriteLine(er.ToString());
                return BadRequest();
            }
        }

        //Reads Base64Code and Image Format out of XML
        private Data GetBase64OutOfXML(Data data)
        {
            string[] text = data.Base64.Split(';');
            data.Base64 = text[1].Split(',')[1];
            data.Format = text[0].Split('/')[1];
            return data;
        }

        //Sets the base64 to xml variant
        private Data GetXMLOfBase(Data data)
        {
            data.Base64 = $"data:image/{data.Format};base64,{data.Base64}";
            return data;
        }

        [HttpPost("UploadCoco")]
        public async Task<IActionResult> CocoUploadAsync(Data data)
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

                //Queries whether the label exists 
                //  -if so, it will only be updated
                //  -if no, a database entry is made with the respective path
                string label_path = $"{dir_path}/{data.Name}.json";
                if (!System.IO.File.Exists(label_path))
                {
                    project.LabeledPath = label_path;
                    await projectController.PutAsync(project);
                }
                System.IO.File.WriteAllText(label_path, data.Base64);
                return Ok();
            }
            catch (Exception er)
            {
                Console.WriteLine(er.ToString());
                return BadRequest();
            }
        }
    }


}