using System;

namespace N  // "N:N"
{
    public unsafe class X    // "T:N.X"
    {
        public X(){}   // "M:N.X.#ctor"
        public X(int i){}  // "M:N.X.#ctor(System.Int32)"
        public string q;  // "F:N.X.q"
        public const double PI = 3.14;  // "F:N.X.PI"
        public int f(){return 1;}  // "M:N.X.f"
        public int bb(string s, ref int y, void * z){return 1;} // "M:N.X.bb(System.String,System.Int32@,=System.Void*)"
        public int gg(short[] array1, int[,] array){return 0;} // "M:N.X.gg(System.Int16[], System.Int32[0:,0:])"
        public static X operator+(X x, X xx){return x;} // "M:N.X.op_Addition(N.X,N.X)"
        public int prop {get{return 1;} set{}} // "P:N.X.prop"
        public event D d; // "E:N.X.d"
        public int this[string s]{get{return 1;}} // "P:N.X.Item(System.String)"
        public class Nested{} // "T:N.X.Nested"
        public delegate void D(int i); // "T:N.X.D"        
        public static explicit operator int(X x){return 1;} // "M:N.X.op_Explicit(N.X)~System.Int32"
        public DbSet<Director> Directors { get; set; }        
        public List<int> bb<int>(string s, ref List<int> y, void * z){return 1;} // "M:N.X.bb(System.String,System.Int32@,=System.Void*)"
        int bb(string s, ref int y, void * z){return 1;} // "M:N.X.bb(System.String,System.Int32@,=System.Void*)"
        int Generate(int level);
        public void Save(string data, Action<AchievementSavedResponse> onComplete = null);
        Func<string, bool> FirstClassFunction(Func<bool, int> func);
   }
}
