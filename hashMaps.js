/* eslint-disable no-undef */
class HashMap {
  constructor(initialCapacity = 8) {
    //length is as well as capacity
    this.length = 0;
    //hashtable will hold all of the data and is considered the hash table
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }
  //_hashString function takes a string and hashes it, outputting a number.
  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      //Bitwise left shift with 5 0s - this would be similar to
      //hash*31, 31 being the decent prime number
      //but bit shifting is a faster way to do this
      //tradeoff is understandability
      hash = (hash << 5) + hash + string.charCodeAt(i);
      //converting hash to a 32 bit integer
      hash = hash + hash;
    }
    //making sure hash is unsigned - meaning non-negative number. 
    return hash >>> 0;
  }

  //The MAX_LOAD_RATIO is the highest that
  // the ratio between the length and the capacity will be allowed to reach.
  //MAX_LOAD_RATIO, we keep track of how full the hashmap is. When it is a certain % full,
  // we move to a bigger hash table using the SIZE_RATIO so we reduce the number of collisions.

  //set() function initially checks whether the load ratio is greater than the given maximum.
  //O(1) best and average case, and an O(n) worst case (if collision takes place).
  //the function finds the appropriate slot, and adds an object to the array containing the key/value pair, increasing the length.
  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    //find the slow where this key should be in
    const index = this._findSlot(key);

    if (!this._hashTable[index]) {
      this.length++;
    }
    this._hashTable[index] = {
      key,
      value,
      DELETED: false,
    };
  }

  delete(key) {
    const index = this._findSlot(key);
    const slot = this._hashTable[index];
    if (slot === undefined) {
      throw new Error("Key error");
    }
    slot.DELETED = true;
    this.length--;
    this._deleted++;
  }
  // _findSlot() is used to find the correct slot for a given key.
  //best and average-case performance for the _findSlot() function is O(1);
  //In the worst case, it's O(n), as you have to linearly search through each slot.
  _findSlot(key) {
    //_hashString() function to calculate the hash of the key, and then uses the modulus to find a slot for the key within the current capacity.
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;
    //loops through the array, stopping when it finds the slot with a matching key or an empty slot.
    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      //_hashTable array will never be full due to our maximum load factor, so the function will always return a slot.
      const slot = this._hashTable[index];
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    }
  }
  //resize can actually clear out all of the deleted items. 
  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    //reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }
}

module.exports = HashMap;