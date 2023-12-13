(function () {
    let tool = 'huabi';
    let size = 10 //橡皮大小
    let sub = $('.sub');
    let flag = false;
    let shape = 'rect'; // 橡皮形状

    $('.container').onclick = function (event) {
        let id = event.target.id;
        switch (id) {
            case 'huabi':
                tool = 'huabi';
                flag = false;
                break;
            case 'shuazi':
                tool = 'shuazi';
                flag = false;
                break
            case 'penqiang':
                tool = 'penqiang';
                flag = false;
                break;
            case 'xiangpi':
                tool = 'xiangpi';
                flag = true;
                break;
            case 'clear':
                tool = 'clear';
                flag = true;
                break;
            default:
                break;
        }
        if(flag){
            sub.style.display = 'block';
        } else {
            sub.style.display = 'none';
        }
    }

    $('select').onchange = function() {
        shape = this.value;
    }
    $('.size').oninput = function () {
        size = this.value;
    }

    let x, y;
    const canvas = $('canvas')
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", function (event) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        /**
         * event.clientX表示鼠标点击位置相对于浏览器窗口左上角的水平坐标，
         * this.offsetLeft表示canvas元素相对于其offsetParent元素的水平偏移量。
         * 
         */
        x = event.clientX - this.offsetLeft; //鼠标点击位置相对于canvas元素左上角的水平偏移量。这个偏移量可以用来确定绘图的起点坐标。
        y = event.clientY - this.offsetTop;

        document.onmousemove = function (event) {
            console.log("down", event.clientX, canvas.offsetLeft);
            let x1 = event.clientX - canvas.offsetLeft;
            let y1 = event.clientY - canvas.offsetTop;

            switch (tool) {
                case 'huabi':
                    huabi(x, y, x1, y1, ctx);
                    break;
                case 'shuazi':
                    shuazi(x, y, x1, y1, ctx);
                    break;
                case 'penqiang':
                    penqiang(x, y, ctx);
                    break;
                case 'xiangpi':
                    xiangpi(x, y, x1, y1, ctx, size, shape);
                    break;
                case 'clear':
                    clearCanvas(0, 0, canvasWidth, canvasHeight, ctx);
                    break;
                default:
                    break;
            }
            // 这两行代码的作用是将当前鼠标位置的坐标(x1, y1)赋值给变量x和y，以便在下一次鼠标移动事件中使用。这样做的目的是为了在绘制连续的线条时，可以将上一次鼠标位置的坐标作为绘图的起点，当前鼠标位置的坐标作为绘图的终点。
            x = x1;
            y = y1;
        }
    })

    document.onmouseup = function() {
        this.onmousemove = null;
    }

})()

function $(selector) {
    return document.querySelector(selector);
}

function huabi(startX, startY, endX, endY, ctx) {
    ctx.beginPath(); // 开始绘制路径
    ctx.globalAlpha = 1;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.moveTo(startX, startY); // 将路径移动到指定点
    ctx.lineTo(endX, endY); // 绘制一条从当前点到指定点的直线
    ctx.closePath();
    ctx.stroke(); // 绘制路径
}

function shuazi(startX, startY, endX, endY, ctx) {
    ctx.beginPath(); // 开始绘制路径
    ctx.globalAlpha = 1;
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000";
    ctx.moveTo(startX, startY); // 将路径移动到指定点
    ctx.lineTo(endX, endY); // 绘制一条从当前点到指定点的直线
    ctx.closePath();
    ctx.stroke(); // 绘制路径
}

function penqiang(startX, startY, ctx) {
    for (let index = 0; index < 10; index++) {
        const randomNum = Math.random() * 15;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.globalAlpha = 0.5;
        ctx.arc(startX + randomNum, startY + randomNum, 1, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function xiangpi(startX, startY, endX, endY, ctx, size, shape) {
    ctx.beginPath();
    ctx.globalAlpha = 1;
    switch (shape) {
        case 'rect':
            ctx.lineWidth = size;
            ctx.strokeStyle = "#fff";
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.closePath();
            ctx.stroke();
            break;
        case 'circle':
            ctx.fillStyle = '#fff';
            ctx.arc(startX, startY, size, 0, 2 * Math.PI);
            ctx.fill();
            break;
    }
}

function clearCanvas(startX, startY, width, height, ctx) {
    ctx.clearRect(startX, startY, width, height);
}
