
var IS_CLICKED = false

var CURRENT_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--current-color');

var DEFAULT_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--default-color');

var COLORS = ['rgb(62, 62, 62)', 'rgb(255, 0, 0)', 'rgb(0, 255, 13)', 'rgb(174, 0, 255)', 'rgb(255, 255, 0)', 'rgb(0, 195, 255)']

document.addEventListener('mousedown', function() {
    IS_CLICKED = true;
})

document.addEventListener('mouseup', function() {
    IS_CLICKED = false;
})
//функция создания ячеек
let field = document.querySelector('.pole')


for (let i = 0; i < 450; i++) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('id', `${i}`)
    field.appendChild(cell)
}
//функция выбора цвета
let color_cells = document.querySelectorAll('.color-cell')

color_cells.forEach(color_cell => {
    color_cell.addEventListener('click', function() {
        CURRENT_COLOR = getComputedStyle(color_cell).backgroundColor;
        document.documentElement.style.cssText = `--current-color: ${CURRENT_COLOR}`
    })
})
//функция покраски
let cells = document.querySelectorAll('.cell')
 
cells.forEach(cell => {
    cell.addEventListener('mouseover', function() {
        if(IS_CLICKED) {
            anime({
                targets: cell,
                background: CURRENT_COLOR,
                duration: 200,
                easing: 'linear'
            })
        }
    })
}) 

//функция для ластика
let eraser = document.querySelector('.lastik')

eraser.addEventListener('mouseover', function() {
    CURRENT_COLOR = DEFAULT_COLOR
    document.documentElement.style.cssText = `--current-color: ${CURRENT_COLOR}`
})

//функция для сохранения страницы в cookies
setInterval( function() {
    let result = "" 
    let temp_cells = document.querySelectorAll('.cell')
    for (let i = 0; i < 450; i++) {
        result += `${temp_cells[i].dataset.color}` 
    }
    document.cookie = `pixel_result=${result}; max-age=100000`
}, 60000) 

//выгрузка из кукис
function get_result_from_cookies() {
    let cookies = document.cookie.split('; ')
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split('=')
        if(cookie[0] == 'pixel_result') {
            return cookie[1]
        }
    }
    return '0'*450
} 

//сохранение в виде картинки
document.querySelector('.sohran').addEventListener('click', function() {
    domtoimage.toJpeg(field, {quality: 2})
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        let Link = document.createElement('a');
        link.download = 'pixel.jpg';
        link.href = dataUrl;
        link.click();
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error)
    })
}
)
