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

        [ForeignKey("Project")]
        public int ProjectImageId { get; set; }
        Project Project { get; set; }
        public void CopyProperties(IImage other)
        {
            ImagePath = other.ImagePath;
            
        }
    }


}
