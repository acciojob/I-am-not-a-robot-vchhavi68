//your code here
const main = document.querySelector('main');

// Create elements
const mainMsg = document.createElement('h3');
mainMsg.id = 'h';
main.appendChild(mainMsg);

const imageContainer = document.createElement('div');
imageContainer.classList.add('flex');
main.appendChild(imageContainer);

const resetBtn = document.createElement('button');
resetBtn.id = 'reset';
resetBtn.textContent = 'Reset';
resetBtn.style.display = 'none';
main.appendChild(resetBtn);

const verifyBtn = document.createElement('button');
verifyBtn.id = 'verify';
verifyBtn.textContent = 'Verify';
verifyBtn.style.display = 'none';
main.appendChild(verifyBtn);

const message = document.createElement('p');
message.id = 'para';
main.appendChild(message);


 const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

let selectedImages = [];

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Initialize images
function initImages() {
  imageContainer.innerHTML = '';
  selectedImages = [];
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  message.textContent = '';
  mainMsg.textContent = "Please click on the identical tiles to verify that you are not a robot.";

  // Pick one image randomly to duplicate
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const imgArray = [...images, images[duplicateIndex]];

  // Shuffle images
  const shuffled = shuffle(imgArray);

  // Add images to container
  shuffled.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.src = src; // for comparison
    img.classList.add(`img${index + 1}`); // Add classes for Cypress
    img.addEventListener("click", imageClick);
    imageContainer.appendChild(img);
  });
}

// Image click handler
function imageClick(e) {
  const img = e.target;
  if (selectedImages.includes(img)) return; // prevent double click

  img.classList.add('selected');
  selectedImages.push(img);

  if (selectedImages.length >= 1) {
    resetBtn.style.display = 'inline-block';
  }

  if (selectedImages.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }
}

// Reset handler
resetBtn.addEventListener('click', () => {
  selectedImages.forEach(img => img.classList.remove('selected'));
  selectedImages = [];
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  message.textContent = '';
  mainMsg.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

// Verify handler
verifyBtn.addEventListener('click', () => {
  if (selectedImages.length === 2) {
    const [first, second] = selectedImages;
    if (first.dataset.src === second.dataset.src) {
      message.textContent = "You are a human. Congratulations!";
    } else {
      message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
  verifyBtn.style.display = 'none';
});

// Initialize on load
initImages();
