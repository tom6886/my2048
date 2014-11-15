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
    return 20 + i * 120;
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
function moveLeft(board) {
    var havePlus = [];
    var hasMoved = false;
    for (var i = 0; i < 4; i++) {
        havePlus = [];
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
                    if (havePlus.indexOf(board[i][j]) > -1) {
                        havePlus.splice(havePlus.indexOf(board[i][j]), 1);
                        continue;
                    }

                    havePlus.push(board[i][j] * 2);
                    hasMoved = true;
                    main.score += board[i][j];
                    showMoveAnimate(i, j, i, k);
                    board[i][k] += board[i][j];
                    board[i][j] = 0;
                    break;
                }
            }
        }
    }
    setTimeout("main.updateBoard()", 200);
    return hasMoved;
}
function moveRight(board) {
    var havePlus = [];
    var hasMoved = false;
    for (var i = 0; i < 4; i++) {
        havePlus = [];
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
                    if (havePlus.indexOf(board[i][j]) > -1) {
                        havePlus.splice(havePlus.indexOf(board[i][j]), 1);
                        continue;
                    }

                    havePlus.push(board[i][j] * 2);
                    hasMoved = true;
                    main.score += board[i][j];
                    showMoveAnimate(i, j, i, k);
                    board[i][k] += board[i][j];
                    board[i][j] = 0;
                    break;
                }
            }
        }
    }
    setTimeout("main.updateBoard()", 200);
    return hasMoved;
}
function moveUp(board) {
    var havePlus = [];
    var hasMoved = false;
    for (var j = 0; j < 4; j++) {
        havePlus = [];
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
                    if (havePlus.indexOf(board[i][j]) > -1) {
                        havePlus.splice(havePlus.indexOf(board[i][j]), 1);
                        continue;
                    }

                    havePlus.push(board[i][j] * 2);
                    hasMoved = true;
                    main.score += board[i][j];
                    showMoveAnimate(i, j, k, j);
                    board[k][j] += board[i][j];
                    board[i][j] = 0;
                    break;
                }
            }
        }
    }
    setTimeout("main.updateBoard()", 200);
    return hasMoved;
}
function moveDown(board) {
    var havePlus = [];
    var hasMoved = false;
    for (var j = 0; j < 4; j++) {
        havePlus = [];
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
                    if (havePlus.indexOf(board[i][j]) > -1) {
                        havePlus.splice(havePlus.indexOf(board[i][j]), 1);
                        continue;
                    }

                    havePlus.push(board[i][j] * 2);
                    hasMoved = true;
                    main.score += board[i][j];
                    showMoveAnimate(i, j, k, j);
                    board[k][j] += board[i][j];
                    board[i][j] = 0;
                    break;
                }
            }
        }
    }
    setTimeout("main.updateBoard()", 200);
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