export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

export class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
  }
}

export class BlockGrid {
  constructor() {
    this.grid = [];

    for (let x = 0; x < MAX_X; x++) {
      let col = [];
      for (let y = 0; y < MAX_Y; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }

    return this;
  }

  render(el = document.querySelector('#gridEl')) {

    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    for (let x = 0; x < MAX_X; x++) {
      let id = 'col_' + x;
      let colEl = document.createElement('div');
      colEl.className = 'col';
      colEl.id = id;
      el.appendChild(colEl);

      for (let y = this.grid[x].length-1; y >= 0; y--) {
        let block = this.grid[x][y],
          id = `block_${x}x${y}`,
          blockEl = document.createElement('div');

        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = block.colour;
        blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
        colEl.appendChild(blockEl);
      }
    }

    return this;
  }

  hideBlock(block) {
    // Move y of every block above this block down by 1
    for (let y = this.grid[block.x].length - 1; y > block.y; y--) {
      this.grid[block.x][y].y--;
    }
    this.grid[block.x].splice(block.y, 1);
  }

  blockClicked(e, block) {
    // this.grid[block.x][block.y];
    this.hideBlock(block);
    console.log(this.grid);
    this.render();
  }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
