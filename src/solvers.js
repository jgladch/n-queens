/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined;

  var board = new Board({n:n});
  var counter = 0;

  for (var row = 0; row < n; row++) {

    for (var col = 0; col < n; col++) {
      // check spot row x col passes all test
      board.togglePiece(row, col);

      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
        board.togglePiece(row, col);
      } else {
        counter ++;
      }
      if (counter === n) {
        solution = board.rows();
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board ({n:n});

  var placeRooks = function(currentRow, board) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(currentRow, col); //place piece and run tests
      if (board.hasAnyRowConflicts() === false && board.hasAnyColConflicts() === false) {
        if (currentRow === n - 1) { //if all pieces have been placed
          solutionCount++; // increment solutoin counter
        } else { //if there are more pieces to place
          placeRooks(currentRow + 1, board); //increment row and recurse
        }
      }
      board.togglePiece(currentRow, col); //remove piece and iterate to try next column
    }
  };

  placeRooks(0, board);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board ({n:n});
  var solution = board.rows();

  if (n === 0) {
    return solution;
  }

  var placeQueens = function(currentRow, board) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(currentRow, col);
      if (board.hasAnyRowConflicts() === false && board.hasAnyColConflicts() === false && board.hasAnyMajorDiagonalConflicts() === false && board.hasAnyMinorDiagonalConflicts() === false) {
        if (currentRow === n - 1) { //if all queens have been placed
          solution = board.rows(); //save the board as the solution
          return; //and return to outer function
        } else { //if there are more queens to place
          placeQueens(currentRow + 1, board); //increment row counter and recurse
        }
      }
      board.togglePiece(currentRow, col); //remove piece and iterate to try next column index
    }
  };

  placeQueens(0, board);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n':n});

  var placeQueens = function(board, currentRow) {
    for (var col = 0; col < n; col++); //iterate through columns
      board.togglePiece(currentRow, col); //place a queen at current row and current column
      //if there are no conflicts with this piece
      if (board.hasAnyColConflicts() === false && board. hasAnyRowConflicts() === false && board.hasAnyMajorDiagonalConflicts() === false && board.hasAnyMinorDiagonalConflicts() === false) {
        if (currentRow === (n - 1)) { //if all queens have been placed
          solutionCount++; //increment solution count
        } else { //if there are more queens to place
          placeQueens((currentRow + 1), board); //increment row counter and recurse
        }
      }
      board.togglePiece(currentRow, col); //remove piece and iterate to try next column index
  };

  placeQueens(board, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
