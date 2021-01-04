using System;
using System.Collections.Generic;
using System.Text;
using Labelix.Contracts.Persistence;
using Labelix.Logic.DataContext;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Persistence
{
    class UserProjectController : GenericController<IProject_User, Project_User>
    {
        public UserProjectController(IContext context) : base(context)
        {
        }

        public UserProjectController(ControllerObject controllerObject) : base(controllerObject)
        {
        }
    }
}
