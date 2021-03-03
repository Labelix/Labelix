namespace Labelix.Contracts.Persistence
{
    public interface IProject_AIModelConfig : ICopyable<IProject_AIModelConfig>, IIdentifiable
    {
        public int ProjectKey { get; set; }
        public int AIConfigKey { get; set; }
    }
}