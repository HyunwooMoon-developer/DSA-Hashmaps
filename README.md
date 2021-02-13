# Working with hash maps

## Hash maps

Hash maps are unordered associations between keys and values.
Objects are just hash maps, with some additional prototype cleverness thrown in for good measure.
With hashmaps, if we store the element as a key in the hashmap, the number of comparisons that we would need to do to find out the key would be constant O(1) and it would not depend on the number of elements stored in the hashmap.

## Key Terminology in hash maps

Hash table: The storage the holds the records (the key, and the value associated with the key)

Hash function: A function which maps keys to positions in the hash table
- Convert data of an arbitrary size to data of a fixed size
  (E.g. Any string to a 32-bit integer)
- The same input will always give the same output
- For hash maps, converts the key to an integer index into the data table

Hashing: The process of mapping keys to position using a hash function

## collision

When two keys hash to the same position.
When a new entry hashes to a location in the hash table that is already occupied, it is said to collide with the existing entry. can't just replace the 1st value, because then would be losing a key/value pair.

generally 2 ways to resolve collisions. 

### Open addressing

hash the key to the empty slot nearest to where it should live.

### Separate chaining

linked lists to hash the keys that run into collision. When a key collides with another, use the next pointers to put the keys in a linked list.