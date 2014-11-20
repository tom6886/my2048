/**
 * Created by tangbo on 2014/10/23.
 */
;
main = {};

$(function () {
    main.width = window.screen.availWidth;
    main.gridWidth = 0.92 * main.width;
    main.cellSideLength = 0.18 * main.width;
    main.cellWidth = 0.04 * main.width;

    main.startX = 0;
    main.startY = 0;
    main.endX = 0;
    main.endY = 0;

    main.score = 0;
    main.board = [];
    main.hasConflicated = [];
    main.number = '<div class="number-cell" id="number-cell-{0}-{1}"></div>';

    $("#newgame").click(function () {
        main.newGame();
    });

    main.prepareForMobile = function () {
        if (main.width > 500) {
            main.gridWidth = 500;
            main.cellSideLength = 100;
            main.cellWidth = 20;
        }

        $('.grid-container').css({
            "width": main.gridWidth - 2 * main.cellWidth,
            "height": main.gridWidth - 2 * main.cellWidth,
            "padding": main.cellWidth,
            "border-radius": 0.02 * main.gridWidth
        });

        $('.grid-cell').css({
            "width": main.cellSideLength,
            "height": main.cellSideLength,
            "border-radius": 0.02 * main.cellSideLength
        });
    };

    main.newGame = function () {
        main.prepareForMobile();

        main.init();

        main.createNumber();
    };

    main.init = function () {
        main.score = 0;

        for (var i = 0; i < 4; i++) {
            main.board[i] = [];
            main.hasConflicated[i] = [];
            for (var j = 0; j < 4; j++) {
                var cell = $("#grid-cell-" + i + "-" + j);
                cell.css({"top": getPosition(i), "left": getPosition(j)});
                main.board[i][j] = 0;
                main.hasConflicated[i][j] = false;
            }
        }

        main.updateBoard();
    };

    main.updateBoard = function () {
        $("#score").text(main.score);
        $(".number-cell").remove();

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                $(".grid-container").append(main.number.format(i, j));
                var cell = $("#number-cell-" + i + "-" + j);
                if (main.board[i][j] == 0) {
                    cell.css({
                        "width": "0px",
                        "height": "0px",
                        "top": getPosition(i) + main.cellSideLength / 2,
                        "left": getPosition(j) + main.cellSideLength / 2
                    });
                    continue;
                }
                cell.css({
                    "width": main.cellSideLength,
                    "height": main.cellSideLength,
                    "top": getPosition(i),
                    "left": getPosition(j),
                    "background-color": getNumberBackGroundColor(main.board[i][j]),
                    "color": getNumberColor(main.board[i][j])
                }).text(main.board[i][j]);

                main.hasConflicated[i][j] = false;
            }
        }

        $('.number-cell').css({"line-height": main.cellSideLength + "px", "font-size": 0.6 * main.cellSideLength});
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
        event.preventDefault();
        move(event.keyCode);
    });

    document.addEventListener("touchstart", function (event) {
        main.startX = event.touches[0].pageX;
        main.startY = event.touches[0].pageY;
    });

    document.addEventListener("touchmove", function (event) {
        event.preventDefault();
    });

    document.addEventListener("touchend", function (event) {
        main.endX = event.changedTouches[0].pageX;
        main.endY = event.changedTouches[0].pageY;

        var deltaX = main.startX - main.endX, deltaY = main.startY - main.endY;

        if (Math.abs(deltaX) < 0.3 * main.width && Math.abs(deltaY) < 0.3 * main.width) {
            return;
        }

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            move(deltaX > 0 ? 37 : 39);
        } else {
            move(deltaY > 0 ? 38 : 40);
        }
    });
});
