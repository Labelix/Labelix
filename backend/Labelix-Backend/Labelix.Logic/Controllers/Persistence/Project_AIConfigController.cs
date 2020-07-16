using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Logic.Controllers.Persistence
{
    class Project_AIConfigController : GenericController<Contracts.Persistence.IProject_AIConfig, Entities.Persistence.Project_AIConfig>
    {
        public Project_AIConfigController(ControllerObject controller) : base(controller)
        {
        }

        public Project_AIConfigController(DataContext.IContext context) : base(context)
        {
        }
    }
}

