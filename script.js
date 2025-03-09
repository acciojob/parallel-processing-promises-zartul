//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load image: ${url}`);
    });
  }

  function downloadImages() {
    // Clear previous results
    output.innerHTML = "";
    errorDiv.innerHTML = "";
    
    // Show loading message
    loading.style.display = "block";

    // Download all images in parallel
    Promise.all(images.map(image => downloadImage(image.url)))
      .then(downloadedImages => {
        // Hide loading
        loading.style.display = "none";

        // Append images to output div
        downloadedImages.forEach(img => output.appendChild(img));
      })
      .catch(error => {
        // Hide loading and show error message
        loading.style.display = "none";
        errorDiv.textContent = error;
      });
  }

  // Attach event listener to button
  btn.addEventListener("click", downloadImages);

