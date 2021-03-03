namespace Labelix.Contracts.Persistence
{
    public interface IData : IIdentifiable
    {
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string Format { get; set; }
        public string Base64 { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
    }
}
