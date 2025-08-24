const stackContainer = document.querySelector(".stack");
const floatWrapContainer = document.querySelector(".float-wrap");
const loader = document.querySelector(".loader");
const loadingBar = document.querySelector(".loading-copy .bar");


const tattooImages = [
  {
    "title": "Hand Tattoo Pictures",
    "url": "https://unsplash.com/s/photos/hand-tattoo",
    "thumbnail": "https://ts3.mm.bing.net/th?id=OIP.nwS2Kl6iS94AbR3AKBTr4wHaE7&pid=15.1"
  },
  {
    "title": "Arm Tattoo Designs",
    "url": "https://unsplash.com/s/photos/arm-tattoo",
    "thumbnail": "https://plus.unsplash.com/premium_photo-1661714220704-711551e73799?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGF0dG9vfGVufDB8fDB8fHww"
  },
  {
    "title": "Minimalist Tattoos",
    "url": "https://unsplash.com/s/photos/minimalist-tattoo",
    "thumbnail": "https://images.unsplash.com/photo-1552627019-947c3789ffb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRhdHRvb3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    "title": "Blackwork Tattoo Art",
    "url": "https://unsplash.com/s/photos/blackwork-tattoo",
    "thumbnail": "https://plus.unsplash.com/premium_photo-1707761864662-eeeb7d09b712?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2t3b3JrJTIwdGF0dG9vfGVufDB8fDB8fHww"
  },
  {
    "title": "Tattooed Portraits",
    "url": "https://unsplash.com/s/photos/tattoo-portrait",
    "thumbnail": "https://plus.unsplash.com/premium_photo-1708111597396-38ff0deccc0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGF0dG9vJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
  },
  {
    "title": "Tattoo Sleeve Inspiration",
    "url": "https://unsplash.com/s/photos/tattoo-sleeve",
    "thumbnail": "https://images.unsplash.com/photo-1712027858716-5467a9aff866?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRhdHRvJTIwYXJ0fGVufDB8fDB8fHww"
  },
  {
    "title": "Geometric Tattoos",
    "url": "https://unsplash.com/s/photos/geometric-tattoo",
    "thumbnail": "https://plus.unsplash.com/premium_photo-1661714174263-0111aac4ecf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2VvbWV0cmljJTIwdGF0dG9vfGVufDB8fDB8fHww"
  },
  {
    "title": "Tattoo Studio Vibes",
    "url": "https://unsplash.com/s/photos/tattoo-studio",
    "thumbnail": "https://images.unsplash.com/photo-1608666599953-b951163495f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGF0dG9vJTIwc3R1ZGlvfGVufDB8fDB8fHww"
  },
  {
    "title": "Tattoo Equipment Closeups",
    "url": "https://unsplash.com/s/photos/tattoo-equipment",
    "thumbnail": "https://images.unsplash.com/photo-1573138754361-3c364c82bd76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRhdHRvbyUyMGVxdWlwbWVudHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    "title": "Tattoo Lifestyle Shots",
    "url": "https://unsplash.com/s/photos/tattoo-lifestyle",
    "thumbnail": "https://plus.unsplash.com/premium_photo-1723828133366-398f5ea5e3d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGF0dG9vJTIwbGlmZXN0eWxlfGVufDB8fDB8fHww"
  }
]

let LOADER_TIME = 0;
const totalImages = tattooImages.length;

function initImageElements(){
const originalElements = [];
const startClones = [];
const endClones = [];


tattooImages.forEach((image, index) => {
   LOADER_TIME = 300 * index;


    const reverseIndex = totalImages - (index + 1);
    const scaleFactor = (reverseIndex  / 50 * 9) + 0.38  ;

    const rotation = index % 4 + 1;
    const degValue = index == 0 ? 0 : (index  % 2 !== 0) ?(rotation + 2) : (-rotation - 2);

    const card = document.createElement("div");
    card.classList.add("card");

    card.style.setProperty("--r", `${degValue}deg`);
    card.style.scale = `${scaleFactor}`;

    card.innerHTML = `
      <a href="${image.url}" target="_blank">
        <img src="${image.thumbnail}" alt="aliens tattoo - ${image.title}">
      </a>
    `;

    setTimeout(() => {
      document.querySelector(".stack").appendChild(card);
      card.classList.add("show");
    }, index == 0 ? 10 : LOADER_TIME);







     // Create the original element
    const floatElement = floatImagesAppend(image.thumbnail, index, degValue);
    originalElements.push(floatElement);


 // Create the clones for the start of the loop (clones of the last images)
    // We clone the last few items to create the loop. Here, we clone the last 2.
    if (index >= totalImages - 2) {
        const floatElementClon = floatImagesAppend(image.thumbnail, index, degValue);
        floatElementClon.classList.add("is-clone");
        startClones.push(floatElementClon);
    }


    // Create the clones for the end of the loop (clones of the first images)
    // We clone the first few items to create the loop. Here, we clone the first 2.
    if (index < 2) {
        const floatElementClon = floatImagesAppend(image.thumbnail, index, degValue);
        floatElementClon.classList.add("is-clone");
        endClones.push(floatElementClon);
    }

  });

function floatImagesAppend(
  image,
  index,
  degValue
) {
const float = document.createElement("div");
float.classList.add("float");
float.setAttribute("data-index", index + 1);
float.style.backgroundImage = `url('${image}')`;
float.style.setProperty("--r", `${degValue}deg`);
return float;
}



// Append all elements to the container in the correct order
// 1. Clones for the start of the loop
startClones.forEach(clone => floatWrapContainer.appendChild(clone));
// 2. The original set of images
originalElements.forEach(element => floatWrapContainer.appendChild(element));
// 3. Clones for the end of the loop
endClones.forEach(clone => floatWrapContainer.appendChild(clone));

}

initImageElements();


// Trigger the animation
setTimeout(() => {
  loadingBar.classList.add('animate');
  loadingBar.style.animationDuration = `${LOADER_TIME}ms`;
}, 1); // slight delay to ensure DOM is ready

// Hide the loader after the animation completes
setTimeout(() => {
  loader.classList.add("hide");
animateInkTrail();

}, LOADER_TIME);


const inkCanvas = document.getElementById("ink-canvas");
const ctx = inkCanvas.getContext("2d");
let points = [];
const maxPoints = 10;

// Set canvas dimensions
function setCanvasSize() {
  inkCanvas.width = window.innerWidth;
  inkCanvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener("resize", setCanvasSize);

// Handle mouse movement to add points to the trail
document.addEventListener("mousemove", (e) => {
  points.push({ x: e.x, y: e.y, alpha: 2, size: 25 });
  if (points.length > maxPoints) {
    points.shift();
  }
});



// Animation loop for the ink trail
function animateInkTrail() {
  ctx.clearRect(0, 0, inkCanvas.width, inkCanvas.height + 20);

  // Draw a continuous line connecting the points
  if (points.length > 1) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = `rgba(51, 51, 51, ${points[points.length - 1].alpha})`;
    ctx.lineWidth = points[points.length - 1].size;
    ctx.lineJoin = "bevel";
    ctx.lineCap = "round";
    ctx.stroke();
 
  }

  // Update the points for fading and shrinking effect
  for (let i = 0; i < points.length; i++) {
    points[i].alpha -= 0.02; // Fading effect
    points[i].size *= 0.95; // Shrinking effect
  }

  // Remove points that have faded away
  points = points.filter((p) => p.alpha > 0.05);

  requestAnimationFrame(animateInkTrail);
}


