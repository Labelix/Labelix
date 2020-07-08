using Labelix.Contracts.Persistence;
using System;
using System.Collections.Generic;

namespace Labelix.Logic.Entities.Persistence
{
    class Project : IdentityObject, IProject
    {
        public Project() { }

        public Project(string name, string description, DateTime creationDate, bool finishedAnnotation, ICollection<IImage> images, ICollection<ILabel> labels)
        {
            Name = name;
            Description = description;
            CreationDate = creationDate;
            FinishedAnnotation = finishedAnnotation;
            ListOfImages = images;
            ListOfLabel = labels;
        }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public bool FinishedAnnotation { get; set; }
        public ICollection<IImage> ListOfImages { get; set; }
        public ICollection<ILabel> ListOfLabel { get; set; }

        public void CopyProperties(IProject other)
        {
            Name = other.Name;
            Description = other.Description;
            CreationDate = other.CreationDate;
            FinishedAnnotation = other.FinishedAnnotation;
            ListOfImages = other.ListOfImages;
            ListOfLabel = other.ListOfLabel;
        }
    }
}
