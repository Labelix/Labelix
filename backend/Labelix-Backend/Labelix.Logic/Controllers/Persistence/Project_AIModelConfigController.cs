using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Logic.Controllers.Persistence
{
    class Project_AIModelConfigController : GenericController<Contracts.Persistence.IProject_AIModelConfig, Entities.Persistence.Project_AIModelConfig>
    {
        public Project_AIModelConfigController(ControllerObject controller) : base(controller)
        {
        }

        public Project_AIModelConfigController(DataContext.IContext context) : base(context)
        {
        }
    }
}

