const data = [
    {
        artist: "Sarkodie",
        song: "Adonai",
        albumArt: "./assets/images/sarkodie.jpg",
        alt: "Sarkodie's Adonai album art"
    },
    {
        artist: "Shatta Wale",
        song:"My Level",
        albumArt: "./assets/images/kwesiArthur.jpg",
        alt:"Shatta Wale's My Level album art",
    },
    {
        artist: "Kwesi Arthur",
        song: "Grind Day",
        albumArt: "./assets/images/shattaWale.jpg",
        alt: "Kwesi Arthur's Grind Day album art"
    }
]

const dataElement = data.map((item) => {
    return `
            <section class="card">
                <div class="card-head">
                    <img src="${item.albumArt}" alt="${item.alt}">
                </div>
                <div class="card-mid">
                    <h2>${item.artist}</h2>
                    <p>${item.song}</p>
                </div>
                <div class="card-foot">
                    <p>...</p>
                </div>

            </section>
`
}).join("");



document.querySelector(".container").innerHTML = dataElement;