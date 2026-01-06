//your code here

const main = document.querySelector('main');


const mainMsg = document.createElement('h3');
mainMsg.id = 'h';
mainMsg.textContent = "Please click on the identical tiles to verify that you are not a robot.";
main.appendChild(mainMsg);


const message = document.createElement('p');
message.id = 'para';
main.appendChild(message);


const resetBtn = document.createElement('button');
resetBtn.id = 'reset';
resetBtn.textContent = 'Reset';
main.appendChild(resetBtn);


const verifyBtn = document.createElement('button');
verifyBtn.id = 'verify';
verifyBtn.textContent = 'Verify';
main.appendChild(verifyBtn);


const images = [
  'https://picsum.photos/id/237/200/300',
  'https://picsum.photos/seed/picsum/200/300',
  'https://picsum.photos/200/300?grayscale',
  'https://picsum.photos/200/300/',
  'https://picsum.photos/200/300.jpg'
];


function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}


let selectedImages = [];


function generateImages() {
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const tempImages = [...images, images[duplicateIndex]]; // 6 images

  const shuffledImages = shuffle(tempImages);

  const container = document.createElement('div');
  container.classList.add('flex');

  shuffledImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.dataset.src = src;
    img.classList.add(`img${index + 1}`);
    img.addEventListener('click', imageClick);
    container.appendChild(img);
  });

  main.appendChild(container);
}


function imageClick(e) {
  const img = e.target;

  if (selectedImages.includes(img)) return;

  img.classList.add('selected');
  selectedImages.push(img);

  if (selectedImages.length >= 1) {
    resetBtn.classList.add('show'); // show Reset
  }

  if (selectedImages.length === 2) {
    verifyBtn.classList.add('show'); // show Verify
  }
}


resetBtn.addEventListener('click', () => {
  selectedImages.forEach(img => img.classList.remove('selected'));
  selectedImages = [];
  resetBtn.classList.remove('show');
  verifyBtn.classList.remove('show');
  message.textContent = '';
  mainMsg.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});


verifyBtn.addEventListener('click', () => {
  if (selectedImages.length === 2) {
    const [first, second] = selectedImages;
    if (first.dataset.src === second.dataset.src) {
      message.textContent = "You are a human. Congratulations!";
    } else {
      message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
  verifyBtn.classList.remove('show'); // hide Verify
});


generateImages();
