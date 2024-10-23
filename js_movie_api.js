const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWUwMmM4YWQzMjIxOTY1YTViZGZkMGZkYTBlYzQ1ZiIsIm5iZiI6MTcyOTIxMjQyNC4xODAyNzIsInN1YiI6IjY3MGRlNjU4MGI4MDA1MzdkNzVjYzIxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._P4layWoKHs8I1rBVCRUdzDD-hrjqfy4M5UsHHuIHec';
const movieContainer = document.getElementById("movie-container");



async function getMovieData(page = 50) {
    const url = `https://api.themoviedb.org/3/movie/popular?language=ko&page=${page}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_KEY}`
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}


async function displayMovies() {
    const movies = await getMovieData();
    movies.results.forEach(movie => {

        let stars = "";
        const vote_average = movie.vote_average;

        if (vote_average < 5) {
            stars = "⭐";
        } else if (vote_average < 6) {
            stars = "⭐⭐";
        } else if (vote_average < 7) {
            stars = "⭐⭐⭐";
        } else if (vote_average < 8) {
            stars = "⭐⭐⭐⭐";
        } else {
            stars = "⭐⭐⭐⭐⭐";
        }
        

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <div id="card">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="poster">
                    <h3 class="mTitle">${movie.title}</h3>
                    <p class="mRating">${movie.vote_average=stars}</p>
            </div>
                    `;
        movieContainer.appendChild(movieElement);


        const poster = movieElement.querySelector('.poster');
        poster.addEventListener('click', () => {
            openModal(movie);  // 모달에 TV 정보 전달
        });
    });
}

// 모달 열기 함수
function openModal(movie) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="modal-img">
            <h2>${movie.title}</h2>
            <h2>${movie.overview}</h2>
        </div>
    `;
    document.body.appendChild(modal);

    // 모달 닫기 버튼

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    });

    modal.style.display = 'block';
}



displayMovies();


