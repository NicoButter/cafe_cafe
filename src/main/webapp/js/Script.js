//change the limit to however many images to use
const url = `https://api.thecatapi.com/v1/images/search?limit=100`;
const api_key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8';


fetch(url, { headers: { 'x-api-key': api_key } })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const imagesData = data.slice(0, 3); // Limit the number of images here
    imagesData.forEach(function (imageData) {
      let image = document.createElement('img');
      image.src = `${imageData.url}`;

      let gridCell = document.createElement('div');
      gridCell.classList.add('col');
      gridCell.classList.add('col-lg');
      gridCell.appendChild(image);

      document.getElementById('grid').appendChild(gridCell);
    });
  })
  .catch(function (error) {
    console.log(error);
  });