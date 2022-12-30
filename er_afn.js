import Analisis_lexico from "./analizador_lexico.js"
import AFN from "./claseAFN.js"
export default class ER_AFN{
        ExpReg;
        result;
        L;

        constructor(sigma,autAFD){
                this.ExpReg = sigma;
                this.L = new Analisis_lexico(this.ExpReg,autAFD);
        }

        SetExpresion(sigma){
                this.ExpReg = sigma;
                this.L.SetSigma(sigma);
        }

        IniConversion(){
                let token;
                let f = new AFN();
                if (this.E(f)){
                        token = this.L.yylex();
                        if(token == 0){
                                this.result = f;
                                return true;
                        }
                }
                
                return false;
        }

        E(f){
                if(this.T(f))
                        if(this.Ep(f))
                                return true;
                return false;
        }

        Ep(f){
                let token = this.L.yylex();
                let f2 = new AFN();

                if(token == 10){//UNION
                        if(this.T(f2)){
                                f.UnirAFN(f2);
                                if(this.Ep(f))
                                        return true;
                        }
                        return false;
                }
                this.L.Undotoken();
                return true;
        }

        T(f){
                if(this.C(f))
                        if(this.Tp(f))
                                return true;
                return false;
        }

        Tp(f){
                let token = this.L.yylex()
                let f2 = new AFN();

                if( token == 20){//CONCATENACION
                        if(this.C(f2)){
                                f.ConcaAFN(f2);
                                if(this.Tp(f))
                                        return true;
                        }
                        return false;
                }
                this.L.Undotoken();
                return true;
        }

        C(f){
                if(this.F(f))
                        if(this.Cp(f))
                                return true;
                return false;
        }

        Cp(f){
                let token = this.L.yylex();
                switch (token) {
                        case 30://CERRADURA TRANSITIVA
                                f.CerrPos();
                                if(this.Cp(f))
                                        return true;
                                return false;
                        case 40://CERRADURA KLEEN
                                f.CerrKleen();
                                if(this.Cp(f))
                                        return true;
                                return false;
                        case 50://OPCIONAL
                                f.Opcional();
                                if(this.Cp(f))
                                        return true;
                                return false;
                }
                this.L.Undotoken();
                return true;
        }

        F(f){
                let token = this.L.yylex();
                let simbolo1, simbolo2;
                switch (token) {
                        case 60://PARENTESIS IZQUIERDO
                                if(this.E(f)){
                                        token = this.L.yylex();
                                        if(token == 70)//PARENTESIS DERECHO
                                                return true;
                                }
                                return false;
                        case 80://CORCHETE IZQUIERDO
                                token = this.L.yylex();
                                if(token == 110){//SIMBOLO
                                        simbolo1  = (this.L.Lexema[0] == "\\") ? this.L.Lexema[1]: this.L.Lexema[0];
                                        token  = this.L.yylex();
                                        if(token == 100){//GUION
                                                token = this.L.yylex();
                                                if(token == 110){//SIMBOLO
                                                        simbolo2 =(this.L.Lexema[0] == "\\") ? this.L.Lexema[1] : this.L.Lexema[0];
                                                        token = this.L.yylex();
                                                        if(token == 90){
                                                                f.CrearAFNBasico2(simbolo1,simbolo2);
                                                                return true;
                                                        }
                                                }
                                        }
                                }
                                return false;

                        case 110: 
                                simbolo1 = (this.L.Lexema[0] == "\\") ? this.L.Lexema[1] : this.L.Lexema[0];
                                f.CrearAFNBasico(simbolo1);
                                return true;
                
                        default:
                                break;
                }
                return false;

        }

}