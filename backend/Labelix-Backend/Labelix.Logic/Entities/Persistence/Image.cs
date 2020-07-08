using Labelix.Contracts.Persistence;

namespace Labelix.Logic.Entities.Persistence
{
    partial class Image : IdentityObject, IImage
    {
        public Image() { }
        public Image(string imagePath, string labeledPath)
        {
            ImagePath = imagePath;
            LabeledPath = labeledPath;
        }

        public string ImagePath { get; set; }
        public string LabeledPath { get; set; }

        public void CopyProperties(IImage other)
        {
            ImagePath = other.ImagePath;
            LabeledPath = other.LabeledPath;
        }
    }


}
