using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Logic.Controllers.Persistence
{
    sealed class AIConfigController : GenericController<Contracts.Persistence.IAIConfig, Entities.Persistence.AIConfig>
    {
        public AIConfigController(ControllerObject controller) : base(controller)
        {
        }

        public AIConfigController(DataContext.IContext context) : base(context)
        {
        }
    }
}
