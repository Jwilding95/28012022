var canvas = document.querySelector('canvas');
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.4

class Player {
    constructor() {

        this.position = {
            x: 50,
            y: 50
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        // Big Mario SMW 15/28 - 0.53571428571
        this.width = 60
        this.height = 112
    }

    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
    }
}

class Platform {
    constructor(posx, posy, w, h) {
        this.position = {
            x: posx,
            y: posy
        }

        this.width = w
        this.height = h
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player
const platform1 = new Platform(300, 863, 64, 64)
const platform2 = new Platform(300, 863-64, 64, 64)
const platform3 = new Platform(300, 863-128, 64, 64)
const keys = {
    right: {pressed: false},
    left: {pressed: false},
    space: {pressed: false}
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platform1.draw()
    platform2.draw()
    platform3.draw()

    if (keys.right.pressed && !keys.left.pressed) {
        player.velocity.x = 7
    } else if (keys.left.pressed && !keys.right.pressed) {
        player.velocity.x = -7
    } else player.velocity.x = 0

    if (keys.space.pressed && player.velocity.y == 0) {
        player.velocity.y -= 15
    }
}

animate()

window.addEventListener('keydown', ({code}) => {
    console.log(`Key Down: ${code}`)
    switch (code) {
        case 'Space':
            keys.space.pressed = true
            break
        
        case 'KeyA':
            keys.left.pressed = true
            break

        case 'KeyD':
            keys.right.pressed = true
            break
    }
})

window.addEventListener('keyup', ({code}) => {
    console.log(`Key Up: ${code}`)
    switch (code) {
        case 'Space':
            keys.space.pressed = false
            break
        
        case 'KeyA':
            keys.left.pressed = false
            break

        case 'KeyD':
            keys.right.pressed = false
            break
    }
})