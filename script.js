const canvas = document.getElementById("canvas1"); // reference HTML canvas element
const c = canvas.getContext("2d"); // Get 2d drawing methods
const CANVAS_WIDTH = (canvas.width = 600); // capitals for global variable
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image(); //creates HTML image

playerImage.src = "shadow_dog.png";

const spriteWidth = 575;

const spriteHeight = 523;

// function animate() {
//   c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // removes old canas (x-start coordinate to clear, y start-cord to clear, x end, y end)
//   //   c.fillRect(50, 50, 100, 100); //position x , y, height  , width
//   //   c.drawImage(playerImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //image,x start, y start,|| width, height (scale up or down)||
//   // drawImage with 9 args:image,source x crop, source y crop,crop width, crop height, destination x, destination y, destination width, destination height (final 4 same as above 4)
//   c.drawImage(
//     playerImage,
//     frameX * spriteWidth, // * 1 to shift a frame along etc.
//     frameY * spriteHeight, // switch animations (using this sprite sheet)
//     spriteWidth,
//     spriteHeight,
//     0,
//     0,
//     spriteWidth,
//     spriteHeight
//   );

//   if (gameFrame % staggerFrames == 0) {
//     // frame will only run every X times
//     if (frameX < 6)
//       frameX++; // 7 frames, but first frame 0 (will cause problems if diff frame number)
//     else frameX = 0;
//   }

//   gameFrame++;
//   requestAnimationFrame(animate);
// }
// animate();

let gameFrame = 0;

let playerState = "idle";

const staggerFrames = 5; // higher number slower animation

const spriteAnimations = [];

const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  { name: "jump", frames: 7 },
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };

  for (let j = 0; j < state.frames; j++) {
    // Create a map of coordinates, with name
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }

  spriteAnimations[state.name] = frames; // assign map to name key
});

function animate() {
  c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length; // SLOWS DOWN RATE BY 5 (OR STAGGERFRAMES)
  let frameX = spriteWidth * position; // cycle frames horizontally
  let frameY = spriteAnimations[playerState].loc[position].y;
  c.drawImage(
    playerImage,
    frameX,
    frameY, // previously frameY * spriteHeight - no longer needed as frame Y multiplies position by length in line 76
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();

console.log("HEY");
