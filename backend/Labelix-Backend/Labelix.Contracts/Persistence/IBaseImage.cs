namespace Labelix.Contracts.Persistence
{
    public interface IBaseImage : IIdentifiable, ICopyable<IBaseImage>
    {
        string Name { get; set; }
        string EncodedImage { get; set; }
    }
}
