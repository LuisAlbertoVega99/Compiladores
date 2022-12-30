import Stack from "./pila.js";
import ClassEstadoanalisisLexico from "./ClassEstadoanalisisLexico.js";
let SimbolosEspeciales = {
        Epsilon : String.fromCharCode(5),
        FIN : 0,
        ERROR : 20000,
        OMITIR : 20001,    
    }
export default class analizador_lexico{
        PasoEdoAcept;
        Inilexema;
        Finlexema;
        PosActual;
        token;
        EdoActual;
        EdoTransicion;
        CadenaSigma= "";
        Lexema;
        IndiceCaracterActual;
        CaracterActual;
        Pila;
        AutomataFD;
        yytext;

        constructor(sigma,FileAFD){
                this.CadenaSigma = sigma;
                this.PasoEdoAcept = false;
                this.Inilexema = 0;
                this.Finlexema = -1;
                this.token = -1;
                this.IndiceCaracterActual = 0;
                this.Pila = new Stack();
                this.AutomataFD = FileAFD; 
        }

        GetEdoAnalisisLexico(){
                let EdoActualAnalisis = new ClassEstadoanalisisLexico();
                EdoActualAnalisis.CaracterActual = this.CaracterActual;
                EdoActualAnalisis.EdoActual = this.EdoActual;
                EdoActualAnalisis.EdoTransicion = this.EdoTransicion;
                EdoActualAnalisis.Finlexema = this.Finlexema;
                EdoActualAnalisis.IndiceCaracterActual = this.IndiceCaracterActual;
                EdoActualAnalisis.Inilexema = this.Inilexema;
                EdoActualAnalisis.Lexema = this.Lexema;
                EdoActualAnalisis.PasoEdoAcept = this.PasoEdoAcept;
                EdoActualAnalisis.token = this.token;
                EdoActualAnalisis.Pila = this.Pila;
                return EdoActualAnalisis;
        }
        SetEdoAnalisisLexico(e){
                this.CaracterActual = e.CaracterActual;
                this.EdoActual = e.EdoActual;
                this.EdoTransicion = e.EdoTransicion;
                this.Finlexema = e. Finlexema;
                this.IndiceCaracterActual = e.IndiceCaracterActual;
                this.Inilexema = e.Inilexema;
                this.Lexema = e.Lexema;
                this.PasoEdoAcept = e.PasoEdoAcept;
                this.token = e. token;
                this.Pila = e.Pila;
                return true;
        }
        SetSigma(sigma){
                this.CadenaSigma = sigma;
                this.PasoEdoAcept= false;
                this.Inilexema = 0;
                this.Finlexema = -1;
                this.IndiceCaracterActual = 0;
                this.token = -1;
        }
        CadenaXAnalizar(){
                return this.CadenaSigma.substring(this.IndiceCaracterActual,this.CadenaSigma.length - this.IndiceCaracterActual);
        }

        
        yylex(){
                while(true){
                        this.Pila.push(this.IndiceCaracterActual);
                        if(this.IndiceCaracterActual >= this.CadenaSigma.length){
                                this.Lexema = "Final";
                                this.token = SimbolosEspeciales.FIN;
                                return SimbolosEspeciales.FIN;
                        }
                        this.Inilexema = this.IndiceCaracterActual;
                        this.EdoActual = 0;
                        this.PasoEdoAcept = false;
                        this.Finlexema = -1;
                        this.token = -1;
                        while(this.IndiceCaracterActual < this.CadenaSigma.length){
                                this.CaracterActual = this.CadenaSigma[this.IndiceCaracterActual];
                                this.EdoTransicion = this.AutomataFD.TablaAFD[this.EdoActual][this.CaracterActual.charCodeAt(0)];
                                if(this.EdoTransicion != -1){
                                        if(this.AutomataFD.TablaAFD[this.EdoTransicion][256] != -1){
                                                this.PasoEdoAcept = true;
                                                this.token = this.AutomataFD.TablaAFD[this.EdoTransicion][256];
                                                this.Finlexema = this.IndiceCaracterActual;
                                        }
                                        this.IndiceCaracterActual++;
                                        this.EdoActual = this.EdoTransicion;
                                        continue;
                                }
                                break;
                        }
                        if(!this.PasoEdoAcept){
                                this.IndiceCaracterActual = this.Inilexema + 1;
                                this.Lexema = this.CadenaSigma.substring(this.Inilexema,this.Inilexema+1);
                                this.token = SimbolosEspeciales.ERROR;
                                return this.token;
                        }
                        this.Lexema = this.CadenaSigma.substring(this.Inilexema,this.Finlexema + 1 );
                        this.IndiceCaracterActual = this.Finlexema + 1;
                        if(this.token == SimbolosEspeciales.OMITIR){
                                continue;
                        }
                        else
                                return this.token;

                }
        }
        Undotoken(){
                if(this.Pila.isEmpty())
                        return false;
                this.IndiceCaracterActual = this.Pila.pop();
                return true;
        }
}
