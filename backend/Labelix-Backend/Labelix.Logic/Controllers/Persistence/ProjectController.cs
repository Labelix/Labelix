using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Logic.Controllers.Persistence
{
    class ProjectController : GenericController<Contracts.Persistence.IProject, Entities.Persistence.Project>
    {
        public ProjectController(ControllerObject controller) : base(controller)
        {
        }

        public ProjectController(DataContext.IContext context) : base(context)
        {
        }
    }
}
