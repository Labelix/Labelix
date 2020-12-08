namespace Labelix.Contracts.Persistence
{
    public interface IImage : IIdentifiable, ICopyable<IImage>
    {
        string ImagePath { get; set; }
        int ProjectId { get; set; }
    }
}