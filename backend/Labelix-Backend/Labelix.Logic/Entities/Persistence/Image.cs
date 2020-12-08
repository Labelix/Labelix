using Labelix.Contracts.Persistence;
using System.ComponentModel.DataAnnotations.Schema;

namespace Labelix.Logic.Entities.Persistence
{
    partial class Image : IdentityObject, IImage
    {
        public Image() { }
        public Image(string imagePath)
        {
            ImagePath = imagePath;

        }

        public string ImagePath { get; set; }

        [ForeignKey("Project_Id")]
        public int ProjectId { get; set; }
        Project Project { get; set; }
        public void CopyProperties(IImage other)
        {
            Id = other.Id;
            ImagePath = other.ImagePath;
            ProjectId = other.ProjectId;
        }
    }


}
