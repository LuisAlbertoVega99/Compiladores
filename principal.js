
import AFD from "./AFD.js";
import AnalizadorLL1 from "./AnalizadorLL1.js";
import analizador_lexico from "./analizador_lexico.js";
import AFN from "./claseAFN.js"
import DescRecGramGram from "./DescRecGramGram.js";
import ER_AFN from "./er_afn.js";
import EvaluadorExp from "./EvaluadorExp.js";
import AnalizadorLR0 from "./AnalizadorLR0.js"


let SimbolosEspeciales = {
        Epsilon : String.fromCharCode(5),
        FIN : 0,
        ERROR : 20000,
        OMITIR : 20001,    
}


let btn = document.querySelector(".crearbasico");
let btnunion = document.querySelector(".crearunion");
let btnconca = document.querySelector(".creaconca");
let btncerratrans = document.querySelector(".crearcerrtrans");
let btncerrkleen = document.querySelector(".crearcerrkleen");
let btnopn = document.querySelector(".crearopcional");
let creatabla = document.querySelector(".uneAFN");
let btnunirafn = document.querySelector(".unirafns");
let btnafntoafd = document.querySelector(".afnaafd");
let pal = document.querySelector(".pruebaanalisislex")
let ertoafn = document.querySelector(".conversion");
let btnguardarafd = document.querySelector(".guardarafd") ;
let btncalculadora = document.querySelector(".calcu");
let btnanalisisll1 = document.querySelector(".creatablall1");
let btnanalisislr0 = document.querySelector(".creatablalr0");
let btnprobarlexico = document.querySelector(".probarlexico");
let btnanalizasintac = document.querySelector(".analiza_cadena");

let arreglosAFN = new Array();
let arreglosAFD = new Array();
let analisis_LL1;

function creabasico(){
        let nuevoAFN = new AFN();
        nuevoAFN.IdAFN= parseInt(document.getElementById("id_afn").value);
        
        let dato1 = (document.getElementById("car_inf").value);
        let dato2 = document.getElementById("car_sup").value;
        if(dato1 == 10){
                console.log(String.fromCharCode(dato1))
                nuevoAFN.CrearAFNBasico(String.fromCharCode(dato1));
        }
        else if(dato1 == dato2){
                nuevoAFN.CrearAFNBasico(dato1);
        }
        else{
                nuevoAFN.CrearAFNBasico2(dato1,dato2)
        }

        alert("Automata creado");
        
        arreglosAFN.push(nuevoAFN)
        console.log(arreglosAFN );
}

function creaunion(){
        let dato1 = (document.getElementById("opcion_union1").value);
        let dato2 = (document.getElementById("opcion_union2").value);

        arreglosAFN[dato1-1].UnirAFN(arreglosAFN[dato2-1]);

        console.log(arreglosAFN[dato1-1]);
        arreglosAFN.pop()
        alert("AFN's Unidos")

}
function creaconca(){
        let dato1 = (document.getElementById("opcion_conca1").value);
        let dato2 = (document.getElementById("opcion_conca2").value);

        arreglosAFN[dato1-1].ConcaAFN(arreglosAFN[dato2-1]);


        console.log(arreglosAFN[dato1-1]);
        arreglosAFN.pop()
        alert("AFN´s concatenados");
}

function crearcerrpos(){
        let dato1 = document.getElementById("opn_cerrpos").value;

        arreglosAFN[dato1-1].CerrPos();
        alert("Ha sido aplicada Cerradura")
        console.log(arreglosAFN[dato1-1]);
}

function crearcerrkleen(){
        let dato1 = document.getElementById("opn_cerrkleen").value;
        arreglosAFN[dato1-1].CerrKleen();
        alert("Cerradura Kleen aplicada");
        console.log(arreglosAFN[dato1-1]);
}

function crearopcional(){
        let dato1 = document.getElementById("opnopn").value;

        arreglosAFN[dato1-1].Opcional();
        alert("Ha sido aplicado Opcional")
        console.log(arreglosAFN[dato1-1]);
}
function unionespecial(){
        let fila,campo,casilla,check,token,tok,texto,tabla;
        
                for(let i = 1;i<=arreglosAFN.length;i++){
                        fila = document.createElement("tr");
                        campo = document.createElement("td");
                        casilla = document.createElement("td");
                        check = document.createElement("input");
                        check.setAttribute("type", "checkbox");
                        check.setAttribute("class","valorcheck"+ i);
                        token = document.createElement("td");
                        tok = document.createElement("input");
                        tok.setAttribute("type","text");
                        tok.setAttribute("class","valortoken"+i);
                        tok.setAttribute("id","valortoken"+i);
                        token.appendChild(tok);
                        texto = document.createTextNode(i)
                        campo.appendChild(texto)
                        casilla.appendChild(check);
                        fila.appendChild(campo);
                        fila.appendChild(casilla);
                        fila.appendChild(token);
                        tabla = document.querySelector(".cuerpotabla").appendChild(fila);
                        
                }

}
function unirafn(){
        let cadena;
        let nuevoAFN = new AFN();
        
        for(let i = 0;i<arreglosAFN.length;i++){
                cadena = "valortoken"+(i+1)
                let valortoken= parseInt(document.getElementById(cadena).value);
                if(document.querySelector(".valorcheck" + (i + 1)).checked){
                        nuevoAFN.UnionEspecialAFN(arreglosAFN[i],valortoken);
                }
        }
        arreglosAFN.push(nuevoAFN);
        alert("AFN unidos")
}

function convierteafntoafd(){
        let nuevoAFD = new AFD();
        let dato1 = document.getElementById("idafnafd").value;
        nuevoAFD.TablaAFD = arreglosAFN[dato1- 1].ConvAFNaAFD();
        arreglosAFD.push(nuevoAFD);
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
        let caracteres = document.createElement("tr");
        thead.appendChild(caracteres);
        for(let i = 0; i< 256;i++){
                let caberera = document.createElement("td");
                let texto = document.createTextNode(String.fromCharCode(i));
                caberera.appendChild(texto);
                caracteres.appendChild(caberera);
        }
        let caberera =  document.createElement("td");
        let texto = document.createTextNode("token");
        caberera.appendChild(texto);
        caracteres.appendChild(caberera);
        for(let i = 0;i<nuevoAFD.TablaAFD.length;i++){
                let fila = document.createElement("tr");
                for(let j = 0; j< 257;j++){
                        let columna = document.createElement("td");
                        let dato =document.createTextNode(nuevoAFD.TablaAFD[i][j]);
                        columna.appendChild(dato)
                        fila.appendChild(columna);
                }
                tbody.appendChild(fila);
        }
        table.appendChild(thead);
        table.appendChild(tbody);
        document.querySelector(".tablaafd").appendChild(table);
        
        alert("AFD creado")
        

}
function pruebaanalisislexico(){
        let cad = document.getElementById("expreeval").value;
        let IDAFD = document.getElementById("idAFD").value;
        let afd;
        if(IDAFD == ""){
                let url = (document.getElementById("muestra").value)
                let cadena = url.split('\\');
                let nueva =cadena[cadena.length-1]
                let arreglosarr = new Array();
                let arrayData;
                let archivoTxt = new XMLHttpRequest();
                archivoTxt.open("GET",nueva,false);
                archivoTxt.send(null);
                let txt  = archivoTxt.responseText;//AFD con comas
                let aux = new Array() 
                aux = txt.split(",");// AFD sin comas
                let k = 0;
                let array = new Array()
                while(k < aux.length-1){
                        array.push(parseInt(aux[k++]))
                }
                let n = 0;
                k = 0
                while(k < array.length){
                        n = 0;
                        arrayData = new Array(257)
                        for(n = 0;n<258;n++){
                                if(n == 257){
                                        arreglosarr.push(arrayData)
                                }else{
                                        arrayData[n] = array[k++];
                                }
                        }
                }
                afd = new AFD(arreglosarr);
        }else{

                afd = new AFD(arreglosAFD[IDAFD-1].TablaAFD);
                console.log(afd)
        }
        
        let analizador = new analizador_lexico(cad,afd);
        let bandera = true;
        let token;
        let lexema ="";
        while(bandera){
                let fila = document.createElement("tr");
                let campo_lexema = document.createElement("td");
                let campo_token = document.createElement("td");
                let et1;
                let et2;
                token = analizador.yylex();
                if(token == SimbolosEspeciales.FIN){
                        bandera = false;
                }
                lexema = analizador.Lexema;
                et1 = document.createTextNode(lexema);
                et2 = document.createTextNode(token)
                campo_lexema.appendChild(et1);
                campo_token.appendChild(et2);
                
                fila.appendChild(campo_lexema);
                fila.appendChild(campo_token);
                document.querySelector(".tablalexico").appendChild(fila);
        }
        
}
function guardarAFD(){
        let nombreafd = document.getElementById("nombreafd").value;
        let idafd = document.getElementById("idAFD").value;
        let archivo = new Blob(arreglosAFD[idafd-1].TablaAFD,{type:"text/plain"})
        saveAs(archivo, nombreafd);
}

function ERaAFN(){
        let cad = document.getElementById("expresionr").value;
        let idafd = document.getElementById("idAFD").value;
        let afd;
        if(idafd == ""){
                let url = (document.getElementById("files").value)
                let cadena = url.split('\\');
                let nueva =cadena[cadena.length-1]
                let arreglosarr = new Array();
                let arrayData;
                let archivoTxt = new XMLHttpRequest();
                archivoTxt.open("GET",nueva,false);
                archivoTxt.send(null);
                let txt  = archivoTxt.responseText;//AFD con comas
                
                let aux = new Array() 
                aux = txt.split(",");// AFD sin comas
                let k = 0;
                let array = new Array()
                while(k < aux.length-1){
                        array.push(parseInt(aux[k++]))
                }
                let n = 0;
                k = 0
                
                while(k < array.length){
                        n = 0;
                        arrayData = new Array(257)
                        for(n = 0;n<258;n++){
                                if(n == 257){
                                        arreglosarr.push(arrayData)
                                }else{
                                        arrayData[n] = array[k++];
                                }
                        }
                }
                afd = new AFD(arreglosarr);
                console.log(afd)
        }else{
                afd = new AFD(arreglosAFD[IDAFD-1].TablaAFD);
                console.log(afd)
        }
        let expresion_regular = new ER_AFN(cad,afd);
        if(expresion_regular.IniConversion()){
                arreglosAFN.push(expresion_regular.result);
                alert("AFN creado");
        }else{
                alert("Error")
        }
        console.log(expresion_regular.result)
}

function calcular(){
        let cad = document.getElementById("expresion_arit").value;
        let idafd = document.getElementById("idAFD").value;
        let afd;
        if(idafd == ""){
                let url = (document.getElementById("afdcalculadora").value)
                let cadena = url.split('\\');
                let nueva =cadena[cadena.length-1]
                let arreglosarr = new Array();
                let arrayData;
                let archivoTxt = new XMLHttpRequest();
                archivoTxt.open("GET",nueva,false);
                archivoTxt.send(null);
                let txt  = archivoTxt.responseText;//AFD con comas
                
                let aux = new Array() 
                aux = txt.split(",");// AFD sin comas
                let k = 0;
                let array = new Array()
                while(k < aux.length-1){
                        array.push(parseInt(aux[k++]))
                }
                let n = 0;
                k = 0
                
                while(k < array.length){
                        n = 0;
                        arrayData = new Array(257)
                        for(n = 0;n<258;n++){
                                if(n == 257){
                                        arreglosarr.push(arrayData)
                                }else{
                                        arrayData[n] = array[k++];
                                }
                        }
                }
                afd = new AFD(arreglosarr);
                console.log(afd)
        }else{
                afd = new AFD(arreglosAFD[IDAFD-1].TablaAFD);
                console.log(afd)
        }
        let nuevaexpresion = new EvaluadorExp(cad,afd);
        if(nuevaexpresion.IniEval()){
                alert("Expresion sintacticamente correcta");
                console.log(nuevaexpresion.ExprPost);
                let postfija = document.createTextNode(nuevaexpresion.ExprPost);
                let resultado = document.createTextNode(nuevaexpresion.result);
                document.getElementById("valor").appendChild(resultado);
                document.getElementById("Postfija").appendChild(postfija);
        }
        else{
                alert("Expresion sintacticamente incorrecta")
        }
}
function LL1(){
        let cad = document.getElementById("textogramatica").value;
        let afd;
        if(true){
                let url = (document.getElementById("gramaticasafd").value)
                let cadena = url.split('\\');
                let nueva =cadena[cadena.length-1]
                let arreglosarr = new Array();
                let arrayData;
                let archivoTxt = new XMLHttpRequest();
                archivoTxt.open("GET",nueva,false);
                archivoTxt.send(null);
                let txt  = archivoTxt.responseText;//AFD con comas
                
                let aux = new Array() 
                aux = txt.split(",");// AFD sin comas
                let k = 0;
                let array = new Array()
                while(k < aux.length-1){
                        array.push(parseInt(aux[k++]))
                }
                let n = 0;
                k = 0
                
                while(k < array.length){
                        n = 0;
                        arrayData = new Array(257)
                        for(n = 0;n<258;n++){
                                if(n == 257){
                                        arreglosarr.push(arrayData)
                                }else{
                                        arrayData[n] = array[k++];
                                }
                        }
                }
                afd = new AFD(arreglosarr);
                console.log(afd)
        }
        analisis_LL1 = new AnalizadorLL1(cad,afd);
        analisis_LL1.CrearTablaLL1();
        creatablaterminales(analisis_LL1);
        creaTablaLL1(analisis_LL1);
 }

function creatablaterminales(analisis_LL1){
        let tablavn = document.createElement("table");
        let head_tablavn = document.createElement("thead");
        let fila_headvn = document.createElement("tr");
        let columna_headvn = document.createElement("td");
        let noterminalvn = document.createTextNode("Noterminal");
        columna_headvn.appendChild(noterminalvn);
        fila_headvn.appendChild(columna_headvn)
        head_tablavn.appendChild(fila_headvn);
        tablavn.appendChild(head_tablavn);
        document.querySelector(".tablas").appendChild(tablavn);
        let tbodyvn = document.createElement("tbody");
        tablavn.appendChild(tbodyvn);
        analisis_LL1.Vn.forEach(v =>{
                let fila = document.createElement("tr");
                let columna = document.createElement("td");
                let valor = document.createTextNode(v);
                columna.appendChild(valor);
                fila.appendChild(columna);
                tbodyvn.appendChild(fila);
        })
        let tok = 0;
        let tablavt = document.createElement("table");
        let head_tablavt = document.createElement("thead");
        let fila_headvt = document.createElement("tr");
        let columna_headvt = document.createElement("td");
        let noterminalvt = document.createTextNode("Terminal");
        let token = document.createElement("td");
        let textotoken = document.createTextNode("Token");
        token.appendChild(textotoken);
        columna_headvt.appendChild(noterminalvt);
        fila_headvt.appendChild(columna_headvt)
        fila_headvt.appendChild(token);
        head_tablavt.appendChild(fila_headvt);
        tablavt.appendChild(head_tablavt);
        document.querySelector(".tablas").appendChild(tablavt);
        let tbodyvt = document.createElement("tbody");
        tablavt.appendChild(tbodyvt);
        analisis_LL1.Vt.forEach(v =>{
                let fila = document.createElement("tr");
                let columna = document.createElement("td");
                let colum_token = document.createElement("td");
                fila.appendChild(columna);
                fila.appendChild(colum_token);
                let valor = document.createTextNode(v);
                columna.appendChild(valor);
                let casillatoken = document.createElement("input");
                casillatoken.setAttribute("type","text");
                casillatoken.setAttribute("class","token" + (++tok));
                casillatoken.setAttribute("id","token"+ tok);
                colum_token.appendChild(casillatoken)
                tbodyvt.appendChild(fila);
        })      
}
function probarlexico(){
        let cad = document.getElementById("textoprueba").value;
        let afd;
        if(true){
                let url = (document.getElementById("analizador_lexico").value)
                let cadena = url.split('\\');
                let nueva =cadena[cadena.length-1]
                let arreglosarr = new Array();
                let arrayData;
                let archivoTxt = new XMLHttpRequest();
                archivoTxt.open("GET",nueva,false);
                archivoTxt.send(null);
                let txt  = archivoTxt.responseText;//AFD con comas
                let aux = new Array() 
                aux = txt.split(",");// AFD sin comas
                let k = 0;
                let array = new Array()
                while(k < aux.length-1){
                        array.push(parseInt(aux[k++]))
                }
                let n = 0;
                k = 0
                while(k < array.length){
                        n = 0;
                        arrayData = new Array(257)
                        for(n = 0;n<258;n++){
                                if(n == 257){
                                        arreglosarr.push(arrayData)
                                }else{
                                        arrayData[n] = array[k++];
                                }
                        }
                }
                afd = new AFD(arreglosarr);
        }
        let analizador = new analizador_lexico(cad,afd);
        let bandera = true;
        let token;
        let lexema ="";
        while(bandera){
                let fila = document.createElement("tr");
                let campo_lexema = document.createElement("td");
                let campo_token = document.createElement("td");
                let et1;
                let et2;
                token = analizador.yylex();
                if(token == SimbolosEspeciales.FIN){
                        bandera = false;
                }
                lexema = analizador.Lexema;
                et1 = document.createTextNode(lexema);
                et2 = document.createTextNode(token)
                campo_lexema.appendChild(et1);
                campo_token.appendChild(et2);
        
                fila.appendChild(campo_lexema);
                fila.appendChild(campo_token);
                document.querySelector(".pruebaanalisislexico").appendChild(fila);
        }
        
}
function creaTablaLL1(analisis_LL1){
        let tabla = document.createElement("table");
        let thead = document.createElement("thead");
        let filahead = document.createElement("tr");
        for(let i = 0; i< analisis_LL1.arregloterminales.length+1; i++){
                let columnahead = document.createElement("td");
                if(i == 0){
                        let texto = document.createTextNode("No Terminal");
                        columnahead.appendChild(texto);
                        filahead.appendChild(columnahead)
                        continue;
                }
                let texto = document.createTextNode(analisis_LL1.arregloterminales[i-1].simbolo);
                columnahead.appendChild(texto);
                filahead.appendChild(columnahead);
        }
        thead.appendChild(filahead);
        tabla.appendChild(thead);
        let tbody = document.createElement("tbody");
        for(let i = 0;i<analisis_LL1.Tabla.length;i++){
                let filatbody = document.createElement("tr");
                for(let j = 0; j<analisis_LL1.arregloterminales.length+1;j++){
                        let columnatbody = document.createElement("td");
                        let texto = document.createTextNode(analisis_LL1.Tabla[i][j]);
                        columnatbody.appendChild(texto);
                        filatbody.appendChild(columnatbody);
                }
                tbody.appendChild(filatbody);   
        }
        
        tabla.appendChild(tbody)

        tabla.setAttribute("class","tablall1")
        document.querySelector(".p2").appendChild(tabla)
        
}
function LR0(){
        let gramatica = document.getElementById("textogramaticaLR0").value;
        let afd;
        if(true){
                let url = (document.getElementById("gramaticasgram").value)
                let cadena = url.split('\\');
                let nueva =cadena[cadena.length-1]
                let arreglosarr = new Array();
                let arrayData;
                let archivoTxt = new XMLHttpRequest();
                archivoTxt.open("GET",nueva,false);
                archivoTxt.send(null);
                let txt  = archivoTxt.responseText;//AFD con comas
                
                let aux = new Array() 
                aux = txt.split(",");// AFD sin comas
                let k = 0;
                let array = new Array()
                while(k < aux.length-1){
                        array.push(parseInt(aux[k++]))
                }
                let n = 0;
                k = 0
                
                while(k < array.length){
                        n = 0;
                        arrayData = new Array(257)
                        for(n = 0;n<258;n++){
                                if(n == 257){
                                        arreglosarr.push(arrayData)
                                }else{
                                        arrayData[n] = array[k++];
                                }
                        }
                }
                afd = new AFD(arreglosarr);
                console.log(afd)
        }
        let nuevoanalisis = new AnalizadorLR0(gramatica,afd);
        nuevoanalisis.CrearTablaLR0();
        console.log(nuevoanalisis.ResultIr_A);
}
function analiza_sintacticamente(){
        let cadena = document.getElementById("textoprueba").value;
        let afd;
        for(let i = 0;i<analisis_LL1.arregloterminales.length-1;i++){
                let aux  = "token" + (i+1);
               let valor = document.getElementById(aux).value;
               if(valor == null){
                break;
               }
                analisis_LL1.arregloterminales[i].token = valor;
        }
        if(true){
                let url = (document.getElementById("analizador_lexico").value)
                let cadena = url.split('\\');
                let nueva =cadena[cadena.length-1]
                let arreglosarr = new Array();
                let arrayData;
                let archivoTxt = new XMLHttpRequest();
                archivoTxt.open("GET",nueva,false);
                archivoTxt.send(null);
                let txt  = archivoTxt.responseText;//AFD con comas
                let aux = new Array() 
                aux = txt.split(",");// AFD sin comas
                let k = 0;
                let array = new Array()
                while(k < aux.length-1){
                        array.push(parseInt(aux[k++]))
                }
                let n = 0;
                k = 0
                while(k < array.length){
                        n = 0;
                        arrayData = new Array(257)
                        for(n = 0;n<258;n++){
                                if(n == 257){
                                        arreglosarr.push(arrayData)
                                }else{
                                        arrayData[n] = array[k++];
                                }
                        }
                }
                afd = new AFD(arreglosarr);
        }
        analisis_LL1.SetLexico(cadena,afd);
        analisis_LL1.Analiza_cadena();

}

btn.addEventListener('click',creabasico,true);
btnunion.addEventListener('click',creaunion,true);
btnconca.addEventListener('click',creaconca,true);
btncerratrans.addEventListener('click',crearcerrpos,true);
btncerrkleen.addEventListener('click',crearcerrkleen,true);
btnopn.addEventListener('click',crearopcional,true);
creatabla.addEventListener('click',unionespecial,true);
btnunirafn.addEventListener('click',unirafn,true);
btnafntoafd.addEventListener('click',convierteafntoafd,true);
ertoafn.addEventListener('click',ERaAFN,true);
btnguardarafd.addEventListener('click',guardarAFD,true);
pal.addEventListener('click',pruebaanalisislexico,true);
btncalculadora.addEventListener('click',calcular,true);
btnanalisisll1.addEventListener('click',LL1,true);
btnanalisislr0.addEventListener("click",LR0,true);
btnprobarlexico.addEventListener('click',probarlexico,true);
btnanalizasintac.addEventListener('click',analiza_sintacticamente,true);