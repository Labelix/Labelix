using Labelix.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Logic.Entities.Persistence
{
    class Project : IdentityObject, IProject
    {
        public Project() { }

        public Project(string name, string description, string a)
        {
            Name = name;
            Description = description;
            A = a;
        }
        public string Name { get; set; }
        public string Description { get; set; }

        public string A { get; set; }

        public void CopyProperties(IProject other)
        {
            Name = other.Name;
            Description = other.Description;
            A = other.A;
        }
    }
}
