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

function moveUp() {
    let moved = false;
    for (let j = 0; j < GRID_SIZE; j++) {
        let currentRow = 0;
        for (let i = 1; i < GRID_SIZE; i++) {
            if (grid[i][j] !== 0) {
                if (grid[currentRow][j] === 0) {
                    grid[currentRow][j] = grid[i][j];
                    grid[i][j] = 0;
                    moved = true;
                } else if (grid[currentRow][j] === grid[i][j]) {
                    grid[currentRow][j] *= 2;
                    score += grid[currentRow][j];
                    grid[i][j] = 0;
                    moved = true;
                    currentRow++;
                } else {
                    currentRow++;
                    if (currentRow !== i) {
                        grid[currentRow][j] = grid[i][j];
                        grid[i][j] = 0;
                        moved = true;
                    }
                }
            }
        }
    }
    return moved;
}

function moveDown() {
    let moved = false;
    for (let j = 0; j < GRID_SIZE; j++) {
        let currentRow = GRID_SIZE - 1;
        for (let i = GRID_SIZE - 2; i >= 0; i--) {
            if (grid[i][j] !== 0) {
                if (grid[currentRow][j] === 0) {
                    grid[currentRow][j] = grid[i][j];
                    grid[i][j] = 0;
                    moved = true;
                } else if (grid[currentRow][j] === grid[i][j]) {
                    grid[currentRow][j] *= 2;
                    score += grid[currentRow][j];
                    grid[i][j] = 0;
                    moved = true;
                    currentRow--;
                } else {
                    currentRow--;
                    if (currentRow !== i) {
                        grid[currentRow][j] = grid[i][j];
                        grid[i][j] = 0;
                        moved = true;
                    }
                }
            }
        }
    }
    return moved;
}

function moveLeft() {
    let moved = false;
    for (let i = 0; i < GRID_SIZE; i++) {
        let currentCol = 0;
        for (let j = 1; j < GRID_SIZE; j++) {
            if (grid[i][j] !== 0) {
                if (grid[i][currentCol] === 0) {
                    grid[i][currentCol] = grid[i][j];
                    grid[i][j] = 0;
                    moved = true;
                } else if (grid[i][currentCol] === grid[i][j]) {
                    grid[i][currentCol] *= 2;
                    score += grid[i][currentCol];
                    grid[i][j] = 0;
                    moved = true;
                    currentCol++;
                } else {
                    currentCol++;
                    if (currentCol !== j) {
                        grid[i][currentCol] = grid[i][j];
                        grid[i][j] = 0;
                        moved = true;
                    }
                }
            }
        }
    }
    return moved;
}

function moveRight() {
    let moved = false;
    for (let i = 0; i < GRID_SIZE; i++) {
        let currentCol = GRID_SIZE - 1;
        for (let j = GRID_SIZE - 2; j >= 0; j--) {
            if (grid[i][j] !== 0) {
                if (grid[i][currentCol] === 0) {
                    grid[i][currentCol] = grid[i][j];
                    grid[i][j] = 0;
                    moved = true;
                } else if (grid[i][currentCol] === grid[i][j]) {
                    grid[i][currentCol] *= 2;
                    score += grid[i][currentCol];
                    grid[i][j] = 0;
                    moved = true;
                    currentCol--;
                } else {
                    currentCol--;
                    if (currentCol !== j) {
                        grid[i][currentCol] = grid[i][j];
                        grid[i][j] = 0;
                        moved = true;
                    }
                }
            }
        }
    }
    return moved;
}



document.addEventListener('keydown', function(event) {
    let moved = false;
    switch (event.key) {
        case 'ArrowUp':
            event.preventDefault();
            moved = moveUp();
            break;
        case 'ArrowDown':
            event.preventDefault();
            moved = moveDown();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            moved = moveLeft();
            break;
        case 'ArrowRight':
            event.preventDefault();
            moved = moveRight();
            break;
    }
    if (moved) {
        addNewNumber();
        updateGrid();
        updateScore();
    }

});


document.getElementById('new-game-btn').addEventListener('click', function() {
    initGame();
});

window.onload = function() {
    initGame();
};
