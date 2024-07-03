new Vue({
    el: '#app',
    data: {
        board: Array(9).fill(''),
        currentPlayer: 'X',
        xWins: 0,
        xLosses: 0,
        oWins: 0,
        oLosses: 0,
        draws: 0
    },
    methods: {
        makeMove(index) {
            if (this.board[index] === '') {
                this.$set(this.board, index, this.currentPlayer);
                if (this.checkWin(this.currentPlayer)) {
                    if (this.currentPlayer === 'X') {
                        this.xWins++;
                        this.oLosses++;
                    } else {
                        this.oWins++;
                        this.xLosses++;
                    }
                    alert(`${this.currentPlayer} wins!`);
                    this.resetBoard();
                } else if (this.board.every(cell => cell !== '')) {
                    this.draws++;
                    alert('Draw!');
                    this.resetBoard();
                } else {
                    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        },
        checkWin(player) {
            const winningCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            return winningCombinations.some(combination => {
                return combination.every(index => {
                    return this.board[index] === player;
                });
            });
        },
        resetBoard() {
            this.board = Array(9).fill('');
        },
        resetGame() {
            this.resetBoard();
            this.xWins = 0;
            this.xLosses = 0;
            this.oWins = 0;
            this.oLosses = 0;
            this.draws = 0;
            this.currentPlayer = 'X';
        }
    }
});
