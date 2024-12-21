const canvas = document.getElementById('game') // 1 при помощи JS выбрать весь canvas
const ctx = canvas.getContext('2d') // 2 укажем формат нашей игры

const groundImg = new Image()  // 3 фон 608*608
groundImg.src = 'img/ground.png' 

const foodImg = new Image()  // 4 еда iconfinder.com 32*32png
foodImg.src = 'img/food.png'

let box = 32  // 5 отвечает за размера одного квадрата 32*32

let score = 0  // счёт

let food = {  // 9 отображение еды
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
}

let snake = []  // 10 создать набор из квадратиков

snake[0] = {  // 11 создаём координаты первого элемента
    x: 9 * box,
    y: 10 * box,
}

document.addEventListener('keydown', direction) // 15 ф-ия обработчик чтобы змейка двигалась

let dir  

function direction(event) {  
    //console.log(event)
    if(event.keyCode == 37 && dir !='right')
        dir = 'left'
    else if (event.keyCode == 38 && dir !='down')
        dir = 'up'
    else if (event.keyCode == 39 && dir !='left')
        dir = 'right'
    else if (event.keyCode == 40 && dir !='up')
        dir = 'down'
}

function eatTail(head, arr) {  //24 сама себя съедает
    for( let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)

            clearInterval(game)
    
            
    }
}

function drawGame() {  // 6 главная функция которая будет рисовать змейку
    ctx.drawImage(groundImg, 0, 0) // 7 ф-я позволяет отрис-ть картинку в определённых коорд-х

    ctx.drawImage(foodImg, food.x, food.y)  //12 ф-я позволяет отрис-ть еду. Теперь рандомно при перезагрузке должна появляться еда

    for(let i=0; i<snake.length; i++){  // 13 для отрисовки всей змейки
        ctx.fillStyle = i == 0 ? 'red' : 'orange' // для отрисовки змейки просто закрасим квадрат
                            // 22 голова red, а тело orange
        ctx.fillRect(snake[i].x, snake[i].y, box, box) // создаёт сам объект
    }


    ctx.fillStyle = 'white'  // 14 отрисовка счёта
    ctx.font = '50px Arial'
    ctx.fillText(score, box * 2.5, box * 1.7)

    let snakeX = snake[0].x   // 16 координты для отрисовка движения. ПОТОМ 17!!!
    let snakeY = snake[0].y

    if(snakeX == food.x && snakeY == food.y){ // 21 Проверка чтобы могла скушать
        score++
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        }
    }else{
        snake.pop() // 17 удаление последнего элемента массива (змейки)
    }

    if(snakeX < box || snakeX > box * 17  // 23 Проверка удара об стену
        || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game)

    if(dir == 'left') snakeX -= box // 18 проверка куда повернули
    if(dir == 'right') snakeX += box
    if(dir == 'up') snakeY -= box
    if(dir == 'down') snakeY += box

    let newHead = { // 19 новый элемент
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake)  // 25 вызов фунции самосъедения

    snake.unshift(newHead) // 20 добавление нового элемента в начало массива. Должна бегать змейка!!!
}

let game = setInterval(drawGame, 100) // 8 отображать фон каждые 100 милисекунд



// var count = 0
// let game = setInterval(() => {
//     if (count === 50) {
//         drawGame()
//         count = 0
//     }

//     count++
// }, 100)
