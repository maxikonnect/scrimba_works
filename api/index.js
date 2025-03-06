fetch("https://api.unsplash.com/photos?client_id=YoNKzUFih_Z_mZDLRY7C5ILiJxWaiCB4SiukeBMTh9U")
    .then(response => response.json())
    .then(data => {
        data.map(entry =>{
            console.log(entry);
            document.querySelector(".container").innerHTML += `
                <section class="card">
                    <div class="card-head">
                        <img src="${entry.urls.regular}" alt="${entry.alt_description}">
                    </div>
                    <div class="card-body">
                        <div class="card-mid">
                            <p>Name: ${entry.user.first_name}</p>
                        </div>
                        <div class="card-foot">
                            <p>Likes: <span>${entry.likes}</span></p>
                        </div>
                    </div>
                </section>
            
            `


        }).join("");
    })