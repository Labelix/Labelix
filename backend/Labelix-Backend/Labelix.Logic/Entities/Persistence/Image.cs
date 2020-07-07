using Labelix.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Logic.Entities.Persistence
{
    class Image : IdentityObject, IImage
    {
        public Image (string imagePath, string labeledPath)
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
