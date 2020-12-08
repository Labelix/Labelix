namespace Labelix.Logic.Controllers.Persistence
{
    class LabelController : GenericController<Contracts.Persistence.ILabel, Entities.Persistence.Label>
    {
        public LabelController(ControllerObject controller) : base(controller)
        {
        }

        public LabelController(DataContext.IContext context) : base(context)
        {
        }
    }
}
