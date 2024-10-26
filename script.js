const itemsArray = [];
const cursor = document.querySelector(".cursor");

// Shuffle array helper function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create arrays of available GIFs and images
let gifArray = Array.from({ length: 18 }, (_, i) => `gif-${i + 1}.gif`);
let imgArray = Array.from({ length: 11 }, (_, i) => `img-${i + 1}.png`);

// Shuffle both arrays initially
gifArray = shuffle(gifArray);
imgArray = shuffle(imgArray);

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX - cursor.offsetWidth / 2,
    y: e.clientY - cursor.offsetHeight / 2,
    duration: 0.5,
    ease: "power2.out",
  });
});

document.addEventListener("click", function (event) {
  const clickSound = new Audio("./assets/click-sfx.mp3");
  clickSound.play();

  // Randomly decide if the item will be a GIF or image
  const itemType = Math.random() < 0.5 ? "video" : "image";
  let container = document.createElement("div");
  let elementWidth = 700;

  if (itemType === "video" && gifArray.length > 0) {
    // Shuffle the array again when all items are used
    if (gifArray.length === 1)
      gifArray = shuffle(
        Array.from({ length: 18 }, (_, i) => `gif-${i + 1}.gif`)
      );
    const gifFile = gifArray.pop();
    container.innerHTML = `<div class="video-container">
                                 <img src="./assets/${gifFile}" alt="" />
                               </div>`;
  } else if (itemType === "image" && imgArray.length > 0) {
    // Shuffle the array again when all items are used
    if (imgArray.length === 1)
      imgArray = shuffle(
        Array.from({ length: 11 }, (_, i) => `img-${i + 1}.png`)
      );
    const imgFile = imgArray.pop();
    container.innerHTML = `<div class="img-container">
                                 <img src="./assets/${imgFile}" alt="" />
                               </div>`;
  }

  const appendedElement = container.firstChild;
  document.querySelector(".items-container").appendChild(appendedElement);

  appendedElement.style.left = `${event.clientX - elementWidth / 2}px`;
  appendedElement.style.top = `${event.clientY}px`;
  const randomRotation = Math.random() * 10 - 5;

  gsap.set(appendedElement, {
    scale: 0,
    rotation: randomRotation,
    transformOrigin: "center",
  });

  const tl = gsap.timeline();

  const randomScale = Math.random() * 0.5 + 0.5;
  tl.to(appendedElement, {
    scale: randomScale,
    duration: 0.5,
    delay: 0.1,
  });

  tl.to(
    appendedElement,
    {
      y: () => `-=500`,
      opacity: 1,
      duration: 4,
      ease: "none",
    },
    "<"
  ).to(
    appendedElement,
    {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        appendedElement.parentNode.removeChild(appendedElement);
        const index = itemsArray.indexOf(appendedElement);
        if (index > -1) {
          itemsArray.splice(index, 1);
        }
      },
    },
    "-=0.5"
  );
});
