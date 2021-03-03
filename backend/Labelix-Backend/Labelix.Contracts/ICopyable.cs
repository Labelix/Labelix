namespace Labelix.Contracts
{
    public interface ICopyable<T>
    {
        void CopyProperties(T other);
    }
}