using Labelix.Contracts.Persistence;
using Labelix.Logic.DataContext;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Persistence
{
    internal sealed class AIModelConfigController : GenericController<IAIModelConfig, AIModelConfig>
    {
        public AIModelConfigController(ControllerObject controller) : base(controller)
        {
        }

        public AIModelConfigController(IContext context) : base(context)
        {
        }
    }
}