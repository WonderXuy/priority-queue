const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	push(data, priority) {
		let node = new Node(data,priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.length++;
	}

	pop() {
		if(!this.isEmpty()){
			let detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			return detached.data;
		}
	}

	detachRoot() {
		if (this.parentNodes.indexOf(this.root) != -1) {
			this.parentNodes.shift();
		}
		let r = this.root;
		this.root = null;
		this.length--;
		return r;
	}

	restoreRootFromLastInsertedNode(detached) {
		if(this.isEmpty()) return;
			let lastN = this.parentNodes.pop();
			if(lastN!=null){
				let parent = lastN.parent;
				this.root = lastN;
				if(parent!=null){
					lastN.remove();
					if (parent.right==null && parent.left!=null && parent !== detached) {
						this.parentNodes.unshift(parent);
					}
				}
			}
			if(detached.left!=null){
				lastN.appendChild(detached.left);
			}
			if(detached.right!=null){
				lastN.appendChild(detached.right);
				return;
			} 
			this.parentNodes.unshift(lastN);
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return this.length===0;
	}

	clear() {
		this.root = null;
		this.parentNodes.length = 0;
		this.length = 0;
	}

	insertNode(node) {
		if(this.root==null){
			this.root = node;
			this.parentNodes.push(node);
			return;
		}
		else if(this.parentNodes[0].left==null){
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			return;
		}
		else if(this.parentNodes[0].right==null){
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if(node.parent!=null&&node.priority>node.parent.priority){
			if (node.parent == this.root) {
				this.root = node;
			}
			let nodeInd = this.parentNodes.indexOf(node);
			let parentInd = this.parentNodes.indexOf(node.parent);
			if (parentInd == -1) {
			  this.parentNodes[nodeInd] = node.parent;
			} else {
			  this.parentNodes[parentInd] = node;
			  this.parentNodes[nodeInd] = node.parent;
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (node == null || node.left == null) {
			return;
		}
		if(node.left!=null){
			let nodeToShift = node.left;
			if (node.right!=null && nodeToShift.priority <= node.right.priority){
				nodeToShift = node.right;
			}
			if(nodeToShift.priority>node.priority){
				const nodeToShiftInd = this.parentNodes.indexOf(nodeToShift);
				const nodeInd = this.parentNodes.indexOf(node);
				if (node === this.root) {
					this.root = nodeToShift;
				}
				if (nodeInd == -1) {
					this.parentNodes[nodeToShiftInd] = node;
				} else {
					this.parentNodes[nodeInd] = nodeToShift;
					this.parentNodes[nodeToShiftInd] = node;
				}
				nodeToShift.swapWithParent();
       			this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
