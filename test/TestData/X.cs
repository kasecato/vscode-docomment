using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;

namespace N  // "N:N"
{
    public unsafe class X<T, U, V>    // "T:N.X"
    {
        public X() { }   // "M:N.X.#ctor"
        public X(int i) { }  // "M:N.X.#ctor(System.Int32)"
        public string q;  // "F:N.X.q"
        public const double PI = 3.14;  // "F:N.X.PI"
        public int f() { return 1; }  // "M:N.X.f"
        public int bb(string s, ref int y, void* z) { return 1; } // "M:N.X.bb(System.String,System.Int32@,=System.Void*)"
        public int gg(short[] array1, int[,] array) { return 0; } // "M:N.X.gg(System.Int16[], System.Int32[0:,0:])"
        public static X operator +(X x, X xx) { return x; } // "M:N.X.op_Addition(N.X,N.X)"
        public int prop { get { return 1; } set { } } // "P:N.X.prop"
        public event D d; // "E:N.X.d"
        public int this[string s] { get { return 1; } } // "P:N.X.Item(System.String)"
        public class Nested { } // "T:N.X.Nested"
        public delegate void D(int i); // "T:N.X.D"
        public static explicit operator int(X x) { return 1; } // "M:N.X.op_Explicit(N.X)~System.Int32"
        public DbSet<Director> Directors { get; set; }
        public List<int> bbb<int>(string s, ref List<int> y, void* z){ return null; } // "M:N.X.bb(System.String,System.Int32@,=System.Void*)"
        int bbbb(string s, ref int y, void* z) { return 1; } // "M:N.X.bb(System.String,System.Int32@,=System.Void*)"
        int Generate(int level) { return 0; }
        public void Save(string data, Action<AchievementSavedResponse> onComplete = null) {}
        Func<string, bool> FirstClassFunction(Func<bool, int> func);
        [Route("{time}/{location}")]
        [HttpGet]
        public async Task<string> GetInfoForTime(string location, double time) { return null; }
        public Collection<T> Filter(Func<T, bool> query) { return null; }
        public Collection<T> Filter(Func<T, bool> queryFirst, Func<T, U, V> querySecond) { return null; }
        public void Test(string options) : base(options) { }
        public void Testing2(string String1, string String2, string String3) : base() { }
        [HttpGet]
        [Route("{userId}")]
        public object Get(int userId) { return null; }
        public object Get(int[] userId, string[] val) { return null; }
        [HttpGet]
        [AllowAnonymous]
        [Route("{cameraId}/readings")]
        public IActionResult GetReadingsForCamera(int[] cameraId, int[] offset, int[] limit, string orderBy) { return null; }
        public string Test<T>(T obj) where T : class { }
        public static BoolVector operator |(BoolScalar a, BoolVector b) { }
        public string[] ss = new string[2] { }
        public string Foo { get; set; }
        public string Bar { get; set; } = "bar";
    }
    class NodeItem<T> where T : System.IComparable<T>, new() { }
    class SpecialNodeItem<T> : NodeItem<T> where T : System.IComparable<T>, new() { }

    class SuperKeyType<K, V, U>
        where U : System.IComparable<U>
        where V : new()
    { }

    class Stack<T> where T : System.IComparable<T>, IEnumerable<T>
    {
    }

    interface IDictionary<K, V>{}
    interface IBaseInterface2<T, U> { }
    class SampleClass2<T> : IBaseInterface2<T, string> { }

    void SwapIfGreater<T>(ref T lhs, ref T rhs) where T : System.IComparable<T>{}
    void DoWork<T> () { }
    void DoWork<T, U>
    () { }

    public delegate void Del<T>(T item);
    delegate void StackEventHandler<T, U>(T sender, U eventArgs);
    public delegate List<T> StackEventHandler<T, U>(T sender, U eventArgs);

    public class Foo : Bar<string> { }

    void DoSomething(bool @checked) { }

    public static List<object> ComplexFunctionsSignatureOne(List<object> someList,
                                                            Func<object, bool> delegateOne = null,
                                                            Func<object, bool> delegateTwo = null) { }

    public static (object result, string name) ComplexFunctionSignatureTwo() { }

    public int GoodAdd(int a, int b) => a + b;
    public int Add(int a, int b) => (a + b);
    public bool Has(IList<int> a, int b) => a.Any(x => x == b);
    public bool DoesntHas(IList<int> a, int b) => a.Any(x => x != b);
    public IEnumerable<int> ZipAdd(IList<int> a, IList<int> b) => a.Zip(b, (s, t) => s + t);

    private void CSVStringToIntArray( ref string[] pCSVData, ref int[,] pZone) { }
}

namespace ns {
    public class C {
        public int c() {
            return 1;
        }
    }
}