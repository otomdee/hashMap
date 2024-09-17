class Node {
    constructor(key = null, value = null, nextNode = null) {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}

function hashFunc(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
 
    return hashCode;
}

class HashMap {
    constructor() {
        this.buckets = [];
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.mapLength = 0;
    }
    set(key, value) {
        const hash = hashFunc(key) % this.capacity;
        const node = new Node(key, value);

        if (!(this.buckets[hash])) {
            this.buckets[hash] = node;
            this.mapLength++;
        }
        else {
            //deal with collision
                let item = this.buckets[hash];
                do {
                    if (item.key === key) {
                        item.value = value;
                        break
                    }
                    else if (item.nextNode === null) {
                        item.nextNode = node;
                        this.mapLength++;
                        break
                    }
                    item = item.nextNode;
                }
                while(!(item === null));
        }
        //check if load factor is reached
        if (this.mapLength > (this.capacity * this.loadFactor)) {
            this.resize();
        }
    }
    get(key) {
        const hash = hashFunc(key) % 16;
        let item = this.buckets[hash];
            do {
                if (item.key === key) {
                    return item.value;
                }
                item = item.nextNode;
            }
            while (!(item === null))
            return null;
    }
    has(key) {
        if (this.get(key)) {
            return true
        }
        else {
            return false;
        }
    }
    remove(key) {
        const hash = hashFunc(key) % 16;
        let item = this.buckets[hash];
        if (this.has(key)) {
            let lastItem;
            do {
                if (item.key === key) {
                    //head of linkedlist
                    if(item === this.buckets[hash]) {
                        this.buckets[hash] = item.nextNode;
                    }
                    //not head
                    else {
                        lastItem.nextNode = item.nextNode;                       
                    }
                   this.mapLength--;
                   return true;
                }
                lastItem = item;
                item = item.nextNode;
            }
            while (!(item === null));
        }
        else {
            return false
        } 
    }
    length() {
        return this.mapLength;
    }
    clear() {
        this.buckets = [];
    }
    keys() {
        let keyArray = [];
        this.buckets.forEach((listItem) => {
            if (listItem) {
                let item = listItem;
                do {
                    keyArray.push(item.key);
                    item = item.nextNode;
                }
                while(!(item === null));
            }
        })
        return keyArray;
    }
    values() {
        let valueArray = [];
        this.buckets.forEach((listItem) => {
            let item = listItem;
            do {
                valueArray.push(item.value);
                item = item.nextNode;
            }
            while(!(item === null));
        })
        return valueArray;
    }
    entries() {
        let entriesArray = [];
        this.buckets.forEach((listItem) => {
            let item = listItem;
            do {
                entriesArray.push([item.key, item.value]);
                item = item.nextNode;
            }
            while(!(item === null));
        })
        return entriesArray;
    }

    resize() {
        let newArray = [];
        this.mapLength = 0;
        this.capacity = this.capacity * 2;
        //reference current buckets array
        let oldArray = this.buckets;
        //change this.buckets to point to new array
        this.buckets = newArray;
        //copy buckets from oldArray into newArray
        oldArray.forEach((listItem) => {
            let item = listItem;
            do {
                this.set(item.key, item.value);
                item = item.nextNode;
            }
            while(!(item === null))
        })
        //free up oldArray
        oldArray = [];
    }
}

class setNode {
    constructor(key = null, nextNode = null) {
        this.key = key;
        this.nextNode = nextNode;
    }
}

//hashSet class with only keys
class HashSet {
    constructor() {
        this.buckets = [];
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.mapLength = 0;
    }

    set(key) {
        const hash = hashFunc(key) % this.capacity;
        const node = new setNode(key);

        if (!(this.buckets[hash])) {
            this.buckets[hash] = node;
            this.mapLength++;
        }
        else {
            //deal with collision
                let item = this.buckets[hash];
                do {
                    if (item.nextNode = null) {
                        item.nextNode = node;
                        this.mapLength++;
                    }
                    item = item.nextNode;
                }
                while(!(item === null));
        }
        //check if load factor is reached
        if (this.mapLength > (this.capacity * this.loadFactor)) {
            this.resize();
        }
    }
}