String.prototype.hashCode = function() {
        let hash = 0, i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
          chr   = this.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
        }
        return hash;
};

class ItemLR1{
        NumRegla;
        Pospunto;
        Simbolo;

        constructor(Num_Regla,Pos_punto,Simb){
                this.NumRegla = Num_Regla;
                this.Pospunto = Pos_punto;
                this.Simbolo = Simb;
        }

        Equals(x,y){
                return (x.NumRegla == y.NumRegla) && (x.Pospunto == y.Pospunto) && (x.Simbolo == y.Simbolo);
        }
       
        GetHashCode(obj){
                let s ;
                s = "" + obj.NumRegla.toString() + "," +obj.Pospunto.toString()+ "," + obj.Simbolo + "";
                return s.hashCode();
       
        }
       

}