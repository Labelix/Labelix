using System;
using System.Reflection;
using CommonBase.Extensions;
using CommonBase.Security;
using Labelix.Logic.DataContext;

namespace Labelix.Logic.Controllers
{
    internal abstract class ControllerObject : IDisposable
    {
        private readonly bool contextDispose;

        protected ControllerObject(IContext context)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));

            Context = context;
            contextDispose = true;
        }

        protected ControllerObject(ControllerObject controller)
        {
            if (controller == null)
                throw new ArgumentNullException(nameof(controller));

            Context = controller.Context;
            contextDispose = false;
        }

        protected IContext Context { get; private set; }

        protected virtual void CheckAuthorization(Type instanceType, MethodBase methodeBase)
        {
            instanceType.CheckArgument(nameof(instanceType));
            methodeBase.CheckArgument(nameof(methodeBase));

            var handled = false;

            BeforeCheckAuthorization(instanceType, methodeBase, ref handled);
            if (handled == false)
            {
                var authorizeAttribute = methodeBase.GetCustomAttribute<AuthorizeAttribute>();

                authorizeAttribute = authorizeAttribute ?? instanceType.GetCustomAttribute<AuthorizeAttribute>();

                if (authorizeAttribute != null) CheckAuthorizeAttribute(authorizeAttribute);
            }

            AfterCheckAuthorization(instanceType, methodeBase);
        }

        private void BeforeCheckAuthorization(Type instanceType, MethodBase methodeBase, ref bool handled)
        {
            throw new NotImplementedException();
        }

        private void AfterCheckAuthorization(Type instanceType, MethodBase methodeBase)
        {
            throw new NotImplementedException();
        }

        public virtual void CheckAuthorizeAttribute(AuthorizeAttribute authorizeAttribute)
        {
            authorizeAttribute.CheckArgument(nameof(authorizeAttribute));

            var handled = false;

            BeforeAuthorizeAttribute(authorizeAttribute, ref handled);
            if (handled == false)
            {
            }

            AfterAuthorizeAttribute(authorizeAttribute);
        }

        private void BeforeAuthorizeAttribute(AuthorizeAttribute authorizeAttribute, ref bool handled)
        {
            throw new NotImplementedException();
        }

        private void AfterAuthorizeAttribute(AuthorizeAttribute authorizeAttribute)
        {
            throw new NotImplementedException();
        }

        #region IDisposable Support

        private bool disposedValue; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                    // TODO: dispose managed state (managed objects).
                    if (contextDispose && Context != null)
                        Context.Dispose();

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.
                Context = null;
                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~ControllerObject()
        // {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }

        #endregion
    }
}