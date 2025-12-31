

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

// async function main() {
//     const users = await fetch("https://jsonplaceholder.typicode.com/users")
//     const usersData = await users.json();
//     console.log(usersData);
//     usersData.map(user => `<div class="user-card">
// <div class="user-card__container">
//     <h3>User's Name</h4>
//     <p><b>Email:</b> email@email.com</p>
//     <p><b>Phone:</b> 0000000000</p>
//     <p><b>Website:</b> <a href="https://website.website" target="_blank">website.website</a></p>
// </div>
// </div>`)
// }
// main(); 
