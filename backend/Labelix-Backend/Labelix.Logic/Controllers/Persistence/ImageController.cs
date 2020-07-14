using Labelix.Contracts.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Labelix.Logic.Controllers.Persistence
{
    sealed class ImageController : GenericController<Contracts.Persistence.IImage, Entities.Persistence.Image>
    {

        public ImageController(ControllerObject controller) : base(controller)
        {
        }

        public ImageController(DataContext.IContext context) : base(context)
        {
        }
    }
}
