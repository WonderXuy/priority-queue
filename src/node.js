class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left == null){
			this.left = node;
			node.parent = this;
		}
		else if(this.right == null){
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if(this.left==null&&this.right==null){
			throw new Error('there is no any child');
		}
		else if(this.left!=null&&this.left.data==node.data){
			this.left = null;
			node.parent = null;
		}
		else if(this.right!=null&&this.right.data==node.data){
			this.right = null;
			node.parent = null;	
		}
		else{
			throw new Error('passed node is not a child of this node');
		}
	}

	remove() {
		if(this.parent!=null){
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent==null) return;
		let bufParent = this.parent;
		let bufParOfPar = this.parent.parent;
		let bufLeft = this.left;
		let bufRight = this.right;
	
		if (bufParOfPar!=null) {
		  if (bufParOfPar.left === bufParent) {
			bufParOfPar.left = this;
		  } else if (bufParOfPar.right === bufParent) {
			bufParOfPar.right = this;
		  }
		}
		if (this.parent!=null) {
		  if (this.parent.left === this) {
			this.parent.parent = this;
	
			if (this.parent.right) {
			  this.parent.right.parent = this;
			  this.right = this.parent.right;
			}
	
			if (bufLeft!=null) {
				bufLeft.parent = this.parent;
			  this.parent.left = bufLeft;
			} else {
			  this.parent.left = null;
			}
	
			if (bufRight!=null) {
				bufRight.parent = this.parent;
			  this.parent.right = bufRight;
			} else {
			  this.parent.right = null;
			}
	
			this.left = this.parent;
			this.parent = bufParOfPar;
	
		  } else {
			this.parent.parent = this;
	
			if (this.parent.left) {
			  this.parent.left.parent = this;
			  this.left = this.parent.left;
			}
			if (bufLeft!=null) {
				bufLeft.parent = this.parent;
			  this.parent.left = bufLeft;
			} else {
			  this.parent.left = null;
			}
			if (bufRight!=null) {
				bufRight.parent = this.parent;
			  this.parent.right = bufRight;
			} else {
			  this.parent.right = null;
			}
			this.right = this.parent;
			this.parent = bufParOfPar;
		  }
		}
	  }
}

module.exports = Node;
