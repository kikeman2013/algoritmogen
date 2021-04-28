import {generacion1 , generaciones } from "./basealgoritmo.js";

let arr1 = new Array();
let arr2 = new Array();
let arrays = [20];
let escenario = new Array();

for(let i = 0; i < 20; i++){
   arrays[i] = new Array();
}

generacion1(arrays[0]);

for(let i = 1; i < 20; i++){
  generaciones(arrays[i] , arrays[i-1]);
  console.log(arrays[i]);
}



