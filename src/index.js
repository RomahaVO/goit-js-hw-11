import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import searchImg from './js/fetchImages';
import infiniteScroll from 'infinite-scroll';

const form = document.getElementById('search-form');
const galleryImages = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', loadMoreBtnClick);


function onSubmit (e) {
    e.preventDefault();
    const form = e.currentTarget;
    searchImg.galleryEl.query = form.elements.searchQuery.value.trim();
    loadMoreBtn.classList.remove('hidden');
    searchImg.galleryEl.imgPage = 1;


    searchImg.fetchImages(searchImg.galleryEl.query)
    .then(items=>{
        if (items.length === 0 || searchImg.galleryEl.query === ''){

        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        loadMoreBtn.classList.add('hidden');
        return;
        }        
        if (items.status === 404){ 
            throw new Error(`Not found ${searchImg.galleryEl.query} `)}


        cleanerMarkup(galleryImages);
        console.log(items);
        createImageGallery(items);
        Notiflix.Notify.success(`Hooray! We found ${searchImg.galleryEl.query} images.`)

        })
    .catch(onError)
    .finally(form.reset());

    // cleanerMarkup(galleryImages);
    // searchImg.galleryEl.imgPage = 1;

    
};

function createImageGallery(hits) {
    const markup = hits.map(hit => `<div class="photo-card">
    <a href="${hit.largeImageURL}"><img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width="400px" height="244px" style="object-fit:cover;"/></a>
    <div class="info">
    <p class="info-item">
        <b>Likes <br>${hit.likes}</b>
    </p>
    <p class="info-item">
        <b>Views <br>${hit.views}</b>
    </p>
    <p class="info-item">
        <b>Comments <br>${hit.comments}</b>
    </p>
    <p class="info-item">
        <b>Downloads <br>${hit.downloads}</b>
    </p>
    </div>
</div>`).join('');

galleryImages.insertAdjacentHTML("beforeend", markup);
};


function loadMoreBtnClick(){
    loadMoreBtn.disabled=true;
    loadMoreBtn.textContent='Loading...';
    searchImg.fetchImages(searchImg.galleryEl.query).then(items=>{
        // searchImg.galleryEl.imgPage += 1;
        console.log(items);
        createImageGallery(items);
        gallery.refresh();
        loadMoreBtn.disabled=false;
        loadMoreBtn.textContent='Load more';
    }).catch(error=>{
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.classList.add('hidden');
    })
};



const gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
});

function cleanerMarkup(element) {
    return  element.innerHTML = '';
};


function onError(err) {
    console.error(err);
};
// let infScroll = new InfiniteScroll( galleryImages, {
//     path: '.pagination__next',
//     append: '.post',
//     history: false,
// });