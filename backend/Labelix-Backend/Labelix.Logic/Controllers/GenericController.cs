using CommonBase.Extensions;
using Labelix.Contracts.Client;
using Labelix.Logic.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Reflection;
using System.Threading.Tasks;

namespace Labelix.Logic.Controllers
{
    /// <inheritdoc cref="IControllerAccess{T}"/>
    /// <summary>
    /// This generic class implements the base properties and operations defined in the interface. 
    /// </summary>
    /// <typeparam name="E">The entity type of element in the controller.</typeparam>
    /// <typeparam name="I">The interface type which implements the entity.</typeparam>
    internal abstract partial class GenericController<I, E> : ControllerObject, IControllerAccess<I>
        where I : Contracts.IIdentifiable
        where E : Entities.IdentityObject, I, Contracts.ICopyable<I>, new()
    {
        public int MaxPageSize => 500;

        protected IEnumerable<E> Set() => Context.Set<I, E>();

        protected GenericController(IContext context)
            : base(context)
        {

        }
        protected GenericController(ControllerObject controllerObject)
            : base(controllerObject)
        {
        }

        #region Async-Methods
        public Task<int> CountAsync()
        {
            CheckAuthorization(GetType(), MethodBase.GetCurrentMethod());

            return Context.CountAsync<I, E>();
        }
        public virtual Task<I> GetByIdAsync(int id)
        {
            CheckAuthorization(GetType(), MethodBase.GetCurrentMethod());

            return Task.Run<I>(() => Set().SingleOrDefault(i => i.Id == id));
        }
        public async virtual Task<IEnumerable<I>> GetAllAsync()
        {
            CheckAuthorization(GetType(), MethodBase.GetCurrentMethod());

            int idx = 0;
            List<I> result = new List<I>();
            int qryCount;

            do
            {
                var qry = await GetPageListAsync(idx++, MaxPageSize).ConfigureAwait(false);

                qryCount = qry.Count();
                result.AddRange(qry);
            } while (qryCount == MaxPageSize);
            return result;
        }
        public virtual Task<IEnumerable<I>> GetPageListAsync(int pageIndex, int pageSize)
        {
            CheckAuthorization(GetType(), MethodBase.GetCurrentMethod());

            if (pageSize < 1 && pageSize > MaxPageSize)
                throw new Exception("Invalide");

            return Task.Run<IEnumerable<I>>(() =>
                Set().Skip(pageIndex * pageSize)
                     .Take(pageSize));
        }
        public virtual Task<IEnumerable<I>> QueryPageListAsync(string predicate, int pageIndex, int pageSize)
        {
            CheckAuthorization(GetType(), MethodBase.GetCurrentMethod());

            if (pageSize < 1 && pageSize > MaxPageSize)
                throw new Exception("Invalide");

            return Task.Run<IEnumerable<I>>(() =>
                Set().AsQueryable()
                     .Where(predicate)
                     .Skip(pageIndex * pageSize)
                     .Take(pageSize));
        }
        public virtual Task<I> CreateAsync()
        {
            CheckAuthorization(GetType(), MethodBase.GetCurrentMethod());

            return Task.Run<I>(() => new E());
        }

        protected virtual Task BeforeInsertingAsync(E entity)
        {
            CheckAuthorization(GetType(), MethodBase.GetCurrentMethod());

            return Task.FromResult(0);
        }
        public virtual Task<I> InsertAsync(I entity)
        {
            CheckAuthorization(GetType(), MethodBase.GetCurrentMethod());

            entity.CheckArgument(nameof(entity));

            var entityModel = new E();

            entityModel.CopyProperties(entity);
            return InsertAsync(entityModel);
        }
        public virtual async Task<I> InsertAsync(E entity)
        {
            CheckAuthorization(GetType(), MethodBase.GetCurrentMethod());

            entity.CheckArgument(nameof(entity));

            await BeforeInsertingAsync(entity);
            var result = await Context.InsertAsync<I, E>(entity);
            await AfterInsertedAsync(result);
            return result;
        }
        protected virtual Task AfterInsertedAsync(E entity)
        {
            return Task.FromResult(0);
        }

        protected virtual Task BeforeUpdatingAsync(E entity)
        {
            return Task.FromResult(0);
        }
        public virtual async Task<I> UpdateAsync(I entity)
        {
            CheckAuthorization(GetType(), MethodBase.GetCurrentMethod());

            entity.CheckArgument(nameof(entity));

            var entityModel = Set().SingleOrDefault(i => i.Id == entity.Id);

            if (entityModel != null)
            {
                entityModel.CopyProperties(entity);
                var result = await UpdateAsync(entityModel);
                return result;
            }
            else
            {
                throw new Exception("Entity can't find!");
            }
        }
        public virtual async Task<I> UpdateAsync(E entity)
        {
            CheckAuthorization(GetType(), MethodBase.GetCurrentMethod());

            entity.CheckArgument(nameof(entity));

            await BeforeUpdatingAsync(entity);
            var result = await Context.UpdateAsync<I, E>(entity);
            await AfterUpdatedAsync(entity);
            return result;
        }
        protected virtual Task AfterUpdatedAsync(E entity)
        {
            return Task.FromResult(0);
        }

        protected virtual Task BeforeDeletingAsync(int id)
        {
            return Task.FromResult(0);
        }
        public async Task DeleteAsync(int id)
        {
            CheckAuthorization(GetType(), MethodBase.GetCurrentMethod());

            await BeforeDeletingAsync(id);
            var item = await Context.DeleteAsync<I, E>(id);

            if (item != null)
            {
                await AfterDeletedAsync(item);
            }
        }
        protected virtual Task AfterDeletedAsync(E entity)
        {
            return Task.FromResult(0);
        }

        public Task SaveChangesAsync()
        {
            CheckAuthorization(GetType(), MethodBase.GetCurrentMethod());

            return Context.SaveAsync();
        }
        #endregion Async-Methods

        #region Internal-Methods
        internal virtual Task<IEnumerable<E>> QueryAsync(Func<E, bool> predicate)
        {
            return Task.Run(() => Set().Where(predicate));
        }
        internal virtual Task<IEnumerable<E>> QueryAsync(string predicate, int pageIndex, int pageSize)
        {
            if (pageSize < 1 && pageSize > MaxPageSize)
                throw new Exception("Invalide");

            return Task.Run<IEnumerable<E>>(() =>
                Set().AsQueryable()
                     .Where(predicate)
                     .Skip(pageIndex * pageSize)
                     .Take(pageSize));
        }
        #endregion Internal-Methods
    }
}
