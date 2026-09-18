

let a = prompt("enter 1st number ");  // innme dono me number bhi input krengre to string me hi input hoga int me nhi
let b = prompt("enter 2nd number "); // innme dono me number bhi input krengre to string me hi input hoga int me nhi

// let sum = parseInt(a) + parseInt(b);  // convert a string into integer value
// agar a = "hello " de ya fir koi word to output me error nhi dega output me NaN (Not a Number) dega lekin hmm chahte hai ki yesse me error de to ek condition ka use krenge
// agar javascript me code me error aa jaye to code uske aage run nhi hoga


// if(isNaN(a) || isNaN(b)){  
//     throw SyntaxError ("input is invalid CUSTOM ERROR");
// }
// console.log("The sum is ", sum);


// console.log("the sum is ",sum*x);  // ye error show krega kyuki x is not defined

// iss error ko handle krna chahte hai to try and cathc ka use krenge
// try{
//     console.log("the sum is ", sum * x);
// }catch(error){
//     console.log("Error aa gaya bahi");
// }


// yeha ek finally keyword ka use krr ke dekh rhe hai 
// finally word tbb use krte hai jabb function se kuch return krne ke badh bhi kuch code ko execute krana hota hia to . waisse to function se return krne ke badh uss function ka code execute nahi hota hai lekin finally keyword ka use se aage ka code ko execute krr skte hai 

function main(){  // called function
    try{
        console.log(sum*x);
        return true;
    }catch(error){
        console.log("errror aa gaya");
        return false;
    }

    finally{

        console.log("hello code is end");
    }
}
main(); // calling function

