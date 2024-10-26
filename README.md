# DAY_026 | Interactive Media Display with GSAP Animation

## Project Overview

For **DAY_026** of my daily code challenge series, I developed an **interactive media display** where images and GIFs appear dynamically on the screen with each click, using **HTML**, **CSS**, **JavaScript**, and **GSAP**. Each click on the screen triggers a media item to appear at the cursor, scale up, and then fade out, creating a visually engaging effect. This project highlights advanced animation techniques with GSAP and randomization with JavaScript.

---

### Inspiration from Modern Interactive Design

This interactive media display effect was inspired by award-winning designs that use click-triggered animations to engage users, particularly the **SavoirFaire** site, which won **Site of the Day** on **Awwwards**. Inspired by their visually captivating approach, I aimed to create a similar experience where GIFs and images appear at the click position, giving users an interactive and dynamic visual experience. 

Check their site here: [SavoirFaire](https://www.savoirfaire.nyc/)

---

## Preview

![DAY_026_1](./assets/DAY_026_1.gif)

## Inspiration
![SavoirFaire site](./assets/DAY_026_2.gif)

---

## Key Features

- **GSAP Animation**: Each media element scales in, appears at the cursor’s location, then fades out smoothly, providing a polished and engaging experience.
- **Random Media Selection with Shuffle**: JavaScript selects either a GIF or image at random, ensuring all media items have a chance to display through a custom shuffle function.
- **Click Sound Effect**: Each time an image or GIF appears, a **click sound** (`click-sfx.mp3`) plays, adding an auditory layer to the interactive experience.
- **Cursor Tracking**: Media elements appear precisely where the user clicks, creating an interactive, responsive effect.
- **Minimalist Design**: Clean, dark layout to enhance the visual impact of the interactive elements.

---

## JavaScript and Animation Details

### JavaScript Libraries Used

1. **GSAP (GreenSock Animation Platform)**:
   - Powers the animations for each media element, including scaling, positioning, and fading transitions.
2. **script.js**:
   - Handles the core logic of random media selection, click tracking, and animation.

### JavaScript Randomization and Media Selection

This project uses JavaScript to alternate between GIFs and images randomly. A custom shuffle function ensures that each media file is used before reshuffling, enhancing the randomness and variety of the media displayed.

#### Code for Shuffle and Random Selection

```javascript
// Shuffle array helper function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Arrays of available media files
let gifArray = Array.from({ length: 18 }, (_, i) => `gif-${i + 1}.gif`);
let imgArray = Array.from({ length: 11 }, (_, i) => `img-${i + 1}.png`);

// Initial shuffle of both arrays
gifArray = shuffle(gifArray);
imgArray = shuffle(imgArray);
```

### Click Event and Media Display

Each click event triggers the selection and display of a media element at the cursor's position. The script randomly chooses between GIFs and images, appends the selected media to the page, and animates it using GSAP. Additionally, a click sound (`click-sfx.mp3`) plays each time a media item appears, enhancing the interactive experience.

#### Code for Media Display and Animation on Click

```javascript
document.addEventListener("click", function (event) {
  const clickSound = new Audio("./assets/click-sfx.mp3");
  clickSound.play(); // Play click sound on each media appearance

  const itemType = Math.random() < 0.5 ? "video" : "image";
  let container = document.createElement("div");

  if (itemType === "video" && gifArray.length > 0) {
    if (gifArray.length === 1) gifArray = shuffle(Array.from({ length: 18 }, (_, i) => `gif-${i + 1}.gif`));
    const gifFile = gifArray.pop();
    container.innerHTML = `<div class="video-container">
                                 <img src="./assets/${gifFile}" alt="" />
                               </div>`;
  } else if (itemType === "image" && imgArray.length > 0) {
    if (imgArray.length === 1) imgArray = shuffle(Array.from({ length: 11 }, (_, i) => `img-${i + 1}.png`));
    const imgFile = imgArray.pop();
    container.innerHTML = `<div class="img-container">
                                 <img src="./assets/${imgFile}" alt="" />
                               </div>`;
  }

  const appendedElement = container.firstChild;
  document.querySelector(".items-container").appendChild(appendedElement);

  appendedElement.style.left = `${event.clientX - 350}px`;
  appendedElement.style.top = `${event.clientY}px`;
});
```

### GSAP Animation for Media Elements

GSAP animates each media item as it appears at the cursor’s position, scales up, and fades out. This creates a seamless transition effect, making each click visually captivating.

#### Code for GSAP Animation

```javascript
const tl = gsap.timeline();
tl.to(appendedElement, {
  scale: Math.random() * 0.5 + 0.5,
  duration: 0.5,
  opacity: 1,
  ease: "power2.out",
});
tl.to(appendedElement, {
  y: "-=500",
  opacity: 0,
  duration: 1,
  onComplete: () => appendedElement.remove(),
});
```

- **Scaling and Opacity**: Each media element scales up from 0 to its full size and fades in as it appears.
- **Upward Movement**: The media element moves slightly upwards while fading out, adding a smooth finishing effect.
- **Ease and Timing**: The `power2.out` easing ensures smooth transitions, while the timeline setup allows precise timing for each animation stage.

### How JavaScript Enhances the Experience

By combining GSAP for animations and custom JavaScript for randomization, the project achieves a dynamic, interactive experience. Each click feels unique due to the random selection of media items and their engaging animations, along with the added audio feedback from the click sound.

---

## How to Run

1. **Clone the repository**:

   ```bash
   git clone https://github.com/thounny/DAY_026.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd DAY_026
   ```

3. **Open the `index.html` file** in your browser, or use a local development server like **Live Server** in VSCode.

---

## Project Structure

```bash
DAY_026/
│
├── assets/
│   └── click-sfx.mp3
│   └── gif-1.gif ... gif-18.gif
│   └── img-1.png ... img-11.png
├── fonts/
├── index.html
├── script.js
├── styles.css
```

---

## Technologies Used

- **HTML5**: Provides the basic structure for the interactive display.
- **CSS3**: Handles the styling, with a minimalist, black-and-white scheme to emphasize the interactive elements.
- **JavaScript (ES6)**: Manages the random selection, cursor tracking, and media display logic.
- **GSAP (GreenSock Animation Platform)**: Powers the animations for each media element, providing smooth scaling, positioning, and fading effects.

---

## Author

![Logo](./assets/index_dwn.gif)

**Thounny Keo**  
Creative Developer & Designer  
Frontend Development Student | Year Up United

---

![miku](./assets/miku.gif)