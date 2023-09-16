const api = document.getElementById("Api-Key");
const search = document.getElementById("search");
const movieCard = document.getElementsByClassName("Movie-list")[0];
const form = document.getElementById("form");
const loading = document.getElementById("load");

//api key
let apikey = api.value;

function load(){
    loading.classList.contains("show")?loading.classList.remove("show"):loading.classList.add("show");
}


//function to get data from api
async function getdata(endpoint) {
    load();
    const data = await fetch(endpoint);
    const movieData = await data.json();
    // console.log(movieData.Response);

    if (movieData.Response == "False") {
        alert(movieData.Error);
    } else {
        const movieList = movieData.Search;
        // console.log(movieData);
        setTimeout(()=>{
            load();
            show(movieList);
        },600);
    }

}

//function to show movie in ui
function show(movieList) {
    
    movieCard.innerHTML="";
    let num =0;

    movieList.forEach((m) => {

        //image not found
        if(m.Poster==="N/A"){
            m.Poster = `https://placehold.co/209x303`;
        }
        num++;
        const movie = document.createElement('div');
        movie.classList.add('Movie-card');
        movie.innerHTML = `
            <img src="${m.Poster}" alt="Movie image">
            <div class="Movie-detail"> 
                    <div class="detail">
                        <span class="num">${num}</span>
                        <span class="Movie-Name">${m.Title}</span>
                    </div>
            </div>
    `;
        movieCard.appendChild(movie);

    });
}

//search form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchTerm = search.value;
    // console.log(apikey.length)
    if (apikey.length == 0) {
        alert("Please Enter the API Key First");

    } else if (searchTerm.length < 3) {
        alert("Please Provide the Movie Name and Name should have min 3 letters");
    }
    else {
        const endpoint = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apikey}`;
        getdata(endpoint);
    }
})

getdata(`https://www.omdbapi.com/?s=hindi&apikey=${apikey}`);




