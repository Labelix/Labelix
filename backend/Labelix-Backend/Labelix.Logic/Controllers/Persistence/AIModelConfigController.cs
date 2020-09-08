namespace Labelix.Logic.Controllers.Persistence
{
    sealed class AIModelConfigController : GenericController<Contracts.Persistence.IAIModelConfig, Entities.Persistence.AIModelConfig>
    {
        public AIModelConfigController(ControllerObject controller) : base(controller)
        {
        }

        public AIModelConfigController(DataContext.IContext context) : base(context)
        {
        }
    }
}
