/**
 * Created by tangbo on 2014/10/23.
 */
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};

function getPosition(i) {
    return main.cellWidth + i * (main.cellWidth + main.cellSideLength);
}
function getNumberColor(e) {
    if (e <= 4)
        return "#776e65";
    return "white";
}
function getNumberBackGroundColor(e) {
    switch (e) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }

    return "black";
}
function getEmptyCell(array) {
    var empty = [];

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (array[i][j] == 0)
                empty.push([i, j]);
        }
    }
    return empty;
}
function move(key) {
    var canMove = false;
    switch (key) {
        case 37:
            canMove = moveLeft(main.board);
            break;
        case 38:
            canMove = moveUp(main.board);
            break;
        case 39:
            canMove = moveRight(main.board);
            break;
        case 40:
            canMove = moveDown(main.board);
            break;
        default :
            break;
    }

    if (canMove) {
        setTimeout("main.updateBoard()", 200);
        setTimeout("main.createNumber()", 200);
    }
}
function moveLeft(board) {
    var hasMoved = false;
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] == 0) {
                continue;
            }

            for (var k = 0; k < j; k++) {
                if (board[i][k] == 0 && noBlockInRow(i, k, j, board)) {
                    hasMoved = true;
                    showMoveAnimate(i, j, i, k);
                    board[i][k] = board[i][j];
                    board[i][j] = 0;
                    break;
                }
                else if (board[i][k] == board[i][j] && noBlockInRow(i, k, j, board)) {
                    if (main.hasConflicated[i][k]) {
                        continue;
                    }

                    hasMoved = true;
                    main.hasConflicated[i][k] = true;
                    main.score += board[i][j];
                    showMoveAnimate(i, j, i, k);
                    board[i][k] += board[i][j];
                    board[i][j] = 0;
                    break;
                }
            }
        }
    }

    return hasMoved;
}
function moveRight(board) {
    var hasMoved = false;
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j > -1; j--) {
            if (board[i][j] == 0) {
                continue;
            }

            for (var k = 3; k > j; k--) {
                if (board[i][k] == 0 && noBlockInRow(i, j, k, board)) {
                    hasMoved = true;
                    showMoveAnimate(i, j, i, k);
                    board[i][k] = board[i][j];
                    board[i][j] = 0;
                    break;
                }
                else if (board[i][k] == board[i][j] && noBlockInRow(i, j, k, board)) {
                    if (main.hasConflicated[i][k]) {
                        continue;
                    }

                    hasMoved = true;
                    main.hasConflicated[i][k] = true;
                    main.score += board[i][j];
                    showMoveAnimate(i, j, i, k);
                    board[i][k] += board[i][j];
                    board[i][j] = 0;
                    break;
                }
            }
        }
    }

    return hasMoved;
}
function moveUp(board) {
    var hasMoved = false;
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] == 0) {
                continue;
            }

            for (var k = 0; k < i; k++) {
                if (board[k][j] == 0 && noBlockInColumn(j, k, i, board)) {
                    hasMoved = true;
                    showMoveAnimate(i, j, k, j);
                    board[k][j] = board[i][j];
                    board[i][j] = 0;
                    break;
                }
                else if (board[k][j] == board[i][j] && noBlockInColumn(j, k, i, board)) {
                    if (main.hasConflicated[k][j]) {
                        continue;
                    }

                    hasMoved = true;
                    main.hasConflicated[k][j] = true;
                    main.score += board[i][j];
                    showMoveAnimate(i, j, k, j);
                    board[k][j] += board[i][j];
                    board[i][j] = 0;
                    break;
                }
            }
        }
    }

    return hasMoved;
}
function moveDown(board) {
    var hasMoved = false;
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i > -1; i--) {
            if (board[i][j] == 0) {
                continue;
            }

            for (var k = 3; k > i; k--) {
                if (board[k][j] == 0 && noBlockInColumn(j, i, k, board)) {
                    hasMoved = true;
                    showMoveAnimate(i, j, k, j);
                    board[k][j] = board[i][j];
                    board[i][j] = 0;
                    break;
                }
                else if (board[k][j] == board[i][j] && noBlockInColumn(j, i, k, board)) {
                    if (main.hasConflicated[k][j]) {
                        continue;
                    }

                    hasMoved = true;
                    main.hasConflicated[k][j] = true;
                    main.score += board[i][j];
                    showMoveAnimate(i, j, k, j);
                    board[k][j] += board[i][j];
                    board[i][j] = 0;
                    break;
                }
            }
        }
    }

    return hasMoved;
}
function noBlockInRow(row, start, end, board) {
    for (var i = start + 1; i < end; i++) {
        if (board[row][i] != 0)
            return false;
    }

    return true;
}
function noBlockInColumn(column, start, end, board) {
    for (var i = start + 1; i < end; i++) {
        if (board[i][column] != 0)
            return false;
    }

    return true;
}