export default class ConjI{
        j;
        ConjEdos;
        TransicionesAFD;
        token;

        constructor(){
                this.ConjEdos = new Set();
                this.j = -1;
                this.TransicionesAFD = new Array(256);
                this.TransicionesAFD.fill(-1,0,256);
                this.token = -1;
        }
  
}