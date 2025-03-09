/*Form Elemnt */
const login = document.getElementById('form-data');
nameMessage = document.getElementById('nameMessage');

/*Name element */
const name = document.getElementById('name');
let nameRegex = /[a-zA-Z0-9]{3,}/;



function validateName(){
    let nameInput = name.value;
    let message;
    if(nameInput === ""){
        message = "Name cannot be empty";

    }else if(!nameRegex.test(nameInput)){
        message = "Name can be only letters and numbers and 3 characters long";
    }else{
        message = `Your name: ${nameInput.slice(0, 1).toUpperCase()}${nameInput.slice(1).toLowerCase()}`;
    }
    return message;
}


name.addEventListener("input", function(){
    nameMessage.textContent = validateName();
})

login.addEventListener('submit', function(event){
    event.preventDefault();



})