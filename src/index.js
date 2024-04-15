document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch movie data and populate the list
    function fetchMovies() {
      fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(data => {
          const filmsList = document.getElementById("films");
  
          data.forEach(function(movie) {
            const listItem = document.createElement("li");
            listItem.classList.add("film", "item");
            listItem.textContent = movie.title;
            filmsList.appendChild(listItem);
  
            // Add click event listener to each movie title
            listItem.addEventListener("click", function() {
              // Display movie details
              document.getElementById("poster").src = movie.poster;
              document.getElementById("title").textContent = movie.title;
              document.getElementById("runtime").textContent = `${movie.runtime} minutes`;
              document.getElementById("film-info").textContent = movie.description;
              document.getElementById("showtime").textContent = movie.showtime;
              const remainingTickets = movie.capacity - movie.tickets_sold;
              document.getElementById("ticket-num").textContent = remainingTickets;
            });
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  
    // Call the fetchMovies function to populate the movie list
    fetchMovies();
  
    // Function to handle buying tickets
    document.getElementById("buy-ticket").addEventListener("click", function() {
      const ticketNumElement = document.getElementById("ticket-num");
      let ticketNum = parseInt(ticketNumElement.textContent);
  
      if (ticketNum > 0) {
        ticketNum--;
        ticketNumElement.textContent = ticketNum;
        alert("Ticket purchased successfully!");
      } else {
        alert("Sorry, all tickets for this show are sold out.");
      }
    });
  });
  