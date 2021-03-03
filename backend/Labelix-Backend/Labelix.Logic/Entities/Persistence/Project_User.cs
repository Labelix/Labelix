using Labelix.Contracts.Persistence;

namespace Labelix.Logic.Entities.Persistence
{
    internal class Project_User : IdentityObject, IProject_User
    {
        public void CopyProperties(IProject_User other)
        {
            ProjectKey = other.ProjectKey;
            UserIdKey = other.UserIdKey;
        }

        public int ProjectKey { get; set; }
        public int UserIdKey { get; set; }
    }
}