//your code here
const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");
const mainMsg = document.getElementById("h");

let selectedImages = [];


function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}


function initImages() {
  imageContainer.innerHTML = '';
  selectedImages = [];
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  message.textContent = '';
  mainMsg.textContent = "Please click on the identical tiles to verify that you are not a robot.";

 
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const imgArray = [...images, images[duplicateIndex]];

  
  const shuffled = shuffle(imgArray);

  
  shuffled.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.src = src; // for comparison
    img.addEventListener("click", imageClick);
    imageContainer.appendChild(img);
  });
}


function imageClick(e) {
  const img = e.target;

  if (selectedImages.includes(img)) return;

  img.classList.add("selected");
  selectedImages.push(img);

  if (selectedImages.length > 0) {
    resetBtn.style.display = "inline-block";
  }

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }

  if (selectedImages.length > 2) {
    selectedImages.shift();
    document.querySelectorAll("img.selected")[0].classList.remove("selected");
  }
}


resetBtn.addEventListener("click", () => {
  document.querySelectorAll("img").forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  message.textContent = '';
  mainMsg.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});


verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (selectedImages.length === 2) {
    if (selectedImages[0].dataset.src === selectedImages[1].dataset.src) {
      message.textContent = "You are a human. Congratulations!";
    } else {
      message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
});


initImages();