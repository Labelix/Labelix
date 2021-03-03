using CommonBase.Extensions;
<<<<<<< HEAD:backend/Labelix-Backend/Labelix.Logic/Controllers/Buisiness/Base64Controller.cs
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
=======
using Labelix.Transfer.Modules;
using Labelix.Transfer.Persistence;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
>>>>>>> parent of 5deac1c... Merge branch 'backend-refactor':backend/Labelix-Backend/Labelix.WebAPI/Controllers/Base64Controller.cs

namespace Labelix.WebAPI.Controllers
{
    public static class Base64Controller
    {
<<<<<<< HEAD:backend/Labelix-Backend/Labelix.Logic/Controllers/Buisiness/Base64Controller.cs
        private static IControllerAccess<IProject> projectController = Factory.Create<IProject>();
        private static IControllerAccess<IImage> imageController = Factory.Create<IImage>();

        #region CRUD

        public static async Task<IImage> ImageUploadAsync(IData data)
=======
        
        public static async Task<Image> ImageUploadAsync(Data data)
>>>>>>> parent of 5deac1c... Merge branch 'backend-refactor':backend/Labelix-Backend/Labelix.WebAPI/Controllers/Base64Controller.cs
        {
            try
            {
                ProjectController projectController = new ProjectController();
                ImageController imageController = new ImageController();
                data = GetBase64OutOfXML(data);
                var bytes = data.Base64.Base64ToByte();
<<<<<<< HEAD:backend/Labelix-Backend/Labelix.Logic/Controllers/Buisiness/Base64Controller.cs
                IProject project = await projectController.GetByIdAsync(data.ProjectId);
=======
                Project project = await projectController.GetAsyncOnlyProject(data.ProjectId);
>>>>>>> parent of 5deac1c... Merge branch 'backend-refactor':backend/Labelix-Backend/Labelix.WebAPI/Controllers/Base64Controller.cs
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
<<<<<<< HEAD:backend/Labelix-Backend/Labelix.Logic/Controllers/Buisiness/Base64Controller.cs
                await imageController.InsertAsync(image);
=======
                await imageController.SetImage(image);
>>>>>>> parent of 5deac1c... Merge branch 'backend-refactor':backend/Labelix-Backend/Labelix.WebAPI/Controllers/Base64Controller.cs
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
<<<<<<< HEAD:backend/Labelix-Backend/Labelix.Logic/Controllers/Buisiness/Base64Controller.cs
                IProject project = await projectController.GetByIdAsync(data.ProjectId);
                if (data.Format == "")
                {
                    data.Format = "Coco";
                }
                if (data.Name == "")
                {
                    data.Name = data.Format;
                }
=======
                await ImageUploadAsync(item);
            }
>>>>>>> parent of 5deac1c... Merge branch 'backend-refactor':backend/Labelix-Backend/Labelix.WebAPI/Controllers/Base64Controller.cs

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

<<<<<<< HEAD:backend/Labelix-Backend/Labelix.Logic/Controllers/Buisiness/Base64Controller.cs
        public static async Task<IData> GetPictureAsync(int id)
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

        public static async Task RemoveImageAsync(int id)
        {
            var image = await imageController.GetByIdAsync(id);
            File.Delete(image.ImagePath);
        }
        public static async Task RemoveImageAsync(IData data)
        {
            IProject project = await projectController.GetByIdAsync(data.ProjectId);
            string img_path = $"./Ressources/Images/{project.Id}_{project.Name}/{data.Name}";
            await imageController.DeleteAsync(data.Id);
            System.IO.File.Delete(img_path);
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


=======
        public static async Task<int> RemoveImageAsync(Data data)
        {
            ProjectController projectController = new ProjectController();
            ImageController imageController = new ImageController();
            Project project = await projectController.GetAsync(data.ProjectId);
            string img_path = $"./Ressources/Images/{project.Id}_{project.Name}/{data.Name}";
            await imageController.DeleteAsync(data.Id);
            System.IO.File.Delete(img_path);
            return 200;
        }
    }


>>>>>>> parent of 5deac1c... Merge branch 'backend-refactor':backend/Labelix-Backend/Labelix.WebAPI/Controllers/Base64Controller.cs
}