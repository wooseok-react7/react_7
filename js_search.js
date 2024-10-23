import { openModal } from "./js_drama_api.js"

const searchContainer = document.querySelector(".search-container");
const inputEl = document.querySelector(".search-input");
const allContainer = document.querySelector("#all-container");
const movieContainer = document.querySelector("#movie-container");
const tvContainer = document.querySelector("#tv-container");


const getSearchMovies = async (title) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${title}&language=ko&page=1`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWUwMmM4YWQzMjIxOTY1YTViZGZkMGZkYTBlYzQ1ZiIsIm5iZiI6MTcyOTIxMjQyNC4xODAyNzIsInN1YiI6IjY3MGRlNjU4MGI4MDA1MzdkNzVjYzIxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._P4layWoKHs8I1rBVCRUdzDD-hrjqfy4M5UsHHuIHec`
            },
        });

        const data = await response.json();

        movieContainer.innerHTML = "";
        searchContainer.innerHTML = "";
        tvContainer.innerHTML = "";
        allContainer.innerHTML = "";

        if (data && data.results.length > 0) {
            data.results.forEach((item) => {
                const divEl = document.createElement("div")
                divEl.classList.add("movie-item");

                const movieItem = `
                    <div id="card">
                        <img src=https://image.tmdb.org/t/p/w200/${item.poster_path} alt="${item.title} class="poster"/>
                        <h3 class="sTitle">${item.title}</h3>
                    </div>
                `;

                divEl.innerHTML = movieItem
                searchContainer.append(divEl);


                divEl.addEventListener('click', () => {
                    openModal(item);
                });

            });
        } else {
            const nomovieEl = document.createElement("p")
            nomovieEl.textContent = "영화가 없습니다."
            searchContainer.append(nomovieEl);
        }

    } catch (error) {
        throw new Error(`이런 ${error} 가 발생했어요!`);
    }


};


inputEl.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        getSearchMovies(e.target.value.toLowerCase().trim());

    }
});


