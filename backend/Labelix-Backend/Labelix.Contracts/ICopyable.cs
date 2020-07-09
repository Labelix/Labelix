namespace Labelix.Contracts
{
    public partial interface ICopyable<T>
    {
        void CopyProperties(T other);
    }
}
