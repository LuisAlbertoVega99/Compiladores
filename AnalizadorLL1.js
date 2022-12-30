import DescRecGramGram from "./DescRecGramGram.js";
import analizador_lexico from "./analizador_lexico.js";
import Queue from "./cola.js";
import terminales from "./terminales.js"
import Stack from "./pila.js";
export default class AnalizadorLL1{
        arregloterminales;
        Tabla = new Array();
        cadena;
        idAutGram;
        DescRecG;
        LexGram;
        Gram;
        Sigma;
        TablaLR0;
        Vtt;//tokens
        Vt = new Set();
        Vnt;//tokens
        Vn = new Set();
        V = new Set();
        ArchAFDLexiGramGram;
        constructor(CadGramatica,ArchAFDLexic){
                this.Gram = CadGramatica;
                this.DescRecG = new DescRecGramGram(CadGramatica,ArchAFDLexic);
        }
        SetLexico(cadena,afdlexico){
                this.LexGram = new analizador_lexico (cadena,afdlexico);
        }
        CrearTablaLL1(){
                let resultfirst = new Set();
                let resultfollow = new Set();
                resultfirst.clear();
                resultfollow.clear();
                this.arregloterminales = new Array(this.DescRecG.Vt.size);
                this.DescRecG.Analizar_Gramatica();
                this.DescRecG.Vt.forEach(v=>{
                        this.arregloterminales.push(new terminales(v,0));
                })
                this.arregloterminales.push(new terminales("$",0));
                this.DescRecG.Vt.forEach(s => {
                        this.V.add(s);
                        this.Vt.add(s);
                });
                console.log(this.DescRecG.Vt)
                this.DescRecG.Vn.forEach(s => {
                        this.V.add(s);
                        this.Vn.add(s)
                })
                this.DescRecG.Vn.forEach(vtn=>{
                        let fila = new Array(this.DescRecG.Vt.size+2);
                        fila.fill(-1,0,fila.length);
                        fila[0] = vtn;
                        this.Tabla.push(fila);
                })
                for(let i = 0;i<this.DescRecG.ArrReglas.length;i++){
                        if(this.DescRecG.ArrReglas[i] != undefined){

                                resultfirst = this.DescRecG.First(this.DescRecG.ArrReglas[i].ListaLadoDerecho);
                                console.log(this.DescRecG.ArrReglas[i].ListaLadoDerecho)
                                if(resultfirst.has("epsilon")){
                                        resultfollow = this.DescRecG.Follow(this.DescRecG.ArrReglas[i].InfSimbolo.Simbolo);
                                        console.log(resultfollow);
                                        this.llenaTabla(resultfollow,i,this.DescRecG.ArrReglas[i].InfSimbolo.Simbolo);
                                }
                                else{
                                        this.llenaTabla(resultfirst,i,this.DescRecG.ArrReglas[i].InfSimbolo.Simbolo);
                                        console.log(resultfirst)
                                }
                        }
                       else{
                                break;
                       }
                }
                console.log(this.Tabla);
        }
        llenaTabla(C,NumRegla,Regla){
                C.forEach(result=>{
                        let j = this.obtenerIndice(result);
                        for(let i = 0;i<this.Tabla.length;i++){
                                if(Regla == this.Tabla[i][0]){
                                        this.Tabla[i][j+1] = NumRegla + 1;
                                }
                        }
                })
        }
        obtenerIndice(Simbolo){
                for(let i = 0;i<this.arregloterminales.length;i++){
                        if(Simbolo == this.arregloterminales[i].simbolo){
                                return i;
                        }
                }
                return -1;
        }
        Analiza_cadena(){
                let pila = new Stack();
                let pila_aux = new Stack();
                this.cadena = this.cadena + "$";
                pila.push("$");
                pila.push("E");
                while(true){
                        let token = this.LexGram.yylex();
                        for(let i = 0; i<this.arregloterminales;i++){
                                console.log(this.arregloterminales[i].token);
                                // if(token == this.arregloterminales[i].token){
                                        // let fila = pila.pop();
                                        // let renglon = this.obtenerfila(fila);
                                        // let col = this.obtenerIndice(this.arregloterminales[i].simbolo);
                                        // let num_regla = this.Tabla[renglon][col];
                                        // console.log(this.Tabla[renglon][col]);
                                        // this.DescRecG.ArrReglas[num_regla].ListaLadoDerecho.forEach(n=>{
                                                // pila_aux.push(n.Simbolo);
                                        // })
                                        // 
                                // }
                        }
                        // if(token == 2000)
                                // break;
                        // else if( token == 0){
                                // console.log("CAdena correcta")
                                // break;
                        // }
                        // else{
                                // 
                        // }
                        // 
                }
        }
        obtenerfila(NT){
                for(let i = 0;i<this.Tabla.length;i++){
                        if(Tabla[i][0] == NT)
                                return i;
                }
        }
}