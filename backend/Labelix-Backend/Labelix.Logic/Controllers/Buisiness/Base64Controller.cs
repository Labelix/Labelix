using System;
using System.IO;
using System.Threading.Tasks;
using CommonBase.Extensions;
using Labelix.Contracts.Client;
using Labelix.Contracts.Persistence;
using Labelix.Logic.Entities.Business;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Buisiness
{
    internal static class Base64Controller
    {
        private static readonly IControllerAccess<IProject> projectController = Factory.Create<IProject>();
        private static readonly IControllerAccess<IImage> imageController = Factory.Create<IImage>();

        #region CRUD

        public static async Task<IImage> ImageUploadAsync(IData data)
        {
            try
            {
                data = GetBase64OutOfXML(data);
                var bytes = data.Base64.Base64ToByte();
                var project = await projectController.GetByIdAsync(data.ProjectId);
                var image = new Image();
                image.Width = data.Width;
                image.Height = data.Height;

                //Queries whether the directory (for images) of the respective project exists and creates it if not.
                var dir_path = $"./Ressources/Images/{project.Id}_{project.Name}";
                if (!Directory.Exists(dir_path)) Directory.CreateDirectory(dir_path);

                //Queries whether the image exists 
                //  -if so, it will only be updated
                //  -if no, a database entry is made with the respective path
                var img_path = $"./Ressources/Images/{project.Id}_{project.Name}/{data.Name}";
                if (!File.Exists(img_path))
                {
                    image.ImagePath = img_path;
                    image.ProjectId = data.ProjectId;
                }

                //the image is saved
                await File.WriteAllBytesAsync(img_path, bytes);
                await imageController.InsertAsync(image);
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
                var project = await projectController.GetByIdAsync(data.ProjectId);
                if (data.Format == "") data.Format = "Coco";
                if (data.Name == "") data.Name = data.Format;

                //Queries whether the directory (for labels) of the respective project exists and creates it if not.
                var dir_path = $"./Ressources/Labels/{project.Id}_{project.Name}";
                if (!Directory.Exists(dir_path)) Directory.CreateDirectory(dir_path);

                //Queries whether the label exists 
                //  -if so, it will only be updated
                //  -if no, a database entry is made with the respective path
                var label_path = $"{dir_path}/{data.Name}.json";
                File.WriteAllText(label_path, data.Base64);
                return label_path;
            }
            catch (Exception er)
            {
                Console.WriteLine(er.ToString());
                return "";
            }
        }

        public static async Task<IData> GetPictureAsync(int id)
        {
            var image = await imageController.GetByIdAsync(id);
            var bytes = File.ReadAllBytes(image.ImagePath);
            var base64 = bytes.ImageToBase64();
            var pathParts = image.ImagePath.Split('/');
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

        public static async Task RemoveImageAsync(int id)
        {
            var image = await imageController.GetByIdAsync(id);
            File.Delete(image.ImagePath);
        }

        public static async Task RemoveImageAsync(IData data)
        {
            var project = await projectController.GetByIdAsync(data.ProjectId);
            var img_path = $"./Ressources/Images/{project.Id}_{project.Name}/{data.Name}";
            await imageController.DeleteAsync(data.Id);
            File.Delete(img_path);
        }

        #endregion

        #region Converter

        //Reads Base64Code and Image Format out of XML
        private static IData GetBase64OutOfXML(IData data)
        {
            var text = data.Base64.Split(';');
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