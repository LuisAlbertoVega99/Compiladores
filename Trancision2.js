
export default class Transicion2 {
        SimbInf1;
        SimbSup1;
        Edo;
        
        constructor(){
            this.Edo = null;
        }
        
        setTransicion(s1,e){
            SimbInf1 = s1;
            SimbSup1 = s1;
            Edo = e;
            return ;
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
            if(SimbInf1<= s && s<=SimbSup1)
                return Edo;
            return null;
            
        } 
    }
    