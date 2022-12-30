import analizador_lexico from "./analizador_lexico.js";
import variables from "./variables.js";
export default class EvaluadorExp{
        Expresion;
        result;
        ExprPost;
        L;

        constructor(sigma,autAFD){
                this.Expresion = sigma;
                this.L = new analizador_lexico(sigma,autAFD)
        }

        setExpresion(sigma){
                this.Expresion= sigma;
                this.L.SetSigma(sigma);
        }

        IniEval(){
                let token;
                let variable = new variables();

                if(this.E(variable)){
                        token = this.L.yylex();
                        if(token == 0){
                                this.result = variable.v;
                                this.ExprPost = variable.Postfijo;
                                console.log(variable)
                                return true;
                        }
                }
                return false;
        }

        E(variable){
                if(this.T(variable))
                        if(this.Ep(variable))
                                return true
                return false;
        }

        Ep(variable){
                let token;
                let variable2 = new variables()
                token = this.L.yylex();
                if (token  == 10 || token ==20){// + o -
                        if(this.T(variable2)){
                                variable.v = variable.v + (token == 10 ? variable2.v : - variable2.v);
                                variable.Postfijo = variable.Postfijo + " " + variable2.Postfijo  + " " + (token == 10 ? "+" : "-");
                                console.log(variable)
                                if(this.Ep(variable))  
                                        return true;
                        }
                        return false;
                }
                this.L.Undotoken();
                return true;
        }

        T(v){
                if(this.F(v)){
                        if(this.Tp(v))
                                return true;
                        return false;
                }
        }

        Tp(v){
                let token;
                let variable2 = new variables();
                token = this.L.yylex();
                if (token  == 30 || token == 40){
                        if(this.F(variable2)){
                                v.v = v.v * (token == 30 ? variable2.v: 1/variable2.v);
                                v.Postfijo = v.Postfijo + " " + variable2.Postfijo  + " " + (token == 30 ? "*": "/");
                                if(this.Tp(v))  
                                        return true;
                        }
                        return false;
                }
                this.L.Undotoken();
                return true;
        }

        F(v){
                let token;
                token = this.L.yylex();
                switch (token) {
                        case 50:
                                if(this.E(v)){
                                        token = this.L.yylex();
                                        if(token == 60){
                                                return true;
                                        }
                                        return false;
                                }
                                
                                break;
                        case 70 :
                                v.v = parseFloat(this.L.Lexema);
                                v.Postfijo = this.L.Lexema;
                                return true;
                
                        default:
                                break;
                }
                return false;

        }
}