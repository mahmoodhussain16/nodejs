// const math=require('./math')

//destructuring 
const {addfn,subfn}=require('./math')

// console.log("Hey there! I am JS")

// What is nodeJS?

// NodeJS is runtime Enviroment for javascript

// console.log(window)
//window objects & Dom related things removed in nodeJS
console.log(
    //    math.addfn(2,5),
    //    math.subfn(6,5)
   
   //destructuring
    addfn(2,5),
    subfn(6,5)
    )

