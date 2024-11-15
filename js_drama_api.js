const TMDB_API_KEY = '';
const tvContainer = document.getElementById("tv-container");



async function getTvData(page = 50) {
    const url = `https://api.themoviedb.org/3/trending/tv/day?language=ko&page=${page}`;
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
        console.error('Error fetching tv data:', error);
    }
}


async function displayTV() {
    const tvs = await getTvData();
    tvs.results.forEach(tv => {

        //별점 대신 if 반복문을 사용하여 로 대체
        let stars = "";
        const vote_average = tv.vote_average;

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

        const tvElement = document.createElement('div');
        tvElement.classList.add('tv');
        tvElement.innerHTML = `
            <div id="card">
                <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" alt="${tv.name}" class="poster">
                <h3 class="mTitle">${tv.name}</h3>
                <p class="mRating">${stars}</p>
            </div>
        `;
        tvContainer.appendChild(tvElement);

        // 이미지 클릭 시 모달 열기
        const poster = tvElement.querySelector('.poster');
        poster.addEventListener('click', () => {
            openModal(tv);  // 모달에 TV 정보 전달
        });
    });
}

// 모달 화면
export function openModal(tv) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" alt="${tv.name}" class="modal-img">
            <h2>${tv.name}</h2>
            <h2>${tv.overview}</h2>
        </div>
    `;
    document.body.appendChild(modal);

    //버튼으로 닫기는 지웠음

    // 모달 배경 눌러서 닫기
    modal.addEventListener('click', (event) => {
        if (event.target === modal) { 
            modal.style.display = 'none';
            modal.remove(); 
        }
    });

    modal.style.display = 'block'; 
}

displayTV();

