using Labelix.Contracts.Persistence;

namespace Labelix.Transfer.Persistence
{
    class BaseImage : TransferObject, IBaseImage
    {
        public string Name { get; set; }
        public string EncodedImage { get; set; }

        public void CopyProperties(IBaseImage other)
        {
            Name = other.Name;
            EncodedImage = other.EncodedImage;
        }
    }
}
