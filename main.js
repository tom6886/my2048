/**
 * Created by tangbo on 2014/10/23.
 */
;
main = {};

$(function () {
    main.board = [];
    main.number = '<div class="number-cell" id="number-cell-{0}-{1}"></div>';

    $("#newgame").click(function () {
        main.newGame();
    });

    main.newGame = function () {
        main.init();

        main.createNumber();
    };

    main.init = function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var cell = $("#grid-cell-" + i + "-" + j);
                cell.css({"top": getPosition(i), "left": getPosition(j)});
            }
        }

        for (var i = 0; i < 4; i++) {
            main.board[i] = [];
            for (var j = 0; j < 4; j++) {
                main.board[i][j] = 0;
            }
        }

        main.updateBoard();
    };

    main.updateBoard = function () {
        $(".number-cell").remove();

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                $(".grid-container").append(main.number.format(i, j));
                var cell = $("#number-cell-" + i + "-" + j);
                if (main.board[i][j] == 0) {
                    cell.css({
                        "width": "0px",
                        "height": "0px",
                        "top": getPosition(i) + 50,
                        "left": getPosition(j) + 50
                    });
                    continue;
                }
                cell.css({
                    "width": "100px",
                    "height": "100px",
                    "top": getPosition(i),
                    "left": getPosition(j),
                    "background-color": getNumberBackGroundColor(main.board[i][j]),
                    "color": getNumberColor(main.board[i][j])
                }).text(main.board[i][j]);
            }
        }
    };

    main.createNumber = function () {
        var emptyCells = getEmptyCell(main.board);

        if (emptyCells.length == 0)
            return false;

        var length = emptyCells.length == 1 ? 1 : 2;

        for (var i = 0; i < length; i++) {

            var randomIndex = parseInt(Math.floor(Math.random() * emptyCells.length));

            var position = emptyCells[randomIndex];

            emptyCells.splice(randomIndex, 1);

            var randomNum = Math.random() < 0.8 ? 2 : 4;

            main.board[position[0]][position[1]] = randomNum;

            showNumWithAnimation(position[0], position[1], randomNum);
        }

    };

    main.newGame();

    $(document).keydown(function (event) {
        switch (event.keyCode) {
            case 37:
                if (moveLeft(main.board)) {
                    setTimeout("main.createNumber()", 200);
                }
                break;
            case 38:
                if (moveUp(main.board)) {
                    setTimeout("main.createNumber()", 200);
                }
                break;
            case 39:
                if (moveRight(main.board)) {
                    setTimeout("main.createNumber()", 200);
                }
                break;
            case 40:
                if (moveDown(main.board)) {
                    setTimeout("main.createNumber()", 200);
                }
                break;
            default :
                break;
        }
    });
});
