using System;
using Labelix.Contracts;
using Labelix.Contracts.Client;
using Labelix.Contracts.Client.Buisiness;
using Labelix.Contracts.Persistence;
using Labelix.Logic.Controllers.Buisiness;
using Labelix.Logic.Controllers.Business;
using Labelix.Logic.Controllers.Persistence;
using Labelix.Logic.DataContext;
using Labelix.Logic.DataContext.Db;
using ImageController = Labelix.Logic.Controllers.Persistence.ImageController;
using ProjectController = Labelix.Logic.Controllers.Persistence.ProjectController;

namespace Labelix.Logic
{
    public static class Factory
    {
        public enum PersistenceType
        {
            Db
            //Csv,
            //Ser,
        }

        static Factory()
        {
            ClassConstructing();
            ClassConstructed();
        }

        public static PersistenceType Persistence { get; set; } = PersistenceType.Db;

        private static void ClassConstructing()
        {
            throw new NotImplementedException();
        }

        private static void ClassConstructed()
        {
            throw new NotImplementedException();
        }

        internal static IContext CreateContext()
        {
            IContext result = null;

            if (Persistence == PersistenceType.Db) result = new LabelixDbContext();
            return result;
        }

        public static IControllerAccess<I> Create<I>() where I : IIdentifiable
        {
            IControllerAccess<I> result = null;
            if (typeof(I) == typeof(IImage))
                result = new ImageController(CreateContext()) as IControllerAccess<I>;
            else if (typeof(I) == typeof(ILabel))
                result = new LabelController(CreateContext()) as IControllerAccess<I>;
            else if (typeof(I) == typeof(IProject))
                result = new ProjectController(CreateContext()) as IControllerAccess<I>;
            else if (typeof(I) == typeof(IAIModelConfig))
                result = new AIModelConfigController(CreateContext()) as IControllerAccess<I>;
            else if (typeof(I) == typeof(IProject_AIModelConfig))
                result = new Project_AIModelConfigController(CreateContext()) as IControllerAccess<I>;
            else if (typeof(I) == typeof(IUser))
                result = new UserController(CreateContext()) as IControllerAccess<I>;
            else if (typeof(I) == typeof(IProject_User))
                result = new UserProjectController(CreateContext()) as IControllerAccess<I>;

            return result;
        }

        #region BuisinessController

        public static IUserManagementController CreateUserManagementController()
        {
            return new UserManagementController();
        }

        public static IProjectController CreateProjectController()
        {
            return new Controllers.Buisiness.ProjectController();
        }

        public static IImageController CreateImageController()
        {
            return new Controllers.Buisiness.ImageController();
        }

        public static IAIModelConfigController CreateAiModelConfigController()
        {
            return new AIConfigController();
        }

        #endregion
    }
}