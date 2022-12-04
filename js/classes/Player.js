class Player extends Sprite{
	constructor({ position, image, animations }) {
		super({ position, image })
	
		this.animations = animations
		this.currentAnimation = animations.playerDown

		this.movementSpeed = 3

		this.direction = "down"
		this.canMove = true
	}

	switchSprite(animation) {
		if (this.currentAnimation !== animation) {
			this.currentAnimation = animation
			this.image.src = animation.imageSrc
			this.frameRate = animation.frameRate
			this.frameBuffer = animation.frameBuffer
			this.loop = animation.loop
			this.autoplay = animation.autoplay
			this.frameElapsed = 0
			this.currentFrame = 0
		}
	}

	update() {
		if (this.canMove) {
			super.updateFrames()
			this.detectKeys() 
		}
		else this.draw()
		// super.drawFull()

		// this.move()
		// this.updateCenterPosition()
	}

	move() {
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
	}

	updateCenterPosition() {
		this.center = {
			x: this.position.x + this.halfWidth,
			y: this.position.y + this.halfHeight,
		}
	}

	detectKeys() {
		// this.velocity.y = 0
		// this.velocity.x = 0
		if (keys.KeyA.pressed) {
			// this.velocity.x = -this.movementSpeed
			this.switchSprite(this.animations.playerLeft)
			this.direction = "left"
		}
		else if (keys.KeyD.pressed) {
			// this.velocity.x = this.movementSpeed
			this.switchSprite(this.animations.playerRight)
			this.direction = "right"
		}
		else if (keys.KeyW.pressed) {	
			// this.velocity.y = -this.movementSpeed
			this.switchSprite(this.animations.playerUp)
			this.direction = "up"
		}
		else if (keys.KeyS.pressed) {
			// this.velocity.y = this.movementSpeed
			this.switchSprite(this.animations.playerDown)
			this.direction = "down"
		}
		else {
			this.currentFrame = 0
			this.frameElapsed = 0
		}
	}

	detectCollisionRectangle(rect1, rect2) {
		return (
			rect1.position.x <= rect2.position.x + rect2.width &&
			rect1.position.x + rect1.width >= rect2.position.x &&
			rect1.position.y <= rect2.position.y + rect2.height &&
			rect1.position.y + rect1.height >= rect2.position.y
		)
	}

	detectCollisionRectangleWithUpCenter(rect1, rect2) {
		return (
			rect1.position.x <= rect2.position.x + rect2.width &&
			rect1.position.x + rect1.width >= rect2.position.x &&
			rect1.position.y + rect1.center.y <= rect2.position.y + rect2.height &&
			rect1.position.y + rect1.height >= rect2.position.y
		)
	}
}