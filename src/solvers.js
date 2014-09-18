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

//Generalized solver function that the other functions use
window.findSolution = function(row, cols, board, validator, callback) {
  //if the board has been completed, increment the counter
  if (row === cols) {
    callback();
    return;
  }
  //iterate over all possible placements for this row
  for (var col = 0; col < cols; col++) {
    //place a piece
    board.togglePiece(row, col);
    //check for conflicts with this placement
    if ( !board[validator]() ) {
      //if no cocolsflicts, then recurse with remaining rows
      findSolution(row + 1, cols, board, validator, callback);
    }
    //un-place a piece
    board.togglePiece(row, col);
  }
};

//This function is currently slower than the count N rooks
//solution because it is returning the LAST valid board
window.findNRooksSolution = function(n) {
  var solution = undefined;
  var board = new Board({n:n});

  window.findSolution(0, n, board, "hasAnyRooksConflicts", function(){
    solution = board.rows();
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  window.findSolution(0, n, board, "hasAnyRooksConflicts", function(){
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined;
  var board = new Board({n:n});

  window.findSolution(0, n, board, "hasAnyQueensConflicts", function(){
    solution = board.rows();
  });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  //I believe this is the part that needs to be fixed to pass the last test
  if (n < 4) {
    return new Board({n: n}).rows();
  }

  window.findSolution(0, n, board, "hasAnyQueensConflicts", function(){
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};