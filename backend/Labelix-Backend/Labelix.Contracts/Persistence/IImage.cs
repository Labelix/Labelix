namespace Labelix.Contracts.Persistence
{
    public interface IImage : IIdentifiable, ICopyable<IImage>
    {
        string ImagePath { get; set; }
        string LabeledPath { get; set; }
    }
}