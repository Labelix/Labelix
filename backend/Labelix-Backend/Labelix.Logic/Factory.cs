using Labelix.Logic.DataContext.Db;

namespace Labelix.Logic
{
    public static partial class Factory
    {
        static Factory()
        {
            ClassConstructing();
            ClassConstructed();
        }
        static partial void ClassConstructing();
        static partial void ClassConstructed();
        public enum PersistenceType
        {
            Db,
            //Csv,
            //Ser,
        }
        public static PersistenceType Persistence { get; set; } = Factory.PersistenceType.Db;
        internal static DataContext.IContext CreateContext()
        {
            DataContext.IContext result = null;

            if (Persistence == PersistenceType.Db)
            {
                result = new LabelixDbContext();
            }
            return result;
        }
        public static Contracts.Client.IControllerAccess<I> Create<I>() where I : Contracts.IIdentifiable
        {
            Contracts.Client.IControllerAccess<I> result = null;
            if (typeof(I) == typeof(Labelix.Contracts.Persistence.IImage))
            {
                result = new Controllers.Persistence.ImageController(CreateContext()) as Contracts.Client.IControllerAccess<I>;
            }
            else if (typeof(I) == typeof(Labelix.Contracts.Persistence.ILabel))
            {
                result = new Controllers.Persistence.LabelController(CreateContext()) as Contracts.Client.IControllerAccess<I>;
            }
            else if (typeof(I) == typeof(Labelix.Contracts.Persistence.IProject))
            {
                result = new Controllers.Persistence.ProjectController(CreateContext()) as Contracts.Client.IControllerAccess<I>;
            }
            else if (typeof(I) == typeof(Labelix.Contracts.Persistence.IAIModelConfig))
            {
                result = new Controllers.Persistence.AIModelConfigController(CreateContext()) as Contracts.Client.IControllerAccess<I>;
            }
            else if (typeof(I) == typeof(Labelix.Contracts.Persistence.IProject_AIModelConfig))
            {
                result = new Controllers.Persistence.Project_AIModelConfigController(CreateContext()) as Contracts.Client.IControllerAccess<I>;
            }

            return result;
        }
    }
}
