using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Labelix.WebApi.Controllers
{
    public abstract class GenericController<I, M> : ControllerBase
        where I : Contracts.IIdentifiable
        where M : Transfer.TransferObject, I, Contracts.ICopyable<I>, new()
    {
        protected Contracts.Client.IControllerAccess<I> CreateController()
        {
            return Logic.Factory.Create<I>();
        }
        protected M ToModel(I entity)
        {
            var result = new M();

            result.CopyProperties(entity);
            return result;
        }

        protected async Task<int> CountAsync()
        {
            using var ctrl = CreateController();

            return await ctrl.CountAsync();
        }
        protected async Task<IEnumerable<M>> GetModelsAsync()
        {
            using var ctrl = CreateController();

            return (await ctrl.GetAllAsync()).ToList().Select(i => ToModel(i));
        }
        protected async Task<IEnumerable<M>> GetPageModelsAsync(int index, int size)
        {
            using var ctrl = CreateController();

            return (await ctrl.GetPageListAsync(index, size)).ToList().Select(i => ToModel(i));
        }
        protected async Task<IEnumerable<M>> QueryPageModelsAsync(string predicate, int index, int size)
        {
            using var ctrl = CreateController();

            return (await ctrl.QueryPageListAsync(predicate, index, size)).ToList().Select(i => ToModel(i));
        }
        protected async Task<M> GetModelByIdAsync(int id)
        {
            using var ctrl = CreateController();

            var entity = (await ctrl.GetByIdAsync(id));
            return ToModel(entity);
        }
        protected async Task<M> CreateModelAsync()
        {
            using var ctrl = CreateController();

            var entity = await ctrl.CreateAsync();
            return ToModel(entity);
        }
        protected async Task<M> InsertModelAsync(M model)
        {
            if (model.Id != 0) model.Id = 0;
            using var ctrl = CreateController();

            var entity = await ctrl.InsertAsync(model);

            await ctrl.SaveChangesAsync();
            return ToModel(entity);
        }
        protected async Task<M> UpdateModelAsync(M model)
        {
            using var ctrl = CreateController();

            var entity = await ctrl.UpdateAsync(model);

            await ctrl.SaveChangesAsync();
            return ToModel(entity);
        }
        protected async Task DeleteModelAsync(int id)
        {
            using var ctrl = CreateController();

            await ctrl.DeleteAsync(id);
            await ctrl.SaveChangesAsync();
        }
    }
}
