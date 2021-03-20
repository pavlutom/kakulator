var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");


var window_width = screen.width / 2;
var window_height = screen.height / 2;
var object_to_update = [];
context.canvas.height = window_height;
context.canvas.width = window_width;

class Point {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        console.log("X:", this.x, "Y:", this.y);
    }
}

class Projectile {
    x;
    y;
    speed;
    velX = 0;
    velY = 0;
    src;
    owner;
    weight;
    img_no;
    rotate;


    constructor(owner, dest, speed, rotate = true) {
        this.img_no = 1;
        this.weight = 0.005;
        this.src = new Point(owner.x, owner.y);
        this.x = this.src.x;
        this.y = this.src.y;
        this.speed = speed;
        this.sprite = new Image(8, 8);
        this.sprite.src = "sprits/characters/Effect1/1.png";
        this.rotate = rotate;
        context.drawImage(this.sprite, this.src.x, this.src.y);
        object_to_update.push(this);
        this.moveToPoint(dest);
    }

    moveToPoint(dest) {
        var deltaX = dest.x - this.src.x;
        var deltaY = dest.y - this.src.y;
        var a = deltaX * deltaX;
        var b = deltaY * deltaY;
        var c = Math.sqrt(a + b);

        console.log(dest)
        console.log(this.src)
        this.velX = (dest.x - this.src.x) / c;
        this.velY = (dest.y - this.src.y) / c;

        console.log(this.x, this.y, "|||", this.velX, this.velY);
    }

    rotateEquipped(degrees) {
        context.save();
        context.translate(this.x + 60, this.y + 45);
        context.rotate(degrees * Math.PI / 180);
        context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.width / 2);
        context.restore();
    }

    update() {
        this.velY += this.weight;
        let incrementX = this.velX * this.speed;
        let incrementY = this.velY * this.speed;
        const delta_x = (incrementX + this.x) - this.x
        const delta_y = (incrementY + this.y) - this.y
        const theta_radians = Math.atan2(delta_y, delta_x) * 180 / Math.PI
        this.x += incrementX;
        this.y += incrementY;
        this.sprite.src = "sprits/characters/Effect1/" + (Math.floor(this.img_no) % 60) + ".png";
        this.img_no += 0.5;
        if (!this.rotate)
            context.drawImage(this.sprite, this.x, this.y);
        else
            this.rotateEquipped(theta_radians);
    }

}


class Player {

    constructor() {
        this.spriteW = 48;
        this.spriteH = 60;
        this.sprite = new Image();
        this.sprite.src = "sprits/playerRight.png";
        this.facing_right = true;
        this.jumping = true;
        this.x = 0;
        this.y = 0;
        this.x_velocity = 0;
        this.y_velocity = 0;
        this.face_right = true;
        this.pose = 8;
        this.frame_no = 0;
        this.equiped = false;
        this.degree = 40;
    }

    update() {
        if (this.frame_no > 4) {
            this.pose = (this.pose + 1) % 8;
            this.frame_no = 0;
        } else {
            this.frame_no++;
            this.degree = (30 - this.pose * 1.5);
        }
    }

    drawEquipped() {
        this.weapon = new Image(50, 16);
        this.weapon.src = "sprits/characters/Staves_1/1.png";
        //context.drawImage(this.weapon, this.x + 25, this.y + 30);

    }

    rotateEquipped(degrees) {
        context.save();
        context.translate(this.x + 60, this.y + 45);
        context.rotate(degrees * Math.PI / 180);
        context.drawImage(this.weapon, -this.weapon.width / 2, -this.weapon.width / 2);
        context.restore();
    }

    draw(x, y, pose) {
        context.clearRect(x, y, this.spriteW, this.spriteH);
        context.drawImage(this.sprite,
            // source rectangle
            pose * this.spriteW, 0, this.spriteW, this.spriteH,
            // destination rectangle
            x, y, this.spriteW, this.spriteH);
        if (this.equiped) {
            this.drawEquipped();

            if (pose !== 8) {
                this.rotateEquipped(-this.degree);
            } else {
                this.rotateEquipped(-30);
            }
        }
        this.last_x = x;
        this.last_y = y;
    }

    drawJump() {
        this.draw(player.x, player.y, 9);
    }

    drawMovement() {
        if (player.x < this.last_x) {
            this.sprite.src = "sprits/playerLeft.png";
        } else {
            this.sprite.src = "sprits/playerRight.png";
        }

        if (player.x === this.last_x) {
            this.draw(player.x, player.y, 8);
        } else {
            this.draw(player.x, player.y, this.pose);
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
        ctx.drawImage(image, 8 * this.spriteW, 0, this.spriteW, this.spriteH);
        ctx.restore(); // restore the state as it was when this function was called
    }

}

const player = new Player();


clicker = {
    mouseListener: function (event) {
        const canvasRect = context.canvas.getBoundingClientRect();
        const proj = new Projectile(player, new Point(event.clientX - canvasRect.left, event.clientY - canvasRect.top), 10);
    }
}

controller = {

    left: false,
    right: false,
    up: false,
    keyListener: function (event) {

        const key_state = (event.type === "keydown")
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

    if (controller.up && player.jumping === false) {

        player.y_velocity -= 20;
        player.jumping = true;

    }

    if (controller.left) {

        player.x_velocity -= 3.5;

    }

    if (controller.right) {

        player.x_velocity += 3.5;
    }

    player.y_velocity += 1;// gravity
    player.x += player.x_velocity;
    player.y += player.y_velocity;
    player.x_velocity *= 0.01;// friction
    player.y_velocity *= 0.9;// friction


    // if player.sprite is falling below floor line
    if (player.y > window_height - player.spriteH) {

        player.jumping = false;
        player.y = window_height - player.spriteH;
        player.y_velocity = 0;

    }

    // if player.sprite is going off the left of the screen
    if (player.x < -1 * player.spriteW) {

        player.x = window_width;


    } else if (player.x > window_width) {// if player.sprite goes past right boundary

        player.x = -1 * player.spriteW;

    }

    context.fillStyle = "#202020";
    context.fillRect(0, 0, window_width, window_height);// x, y, width, height
    context.beginPath();
    context.rect(player.x, player.y, player.sprite.width, player.sprite.height);
    context.fill();
    context.lineWidth = 4;
    context.beginPath();
    context.stroke();
    if (player.y < window_height - player.spriteH) {
        player.drawJump();
    } else {
        player.drawMovement();
    }
    player.update();
    object_to_update.forEach(obj => obj.update());
    // call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);
};
window.addEventListener("mousedown", clicker.mouseListener);
//window.addEventListener("mouseup", controller.keyListener);
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
