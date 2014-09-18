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

  var board = new Board({'n':n});

  var placeRooks = function(board) {
    //sum up the matrix
    var sum = 0;
    for (var r = 0; r < board.attributes.n; r++) {
      sum = sum + _.reduce(board.attributes[r],function(a,b){return a + b;});
    }
    console.log(sum);
    if (sum === board.attributes.n) {
      solution = board;
    } else {
      for (var row = 0; row < n; row++) {
        for (var col = 0; col < n; col ++) {
          if (board.attributes[row][col] !== 1) {
            board.attributes[row][col] = 1;
            if(board.hasAnyRowConflicts() === false && board.hasAnyColConflicts() === false ) {
              placeRooks(board);
            // if tests pass call placeRooks
            } else {
            // else, set it back to 0;
              board.attributes[row][col] = 0;
            }
          }
        }
      }
    }
  };
  placeRooks(board);
  if (solution !== undefined) {
    //Parse out the matrix
    var returnArr = [];
    for (var row = 0; row < n; row++) {
      returnArr.push(solution.attributes[row]);
    }
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(returnArr));
    return returnArr;
  } else {
    return null;
  }
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined;

  var board = new Board({'n':n});

  var placeQueens = function(board) {
    //sum up the matrix
    if(n === 4){

    debugger;
    }
    var sum = 0;
    for (var r = 0; r < board.attributes.n; r++) {
      sum = sum + _.reduce(board.attributes[r],function(a,b){return a + b;});
    }
    console.log(sum);
    if (sum === board.attributes.n) {
      solution = board;
    } else {
      for (var row = 0; row < n; row++) {
        for (var col = 0; col < n; col ++) {
          if (board.attributes[row][col] !== 1) {
            board.attributes[row][col] = 1;
            if(board.hasAnyRowConflicts() === false && board.hasAnyColConflicts() === false
            && board.hasAnyMajorDiagonalConflicts() === false && board.hasAnyMinorDiagonalConflicts() === false ) {
              placeQueens(board);
            // if tests pass call placeQueens
            } else {
            // else, set it back to 0;
              board.attributes[row][col] = 0;
            }
          }
        }
      }
    }
  };
  placeQueens(board);
  if (solution !== undefined) {
    //Parse out the matrix
    var returnArr = [];
    for (var row = 0; row < n; row++) {
      returnArr.push(solution.attributes[row]);
    }
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(returnArr));
    return returnArr;
  } else {
    return null;
  }
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
