using Labelix.Contracts.Persistence;
using System.ComponentModel.DataAnnotations.Schema;

namespace Labelix.Logic.Entities.Persistence
{
    class Label : IdentityObject, ILabel
    {
        public Label() { }
        public Label(string name, string color)
        {
            Name = name;
            Color = color;
        }
        public string Name { get; set; }
        public string Color { get; set; }

        [ForeignKey("Project_Id")]
        public int ProjectId { get; set; }
        public Project Project { get; set; }


        public void CopyProperties(ILabel other)
        {
            Id = other.Id;
            Name = other.Name;
            Color = other.Color;
        }
    }
}
