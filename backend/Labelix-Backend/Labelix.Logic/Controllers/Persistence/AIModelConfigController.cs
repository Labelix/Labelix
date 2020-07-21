namespace Labelix.Logic.Controllers.Persistence
{
    sealed class AIConfigController : GenericController<Contracts.Persistence.IAIModelConfig, Entities.Persistence.AIConfig>
    {
        public AIConfigController(ControllerObject controller) : base(controller)
        {
        }

        public AIConfigController(DataContext.IContext context) : base(context)
        {
        }
    }
}
