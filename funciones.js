// ladoIzq(s){
//         let token;
//         let node;
//         token = Scanner.yylex();
//         if(token == simbolo){
//                 s = Scanner.yylex();
//                 return true;
//         }
//         return false;
// }

// secSimbolos(s){
//         let token;
//         token = Scanner.yylex();
//         if(token==Simbolo){
//                 let node = new NodeList(Scanner.yytext());
//                 if(secSimbolos())
//         }
// }

export default function eqSet(as, bs) {
        if (as.size !== bs.size) return false;
        for (var a of as) if (!bs.has(a)) return false;
        return true;
    }