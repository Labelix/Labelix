using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Labelix.Logic;
using Contract = Labelix.Contracts.Persistence.IUser;
using Model = Labelix.Transfer.Persistence.User;
using Labelix.WebApi.Controllers;

namespace Labelix.WebAPI.Controllers
{
    public class UserController : GenericController<Contract, Model>
    {
        public async Task<Contract> GetUserId(string userKeyCloakId)
        {
            var res = (await GetAllWhereAsync(s => s.Keycloak_id == userKeyCloakId)).FirstOrDefault();
            if (res == null)
            {
                return await CreateNewUser(userKeyCloakId);
            }
            else
            {
                return res;
            }
        }

        private async Task<Contract>CreateNewUser(string userKeyCloakId)
        {
            Model model = new Model {Keycloak_id = userKeyCloakId};
            return await InsertModelAsync(model);
        }
    }
}
