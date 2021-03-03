namespace Labelix.Contracts.Persistence
{
    public interface IUser : ICopyable<IUser>, IIdentifiable
    {
        string KeycloakId { get; set; }
    }
}