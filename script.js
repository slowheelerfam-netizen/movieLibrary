// 1. Constants and Configuration
const API_KEY = '4fa5e77d7951d0814bdcf9fe8a45e8bb'; 
const BASE_URL = 'https://api.themoviedb.org/3/search/movie'; 
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function searchMovies() {
    const query = document.getElementById('searchQuery').value;
    const movieGrid = document.getElementById('movieGrid');

    if (!query) {
        alert('Please enter a movie title');
        return;
    }

    movieGrid.innerHTML = '<p>Loading...</p>';

    try {
        const url = `${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`;
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Server Error Response:", errorBody);
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Failed to fetch movies:', error);
        movieGrid.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

const searchInput = document.getElementById('searchQuery');

// Listen for any key being pressed while inside the input box
searchInput.addEventListener('keydown', function(event) {
    // Check if the key pressed was 'Enter'
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents page reload
        searchMovies();         // Calls your existing function
    }
});

async function getTopTenPopular() {
    const movieGrid = document.getElementById('movieGrid');
    // 1. Set the correct endpoint for Popular movies
    const POPULAR_URL = "https://api.themoviedb.org/3/movie/popular";

    try {
        // 2. Remove the 'query' parameter; only need api_key and basic settings
        const url = `${POPULAR_URL}?api_key=${API_KEY}&language=en-US&page=1`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            movieGrid.innerHTML = '<p>No movies found.</p>';
            return;
        }

        // 3. Slice the first 10 movies from the popular list
        const topTenMovies = data.results.slice(0, 10);

        // 4. Pass to your existing display function
        displayMovies(topTenMovies);

    } catch (error) {
        console.error('Failed to fetch popular movies:', error);
        movieGrid.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}



// ... existing constants ...

async function openMovieDetails(movieId) {
    const modal = document.getElementById('movieModal');
    const detailsDiv = document.getElementById('modalDetails');
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Stop background scrolling
    detailsDiv.innerHTML = '<p>Loading details...</p>';

    try {
        // Fetch specific movie details using movie ID
        const url = `api.themoviedb.org{movieId}?api_key=${API_KEY}&language=en-US`;
        const response = await fetch(url);
        const movie = await response.json();

        detailsDiv.innerHTML = `
            <div class="details-container">
                <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}" style="max-width: 300px; border-radius: 10px;">
                <div class="info">
                    <h1>${movie.title}</h1>
                    <p><strong>Release Date:</strong> ${movie.release_date}</p>
                    <p><strong>Rating:</strong> ${movie.vote_average.toFixed(1)}/10</p>
                    <p><strong>Overview:</strong> ${movie.overview}</p>
                    <p><strong>Genres:</strong> ${movie.genres.map(g => g.name).join(', ')}</p>
                </div>
            </div>
        `;
    } catch (error) {
        detailsDiv.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
    }
}

function closeModal() {
    document.getElementById('movieModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}


// UPDATE: Add onclick to your existing displayMovies function
function displayMovies(movies) {
    const movieGrid = document.getElementById('movieGrid');
    if (!movies || movies.length === 0) {
        movieGrid.innerHTML = '<p>No movies found.</p>';
        return;
    }

    movieGrid.innerHTML = movies.map(movie => {
        const posterPath = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'placehold.co';
        
        // Added onclick="openMovieDetails(${movie.id})" below
        return `
            <article class="movie-card" onclick="openMovieDetails(${movie.id})" style="cursor: pointer;">
                <img src="${posterPath}" alt="${movie.title}" loading="lazy">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p>${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </article>
        `;
    }).join('');
}

