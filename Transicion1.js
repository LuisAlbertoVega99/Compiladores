
export default class Transicion1 {
        SimbInf1;
        SimbSup1;
        Edo;
        
        constructor(simb1,simb2, e){
            this.SimbInf1 = simb1;
            this.SimbSup1 = simb2;
            this.Edo = e;
        }
        
        setTransicion(s1,s2,e){
            SimbInf1 = s1;
            SimbSup1 = s2;
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
            if(this.SimbInf1<= s && s<=this.SimbSup1)
                return this.Edo;
            return null;
            
        } 
    }
    