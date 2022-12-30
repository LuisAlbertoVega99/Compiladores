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
export default class ItemLR0{
        NumRegla;
        Pospunto;

        constructor(NumRegla,Pospunto){
                this.NumRegla = NumRegla;
                this.Pospunto = Pospunto;

        }
        

        Equals(x,y){
                return (x.NumRegla == y.NumRegla) && (x.Pospunto == y.Pospunto);
        }

        GetHashCode(obj){
                let s;
                s = "" + obj.NumRegla.toString() + "," +obj.Pospunto.toString()+ "";
                return s.hashCode();

        }
}