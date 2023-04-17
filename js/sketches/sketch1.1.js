var sketch1 = function( sketch ) {
  let numCells = 1;
  let cellWidth = 100;
  let color = 255;

  let cells = [];

  sketch.setup = () => {
    let canvas = sketch.createCanvas(numCells * cellWidth, cellWidth);
    canvas.mousePressed(changeBox);
  }

  sketch.draw = () => {
    for (let i = 0; i < numCells; i++) {
        let x = i * cellWidth;
        sketch.stroke(0);
        if (cells[i] >= 1) {
          sketch.fill(24, 124, 206); // Make it blue (alive)
        } else {
          sketch.fill(color); // Make it white (dead)
        }
        sketch.square(x, 0, cellWidth);
    }
  }

  function changeBox() {
    if (cells[sketch.floor(sketch.mouseX / cellWidth)] == 1) {
      cells[sketch.floor(sketch.mouseX / cellWidth)] = 0;
    } else {
      cells[sketch.floor(sketch.mouseX / cellWidth)] = 1;
    }
  }
};

var sketch2 = function ( sketch ) {
  let numCells = 7;
  let cellWidth = 100;
  let cellBuffer = 7;

  let cells = [];

  sketch.setup = () => {
    let canvas = sketch.createCanvas(numCells * (cellWidth + cellBuffer), cellWidth);
    canvas.mousePressed(changeBox);
  }

  sketch.draw = () => {
    for (let i = 0; i < numCells; i++) {
        let x = i * (cellWidth + cellBuffer);
        sketch.stroke(0);
        if (cells[i] >= 1) {
          sketch.fill(24, 124, 206); // Make it blue (alive)
        } else {
          sketch.fill(255); // Make it white (dead)
        }
        sketch.square(x, 0, cellWidth);
    }
  }

  function changeBox() {
    let index = sketch.floor(sketch.mouseX / (cellWidth + cellBuffer));
    if (cells[index] == 1) {
      cells[index] = 0;
    } else {
      cells[index] = 1;
    }
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
  let ruleset = [0, 0, 1, 1, 0, 0, 1, 1];
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

var sketch4 = function ( sketch ) {
  let numCells = 11;
  let cellSide = 100;
  let cellBuffer = 7;
  let button;
  let generation = 0;
  let cells;
  let ruleset = [0, 0, 1, 1, 0, 0, 1, 1];
  let container;
  let height = 120;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(numCells * (cellSide + cellBuffer), (cellSide + cellBuffer));
    cells = Array(numCells);
    for (let i = 0; i < cells.length; i++) {
      cells[i] = 0;
    }
    cells[cells.length/2] = 1;
    container = sketch.select('#generatorContainer0');
    container.style('height', height + 'px');
    
    canvas.mousePressed(changeBox);
    button = sketch.createButton('Generate Next Step');
    let reset = sketch.createButton('⟳');
    reset.parent('resetButton0');
    reset.mousePressed(sketch.reset);
    button.parent('generateButton0');
    button.mousePressed(sketch.generate);
  }

  sketch.draw = () => {
    for (let i = 2; i < numCells - 2; i++) {
      if (cells[i] >= 1) {
        sketch.fill(24, 124, 206);
      } else {
        sketch.fill(255);
      }
      let x = i * (cellSide + cellBuffer);
      sketch.square(x, 0, cellSide);
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
    let nextgen = Array(cells.length);
    for (let i = 0; i < cells.length; i++) {
      let left   = cells[i-1];   // Left neighbor state
      let me     = cells[i];     // Current state
      let right  = cells[i+1];   // Right neighbor state
      nextgen[i] = sketch.rules(left, me, right); // Compute next generation state based on ruleset
    }
    cells = nextgen;
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
    height = 120;
    container.style('height', height + 'px');
    button.style('background-color', 'rgb(24, 124, 206)');
    sketch.clear();
  }
};


var p5_1 = new p5(sketch1, 'boxContainer');
var p5_2 = new p5(sketch2, 'arrayContainer');
var p5_3 = new p5(sketch3, 'generatorContainer');
var p5_4 = new p5(sketch4, 'generatorContainer0');