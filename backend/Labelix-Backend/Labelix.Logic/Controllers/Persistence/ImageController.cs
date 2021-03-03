using Labelix.Contracts.Persistence;
using Labelix.Logic.DataContext;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.Controllers.Persistence
{
    internal sealed class ImageController : GenericController<IImage, Image>
    {
        public ImageController(ControllerObject controller) : base(controller)
        {
        }

        public ImageController(IContext context) : base(context)
        {
        }
    }
}