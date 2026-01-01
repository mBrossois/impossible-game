class Obstacle {
    constructor(game, x, y) {
        this.game = game

        this.sizeOriginal = 48 * 1.5
        this.height = this.sizeOriginal * this.game.ratio
        this.width = this.sizeOriginal * this.game.ratio

        this.xOriginal = x * this.sizeOriginal
        this.startX = this.game.room.getGameCenter().x
        this.x = this.xOriginal * this.game.ratio + this.startX
        this.levelX = 0
        this.y = y

        this.collisionX
        this.collisionY
        this.collisionSize = this.width;

        this.resize()

        this.img = new Image()
        this.img.src = "src/assets/img/Block.svg"
    }
    resize() {
        this.height = this.sizeOriginal * this.game.ratio
        this.width = this.sizeOriginal * this.game.ratio

        this.startX = this.game.room.getGameCenter().x
        this.x = this.xOriginal * this.game.ratio + this.startX

        this.collisionX = this.x
        this.collisionY = this.getYPos(this.y) 
        this.collisionSize = this.width;
    }
    getYPos(amount) {
       return (this.game.room.getGameCenter().y - this.sizeOriginal * this.game.ratio) - amount * this.sizeOriginal
    }
    draw() {
        this.levelX -= this.game.speed  
        this.game.context.drawImage(this.img, this.x + this.levelX, this.getYPos(this.y), this.width, this.height)

        if(this.game.isOnTop(this.game.player, this)) {
            this.game.player.status = playerStatus.bottom
        } 
    }
}