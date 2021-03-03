using System.ComponentModel.DataAnnotations.Schema;
using Labelix.Contracts.Persistence;

namespace Labelix.Logic.Entities.Persistence
{
    internal class Label : IdentityObject, ILabel
    {
        public Label()
        {
        }

        public Label(string name, string color)
        {
            Name = name;
            Color = color;
        }

        [ForeignKey("Project_Id")] public int ProjectId { get; set; }

        public Project Project { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }


        public void CopyProperties(ILabel other)
        {
            Id = other.Id;
            Name = other.Name;
            Color = other.Color;
        }
    }
}