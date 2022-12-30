
import Estado from "./Estado.js"
import Transicion   from "./Transicion.js";
import Transicion1   from "./Transicion1.js";
import Queue from "./cola.js";
import Stack from "./pila.js";
import ConIj from "./ConjI.js"
import eqSet from "./funciones.js"

Set.prototype.interseccion = function(otroconjunto){
    let conjuntoInterseccion = new Set();
    for(const e of otroconjunto){
        if(this.has(e)){
            conjuntoInterseccion.add(e);
        }
    }
    return conjuntoInterseccion;
};



let SimbolosEspeciales = {
    Epsilon : String.fromCharCode(5),
    FIN : String.fromCharCode(0),
    ERROR : 20000,
    OMITIR : 20001,    
}


export default class AFN{
    ConjDeAFNs = new Set();
    EdoIni;
    EdosAFN = new Set();
    EdosAcept = new Set();
    Alfabeto = new Set();
    SeAgregoAFNUnionLexico;
    IdAFN

    constructor(){
        this.IdAFN = 0 ;
        this.EdoIni = null;
        this.EdosAFN.clear();
        this.Alfabeto.clear();
        this.SeAgregoAFNUnionLexico = false;

    }

    CrearAFNBasico(s){
        let t;
        let e1,e2;
        e1 = new Estado();
        e2 = new Estado();
        t = new Transicion(s,e2);
        e1.setTrans(t);
        e2.EdoAcept = true;
        this.Alfabeto.add(s);
        this.EdoIni = e1;
        this.EdosAFN.add(e1);
        this.EdosAFN.add(e2);
        this.EdosAcept.add(e2);
        this.SeAgregoAFNUnionLexico = false;
        return this;
    }

    CrearAFNBasico2(s1,s2){
        let aux3 = "";
        let t;
        let e1,e2;
        e1 = new Estado();
        e2 = new Estado();
        t = new Transicion1(s1,s2,e2);
        e1.setTrans(t);
        e2.EdoAcept = true;
        let aux = s1.charCodeAt(0)
        let aux1 = s2.charCodeAt(0);
        for(let i = aux; i<=aux1;i++){
            if((i >= 65 && i <= 90) || (i >= 97 && i <= 122) ){
                aux3 = String.fromCharCode(i);
                this.Alfabeto.add(aux3);
            }
            else{
                for(let i = s1; i<=s2;i++){
                    
                    this.Alfabeto.add(i.toString());
                }
            }
        }
        
        this.EdoIni = e1;
        this.EdosAFN.add(e1);
        this.EdosAFN.add(e2);
        this.EdosAcept.add(e2);
        this.SeAgregoAFNUnionLexico = false;
        return this;
    }

    UnirAFN(f2){
        let e1 = new Estado();
        let e2 = new Estado();

        let t1 = new Transicion(SimbolosEspeciales.Epsilon,this.EdoIni);
        let t2 = new Transicion(SimbolosEspeciales.Epsilon,f2.EdoIni);

        e1.setTrans(t1);
        e1.setTrans(t2);

        this.EdosAcept.forEach(e => {
            e.setTrans(new Transicion(SimbolosEspeciales.Epsilon,e2));
            e.EdosAcept = false;
        });

        f2.EdosAcept.forEach(e => {
            e.setTrans(new Transicion(SimbolosEspeciales.Epsilon,e2));
            e.EdosAcept = false;
        });

        this.EdosAcept.clear();
        f2.EdosAcept.clear();
        this.EdoIni = e1;
        e2.EdoAcept = true;
        this.EdosAcept.add(e2);
        //this.EdosAFN.union(f2.EdosAFN);
        f2.EdosAFN.forEach(e=>{
            this.EdosAFN.add(e);
        })
        this.EdosAFN.add(e1);
        this.EdosAFN.add(e2);
        //this.Alfabeto.union(f2.Alfabeto);
        f2.Alfabeto.forEach(e=>{
            this.Alfabeto.add(e);
        })
        return this;
    }

    ConcaAFN(f2){
        f2.EdoIni.getTrans().forEach(t=>{
            this.EdosAcept.forEach(e=>{
                e.setTrans(t);
                e.EdoAcept = false;
            })
        })
        
        f2.EdosAFN.delete(f2.EdoIni);   
        this.EdosAcept = f2.EdosAcept;
        //this.EdosAFN.union(f2.EdosAFN);
        f2.EdosAFN.forEach(e=>{
            this.EdosAFN.add(e);
        })
        //this.Alfabeto.union(f2.Alfabeto);
        f2.Alfabeto.forEach(e=>{
            this.Alfabeto.add(e);
        });
        
        return this;
    }

    CerrPos(){
        let e_ini = new Estado();
        let e_fin = new Estado();
        e_ini.setTrans(new Transicion(SimbolosEspeciales.Epsilon,this.EdoIni));
        this.EdosAcept.forEach(e => {
           
            e.setTrans(new Transicion(SimbolosEspeciales.Epsilon, this.EdoIni));
            e.setTrans(new Transicion(SimbolosEspeciales.Epsilon, e_fin));
            e.EdoAcept = false;
        });
        this.EdoIni = e_ini;
        e_fin.EdoAcept = true;
        this.EdosAcept.clear();
        this.EdosAcept.add(e_fin);
        this.EdosAFN.add(e_ini);
        this.EdosAFN.add(e_fin);
        return this;
    }

    CerrKleen(){
        let e_ini = new Estado();
        let e_fin = new Estado();

        e_ini.setTrans(new Transicion(SimbolosEspeciales.Epsilon,this.EdoIni));
        e_ini.setTrans(new Transicion(SimbolosEspeciales.Epsilon,e_fin));
        this.EdosAcept.forEach(e =>{
            e.setTrans(new Transicion(SimbolosEspeciales.Epsilon,this.EdoIni));
            e.setTrans(new Transicion(SimbolosEspeciales.Epsilon,e_fin));
            e.EdoAcept = false;
        })

        this.EdoIni = e_ini;
        e_fin.EdoAcept = true;
        this.EdosAcept.clear();
        this.EdosAcept.add(e_fin);
        this.EdosAFN.add(e_ini);
        return this;
    }

    Opcional(){
        let e_ini = new Estado();
        let e_fin = new Estado();
        e_ini.setTrans(new Transicion(SimbolosEspeciales.Epsilon,this.EdoIni));
        e_ini.setTrans(new Transicion(SimbolosEspeciales.Epsilon,e_fin));
        this.EdosAcept.forEach(e=>{
            e.setTrans(new Transicion(SimbolosEspeciales.Epsilon,e_fin));
            e.EdoAcept = true;
        })
        this.EdoIni = e_ini;
        e_fin.EdoAcept = true;
        this.EdosAcept.clear();
        this.EdosAcept.add(e_fin);
        this.EdosAFN.add(e_ini);
        this.EdosAFN.add(e_fin);
        return this;
    }
    
    CerraduraEpsilon(e){
        let R = new Set();
        let S = new Stack();
        let aux, Edo;
        R.clear();
        S.push(e);
        while(!S.isEmpty()){
            aux = S.pop();
            R.add(aux);
            aux.getTrans().forEach( t => {
                if ((Edo = t.GetEdoTrans(SimbolosEspeciales.Epsilon)) != null)
                    if(!R.has(Edo))
                        S.push(Edo);
            }
                )

        }
        return R;
    }
    
    CerraduraEpsilon1(ConjDeEdos){
        let R = new Set();
        let S = new Stack();
        let aux, Edo;
        R.clear();
        ConjDeEdos.forEach( e =>{
            S.push(e);
        })
        while(!S.isEmpty()){
            aux = S.pop();
            R.add(aux);
            aux.getTrans().forEach( t => {
                if ((Edo = t.GetEdoTrans(SimbolosEspeciales.Epsilon)) != null)
                    if(!R.has(Edo))
                        S.push(Edo);
            }
                )

        }
        return R;

    }

    Mover(Edo,Simb){
        let C = new Set();
        let Aux;
        C.clear();
        Edo.getTrans().forEach(t =>{
            Aux = t.GetEdoTrans(Simb);
            if(Aux !== null)
                C.add(Aux);
        })
        return C;
    }

    Mover1(Edos,Simb){
        let C = new Set();
        let aux;
        C.clear();
        Edos.forEach(Edo=>{
            Edo.getTrans().forEach(t=>{
                aux = t.GetEdoTrans(Simb);
                if(aux!=null)
                    C.add(aux);
            })

        })
        return C;
    }

    Ir_A(Edos,Simb){
        let C = new Set();
        C.clear();
        C = this.CerraduraEpsilon1(this.Mover1(Edos,Simb));
        return C;
    }

    UnionEspecialAFN(f,token){
        let e;
        if(!this.SeAgregoAFNUnionLexico){
            this.EdosAFN.clear();
            this.Alfabeto.clear();
            e = new Estado();
            e.setTrans(new Transicion(SimbolosEspeciales.Epsilon,f.EdoIni));
            this.EdoIni = e;
            this.EdosAFN.add(e);
            this.SeAgregoAFNUnionLexico = true;
        }
        else
            this.EdoIni.setTrans(new Transicion(SimbolosEspeciales.Epsilon,f.EdoIni));
        
        f.EdosAcept.forEach(EdoAcept=>{
            EdoAcept.Token = token;
        })
        f.EdosAcept.forEach(EdosAcept =>{
            this.EdosAcept.add(EdosAcept);
        })
        f.EdosAFN.forEach(EdosAfn =>{
            this.EdosAFN.add(EdosAfn);
        })
        f.Alfabeto.forEach(s=>{
            this.Alfabeto.add(s);
        })
    }

    ConvAFNaAFD(){
        
        let CardAlfabeto, NumEdosAFD;
        let i,j,r; //j = indice del estado  k = indice auxiliar
        let k = 0;
        let existe;

        
        let EdosAFD = new Set(); //C conjunto de estados de la clase Conij
        let EdosSinAnalizar = new Queue();//Q

        EdosAFD.clear();

        CardAlfabeto = this. Alfabeto.size;
        let ArrAlfabeto = new Array(CardAlfabeto);

        i = 0;
        this.Alfabeto.forEach(c => {
            ArrAlfabeto[i++] = c;
        });
        j = 0;//Contador para los estados del AFD
        
        let Aux = new ConIj();
        Aux.ConjEdos = this.CerraduraEpsilon(this.EdoIni);
        Aux.j = j;
        EdosAFD.add(Aux);
        EdosSinAnalizar.enqueue(Aux);
        j++;
        while (EdosSinAnalizar.size() != 0) {
            Aux = EdosSinAnalizar.dequeue();
            ArrAlfabeto.forEach(c => {
                let ConjAux = new ConIj(); 
                ConjAux.ConjEdos= this.Ir_A(Aux.ConjEdos,c);
               
                if(ConjAux.ConjEdos.size === 0){
                }
                existe = false;
                EdosAFD.forEach(I =>{
                    
                    if(eqSet(ConjAux.ConjEdos,I.ConjEdos)){
                        existe = true;
                        r = this.IndiceCaracter(ArrAlfabeto,c);
                        Aux.TransicionesAFD[r] = I.j;
                    }
                })
                if(!existe){
                    if(ConjAux.ConjEdos.size ===0){

                    }
                    else{
                        ConjAux.j = j;
                        r = this.IndiceCaracter(ArrAlfabeto,c);
                        Aux.TransicionesAFD[r] = ConjAux.j;
                        EdosAFD.add(ConjAux);
                        EdosSinAnalizar.enqueue(ConjAux);
                        j++; 
                    }
                    
                }
                
            });
            
        }
        let bandera
        NumEdosAFD = j;
        EdosAFD.forEach(IJ =>{
            this.EdosAcept.forEach(edo=>{
                if(IJ.ConjEdos.has(edo)){
                    if(edo.Token != -1 && bandera == false){
                        bandera = true;
                        IJ.token =  edo.Token;
                    }

                }
            })
            bandera = false;
        })
        console.log(EdosAFD);

        let archivo = Array(NumEdosAFD);
        
        for(let i = 0;i<NumEdosAFD;i++){   
            archivo[i] = new  Array(257)
        }
        let m = 0;
        while (m < NumEdosAFD) {
            EdosAFD.forEach(IJ=>{
                for(let j = 0;j< 258;j++){
                    if(j <256 ){
                        archivo[m][j]= IJ.TransicionesAFD[j];
                    }
                    else if(j  == 256 ){
                        archivo[m][j] = IJ.token;
                    }
                    else{
                        archivo[m][j] = String.fromCharCode(10)
                    }
                }
                m++;
            })
        }

        
        return archivo;
        

    }
    IndiceCaracter(ArregloAlfabeto,c){
        // for (let i = 0 ;i < ArregloAlfabeto.length;i++) {
            // if(ArregloAlfabeto[i] == c)
                // return i;
        // }
        // return -1;
        return c.charCodeAt(0)
    }
}

