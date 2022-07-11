class Node {
  constructor(value) {
    this.id = `Tile-${value}`;
    this.value = value;
    this.width = 2 * value;
    this.next = null;
  }
} 

class Stack {
  constructor(size) {
    this.top = null;
    this.maxSize = size;
    this.size = 0;
  }

  push(value) {
    let newNode = new Node(value);
    if (this.size !== this.maxSize && !this.top) {
      this.top = newNode;
    } else if (this.size !== this.maxSize && this.top) {
      newNode.next = this.top;
      this.top = newNode;
    } else {
      return console.log('Error: la pila está llena');
    }
    this.size++;
    return this;
  }

  pop() {
    if (this.size === 0) {
      return null;
    }
    const topNode = this.top;
    this.top = this.top.next;
    this.size--;
    return topNode;
  }

  peek() {
    return this.top;
  }

  isFull() {
    return this.size === this.maxSize;
  }

  isEmpty() {
    return this.size === 0; 
  }

  traverse() {
    let currentNode = this.top;
    let list = [];
    while (currentNode) {
      let tempNode = Object.assign({}, currentNode);
      tempNode.next = null;
      list.push(tempNode);
      currentNode = currentNode.next;
    }
    return list;
  }

  resetDisks(){
    this.top = null
    this.size = 0
  }
}

export default Stack;
