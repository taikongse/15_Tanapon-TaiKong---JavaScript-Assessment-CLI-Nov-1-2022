// const prompt = require('prompt-sync')({sigint: true});

const heart = '♥';
const hole = '☠';
const fieldCharacter = '░';
const pathCharacter = '✈';

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.field[0][0] = pathCharacter; // Start position
    this.locationX = 0;
    this.locationY = 0;
  }

  gameStart() {
    let starting = false;
    while (!starting) {
      this.print();
      this.setDirections();
      if (!this.onStage()) {
        console.log("Guys, You're outside of the field!");
        starting = false;
        break;
      } else if (this.trapHole()) {
        console.log('Hey Dude, You step into the trap!');
        starting = false;
        break;
      } else if (this.yourHeart()) {
        console.log("You've finally found your heart!");
        starting = false;
        break;
      }
      this.field[this.locationY][this.locationX] = pathCharacter; // Current position
    }
  }

  setDirections() {
    const instructions = prompt('In which direction do you want to search for your heart?').toUpperCase();
    switch (instructions) {
      case 'W':
        this.locationY -= 1;
        break;
      case 'S':
        this.locationY += 1;
        break;
      case 'A':
        this.locationX -= 1;
        break;
      case 'D':
        this.locationX += 1;
        break;
      default:
        console.log('Press W A S D as directional: W = Go Up, S = Go Down, A = Go Left or D = Go Right, P.S. Do not fall into the trap ☠');
        this.setDirections();
        break;
    }
  }

  onStage() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }

  yourHeart() {
    return this.field[this.locationY][this.locationX] === heart;
  }

  trapHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }

  print() {
    const displayStage = this.field.map(row => {
      return row.join('');
    }).join('\n');
    console.log(displayStage);
  }

  static generateField(height, width, percentage = 0.1) {
    const field = new Array(height).fill(0).map(el => new Array(width));
    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        const prob = Math.random();
        field[x][y] = prob > percentage ? fieldCharacter : hole;
      }
    }
    // Destination
    const heartLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
    while (heartLocation.x === 0 && heartLocation.y === 0) {
      heartLocation.x = Math.floor(Math.random() * width);
      heartLocation.y = Math.floor(Math.random() * height);
    }
    field[heartLocation.y][heartLocation.x] = heart;
    return field;
  }
}

const myfield = new Field(Field.generateField(12, 28, 0.2));

// Display
console.log('===========================')
console.log('\Find Your HEART - CLI Game\n===========================')
console.log(' ✈ = Your position\n ♥ = Your goal\n ☠ = Traps\n ░ = Field area ')
console.log('===========================')
console.log('Press W A S D as directional: \n W = Go Up,\n S = Go Down,\n A = Go Left,\n D = Go Right,\n ☠ P.S. Do not fall into the trap ☠')
console.log('===========================')

myfield.gameStart();