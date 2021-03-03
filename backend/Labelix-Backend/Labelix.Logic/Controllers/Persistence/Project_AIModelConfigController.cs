using Labelix.Contracts.Persistence;
using Labelix.Logic.DataContext;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Persistence
{
    internal class Project_AIModelConfigController : GenericController<IProject_AIModelConfig, Project_AIModelConfig>
    {
        public Project_AIModelConfigController(ControllerObject controller) : base(controller)
        {
        }

        public Project_AIModelConfigController(IContext context) : base(context)
        {
        }
    }
}