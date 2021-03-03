using Labelix.Contracts.Persistence;
using Labelix.Logic.DataContext;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Persistence
{
    internal class UserProjectController : GenericController<IProject_User, Project_User>
    {
        public UserProjectController(IContext context) : base(context)
        {
        }

        public UserProjectController(ControllerObject controllerObject) : base(controllerObject)
        {
        }
    }
}