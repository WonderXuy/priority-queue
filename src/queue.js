const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
		this.Size = 0;
	}

	push(data, priority) {
		if(this.Size<this.maxSize){
			this.heap.push(data,priority);
			this.Size++;
		}
		else{
			throw new Error('the queue has max size');
		}
	}

	shift() {
		if(!this.isEmpty()){
			let val = this.heap.pop();
			this.Size--;
			return val;
		}
		else throw new Error('queue is empty');
	}

	size() {
		return this.Size;
	}

	isEmpty() {
	  return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
