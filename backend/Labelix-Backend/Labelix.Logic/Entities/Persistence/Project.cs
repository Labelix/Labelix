using Labelix.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Logic.Entities.Persistence
{
    class Project : IdentityObject, IProject
    {
        public Project() { }

        public Project(string name, string description)
        {
            Name = name;
            Description = description;
        }
        public string Name { get; set; }
        public string Description { get; set; }

        public void CopyProperties(IProject other)
        {
            Name = other.Name;
            Description = other.Description;
        }
    }
}
