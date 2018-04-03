// setup variables for app
let color = {r: 0, g: 0, b: 0}
// set sliders to variables
const redSlider = document.querySelector('.redSlider')


// setup sliders to update RGB values



// setup color picker from iro.js
const colorPicker = new iro.ColorPicker(".color-picker", {
  width: 130,
  height: 130,
  sliderMargin: 2,
  display: 'inline',
  color: "#fff"
})

colorPicker.on("color:change", newColor => {
  color = newColor.rgb
})

colorPicker.on("input:end", () =>  {
  console.log(color)
})

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight*0.80)
  canvas.parent('canvas-holder')
  background(233)
}

function draw() {
 
}

function mouseDragged(){
// the mouse detection starts at top of canvas so above this is negative Y thats why I check for > 0 to make sure this is only happening on canvas mouse drag
    if(mouseY > 0){
      smooth()
      strokeWeight(20)
      stroke(color.r, color.g, color.b)
      line(mouseX, mouseY, pmouseX, pmouseY)
    }
}

document.querySelector('.redSlider').addEventListener('change', (e) => {
  console.log(e.target.value)
})