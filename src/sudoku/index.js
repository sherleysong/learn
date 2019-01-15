require('./scss/index.scss');

import Grid from './js/grid';

const grid = new Grid($('#container'));

grid.build();

let targetCell;

$('#container').on("click", "span:not(.fixed)", e => {
    const $cell = $(e.target);
    if($cell[0].nodeName == 'I'){
        // $cell = $cell.parentNode?????/
    }
    $('#container').find('span').removeClass('focus');
    $cell.addClass('focus');
    targetCell = $cell;
})

$('#fillNumbers').on('click', 'span', e => {
    grid.fill(targetCell, e);
})

$('#check').on('click', e => {
    $('#container').find('span').removeClass('focus');
    console.log(grid.check());
    if (grid.check()) {
        alert('成功');
    }
})
$('#reset').on('click', e => {
    $('#container').find('span').removeClass('focus');
    grid.reset();
})
$('#rebuild1').on('click', e => {
    grid.rebuild(1);
})
$('#rebuild2').on('click', e => {
    grid.rebuild(2);
})
$('#rebuild3').on('click', e => {
    grid.rebuild(3);
})
$('#help').on('click', e => {
    grid.help();
})