// YouTube Data API key
const apiKey = "AIzaSyBExZ6bdiUfjYAIHc4Ginbt9itZ_F_yR1A";

// Function to fetch recommended videos
function fetchRecommendedVideos() {
  const maxResults = 20; // Number of recommended videos to fetch
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=${maxResults}&key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length > 0) {
        const videos = data.items;

        // Clear existing video container
        document.getElementById("videoContainer").innerHTML = "";

        videos.forEach((video) => {
          const videoId = video.id;
          const videoTitle = video.snippet.title;
          const videoThumbnail = video.snippet.thumbnails.medium.url;

          // Create video card
          const cardHtml = `
            <div class="col-md-3">
              <div class="card">
                <img src="${videoThumbnail}" class="card-img-top" alt="${videoTitle}">
                <div class="card-body">
                  <h5 class="card-title">${videoTitle}</h5>
                  <button class="btn btn-primary" onclick="watchVideo('${videoId}')">Watch Video</button>
                </div>
              </div>
            </div>
          `;

          // Append video card to the container
          document.getElementById("videoContainer").innerHTML += cardHtml;
        });
      } else {
        // No recommended videos found
        document.getElementById("videoContainer").innerHTML = "No recommended videos found.";
      }
    })
    .catch((error) => {
      console.log("Error fetching recommended videos:", error);
    });
}

// Function to search and display YouTube videos
function searchVideos() {
  const query = document.getElementById("searchInput").value.trim();

  if (query !== "") {
    const maxResults = 80; // Number of videos to fetch
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${query}&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.items.length > 0) {
          const videos = data.items;

          // Clear existing video container
          document.getElementById("videoContainer").innerHTML = "";

          videos.forEach((video) => {
            const videoId = video.id.videoId;
            const videoTitle = video.snippet.title;
            const videoThumbnail = video.snippet.thumbnails.medium.url;

            // Create video card
            const cardHtml = `
              <div class="col-md-3">
                <div class="card">
                  <img src="${videoThumbnail}" class="card-img-top" alt="${videoTitle}">
                  <div class="card-body">
                    <h5 class="card-title">${videoTitle}</h5>
                    <button class="btn btn-primary" onclick="watchVideo('${videoId}')">Watch Video</button>
                  </div>
                </div>
              </div>
            `;

            // Append video card to the container
            document.getElementById("videoContainer").innerHTML += cardHtml;
          });
        } else {
          // No videos found for the search query
          document.getElementById("videoContainer").innerHTML = "No videos found.";
        }
      })
      .catch((error) => {
        console.log("Error fetching videos:", error);
      });
  }
}

// Function to watch video
function watchVideo(videoId) {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  // Replace the existing video container with the new video iframe
  document.getElementById("videoContainer").innerHTML = `
    <div class="embed-responsive embed-responsive-16by9">
      <iframe class="embed-responsive-item" src="${videoUrl}" allowfullscreen></iframe>
    </div>
  `;
}

// Fetch recommended videos on page load
document.addEventListener("DOMContentLoaded", function () {
  fetchRecommendedVideos();
});
