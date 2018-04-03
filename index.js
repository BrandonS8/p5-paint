function setup() {
  let canvas = createCanvas(windowWidth, windowHeight*0.85)
  canvas.parent('canvas-holder')
  background(233)
}

function draw() {
 
}

function mouseDragged(){
    smooth()
    strokeWeight(20)
    stroke(0)
    line(mouseX, mouseY, pmouseX, pmouseY)
}

document.querySelector('.redSlider').addEventListener('change', (e) => {
  console.log(e.target.value)
})