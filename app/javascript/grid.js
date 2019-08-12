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

  getBlock(x, y) {
    let col = this.grid[x];
    if (col === undefined) return undefined;
    return col[y];
  }

  checkBlock(visitedSet, block, colour) {
    if (block === undefined) return;

    if (visitedSet.has(block)) return;
    visitedSet.add(block);

    if (block.colour != colour) return;
    // north
    let north = this.getBlock(block.x, block.y + 1);
    this.checkBlock(visitedSet, north, colour);
    // east
    let east = this.getBlock(block.x + 1, block.y);
    this.checkBlock(visitedSet, east, colour);
    // south
    let south = this.getBlock(block.x, block.y - 1);
    this.checkBlock(visitedSet, south, colour);
    // west
    let west = this.getBlock(block.x - 1, block.y);
    this.checkBlock(visitedSet, west, colour);
  }

  hideBlock(block) {
    for (let y = this.grid[block.x].length - 1; y > block.y; y--) {
      this.grid[block.x][y].y--;
    }
    this.grid[block.x].splice(block.y, 1);
  }

  blockClicked(e, block) {
    var visitedSet = new Set([]);
    var colour = block.colour;
    this.checkBlock(visitedSet, block, colour);
    visitedSet.forEach((value, unused, visitedSet) => {
      if (value.colour === colour) {
        this.hideBlock(value);
      }
    });
    this.render();
  }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
