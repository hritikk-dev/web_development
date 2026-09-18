let resBox = document.querySelector(".solution");
let buttuns = document.querySelectorAll(".btn");
let arr = Array.from(buttuns);


let str = "";

buttuns.forEach((btn) =>{
    btn.addEventListener("click", ()=>{
        let id = btn.getAttribute("id");

        if(id == "equal"){
            // let res = (eval(str));
            // resBox.innerText = res;
            
            try{
                let res = eval(str);
                resBox.innerText = res;
                str = ""; // result print hone ke badh  str ko empty krr diye 
            }catch{
                resBox.innerText = "Error";
                str = "";
            }

        }

        else if(id == "ac"){
            str = ""; // ac press krne ke badh str ko empty krr dena hai bss aur resBox me display krr dena hai 0
            resBox.innerText = "0";
        }

        else if(id == "de"){
            str = str.slice(0,-1);  // slice the string from 0th index to size -1 
            if(str === ""){
                str = "";
                resBox.innerText = "0";
            }
            else{
                resBox.innerText = str;
            }
        }

        
        else{
            if(str === "0"){
                str = "";
            }
            str += btn.innerText;
            resBox.innerText = str;

        }
    })
})





