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

  var goodBoard = new Board({n:n});
  var counter = 0;

  var matrix = goodBoard.rows();
  console.log('init', matrix);

  for (var row = 0; row < n; row++) {

    for (var col = 0; col < n; col++) {
      // check spot row x col passes all test
      goodBoard.togglePiece(row, col);

      if (goodBoard.hasAnyRowConflicts() || goodBoard.hasAnyColConflicts()) {
        goodBoard.togglePiece(row, col);
      } else {
        counter ++;
      }
      if (counter === n) {
        solution = matrix;
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  console.log(n);

  var solutionCount = 0;
  var emptyBoard = new Board ({n:n});

  var rooker = function(currentRow, boardSoFar) {
    // console.log('arguments', arguments);
    for (var col = 0; col < n; col++) {
      boardSoFar.togglePiece(currentRow, col);
      if (boardSoFar.hasAnyRowConflicts() === false && boardSoFar.hasAnyColConflicts() === false) {
        if (currentRow !== n-1) {
          rooker(currentRow +1, boardSoFar);
        } else {
          solutionCount++;
        }
      }
      boardSoFar.togglePiece(currentRow, col);
    }
  };



  rooker(0, emptyBoard);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  console.log('queen n', n)
  var emptyBoard = new Board ({n:n});
  var solution = emptyBoard.rows();

  if (n === 0) {
    return solution;
  }
  //if (n === 2) {debugger;}

  var queener = function(currentRow, boardSoFar) {
    // console.log('arguments', arguments);
    for (var col = 0; col < n; col++) {
      boardSoFar.togglePiece(currentRow, col);
      if (boardSoFar.hasAnyRowConflicts() === false && boardSoFar.hasAnyColConflicts() === false && boardSoFar.hasAnyMajorDiagonalConflicts() === false && boardSoFar.hasAnyMinorDiagonalConflicts() === false) {
        if (currentRow !== n-1) {
          queener(currentRow +1, boardSoFar);
        } else {
          solution = boardSoFar.rows();
          return;
        }
      }
      boardSoFar.togglePiece(currentRow, col);
    }
  };

  queener(0, emptyBoard);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  console.log("n in queen count", n);

  var solutionCount = 0;
/*  if (n===3){debugger;}*/
  if (n === 0) {
    return solutionCount + 1;
  }
  var emptyBoard = new Board ({n:n});
  //if (n === 2) {debugger;}

  var queener = function(currentRow, boardSoFar) {
    // console.log('arguments', arguments);
    for (var col = 0; col < n; col++) {

      boardSoFar.togglePiece(currentRow, col);

      if (boardSoFar.hasAnyRowConflicts() === false && boardSoFar.hasAnyColConflicts() === false && boardSoFar.hasAnyMajorDiagonalConflicts() === false && boardSoFar.hasAnyMinorDiagonalConflicts() === false) {
        if (currentRow !== n-1) {
          queener(currentRow +1, boardSoFar);
        } else {
          //if (n===3){debugger;}
          solutionCount++;
        }
      }
      boardSoFar.togglePiece(currentRow, col);
    }
  };

  queener(0, emptyBoard);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
