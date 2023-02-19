const KEY = 'api-key=lN1jAQVvVGOPSqcIQoMHMLLJA9oE1Rka';
const MOST_POPULAR_NEWS = `https://developer.nytimes.com/docs/articlesearch-product/1/overview?${KEY}`;

async function getPopularArticle() {
  const articleFetch = await fetch(MOST_POPULAR_NEWS);
  const articles = await articleFetch.json();
  let { results } = articles;
  console.log(results);
  return results;

}

function createArticles({ section, multimedia, title, first_published_date, abstract, url}) {

    articles.map(`<li class='articles-list-item' id=''>
        <article class='articles-item-news'>
    
                <div class='articles-news-wrapper'>
                    <img class='articles-img-news'  src='${multimedia}' alt=''/>
                    <p class="articles-news-category">${section}job searching</p> 
                    <button type='button'>
                        <span>add favorite
                            <svg></svg>
                        </span> 
                    </button> 
                </div> 
    
                <div>  
                    <h2 class='articles-tittle-news'>${title}</h2>
                    <p class='articles-text-news'>${abstract}</p>
                </div>
    
                <div>
                    <span class='articles-date-news'>${first_published_date.split('')
                    .splice(0, 10)
                    .join('')
                    .replaceAll('-', '/')}</span>
                    <a target='blank' class='articles-link-news'  href='${url}'>Read more</a>
                </div>
    
        </article>
    </li>`)

    };
};