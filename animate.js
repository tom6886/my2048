/**
 * Created by tangbo on 2014/10/23.
 */
function showNumWithAnimation(i, j, num) {
    var cell = $("#number-cell-" + i + "-" + j);

    cell.css({
        "background-color": getNumberBackGroundColor(num),
        "color": getNumberColor(num)
    }).text(num);

    cell.animate({
        "width": main.cellSideLength,
        "height": main.cellSideLength,
        "top": getPosition(i),
        "left": getPosition(j)
    }, 50);
}
function showMoveAnimate(fromx, fromy, tox, toy) {
    var cell = $("#number-cell-" + fromx + "-" + fromy);

    cell.animate({"top": getPosition(tox), "left": getPosition(toy)}, 200);
}