export default class Stack{
    constructor(){
        this.items = {};
        this.top = -1;
    }

    push(data){ 
        this.top++;
        this.items[this.top] = data;
        
    }
    pop(){
        let data =  this.items[this.top];
        delete  this.items[this.top];
        this.top--;
        return data;
    }
    isEmpty(){
        if(this.top == -1)
            return true;
        return false;
    }
    
}

