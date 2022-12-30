import analizador_lexico from "./analizador_lexico.js";
import ClaseNodo from "./ClaseNodo.js";
import ClassEstadoanalisisLexico from "./ClassEstadoanalisisLexico.js";
import simbolos from "./simbolos.js"
import TokensGram_Gram from "./TokensGram_Gram.js";
import ElemArreglo from "./ElemArreglo.js";


Set.prototype.union = function(otroconjunto){
        let conjuntounion = new Set();
        for(const e of this){
                conjuntounion.add(e);
        }
        for(const e of otroconjunto){
                conjuntounion.add(e);
        }
        return conjuntounion;
};
export default class DescRecGramGram{

        Gramatica;
        L;
        ArrReglas = new Array(20);
        NumReglas = 0;
        Vn;
        Vt;
        Tokens = new TokensGram_Gram();

        constructor(sigma,AFD){
                this.Gramatica = sigma;
                this.L = new analizador_lexico(this.Gramatica,AFD);
                this.Vn = new Set();
                this.Vt = new Set();
                this.Vn.clear();
                this.Vt.clear();
        }
        SetGramatica(sigma){
                this.Gramatica = sigma;
                this.L.SetSigma(sigma);
                return true;
        }
        Analizar_Gramatica(){
                let token;
                if(this.G()){
                        token = this.L.yylex();
                        if(token == 0){
                                this.IdentificarTerminales();
                                return true;
                        }
                }
                return false;
        }

        G(){
                if(this.ListaReglas()){
                        return true;
                }
                return false;
        }
        ListaReglas(){
                let token;
                if(this.Reglas()){
                        token = this.L.yylex();
                        if(token == 50 || token == 60){
                                token = this.L.yylex()
                                if (token == this.Tokens.PC){
                                        if(this.ListaReglasP())
                                                return true;
                                }           
                        }
                        else if (token == this.Tokens.PC){
                                if(this.ListaReglasP())
                                        return true;
                        }
                }
                return false;
        }
        ListaReglasP(){
                let token;
                let EdoScanner = new ClassEstadoanalisisLexico();
                EdoScanner = this.L.GetEdoAnalisisLexico();
                if(this.Reglas()){
                        
                        token = this.L.yylex(); 
                        if(token ==50 || token == 60){
                                token = yylex();
                                if(token == this.Tokens.PC){
                                        if(this.ListaReglasP())
                                                return true;
                                }
                        }
                        else if(token == this.Tokens.PC){
                                if(this.ListaReglasP())
                                        return true;
                        }
                        return false
                }
                this.L.SetEdoAnalisisLexico(EdoScanner);
                return true;

        }
        Reglas(){
                let token;
                let S = new simbolos();
                if(this.LadoIzquierdo(S)){
                        this.Vn.add(S.simbolo)
                        token = this.L.yylex();
                        if(token == 50 || token == 60){
                                token = this.L.yylex()
                                if(token == this.Tokens.Flecha)
                                        if(this.LadosDerechos(S))
                                                return true;
                        }
                        else if(token == this.Tokens.Flecha)
                                if(this.LadosDerechos(S))
                                        return true;
                }
                return false;
        }
        LadoIzquierdo(S){
                let token;
                token = this.L.yylex();
                if(token == 50 || token == 60){
                        token = this.L.yylex()
                        if(token == this.Tokens.Simbolo){
                                S.simbolo = this.L.Lexema;
                                return true;
                        }
                }
                else if(token == this.Tokens.Simbolo){
                        S.simbolo = this.L.Lexema;
                        return true;
                }
                return false;
        }
        LadosDerechos(S){
                if(this.LadoDerecho(S))
                        if(this.LadosDerechosP(S))
                                return true;
                return false;
        }
        LadosDerechosP(S){
                let token;
                token = this.L.yylex();
                if(token == 50 || token ==60){
                        token = this.L.yylex()
                        if(token == this.Tokens.Or){
                                if(this.LadoDerecho(S))
                                        if(this.LadosDerechosP(S))
                                                return true;
                                return false;
                        }
                }
                else if(token == this.Tokens.Or){
                        if(this.LadoDerecho(S))
                                if(this.LadosDerechosP(S))
                                        return true;
                        return false;
                }
                this.L.Undotoken();
                return true;
        }
        LadoDerecho(S){
                let Lista = new Array();
                if(this.SecSimbolos(Lista)){
                        this.ArrReglas[this.NumReglas] = new ElemArreglo();
                        this.ArrReglas[this.NumReglas].InfSimbolo = new ClaseNodo(S.simbolo,false);
                        this.ArrReglas[this.NumReglas++].ListaLadoDerecho = Lista;
                        return true;
                }
                        
                return false;
        }
        SecSimbolos(Lista){
                let token = this.L.yylex();
                let N;
                if(token == 50 || token == 60){
                        token = this.L.yylex()
                        if(token == this.Tokens.Simbolo){
                                N = new ClaseNodo(this.L.Lexema,false);
                                if(this.SecSimbolosP(Lista)){
                                        Lista.unshift(N);
                                        return true;
                                }
                        }
                }
                else if(token == this.Tokens.Simbolo){
                        N = new ClaseNodo(this.L.Lexema,false);
                        if(this.SecSimbolosP(Lista)){
                                Lista.unshift(N);
                                return true;
                        }
                }
                return false;
        }
        SecSimbolosP(Lista){
                let token;
                let N;
                token = this.L.yylex();
                
                if(token == 50 || token == 60){
                        token = this.L.yylex()
                        if(token == this.Tokens.Simbolo){
                                N = new ClaseNodo(this.L.Lexema,false);
                                if(this.SecSimbolosP(Lista)){
                                        Lista.unshift(N);
                                        return true;
                                }
                                return false;
                        }
                }
                this.L.Undotoken();
                return true;
        }

        IdentificarTerminales(){
                let i;
                for(i = 0;i<this.NumReglas;i++){
                        this.ArrReglas[i].ListaLadoDerecho.forEach(N => {
                                if(!this.Vn.has(N.Simbolo)&& !(N.Simbolo == "epsilon")){
                                        N.es_terminal = true;
                                        this.Vt.add(N.Simbolo);
                                }
                        });
                }
        }
        First(l){
                let i,j;
                let N = new ClaseNodo();
                let R = new Set();
                R.clear();
                if(l.length== 0)
                        return R;
                for(j = 0;j<l.length;j++){
                        N = l[j];
                        if(N.es_terminal || N.Simbolo =="epsilon"){
                                R.add(N.Simbolo);
                                return R;
                        }
                        for(i = 0; i<this.NumReglas;i++){
                                if(this.ArrReglas[i].ListaLadoDerecho[0].Simbolo == N.Simbolo)
                                        continue;
                                if((this.ArrReglas[i].InfSimbolo.Simbolo == N.Simbolo)){
                                        let aux = this.First(this.ArrReglas[i].ListaLadoDerecho);
                                        aux.forEach(e=>{
                                                R.add(e);
                                        })
                                }
                                
                        }
                        if(R.has("epsilon")){
                                if(j==(l.length-1))
                                        continue;
                                R.delete("epsilon")
                        }
                        else    
                                break;
                        
                }
                return R;
        }
        Follow(SimbNoTerm){
                let R = new Set();
                let Aux = new Set();
                let ListaPost = new Array();

                R.clear();
                let i,j,k;
                if(this.ArrReglas[0].InfSimbolo.Simbolo == SimbNoTerm)
                        R.add("$");
                for(i = 0;i<this.NumReglas;i++){
                        for(j = 0; j<this.ArrReglas[i].ListaLadoDerecho.length; j++){
                                if(this.ArrReglas[i].ListaLadoDerecho[j].Simbolo == SimbNoTerm){
                                        for(k=(j+1);k<this.ArrReglas[i].ListaLadoDerecho.length;k++){
                                                ListaPost.push(this.ArrReglas[i].ListaLadoDerecho[k]);
                                        }
                                        if(ListaPost.length == 0){
                                                if(!(this.ArrReglas[i].InfSimbolo.Simbolo == SimbNoTerm)){
                                                        let aux =this.Follow(this.ArrReglas[i].InfSimbolo.Simbolo);
                                                        aux.forEach(e=>{
                                                                R.add(e);
                                                        })
                                                }
                                                        
                                                break;
                                        }
                                        
                                        Aux.clear();
                                        Aux = this.First(ListaPost);                                                                          
                                        if(Aux.has("epsilon")){
                                                Aux.delete("epsilon");
                                                Aux.forEach(e=>{
                                                        R.add(e);
                                                });
                                                if(!(this.ArrReglas[i].InfSimbolo.Simbolo == SimbNoTerm)){
                                                        let aux = this.Follow(this.ArrReglas[i].InfSimbolo.Simbolo);
                                                        aux.forEach(e=>{
                                                                R.add(e);
                                                        })
                                                }
                                                        
                                        }
                                        else
                                                Aux.forEach(e=>{
                                                        R.add(e);
                                                });
                                }

                        }
                }
                return R;
                
        }
}