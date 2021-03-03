using System.ComponentModel.DataAnnotations.Schema;
using Labelix.Contracts.Persistence;

namespace Labelix.Logic.Entities.Persistence
{
    internal class Image : IdentityObject, IImage
    {
        public Image()
        {
        }

        public Image(string imagePath)
        {
            ImagePath = imagePath;
        }

        private Project Project { get; set; }

        public string ImagePath { get; set; }
        public double Height { get; set; }
        public double Width { get; set; }

        [ForeignKey("Project_Id")] public int ProjectId { get; set; }

        public void CopyProperties(IImage other)
        {
            Id = other.Id;
            ImagePath = other.ImagePath;
            ProjectId = other.ProjectId;
            Width = other.Width;
            Height = other.Height;
        }
    }
}