
document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("chessboard");
    const message = document.getElementById("message");

    const pieces = {
        "f6": { symbol: "♕", color: "white" }, // Regina bianca
        "h3": { symbol: "♖", color: "white" }, // Torre bianca
        "g1": { symbol: "♔", color: "white" }, // Re bianco
        "h8": { symbol: "♚", color: "black" }, // Re nero
        "g7": { symbol: "♟", color: "black" }  // Pedone nero
    };

    let moveHistory = [];
    let draggedPiece = null;
    let startPosition = null;

    function createBoard() {
        const files = "abcdefgh";
        for (let row = 8; row >= 1; row--) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement("div");
                const position = files[col] + row;
                square.classList.add("square", (row + col) % 2 === 0 ? "light" : "dark");
                square.dataset.position = position;

                if (pieces[position]) {
                    const piece = document.createElement("span");
                    piece.textContent = pieces[position].symbol;
                    piece.classList.add("piece", pieces[position].color === "white" ? "white-piece" : "black-piece");
                    piece.draggable = true;
                    piece.dataset.piece = pieces[position].symbol;
                    piece.dataset.position = position;

                    piece.addEventListener("dragstart", dragStart);
                    square.appendChild(piece);
                }

                square.addEventListener("dragover", dragOver);
                square.addEventListener("drop", dropPiece);

                board.appendChild(square);
            }
        }
    }

    function dragStart(event) {
        draggedPiece = event.target;
        startPosition = draggedPiece.dataset.position;
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dropPiece(event) {
        event.preventDefault();
        if (!draggedPiece) return;

        const targetSquare = event.currentTarget;
        const targetPosition = targetSquare.dataset.position;

        if (isValidMove(startPosition, targetPosition)) {
            movePiece(targetSquare, targetPosition);
        }
    }

    function isValidMove(from, to) {
        const correctMoves = ["f6-f8", "h3-h6", "f8-g8"];
        const move = `${from}-${to}`;

        if (move === correctMoves[moveHistory.length]) {
            moveHistory.push(move);
            return true;
        }

        return false;
    }

    function movePiece(targetSquare, targetPosition) {
        targetSquare.innerHTML = "";
        targetSquare.appendChild(draggedPiece);
        draggedPiece.dataset.position = targetPosition;

        if (moveHistory.length === 3) {
            setTimeout(() => {
                message.textContent = "Ogni tua mossa rende la mia vita più bella. Tanti auguri, amore mio! 🎂♟️";
            }, 500);
        }
    }

    createBoard();
});
