document.addEventListener("DOMContentLoaded", () => {
  // Base API URL
  const BASE_URL = "http://localhost:3000/cakes";

  // Select elements
  const cakeList = document.getElementById("cake-list");
  const cakeName = document.getElementById("cake-name");
  const cakeImage = document.getElementById("cake-image");
  const cakeDescription = document.getElementById("cake-description");
  const reviewList = document.getElementById("review-list");

  // Function to fetch and display all cakes in the sidebar
  function fetchCakes() {
      fetch(BASE_URL)
          .then(response => response.json())
          .then(cakes => {
              cakeList.innerHTML = ""; // Clear existing list
              cakes.forEach(cake => {
                  const li = document.createElement("li");
                  li.textContent = cake.name;
                  li.dataset.id = cake.id;
                  li.addEventListener("click", () => displayCakeDetails(cake));
                  cakeList.appendChild(li);
              });

              // Display the first cake by default
              if (cakes.length > 0) {
                  displayCakeDetails(cakes[0]);
              }
          })
          .catch(error => console.error("Error fetching cakes:", error));
  }

  // Function to display details of a selected cake
  function displayCakeDetails(cake) {
      cakeName.textContent = cake.name;
      cakeImage.src = cake.image_url;
      cakeImage.alt = cake.name;
      cakeDescription.textContent = cake.description;

      // Display reviews
      reviewList.innerHTML = "";
      cake.reviews.forEach(review => {
          const li = document.createElement("li");
          li.textContent = review;
          li.addEventListener("click", () => li.remove()); // Bonus: Remove review on click
          reviewList.appendChild(li);
      });
  }

  // Fetch cakes when the page loads
  fetchCakes();
});

  
