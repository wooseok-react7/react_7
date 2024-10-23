const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWUwMmM4YWQzMjIxOTY1YTViZGZkMGZkYTBlYzQ1ZiIsIm5iZiI6MTcyOTIxMjQyNC4xODAyNzIsInN1YiI6IjY3MGRlNjU4MGI4MDA1MzdkNzVjYzIxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._P4layWoKHs8I1rBVCRUdzDD-hrjqfy4M5UsHHuIHec';
const allContainer = document.getElementById("all-container");



async function getAlldata(page = 50) {
    const url = `https://api.themoviedb.org/3/trending/all/day?language=ko&page=${page}`;
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
        console.error('Error fetching all data:', error);
    }
}


async function displayAll() {
    const TvMobAll = await getAlldata();
    TvMobAll.results.forEach(all => {

        let stars = "";
        const vote_average = all.vote_average;

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


        const allElement = document.createElement('div');
        allElement.classList.add('all');
        allElement.innerHTML = `
            <div id="card">
                <img src="https://image.tmdb.org/t/p/w500${all.poster_path}" alt="${all.name}" class="poster" >
                    <h3 class="mTitle">${all.name}</h3>
                    <p class="mRating">${all.vote_average = stars}</p>
            </div>
                    `;
        allContainer.appendChild(allElement);

        const poster = allElement.querySelector('.poster');
        poster.addEventListener('click', () => {
            openModal(all);  // 모달에 TV 정보 전달
        });
    });
}

// 모달 열기 함수
function openModal(all) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            
            <img src="https://image.tmdb.org/t/p/w500${all.poster_path}" alt="${all.name}" class="modal-img">
            <h2>${all.name}</h2>
            <h2>${all.overview}</h2>
        </div>
    `;
    document.body.appendChild(modal);

// 모달 배경 클릭해서 닫기
    modal.addEventListener('click', (event) => {
        if (event.target === modal) { 
            modal.style.display = 'none';  
            modal.remove();  
        }
    });

    modal.style.display = 'block'; 
}




displayAll();

