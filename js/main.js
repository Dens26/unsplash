// Référence au MOD
const pictureList = document.querySelector('.picture-list');
const searchInput = document.querySelector('.search-input');
let errorMessage = document.querySelector('.error-message');

// Variables
let pageIndex = 1;

// Ecouteur du champ de recherche
searchInput.addEventListener("change", evt => {
    pictureList.textContent="";
    fetchPicture();
}, false)

/*
Fonction asynchrone de recherche de photo sur l'API Unslpash
*/
async function fetchPicture() {
    try {
        const result = await fetch
            (`https://api.unsplash.com/search/photos?page=${pageIndex}
        &per_page=30
        &query=${searchInput.value}?
        &client_id=r6xX4Ubn13Je0Eg0a3Q7CSVICd7EB-uHmf4Kzw5WfRs`);
        if (!result.ok) {
            throw new Error(`Erreur ${result.status}`);
        }
        const pictureTab = await result.json();
        if (pictureTab.total == 0) {
            errorMessage.textContent = `Aucune photo trouvée`;
        }
        else {
            errorMessage.textContent = ``;
            console.log(searchInput.value);
            showPictures(pictureTab.results);
        }
    }
    catch (error) {
        errorMessage.textContent = `${error}`;
    }
}

/*
Fonction d'affichage des photos
*/
function showPictures(pictureTab) {
    pictureTab.forEach(picture=>{
        const img = document.createElement('img');
        img.src = picture.urls.small;
        img.alt = picture.alt_description;
        img.className = "picture";
        pictureList.appendChild(img); 
    })
}

//scroll infini
const observer = new IntersectionObserver(entries=>{
    if (window.scrollY > window.innerHeight && entries[0].isIntersecting){
        pageIndex ++;
        fetchPicture();
    }
},{rootMargin : "50%"})

observer.observe(document.querySelector(".infinite-marker"));



























