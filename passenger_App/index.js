document.addEventListener('DOMContentLoaded', function(){

    const counterScreen = document.querySelector(".counter-screen");
    const increase = document.querySelector(".increase");
    const save = document.querySelector(".save");
    const entries = document.querySelector(".entries");

    /*INITIALIZE COUNT */
    let count = 0;

    function increaseCount(){
        count += 1;
        return count;
    }

    function saveCount(){
        
        return counterScreen.textContent;

    }


    increase.addEventListener("click", function(){
        counterScreen.textContent = increaseCount();
    })


    save.addEventListener("click", function(){
        entries.textContent += saveCount() + " ";
        counterScreen.textContent = 0;
        count = 0;
    })
})