

async function fetchMovies() {
    const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmE1ZTc3ZDc5NTFkMDgxNGJkY2Y5ZmU4YTQ1ZThiYiIsIm5iZiI6MTc2Njg1NDM5My43Nywic3ViIjoiNjk1MDBlZjlmZGVkOWI4OWE2MTU1NDA4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.toFb4gepbSVzzv88aZf9O479-_UvEjKOx2tKLQhaDqY'
  }
};
const response = await fetch('https://api.themoviedb.org/3/search/movie?query=movie', options);
 console.log(await response.json());     
 
}
fetchMovies();

