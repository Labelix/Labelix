using Labelix.Contracts.Persistence;
using Labelix.Logic.DataContext;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Persistence
{
    internal class LabelController : GenericController<ILabel, Label>
    {
        public LabelController(ControllerObject controller) : base(controller)
        {
        }

        public LabelController(IContext context) : base(context)
        {
        }
    }
}