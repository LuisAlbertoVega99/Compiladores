export default class Queue {
        elementos = [];
        
       
        enqueue = (elemento) => {
                return this.elementos.splice(0, 0, elemento);
        }
        dequeue = () => {
          return this.elementos.pop();
        }
        isempty = () => {
          return this.elementos.length === 0;
        }
        empty = () => {
          this.elementos.length = 0;
        }
        size = () => {
          return this.elementos.length;
        }
}