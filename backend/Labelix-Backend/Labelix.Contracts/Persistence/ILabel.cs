namespace Labelix.Contracts.Persistence
{
    public interface ILabel : IIdentifiable, ICopyable<ILabel>
    {
        string Name { get; set; }
        string Color { get; set; }
    }
}