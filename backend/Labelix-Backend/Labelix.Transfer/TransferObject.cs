using Labelix.Contracts;

namespace Labelix.Transfer
{
    public class TransferObject : IIdentifiable
    {
        public byte[] Timestamp { get; set; }
        public int Id { get; set; }
    }
}