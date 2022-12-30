
export default class Transicion {
    SimbInf1;
    SimbSup1;
    Edo;
    
    
    constructor( simb,e){
        this.SimbInf1 = simb;
        this.SimbSup1 = simb;
        this.Edo = e;
    }
    
    setTransicion(s1,e){
        SimbInf1 = s1;
        SimbSup1 = s1;
        Edo = e;
    }
    
    getSimbInf(){
        return this.SimbInf1;
    }
    setSimbInf(value ){
         this.SimbInf1 = value;
    }
    
    getSimbSup(){
        return this.SimbSup1;
    }
    getSimbSup(value ){
         this.SimbSup1 = value;
    }
    GetEdoTrans(s){
        if(this.SimbInf1<= s && s<=this.SimbSup1)
            return this.Edo;
        return null;
        
    } 
}
