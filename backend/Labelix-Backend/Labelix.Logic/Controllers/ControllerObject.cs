using CommonBase.Extensions;
using CommonBase.Security;
using Labelix.Logic.DataContext;
using System;
using System.Reflection;

namespace Labelix.Logic.Controllers
{
    internal abstract partial class ControllerObject : IDisposable
    {
        private bool contextDispose;
        protected IContext Context { get; private set; }

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

        protected virtual void CheckAuthorization(Type instanceType, MethodBase methodeBase)
        {
            instanceType.CheckArgument(nameof(instanceType));
            methodeBase.CheckArgument(nameof(methodeBase));

            bool handled = false;

            BeforeCheckAuthorization(instanceType, methodeBase, ref handled);
            if (handled == false)
            {
                var authorizeAttribute = methodeBase.GetCustomAttribute<AuthorizeAttribute>();

                authorizeAttribute = authorizeAttribute ?? instanceType.GetCustomAttribute<AuthorizeAttribute>();

                if (authorizeAttribute != null)
                {
                    CheckAuthorizeAttribute(authorizeAttribute);
                }
            }
            AfterCheckAuthorization(instanceType, methodeBase);
        }

        partial void BeforeCheckAuthorization(Type instanceType, MethodBase methodeBase, ref bool handled);
        partial void AfterCheckAuthorization(Type instanceType, MethodBase methodeBase);

        public virtual void CheckAuthorizeAttribute(AuthorizeAttribute authorizeAttribute)
        {
            authorizeAttribute.CheckArgument(nameof(authorizeAttribute));

            bool handled = false;

            BeforeAuthorizeAttribute(authorizeAttribute, ref handled);
            if (handled == false)
            {

            }
            AfterAuthorizeAttribute(authorizeAttribute);
        }
        partial void BeforeAuthorizeAttribute(AuthorizeAttribute authorizeAttribute, ref bool handled);
        partial void AfterAuthorizeAttribute(AuthorizeAttribute authorizeAttribute);

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                    if (contextDispose && Context != null)
                    {
                        Context.Dispose();
                    }
                }

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