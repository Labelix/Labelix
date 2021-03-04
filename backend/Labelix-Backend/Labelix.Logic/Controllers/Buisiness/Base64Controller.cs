using CommonBase.Extensions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Labelix.Contracts.Client;
using Labelix.Contracts.Persistence;
using Labelix.Logic.Controllers.Persistence;
using Labelix.Logic.Entities.Business;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Buisiness
{
    internal static class Base64Controller
    {
        private static IControllerAccess<IProject> projectController = Factory.Create<IProject>();
        private static IControllerAccess<IImage> imageController = Factory.Create<IImage>();

        #region CRUD

        public static async Task<IImage> ImageUploadAsync(IData data)
        {
            try
            {
                data = GetBase64OutOfXML(data);
                var bytes = data.Base64.Base64ToByte();
                IProject project = await projectController.GetByIdAsync(data.ProjectId);
                Image image = new Image();
                image.Width = data.Width;
                image.Height = data.Height;

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
                await imageController.InsertAsync(image);
                await imageController.SaveChangesAsync();
                return image;
            }
            catch (Exception er)
            {
                Console.WriteLine(er.ToString());
                return null;
            }
        }

        public static async Task<string> CocoUploadAsync(IData data)
        {
            try
            {
                IProject project = await projectController.GetByIdAsync(data.ProjectId);
                if (data.Format == "")
                {
                    data.Format = "Coco";
                }
                if (data.Name == "")
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
                string label_path = $"{dir_path}/{project.Name}.json";
                System.IO.File.WriteAllText(label_path, data.Base64);
                return label_path;
            }
            catch (Exception er)
            {
                Console.WriteLine(er.ToString());
                return "";
            }
        }

        public static async Task<IData> GetPictureByIdAsync(int id)
        {
            IImage image = await imageController.GetByIdAsync(id);
            byte[] bytes = System.IO.File.ReadAllBytes(image.ImagePath);
            string base64 = bytes.ImageToBase64();
            string[] pathParts = image.ImagePath.Split('/');
            IData data = new Data
            {
                Id = id,
                Base64 = base64,
                Name = pathParts[^1],
                ProjectId = image.ProjectId,
                Width = image.Width,
                Height = image.Height
            };
            data.Format = data.Name.Split('.')[1];
            return GetXMLOfBase(data);
        }

        public static IData GetPictureAsync(IImage image)
        {
            byte[] bytes = System.IO.File.ReadAllBytes(image.ImagePath);
            string base64 = bytes.ImageToBase64();
            string[] pathParts = image.ImagePath.Split('/');
            IData data = new Data
            {
                Id = image.Id,
                Base64 = base64,
                Name = pathParts[^1],
                ProjectId = image.ProjectId,
                Width = image.Width,
                Height = image.Height
            };
            data.Format = data.Name.Split('.')[1];
            return GetXMLOfBase(data);
        }

        public static async Task RemoveImageAsync(int id)
        {
            var image = await imageController.GetByIdAsync(id);
            File.Delete(image.ImagePath);
            await imageController.SaveChangesAsync();
        }
        public static async Task RemoveImageAsync(IData data)
        {
            IProject project = await projectController.GetByIdAsync(data.ProjectId);
            string img_path = $"./Ressources/Images/{project.Id}_{project.Name}/{data.Name}";
            await imageController.DeleteAsync(data.Id);
            System.IO.File.Delete(img_path);
            await imageController.SaveChangesAsync();
        }

        #endregion

        #region Converter

        //Reads Base64Code and Image Format out of XML
        private static IData GetBase64OutOfXML(IData data)
        {
            string[] text = data.Base64.Split(';');
            data.Base64 = text[1].Split(',')[1];
            data.Format = text[0].Split('/')[1];
            return data;
        }
        //Sets the base64 to xml variant
        private static IData GetXMLOfBase(IData data)
        {
            data.Base64 = $"data:image/{data.Format};base64,{data.Base64}";
            return data;
        }

        #endregion

    }


}