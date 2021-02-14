/* eslint-disable no-undef */
const HashMap = require("./hashMaps");

function main() {
  let lotr = new HashMap();

  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;

  lotr.set("Hobbit", "Bilbo");
  lotr.set("Hobbit", "Frodo");
  lotr.set("Wizard", "Gandalf");
  lotr.set("Human", "Aragorn");
  lotr.set("Elf", "Legolas");
  lotr.set("Maiar", "The Necromancer");
  lotr.set("Maiar", "Sauron");
  lotr.set("RingBearer", "Gollum");
  lotr.set("LadyOfLight", "Galadriel");
  lotr.set("HalfElven", "Arwen");
  lotr.set("Ent", "Treebeard");

  console.log(lotr);

  console.log(lotr.get("Maiar"));
  console.log(lotr.get("Hobbit"));
  console.log(lotr._capacity);
}

main();

// Q1. Create a HashMap class

//Have you hashed all the items you were asked to?

// A) No, 2 items are not empty. 'Maiar', 'Hobbit' is duplicate value;

//What are the values of Maiar and Hobbit that you have? Is there a discrepancy? Explain your answer.

// A) 'Maiar' => Sauron / 'Hobbit' => Frodo // showing later value because doens't exist resolve collision

//What is the capacity of your hash table after you have hashed all the above items? Explain your answer.

// A) capacity : 24 / initialCapacity = 8 / resize (Size_ratio) 3 times

// Q2.

const WhatDoesThisDo = function () {
  let str1 = "Hello World.";
  let str2 = "Hello World.";
  let map1 = new HashMap();
  map1.set(str1, 10);
  map1.set(str2, 20);
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3, 20);
  map2.set(str4, 10);

  console.log(map1.get(str1));
  console.log(map2.get(str3));
};
WhatDoesThisDo();

//A) map1(str1.value) = 20 / map2(str3.value) = 10; / map1, map2 . key = "Hello World."

// Q4 Remove duplicate
//Implement a function to delete all duplicated characters in a string and keep only the first occurrence of each character.
//input : google
//output : gole

function removeDuplicate(string) {
  const duplicateMap = new HashMap();

  for (let i = 0; i < string.length; i++) {
    duplicateMap.set(string[i]);
  }
  let newString = "";

  duplicateMap._hashTable.forEach((str) => {
    newString += str.key;
  });
  return newString;
}

console.log(removeDuplicate("google")); //gole
console.log(removeDuplicate("google all that you think can think of")); //acefg hiklnotuy

// Q5. Any permutation a palindrome
//Write an algorithm to check whether any anagram of some string is a palindrome.

function palindrome(string){
  const palindromeMap = new HashMap();

 for(let i = 0 ; i < string.length ; i++){
   try{
     //console.log(string);
     //console.log(string[i])
     palindromeMap.delete(string[i]);
   }
   catch(error){
     palindromeMap.set(string[i]);
   }
 }

 if(palindromeMap.length <= 1){
   return true;
 }else{
   return false;
 }
}

console.log(palindrome('acccarr'));
console.log(palindrome('north'));

// Q6. Anagram grouping
//Write an algorithm to group a list of words into anagrams. 
//  input : ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']
//  output: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]

function anagramGrouping(array){
  let newArray = [];
  const anagramMap = new HashMap();

  array.forEach(string => {
    let word = string.split("").sort().join();

    try{
      //get the index value of the word string/key in the hashmap
      // index will be unique for each matching word
      //insert word into group of words with the same letters
      let index = anagramMap.get(word);
      newArray[index].push(string);
    }
    catch(error){
      //insert word into hashmap
      //if a unique set of letter, create a new array within the result array
      anagramMap.set(word, newArray.length);
      newArray.push([string]);
    }
  })
  return newArray;
}

console.log(anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));

