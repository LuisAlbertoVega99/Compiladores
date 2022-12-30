
export default class Estado {
    ContadoridEstado = 0 ;
    IdEstado = 0;
    EdoAcept;
    Token;
    Trans = new Set(); 


    constructor(){
        this.EdoAcept = false;
        this.Token    = -1;
        this.IdEstado = ++(this.ContadoridEstado);
        this.Trans.clear();
    }
    
    getIdEstado(){
        return this.idEstado;
    }
    setIdEstado(value){
        this.idEstado = value;
    }
    getEdoAcept(){
        return this.EdoAcept;
    }
    setEdoAcept(value){
        this.EdoAcept = value;
    }
    
    getToken(){
        return this.Token;
    }
    setToken(value){
        this.Token = value;
    }
    getTrans(){
        return this.Trans;
    }
    setTrans(value){
        if(typeof value == "Set")
            this.Trans = value;
        else this.Trans.add(value);
    } 
}

