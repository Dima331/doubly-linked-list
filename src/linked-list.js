const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let newNode = new Node(data);

        if (this.length) {
            newNode.prev = this._tail;
            this._tail.next = newNode;
            this._tail = newNode;
        } else {
            this._head = newNode;
            this._tail = newNode;
        }
        this.length++;
        return this;
    }

    head() {
        if (this._head === null) {
            return null
        } else {
            return this._head.data
        }

    }

    tail() {
        if (this._tail === null) {
            return null
        } else {
            return this._tail.data
        }
    }

    at(index) {
        let tmpHead = this._head;

        for (let i = 0; i < index; i++) {
            tmpHead = tmpHead.next;
        }
        return tmpHead.data;
    }

    insertAt(index, data) {
        let newNode = new Node(data);
        let tmpHead = this._head;
        let before;

        if (this.length == 0) {
            this.append(data)
            return this
        }
        if (index === 0) {
            this._head = newNode;
            this._head.prev = null;
            this._head.next = tmpHead;
            tmpHead.prev = this._head;
        } else {
            for (let i = 0; i < index; i++) {
                tmpHead = tmpHead.next;
            }
        }
        before = tmpHead.prev;
        before.next = newNode;
        newNode.prev = before;
        newNode.next = tmpHead;
        tmpHead.prev = newNode;

        this.length++;
        return this;
    }

    isEmpty() {
        if (this.length === 0) {
            return true
        } else {
            return false
        }
    }

    clear() {
        this._head = null
        this._tail = null
        this.length = 0
        return this;
    }

    deleteAt(index) {
        let tmpHead = this._head;
        let before, after;
        if (this.length == 1) {
            this.clear()
            return this
        } else if (index > this.length) {
            return this
        }
        if (index === 0) {
            this._head = this._head.next
            this._head.prev = null
            return this
        } else if (index === this.length - 1) {
            this._tail = this._tail.prev
            this._tail.next = null
            return this
        } else {
            for (let i = 0; i < index; i++) {
                tmpHead = tmpHead.next;
            }
            after = tmpHead.next;
            before = tmpHead.prev;
            before.next = after
            after.prev = before
        }
        this.length--;
        return this;
    }

    reverse() {
        let tmpNode = this._head;
        let before, after;
        let reverse;
        if (this.length == 1) {
            return this
        }
        for (let i = 0;  i < this.length; i++) {
            after = tmpNode.next;
            tmpNode.next = before;
            tmpNode.prev = after;
            before = tmpNode;
            tmpNode = after;
        }

        reverse = this._tail;
        this._tail = this._head;
        this._head = reverse;
        return this;
    }

    indexOf(data) {
        let tmpHead = this._head;

        for (let i = 0; i < this.length; i++) {
            if (tmpHead.data == data) {
                return i
            }
            tmpHead = tmpHead.next;
        }
        return -1
    }
}

module.exports = LinkedList;