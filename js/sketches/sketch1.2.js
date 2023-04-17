var sketch1 = function ( sketch ) {
  let numCells = 9;
  let cellWidth = 100;
  let cellBuffer = 7;

  let cells = [];

  sketch.setup = () => {
    let canvas = sketch.createCanvas(numCells * (cellWidth + cellBuffer), cellWidth);
    canvas.mousePressed(changeBox);
  }

  sketch.draw = () => { 
    sketch.clear();
    for (let i = 0; i < numCells; i++) {
        let x = i * (cellWidth + cellBuffer);
        sketch.stroke(0);
        if (cells[i] == 1) {
          sketch.fill(24, 124, 206); // Make it blue (selected)
        } else if (cells[i] == 2) {
          sketch.fill(255, 253, 188); // Make it yellow (neighbor)
        } else {
          sketch.fill(255); // Make it white (dead)
        }
        if (i == 0) {
          if (cells[1] == 1) {
            sketch.drawingContext.setLineDash([5,5]);
            sketch.square(x, 0, cellWidth);
            sketch.drawingContext.setLineDash([]);
          }
        } else if (i == numCells - 1) {
          if (cells[numCells - 2] == 1) {
            sketch.drawingContext.setLineDash([5,5]);
            sketch.square(x, 0, cellWidth);
            sketch.drawingContext.setLineDash([]);
          }
        } else {
          sketch.square(x, 0, cellWidth);
        }
        
    }
  }

  function changeBox() {
    let index = sketch.floor(sketch.mouseX / (cellWidth + cellBuffer));
    if (index == 0 || index == numCells - 1)
      return;
    clearBoard();
    if (cells[index] == 1) {
      cells[index] = 0;
    } else {
      cells[index] = 1;
      cells[index - 1] = 2;
      cells[index + 1] = 2;
    }
  }

  function clearBoard() {
    for(let i = 0; i < numCells; i++) {
      cells[i] = 0;
    }
  }
};

var sketch2 = function ( sketch ) {
  const State = {
    Dead: 0,
    Alive: 1,
    AliveSelected: 2,
    DeadSelected: 3
  }
  let numCells = 9;
  let cellWidth = 100;
  let cellBuffer = 7;

  let prevCells = [];
  let cells = [];

  sketch.setup = () => {
    let canvas = sketch.createCanvas(numCells * (cellWidth + cellBuffer), cellWidth * 2 + cellBuffer);
    canvas.mousePressed(changeBox);
    resetBoard();
  }

  sketch.draw = () => { 
    sketch.clear();

    for (let i = 0; i < numCells; i++) {
      let x = i * (cellWidth + cellBuffer);
      let y = 0;
      
      setCell(prevCells, i, x, y);
    }
    for (let i = 0; i < numCells; i++) {
        let x = i * (cellWidth + cellBuffer);
        let y = cellWidth + cellBuffer;
        
       setCell(cells, i, x, y); 
    }
  }

  function setCell(cells, i, x, y) {
    sketch.strokeWeight(1);
    sketch.stroke(0);
    sketch.drawingContext.setLineDash([]);
    let draw = true;

    if (i == 0) {
      if (prevCells[0] == State.DeadSelected) {
        sketch.drawingContext.setLineDash([5,5]);
      } else {
        draw = false;
      }
    }

    if (i == numCells - 1) {
      if (prevCells[numCells - 1] == State.DeadSelected) {
        sketch.drawingContext.setLineDash([5,5]);
      } else {
        draw = false;
      }
    }

    switch(cells[i]) {
      case State.Alive:
        sketch.fill(24, 124, 206); // Blue
        break;
      case State.Dead:
        sketch.fill(255); // White
        break;
      case State.AliveSelected:
        sketch.strokeWeight(4); // Thick border
        sketch.fill(4, 104, 286); // Blue 
        break;
      case State.DeadSelected:
        sketch.strokeWeight(4); // Thick border
        sketch.fill(220); // White
        break;
    }

    if (draw)
      sketch.square(x, y, cellWidth);
  }

  function changeBox() {
    let index = sketch.floor(sketch.mouseX / (cellWidth + cellBuffer));
    if (index == 0 || index == numCells - 1 || sketch.mouseY < cellWidth + cellBuffer)
      return;
    resetBoard();
    
    setSelected(cells, index);

    for (let i = index - 1; i <= index + 1; i++) {
      setSelected(prevCells, i);
    }  
  }

  function setSelected(cells, index) {
    switch(cells[index]) {
      case State.Alive:
        cells[index] = State.AliveSelected;
        break;
      case State.Dead:
        cells[index] = State.DeadSelected;
        break;
    }
  }

  function resetBoard() {
    for(let i = 0; i < numCells; i++) {
      prevCells[i] = State.Dead;
      cells[i] = State.Dead;
    }
    prevCells[1] = State.Alive;
    prevCells[2] = State.Alive;
    prevCells[3] = State.Alive;
    prevCells[5] = State.Alive;
    cells[4] = State.Alive;
    cells[6] = State.Alive;
    cells[7] = State.Alive;
  }
};

var sketch3 = function ( sketch ) {
  let numCells = 11;
  let cellSide = 100;
  let cellBuffer = 7;
  let button;
  let generation = 0;
  let generationLabel;
  let cells;
  let ruleset = [0, 0, 0, 1, 1, 1, 1, 0];
  let container;
  let height = 120;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(numCells * (cellSide + cellBuffer), 10 * (cellSide + cellBuffer));
    cells = Array(numCells);
    for (let i = 0; i < cells.length; i++) {
      cells[i] = 0;
    }
    cells[cells.length/2] = 1;
    container = sketch.select('#generatorContainer');
    container.style('height', height + 'px');
    
    canvas.mousePressed(changeBox);
    button = sketch.createButton('Generate Next Step');
    let reset = sketch.createButton('⟳');
    reset.parent('resetButton');
    reset.mousePressed(sketch.reset);
    button.parent('generateButton');
    button.mousePressed(sketch.generate);
    generationLabel = sketch.createButton('Current Generation: 0');
    generationLabel.parent('generationLabel');
  }

  sketch.draw = () => {
    for (let i = 2; i < numCells - 2; i++) {
      if (cells[i] >= 1) {
        sketch.fill(24, 124, 206);
      } else {
        sketch.fill(255);
      }
      let x = i * (cellSide + cellBuffer);
      let y = generation * (cellSide + cellBuffer);
      sketch.square(x, y, cellSide);
    }
  }

  function changeBox() {
    let index = sketch.floor(sketch.mouseX / (cellSide + cellBuffer));
    if (cells[index] == 1) {
      cells[index] = 0;
    } else {
      cells[index] = 1;
    }
  }

  sketch.generate = () => {
    if (generation > 8) {
      button.style('background-color', 'rgb(92, 158, 212)')
      return;
    }
    height += 107;
    container.style('height', height + 'px');
    window.scrollBy(0, 107);
    let nextgen = Array(cells.length);
    for (let i = 0; i < cells.length; i++) {
      let left   = cells[i-1];   // Left neighbor state
      let me     = cells[i];     // Current state
      let right  = cells[i+1];   // Right neighbor state
      nextgen[i] = sketch.rules(left, me, right); // Compute next generation state based on ruleset
    }
    cells = nextgen;
    generationLabel.html('Current Generation: ' + (generation + 1));
    generation++;
  }


  // Implementing the Wolfram rules
  sketch.rules = (a, b, c) => {
    if (a == 1 && b == 1 && c == 1) return ruleset[0];
    if (a == 1 && b == 1 && c == 0) return ruleset[1];
    if (a == 1 && b == 0 && c == 1) return ruleset[2];
    if (a == 1 && b == 0 && c == 0) return ruleset[3];
    if (a == 0 && b == 1 && c == 1) return ruleset[4];
    if (a == 0 && b == 1 && c == 0) return ruleset[5];
    if (a == 0 && b == 0 && c == 1) return ruleset[6];
    if (a == 0 && b == 0 && c == 0) return ruleset[7];
    return 0;
  }

  sketch.reset = () => {
    cells = Array(numCells);
    for (let i = 0; i < cells.length; i++) {
      cells[i] = 0;
    }
    generation = 0;
    generationLabel.html('Current Generation: 0');
    height = 120;
    container.style('height', height + 'px');
    button.style('background-color', 'rgb(24, 124, 206)');
    sketch.clear();
  }
};

var p5_1 = new p5(sketch1, 'neighborhoodsContainer');
var p5_2 = new p5(sketch2, 'rulesContainer');
var p5_3 = new p5(sketch3, 'generatorContainer');