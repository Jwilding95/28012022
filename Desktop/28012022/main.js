var canvas = document.querySelector('canvas');
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5

class Player {
    constructor() {

        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 50
        this.height = 50
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

const player = new Player
const keys = {
    right: {pressed: false},
    left: {pressed: false}
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

    if (keys.right.pressed) {
        player.velocity.x = 5
    } else if (keys.left.pressed) {
        player.velocity.x = -5
    } else player.velocity.x = 0
}

animate()

window.addEventListener('keydown', ({code}) => {
    console.log(code)
    switch (code) {
        case 'Space': 
            player.velocity.y -= 20
            break
        
        case 'KeyA':
            console.log(code)
            keys.left.pressed = true
            break

        case 'KeyD':
            console.log(code)
            keys.right.pressed = true
            break
    }
})

window.addEventListener('keyup', ({code}) => {
    console.log(code)
    switch (code) {
        case 'KeyA':
            console.log(code)
            keys.left.pressed = false
            break

        case 'KeyD':
            console.log(code)
            keys.right.pressed = false
            break
    }
})