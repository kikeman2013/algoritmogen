let numcromosomas= 6 // prompt('Numero de Chromosomas');
let numgenes = 4//prompt('Numero de genes');
let cromosoma = [numcromosomas];
let generacion = new Array();



//funcion para la fx
let fx = (index) => cromosoma[index]["a"]+2*cromosoma[index]["b"]+3*cromosoma[index]["c"]+4*cromosoma[index]["d"]-30;
//funcion para sacar el fitness de cada cromosoma
let fitness = (index) =>(1/(1+fx(index)));
//funcion para sacar la suma de los fitness
let sumafitness = () => {
  let suma = 0;
  for (let i = 0; i < cromosoma.length; i++){
      suma += fitness(i);
  }
  return suma;
}

//funcion para sacar la probabilidad del cromosoma
let probabilidad = (index) => fitness(index)/sumafitness(); 

//funcion para sacar la cumulativa del cromosoma
let cumulative = (index) => {
  let comulative;
  if(index == 0 )
    comulative = probabilidad(index);
  else
   comulative = cumulative(index-1)+probabilidad(index);
  
   return comulative;
}


//funcion Range min - max Choose the max
let RangoEntre = (index) => {
  let select;
  if(generacion[index].randomNumber < generacion[0].cumulative)
    return generacion[0].indice;

  for(var clave in generacion) 
      if(generacion[index].randomNumber < generacion[clave].cumulative && generacion[index].randomNumber > generacion[clave-1].cumulative)
          select = generacion[clave].indice;  
        
  return select;
}


//funcion para sacar el crossover del
let crossover = () => {
  let menorde25 = [] //0:1 , 1:4 , 2:5
  for(var clave in generacion) 
      if(generacion[clave].randomNumber2 < .25)
          menorde25.push(generacion[clave].indice);  

  for(let i = 0 ; i <menorde25.length ; i++)
      if(i >0)
        generacion[menorde25[i]-1].crossover = menorde25[i-1];
     else
        generacion[menorde25[i]-1].crossover = menorde25[menorde25.length-1];
              
}

//funcion para sacar los genes con el crossover
let gen3 = (index) => {
  let aux = [];
  if (generacion[index].crossover !==undefined){
    aux = generacion[generacion[index].crossover-1].genes2;
  } else{
    aux = generacion[index].genes2
  }
     

  if(generacion[index].crossoverPoint ==0){
      aux.a = generacion[index].genes2.a;
  }
  if(generacion[index].crossoverPoint ==1){
      aux.a = generacion[index].genes2.a;
      aux.b = generacion[index].genes2.b;
  }
  if(generacion[index].crossoverPoint ==2){
      aux.a = generacion[index].genes2.a;
      aux.b = generacion[index].genes2.b;
      aux.c = generacion[index].genes2.c;  
  }
  if(generacion[index].crossoverPoint ==3){
      aux.a = generacion[index].genes2.a;
      aux.b = generacion[index].genes2.b;
      aux.c = generacion[index].genes2.c;
      aux.d = generacion[index].genes2.d;
  }
  
  return aux;

}



//funcion para generar la mutacion
let mutacion = () => {
  let totalgenes = numgenes*numcromosomas;
  let numerodemutacion = Math.floor( 0.1 * totalgenes );
  let arr =[];
  //asginamos valores random a cada mutacion
  //de 1 al total de genes para sacar un indice de gen 
  for(let i = 0 ; i <numerodemutacion;i++){
    arr.push(Math.round(Math.random()*totalgenes-1));
  }
  console.log(`Indices a modificar: ${arr}`)
  let numgen = 0, x = 0;
  //recoremos todos los genes para sacar el indice a modificar 
  //y asignamos un valor entre 0 y 30 aleatoriamente
  for(let i = 0 ; i <numcromosomas;i++){
    for(let j = 0 ; j <numgenes;j++){
      if(numgen == arr[x]){
        console.log('--------Mutando-----')
        console.log(generacion[i].crossgen)
        let random = Math.round(Math.random()*30);
        console.log(`se sustituira con : ${random}`);
        switch(j){
          case 0: 
            generacion[i].crossgen['a'] =random ;
            console.log(`Mutacion en el cromosoma ${i+1} en el gen a`);
          break;
          case 1:
            generacion[i].crossgen['b'] = random;
            console.log(`Mutacion en el cromosoma ${i+1} en el gen b`);
          break;
          case 2: 
            generacion[i].crossgen['c'] = random;
            console.log(`Mutacion en el cromosoma ${i+1} en el gen c`);
          break;
          case 3: 
            generacion[i].crossgen['d'] = random;
            console.log(`Mutacion en el cromosoma ${i+1} en el gen d`);
          break;
        }
        console.log(generacion[i].crossgen)
        i=0;
        j=0; 
        x+=1;
        numgen=0;
      }
      numgen++;
    }
  }
}




//for para generar que cada cromosoma tenga 4 genes
for (let i=0 ; i<numcromosomas ; i++){
    cromosoma[i] = new Array(numgenes);
}
//for para ponerles numeros ramdoms a los genes de cada crhomosoma
for (let i = 0 ; i < numcromosomas ; i++)
    cromosoma[i]={a:Math.round(Math.random()*30) , b:Math.round(Math.random()*30) ,c:Math.round(Math.random()*30) ,d:Math.round(Math.random()*30)};

//for para llenar la generacion
for (let i = 0 ; i <numcromosomas ; i++)
  generacion.push({'indice':i+1 , 'genes':cromosoma[i] , 'fx':fx(i) , 'fitness':fitness(i) , 'probabiliti':probabilidad(i) , 'cumulative':cumulative(i) , 'randomNumber':Math.random()});

//for para agregar el Rango min- max
for(let i = 0 ; i < numcromosomas ; i++){
  generacion[i].RangoEntre = RangoEntre(i);
}

//rango para sacar los segundos genes y el segundo numero ramdom
for (let i = 0 ; i <numcromosomas ; i++){
  generacion[i].genes2 = cromosoma[generacion[i].RangoEntre-1];
  generacion[i].randomNumber2 = Math.random()*.5;
}

crossover();

for (let i = 0 ; i <numcromosomas ; i++){
  if(generacion[i].crossover){
    generacion[i].crossoverPoint = Math.round(Math.random()*numgenes);
  }
  generacion[i].crossgen = gen3(i);
}

if(Math.random()*1 <.10)
mutacion();

console.log(generacion);


