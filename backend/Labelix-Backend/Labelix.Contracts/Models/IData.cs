namespace Labelix.Contracts.Persistence
{
    public interface IData
    {
        public string Name { get; set; }
        public string Format { get; set; }
        public string Base64 { get; set; }
    }
}
