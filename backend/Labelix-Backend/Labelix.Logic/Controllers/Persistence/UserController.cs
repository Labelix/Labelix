using Labelix.Contracts.Persistence;
using Labelix.Logic.DataContext;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Persistence
{
    internal class UserController : GenericController<IUser, User>
    {
        public UserController(IContext context) : base(context)
        {
        }

        public UserController(ControllerObject controllerObject) : base(controllerObject)
        {
        }
    }
}