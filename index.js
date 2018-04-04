// setup variables for app
let color = {r: 0, g: 0, b: 255}
let size = 15
let mode = 'draw'

// set document variables
const recentColorList = document.querySelector('.recent-colors')
const savedColorList = document.querySelector('.saved-colors')
const sizeSlider = document.querySelector('.sizeSlider')
const squareToggle = document.querySelector('.square')

//size slider event listener
sizeSlider.addEventListener('input', (e) => {
  document.querySelector('.size').innerHTML = `Size: ${e.target.value}`
  size = e.target.value
})

squareToggle.addEventListener('click', () => {
  mode = 'square'
})

document.querySelector('.clear').addEventListener('click', () => {
  clear()
})
document.querySelector('.draw').addEventListener('click', () => {
  mode = 'draw'
})
document.querySelector('.triangle').addEventListener('click', () => {
  mode = 'triangle'
})


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
  frameRate(200)
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
    if(mouseY > 0 && mode === 'draw'){
      smooth()
      strokeWeight(size)
      stroke(color.r, color.g, color.b)
      line(mouseX, mouseY, pmouseX, pmouseY)
      console.log(size)
    } else if(mouseY > 0 && mode === 'square'){
      fill(color.r, color.g, color.b)
      noStroke()
      rect(mouseX, mouseY, size, size)
    } else if(mouseY > 0 && mode === 'triangle'){
      noStroke()
      fill(color.r, color.g, color.b)
      triangle(mouseX-size/1.5,mouseY+size/2,mouseX+size/1.5,mouseY+size/2,mouseX,mouseY)
    }
}

function mouseClicked() {
  if(mouseY > 0 && mode === 'square'){
    fill(color.r, color.g, color.b)
    noStroke()
    rect(mouseX, mouseY, size, size)
  } else if (mouseY > 0 && mode === 'draw'){
    noStroke()
    fill(color.r, color.g, color.b)
    smooth()
    ellipse(mouseX, mouseY, size/1, size/1)
    // rect(mouseX, mouseY, size, size)
  } else if (mouseY > 0 && mode === 'triangle'){
    noStroke()
    fill(color.r, color.g, color.b)
    triangle(mouseX-size/1.5,mouseY+size/2,mouseX+size/1.5,mouseY+size/2,mouseX,mouseY)
  }
}


// make size slider
// make buttons to change if making lines or shapes