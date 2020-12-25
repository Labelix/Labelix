using CommonBase.Extensions;
using Labelix.Transfer.Modules;
using Labelix.Transfer.Persistence;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Labelix.WebAPI.Controllers
{
    public static class Base64Controller
    {
        
        public static async Task<Image> ImageUploadAsync(Data data)
        {
            try
            {
                ProjectController projectController = new ProjectController();
                ImageController imageController = new ImageController();
                data = GetBase64OutOfXML(data);
                var bytes = data.Base64.Base64ToByte();
                Project project = await projectController.GetAsyncOnlyProject(data.ProjectId);
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
                    image.ProjectId = data.ProjectId;
                }
                
                //the image is saved
                await System.IO.File.WriteAllBytesAsync(img_path, bytes);
                await imageController.SetImage(image);
                return image;
            }
            catch (Exception er)
            {
                Console.WriteLine(er.ToString());
                return null;
            }
        }

        public static async Task MultipleImageUpload(MultipleData datas)
        {
            foreach (var item in datas.Data)
            {
                await ImageUploadAsync(item);
            }

        }
        
        //Reads Base64Code and Image Format out of XML
        private static Data GetBase64OutOfXML(Data data)
        {
            string[] text = data.Base64.Split(';');
            data.Base64 = text[1].Split(',')[1];
            data.Format = text[0].Split('/')[1];
            return data;
        }

        public static async Task<string> CocoUploadAsync(Data data)
        {
            ProjectController projectController = new ProjectController();
            try
            {
                Project project = await projectController.GetAsync(data.ProjectId);
                if (data.Format == "")
                {
                    data.Format = "Coco";
                }
                if(data.Name == "")
                {
                    data.Name = data.Format;
                }
                
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
                System.IO.File.WriteAllText(label_path, data.Base64);
                return label_path;
            }
            catch (Exception er)
            {
                Console.WriteLine(er.ToString());
                return "";
            }
        }

        public static async Task<int> RemoveImageAsync(Data data)
        {
            ProjectController projectController = new ProjectController();
            ImageController imageController = new ImageController();
            Project project = await projectController.GetAsync(data.ProjectId);
            string img_path = $"./Ressources/Images/{project.Id}_{project.Name}/{data.Name}";
            imageController.DeleteAsync(data.Id);
            System.IO.File.Delete(img_path);
            return 200;
        }
    }


}