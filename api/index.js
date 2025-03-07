fetch("https://api.unsplash.com/photos?client_id=YoNKzUFih_Z_mZDLRY7C5ILiJxWaiCB4SiukeBMTh9U")
    .then(response => response.json())
    .then(data => {
        data.map(entry =>{
            console.log(entry);
            document.querySelector(".container").innerHTML += `
                <section class="card"  tabindex="0">
                    <div class="card-head" >
                        <img tabindex="0" src="${entry.urls.regular}" alt="${entry.alt_description}">
                    </div>
                    <div class="card-body">
                        <div class="card-mid">
                            <p tabindex="0">Name: <span>${entry.user.first_name}</span></p>
                        </div>
                        <div class="card-foot">
                            <p tabindex="0">Likes: <span>${entry.likes}</span></p>
                        </div>
                    </div>
                </section>
            
            `


        }).join("");
    })