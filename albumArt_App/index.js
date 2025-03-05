import {data} from "./data.js"


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
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </div>

            </section>
`
}).join("");



document.querySelector(".container").innerHTML = dataElement;


