using Labelix.Contracts.Persistence;
using Labelix.Logic.DataContext;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Persistence
{
    internal class ProjectController : GenericController<IProject, Project>
    {
        public ProjectController(ControllerObject controller) : base(controller)
        {
        }

        public ProjectController(IContext context) : base(context)
        {
        }
    }
}