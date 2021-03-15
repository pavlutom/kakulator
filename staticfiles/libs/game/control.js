var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");


var window_width = screen.width / 2;
var window_height = screen.height / 2;
context.canvas.height = window_height;
context.canvas.width = window_width;

let figure = document.createElement("img");

figure.src = "sprits/playerRight.png";
figure.style.backgroundColor = "rgba(0, 0, 0, 0.30)";
figure.facing_right = true;
figure.jumping = true;
figure.x_velocity = 0;
figure.y_velocity = 0;
figure.x_pos = 0;
figure.y_pos = 0;
let spriteW = 48, spriteH = 55;

class Player {

    constructor() {
        this.face_right = true;
        this.pose = 8;
        this.frame_no = 0;
    }

    increment() {
        if (this.frame_no > 3) {
            this.pose = (this.pose + 1) % 8;
            this.frame_no = 0;
        } else {
            this.frame_no++;
        }
    }


    draw(x, y, pose) {
        context.clearRect(x, y, spriteW, spriteH);
        context.drawImage(figure,
            // source rectangle
            pose * spriteW, 5, spriteW, spriteH,
            // destination rectangle
            x, y, spriteW, spriteH);
        this.last_x = x;
        this.last_y = y;
    }

    drawJump(x, y) {
        this.draw(x, y, 9);
    }

    drawMovement(x, y) {
        if(x < this.last_x){
            figure.src = "sprits/playerLeft.png";
        }else{
            figure.src = "sprits/playerRight.png";
        }

        if (x === this.last_x) {
            this.draw(x, y, 8);
        } else {
            this.draw(x, y,this.pose);
        }


    }


    mirrorImage(ctx, image, x = 0, y = 0, horizontal = false, vertical = false) {
        ctx.save();  // save the current canvas state
        ctx.setTransform(
            horizontal ? -1 : 1, 0, // set the direction of x axis
            0, vertical ? -1 : 1,   // set the direction of y axis
            x + (horizontal ? image.width : 0), // set the x origin
            y + (vertical ? image.height : 0)   // set the y origin
        );
        ctx.drawImage(image, 8 * spriteW, 0, spriteW, spriteH);
        ctx.restore(); // restore the state as it was when this function was called
    }

}

const player = new Player();

figure.addEventListener("load", () => {
    /*context.clearRect(5, 5, spriteW, spriteH);
    context.drawImage(figure,
        // source rectangle
        8 * spriteW, 5, spriteW, spriteH,
        // destination rectangle
        50, 50, spriteW, spriteH);
*/
    //drawStanding(500, 400);
});

/*
figure.addEventListener("load", () => {
    let cycle = 0;
    setInterval(() => {
        context.clearRect(5, 5, spriteW, spriteH);
        context.drawImage(figure,
            // source rectangle
            cycle * spriteW, 5, spriteW, spriteH,
            // destination rectangle
            5, 5, spriteW, spriteH);
        cycle = (cycle + 1) % 8;
    }, 120);
});*/

/*
rectangle = {

    height: 32,
    jumping: true,
    width: 32,
    x: 144, // center of the canvas
    x_velocity: 0,
    y: 0,
    y_velocity: 0

};
*/


controller = {

    left: false,
    right: false,
    up: false,
    keyListener: function (event) {

        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 65:  //a
                controller.left = key_state;
                break;
            case 32:// space
                controller.up = key_state;
                break;
            case 68:  //d
                controller.right = key_state;
                break;

        }

    }

};

loop = function () {

    if (controller.up && figure.jumping == false) {

        figure.y_velocity -= 20;
        figure.jumping = true;

    }

    if (controller.left) {

        figure.x_velocity -= 3.5;

    }

    if (controller.right) {

        figure.x_velocity += 3.5;
    }

    figure.y_velocity += 1;// gravity
    figure.x_pos += figure.x_velocity;
    figure.y_pos += figure.y_velocity;
    figure.x_velocity *= 0.01;// friction
    figure.y_velocity *= 0.9;// friction


    // if figure is falling below floor line
    if (figure.y_pos > window_height - spriteH) {

        figure.jumping = false;
        figure.y_pos = window_height - spriteH;
        figure.y_velocity = 0;

    }

    // if figure is going off the left of the screen
    if (figure.x_pos < -1 * spriteW) {

        figure.x_pos = window_width;


    } else if (figure.x_pos > window_width) {// if figure goes past right boundary

        figure.x_pos = -1 * spriteW;

    }

    context.fillStyle = "#202020";
    context.fillRect(0, 0, window_width, window_height);// x, y, width, height
    context.beginPath();
    context.rect(figure.x, figure.y, figure.width, figure.height);
    context.fill();
    context.lineWidth = 4;
    context.beginPath();
    context.stroke();
    if (figure.y_pos < window_height - spriteH) {
        player.drawJump(figure.x_pos, figure.y_pos);
    } else {
        player.drawMovement(figure.x_pos, figure.y_pos);
    }
    player.increment();
    // call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
