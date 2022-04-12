let button = document.getElementById("btn-signup");
let passwordElement = document.getElementById("txt-password");
let emailElement = document.getElementById("txt-email");
let repasswordElement = document.getElementById("txt-passwordconfirm");
let usernameElement = document.getElementById("txt-username");
const checkEmail =(email)=>{
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        emailElement.style.borderColor ="green"
        return true;
    }else{
        emailElement.style.borderColor ="red"
        return false;
    }
   ;
}
const checkPassword =(password)=>{
    if(password.length>7){
        passwordElement.style.borderColor = "green"
        return true;
    }else{
        passwordElement.style.borderColor = "red"
        return false;
    }

}
const checkRePassword = (repassword)=>{
    if(repassword === passwordElement.value){
        repasswordElement.style.borderColor = "green"
        return true;
    }else{
        repasswordElement.style.borderColor = "red"
        return false;
    }
}
const checkUsername =(username)=>{
    if(username.length >7 && !username.includes(" ")){
        usernameElement.style.borderColor = "green"
        return true;
    }else{
        usernameElement.style.borderColor = "red"
        return false;
    }
}
emailElement.addEventListener("input", (e)=>{
    checkEmail(e.target.value);
})
usernameElement.addEventListener("input", (e)=>{
    checkUsername(e.target.value);
})
passwordElement.addEventListener("input", (e)=>{
    checkPassword(e.target.value);
})
repasswordElement.addEventListener("input", (e)=>{
    checkRePassword(e.target.value);
})
const signup = () => {
    if(checkEmail(emailElement.value)&&
    checkUsername(usernameElement.value)&&
    checkPassword(passwordElement.value)&&
    checkRePassword(repasswordElement.value)){
        let newAccount ={
            username : usernameElement.value,
            email : emailElement.value,
            password : passwordElement.value
        }
        axios({
            url : 'http://localhost:8080/account',
            method : 'POST',
            data : newAccount,
        }).then(response =>{
            console.log(response.data);
            const {status, message} = response.data;
            if(status ===200){
                Swal.fire(
                    'Success!',
                    message,
                    'success'
                  )
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: message,
                  })
            }
           }).catch(err=>{
            console.log(err);
        })
    }
    
  };
  
button.addEventListener("click",signup)
