using Labelix.Contracts.Persistence;
using System;
using System.Collections.Generic;

namespace Labelix.Logic.Entities.Persistence
{
    class Project : IdentityObject, IProject
    {
        public Project() { }

        public Project(string name, string description, DateTime creationDate, bool finishedAnnotation, ICollection<Image> images, ICollection<Label> labels, string labeledPath)
        {
            Name = name;
            Description = description;
            CreationDate = creationDate;
            FinishedAnnotation = finishedAnnotation;
            ListOfImages = images;
            ListOfLabel = labels;
            LabeledPath = labeledPath;
        }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public bool FinishedAnnotation { get; set; }
        public string LabeledPath { get; set; }
        public ICollection<Image> ListOfImages { get; set; }
        public ICollection<Label> ListOfLabel { get; set; }
        public ICollection<Project_AIModelConfig> AIConfigs { get; set; }

        public void CopyProperties(IProject other)
        {
            Id = other.Id;
            Name = other.Name;
            Description = other.Description;
            CreationDate = other.CreationDate;
            FinishedAnnotation = other.FinishedAnnotation;
            LabeledPath = other.LabeledPath;
        }
    }
}
