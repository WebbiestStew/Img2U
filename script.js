const uploadForm = document.getElementById("uploadForm");
const imageInput = document.getElementById("imageInput");
const imageGrid = document.getElementById("imageGrid");

// Load stored images on page load
window.addEventListener("DOMContentLoaded", () => {
  const storedImages = JSON.parse(localStorage.getItem("img2u_images")) || [];
  storedImages.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "preview-image";
    imageGrid.appendChild(img);
  });
});

uploadForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const files = imageInput.files;
  let storedImages = JSON.parse(localStorage.getItem("img2u_images")) || [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      img.alt = file.name;
      img.className = "preview-image";
      imageGrid.appendChild(img);

      // Save to localStorage
      storedImages.push(event.target.result);
      localStorage.setItem("img2u_images", JSON.stringify(storedImages));
    };

    reader.readAsDataURL(file);
  }

  imageInput.value = "";
});

document.getElementById("clearGallery").addEventListener("click", () => {
  localStorage.removeItem("img2u_images");
  imageGrid.innerHTML = "";
});