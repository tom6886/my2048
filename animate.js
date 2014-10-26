/**
 * Created by tangbo on 2014/10/23.
 */
function showNumWithAnimation(i, j, num) {
    var cell = $("#number-cell-" + i + "-" + j);

    cell.css({
        "background-color": getNumberBackGroundColor(num),
        "color": getNumberColor(num)
    }).text(num);

    cell.animate({"width": "100px", "height": "100px", "top": getPosition(i), "left": getPosition(j)}, 50);
};