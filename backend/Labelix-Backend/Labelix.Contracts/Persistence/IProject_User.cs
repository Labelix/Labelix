namespace Labelix.Contracts.Persistence
{
    public interface IProject_User : IIdentifiable, ICopyable<IProject_User>
    {
        public int ProjectKey { get; set; }
        public int UserIdKey { get; set; }
    }
}