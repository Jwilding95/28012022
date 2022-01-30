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
    left: {pressed: false},
    space: {pressed: false}
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

    if (keys.right.pressed && !keys.left.pressed) {
        player.velocity.x = 5
    } else if (keys.left.pressed && !keys.right.pressed) {
        player.velocity.x = -5
    } else player.velocity.x = 0

    if (keys.space.pressed && player.velocity.y == 0) {
        player.velocity.y -= 20
    }
}

animate()

// Remove Infinite Jump
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