class Control {
    constructor(game) {
        this.game = game
        this.obstacles = []

        this.updateObstacles()
    }
    updateObstacles() {
        for(let i of obstacles) {
            this.obstacles.push(new Obstacle(this.game, i.x, i.y))
        }
    }
    resize() {
        for(let i of this.obstacles) {
            i.resize()
        }
    }
    draw() {
        for(let i of this.obstacles) {
            i.draw()
        }
    }
}