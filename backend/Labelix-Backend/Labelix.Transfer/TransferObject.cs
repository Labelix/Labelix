namespace Labelix.Transfer
{
    public class TransferObject : Contracts.IIdentifiable
    {
        public int Id { get; set; }

        public byte[] Timestamp { get; set; }
    }
}
