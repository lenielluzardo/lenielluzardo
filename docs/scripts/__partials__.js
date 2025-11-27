const partial_articles_latest_route = "/blog/__partials__/_articles_latest.html";
const partial_articles_latest_element = document.getElementById('partial_latest');

function getPartialView(route, htmlElement) {
  fetch(route)
    .then((res) => res.text())
    .then((result) => {
      if (htmlElement) {
        htmlElement.innerHTML = result;
      }
    });
}

getPartialView(partial_articles_latest_route, partial_articles_latest_element);