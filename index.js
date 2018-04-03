// setup variables for app
let color = {r: 0, g: 0, b: 255}

// set document variables
const recentColorList = document.querySelector('.recent-colors')
const savedColorList = document.querySelector('.saved-colors')
// setup color picker from iro.js
const colorPicker = new iro.ColorPicker(".color-picker", {
  width: 130,
  height: 130,
  sliderMargin: 2,
  display: 'inline',
  color: "#00f"
})

colorPicker.on("color:change", newColor => {
  color = newColor.rgb
})

colorPicker.on("input:end", (c) =>  {
  if(recentColorList.childNodes.length < 10){
    addNewSwatch(c)
  } else {
    recentColorList.removeChild(recentColorList.lastChild)
    addNewSwatch(c)
  }
})

function addNewSwatch(c){
  let box = document.createElement('div')
  box.classList.add("color-box")
  box.style.background = c.hexString
  let last = c.rgb
  box.addEventListener('click', () => {
    color = last
    colorPicker.color.rgb = last
  })
  recentColorList.insertBefore(box, recentColorList.childNodes[0])
}

function saveSwatch(){
  let box = document.createElement('div')
  box.classList.add("color-box")
  box.style.background = `rgb(${color.r}, ${color.g}, ${color.b})`
  let savedColor = color
  box.addEventListener('click', () => {
    color = savedColor
    colorPicker.color.rgb = color
  })
  savedColorList.insertBefore(box, savedColorList.childNodes[0])
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight*0.80)
  canvas.parent('canvas-holder')
  addNewSwatch({rgb: 
    {r: 0, g: 0, b: 255},
    hexString: '#00F'
  })
}

function draw() {
}


function keyPressed() {
  if (keyCode === ENTER) {
    saveSwatch()
  }
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

// make size slider
// make buttons to change if making lines or shapes