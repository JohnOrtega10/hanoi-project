import Stack from "./Stack";

class Tower {
  constructor() {
    this.stack = new Stack();
  }

  add(disk) {
    if (this.stack.isEmpty() || disk < this.stack.top.value) {
      this.stack.push(disk);
    }
  }

  moveTopTo(destinationTower) {
    if (destinationTower.stack.isEmpty() || this.stack.top.value < destinationTower.stack.top.value) {
      let disk = this.stack.top.value;
      this.stack.pop(); 
      destinationTower.add(disk);
      return true
    }
    return false
  } 

}

export default Tower;
