using Labelix.Contracts.Persistence;

namespace Labelix.Logic.Entities.Persistence
{
    class Label : IdentityObject, ILabel
    {
        public Label(string name, string color)
        {
            Name = name;
            Color = color;
        }
        public string Name { get; set; }
        public string Color { get; set; }

        public void CopyProperties(ILabel other)
        {
            Name = other.Name;
            Color = other.Color;
        }
    }
}
