const GRID_SIZE = 4;
let grid = [];
let score = 0;

function initGame() {
    grid = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => 0));

    addNewNumber();
    addNewNumber();

    updateGrid();
    updateScore();
}

function addNewNumber() {
    let options = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (grid[i][j] === 0) {
                options.push({ x: i, y: j });
            }
        }
    }
    if (options.length > 0) {
        let spot = options[Math.floor(Math.random() * options.length)];
        grid[spot.x][spot.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateGrid() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            let cellValue = grid[i][j];
            let cell = document.createElement('div');
            cell.className = 'grid-cell';
            if (cellValue !== 0) {
                cell.textContent = cellValue;
                cell.style.backgroundColor = getCellBackgroundColor(cellValue);
            } else {
                //use $nbsp; to keep the cell from collapsing
                cell.innerHTML = '&nbsp;';

            }
            gridContainer.appendChild(cell);
        }
    }
}

function getCellBackgroundColor(value) {
    switch (value) {
        case 2: return '#eee4da';
        case 4: return '#ede0c8';
        case 8: return '#f2b179';
        case 16: return '#f59563';
        case 32: return '#f67c5f';
        case 64: return '#f65e3b';
        case 128: return '#edcf72';
        case 256: return '#edcc61';
        case 512: return '#9c0';
        case 1024: return '#33b5e5';
        case 2048: return '#09c';
        default: return '#ccc0b3';
    }
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}




document.getElementById('new-game-btn').addEventListener('click', function() {
    initGame();
});

window.onload = function() {
    initGame();
};
