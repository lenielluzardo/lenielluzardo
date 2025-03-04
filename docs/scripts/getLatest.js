console.log('get latest working');

let partial_latest = document.getElementById('partial_latest');

console.log(partial_latest);

fetch('/blog/__partials__/_latest_articles_.html')
  .then(res => res.text())
  .then(result => {
    if (partial_latest) {
      partial_latest.innerHTML = result;
    }
  });
