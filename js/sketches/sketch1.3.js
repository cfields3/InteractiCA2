var sketch1 = function ( sketch ) {
  let numCells = 23;
  let cellSide = 40;
  let cellBuffer = 4;
  let generation = 0;
  let cells;
  let ruleset = [0, 0, 1, 1, 0, 0, 1, 1];
  let container;
  let height = 60;
  let generationLabel;
  let stop = false;
  let running = false;
  let step;
  let run;

  sketch.setup = () => {
    canvas = sketch.createCanvas(numCells * (cellSide + cellBuffer), 11 * (cellSide + cellBuffer));
    cells = Array(numCells);
    for (let i = 0; i < cells.length; i++) {
      cells[i] = 0;
    }
    cells[sketch.floor(numCells/2)] = 1;
    container = sketch.select('#ruleGenContainer');
    container.style('height', height + 'px');
    canvas.mousePressed(changeBox);
    step = sketch.createButton('Step <span class="symbol">▶</span>');
    let reset = sketch.createButton('⟳');
    reset.parent('resetButton');
    reset.mousePressed(sketch.reset);
    step.parent('stepButton');
    step.mousePressed(sketch.generate);
    run = sketch.createButton('Run <span class="symbol">▶▶</span>');
    run.parent('runButton');
    run.mousePressed(sketch.run);
    let stop = sketch.createButton('Stop ◼︎');
    stop.parent('stopButton');
    stop.mousePressed(sketch.stop);
    generationLabel = sketch.createButton('Generation: 0');
    generationLabel.parent('generationLabel2');
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
    for (let g = generation + 1; g < 10; g++) {
      for (let i = 2; i < numCells - 2; i++) {
        sketch.fill(230);
        let x = i * (cellSide + cellBuffer);
        let y = g * (cellSide + cellBuffer);
        sketch.square(x, y, cellSide);
      }
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

  sketch.stop = () => {
    stop = true;
  }

  sketch.reset = () => {
    stop = true;
    cells = Array(numCells);
    for (let i = 0; i < cells.length; i++) {
      cells[i] = 0;
    }
    cells[sketch.floor(numCells/2)] = 1;
    generation = 0;
    generationLabel.html('Generation: 0');
    step.style('background-color', 'rgb(24, 124, 206)');
    run.style('background-color', 'rgb(24, 124, 206)');
    sketch.clear();
  }

  sketch.generate = () => {
    // Reset ruleset array
    for (let i = 0; i < ruleset.length; i++)
      ruleset[i] = 0;

    let ruleNumber = document.getElementById('ruleNumber').innerText;
    let ruleBinary = parseInt(ruleNumber).toString(2);
    let rulesetIndex = ruleset.length - 1;
    for (let i = ruleBinary.length - 1; i >=0; i--) {
      ruleset[rulesetIndex] = parseInt(ruleBinary.charAt(i));
      rulesetIndex--;
    }
    if (generation > 8)
      return;
    let nextgen = Array(cells.length);
    for (let i = 0; i < cells.length; i++) {
      let left   = cells[i-1];   // Left neighbor state
      let me     = cells[i];     // Current state
      let right  = cells[i+1];   // Right neighbor state
      nextgen[i] = sketch.rules(left, me, right); // Compute next generation state based on ruleset
    }
    cells = nextgen;
    generationLabel.html('Generation: ' + (generation + 1));
    generation++;
    if (generation > 8) {
      step.style('background-color', 'rgb(92, 158, 212)');
      run.style('background-color', 'rgb(92, 158, 212)');
    } 
  }

  // Wait before executing new line of code
  const delay = ms => new Promise(res => setTimeout(res, ms));

  sketch.run = async () => {
    stop = false;
    let i = generation;
    while (!running && !stop && i <= 10) {
      running = true;
      sketch.generate();
      await delay(500);
      running = false;
      i++;
    }
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
};

var p5_1 = new p5(sketch1, 'ruleGenContainer');