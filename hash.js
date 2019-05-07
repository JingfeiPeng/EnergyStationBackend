// const bcrypt  = require('bcrypt')

// // 1234 = abcd, need to use a saw
// // generate a salt, something thats before each password
// async function run(){
//     const salt = await bcrypt.genSalt(10)
//     const hashed = await bcrypt.hash('1234', salt)) //1234 is passowrd
//     console.warn(salt)
// }

// run()

// const asyncFunction  = async () =>{
//     return new Promise(function(resolve,reject){
//         setTimeout(()=>{
//             reject('HELLLO')
//         },1000);
//     })
// }

// function test(){
//     asyncFunction()
//     .then(res => console.log(res))
//     .catch(err => console.log('Error:'+err))

// }

// test()

// const date = new Date("2015")
// const date2 = new Date("2016")
// console.log(date)
// console.log(date2)
// console.log(date < date2)

// class aClass{
//     constructor(){
//         this.x = 10;
//     }
// }

// let obj = new aClass(1)
// console.log(obj.x)

// this.x = -1;

let objInObj = {
    x:10,
    obj:{
        x:100,
        f: () =>{
            console.log(this);
            this.x = 1000;
        }
    },
    func () {console.log(this)}
}

objInObj.func()

// class funcInClass{
//     constructor(){
//         this.x = 10;
//     }

//     obj(){
//         let x = 100;
//         let f = () => {console.log(this.x)}
//         return f;
//     }
// }

// class MyClass {
//     y = 2;
//     static z = 3;
//     showZ(){
//         console.log(MyClass.z)
//     }
  
// }

// console.log( MyClass.z ); // 3
// var b = new MyClass();
// b.showZ()
// objInObj.obj.f();
// new funcInClass().obj()()





