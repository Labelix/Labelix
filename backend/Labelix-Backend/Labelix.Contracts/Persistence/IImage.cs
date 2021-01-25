namespace Labelix.Contracts.Persistence
{
    public interface IImage : IIdentifiable, ICopyable<IImage>
    {
        string ImagePath { get; set; }
        double Height { get; set; }
        double Width { get; set; }
        int ProjectId { get; set; }
    }
}