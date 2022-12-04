class Sprite {
	constructor({ position, image, visible = true, rotation = 0 }) {
		this.visible = visible

		this.position = position

		this.velocity = {
			x: 0,
			y: 0,
		}

		this.image = new Image()
		this.image.onload = () => {
			this.width = this.image.width / image.frameRate
			this.height = this.image.height
			this.loaded = true
			this.setCenter()
		}

		this.halfWidth = 0
		this.halfHeight = 0
		this.center = {
			x: 0,
			y: 0,
		}
		this.loaded = false
		this.image.src = image.imageSrc
		this.frameRate = image.frameRate
		this.frameBuffer = image.frameBuffer
		this.loop = image.loop
		this.autoplay = image.autoplay

		this.currentFrame = 0
		this.frameElapsed = 0

		this.opacity = 1
		this.rotation = rotation
	}

	setCenter() {
		this.halfWidth = this.width / 2
		this.halfHeight = this.height / 2
		this.center = {
			x: this.position.x + this.halfWidth,
			y: this.position.y + this.halfHeight,
		}
	}

	draw() {
		const box = {
			position: {
				x: this.currentFrame * this.width,
				y: 0
			},
			width: this.width,
			height: this.height
		}
		c.save()
		c.translate(this.position.x + (this.width / 2), this.position.y + (this.height / 2))
		c.rotate(this.rotation)
		c.translate(-this.position.x - (this.width / 2), -this.position.y - (this.height / 2))
		c.globalAlpha = this.opacity
		c.drawImage(
			this.image,
			box.position.x,
			box.position.y,
			box.width,
			box.height,
			this.position.x,
			this.position.y, 
			this.width,
			this.height
		)
		c.restore()
	}

	drawFull() {
		c.fillStyle = "rgba(0, 200, 0, 0.2)"
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}

	updateFrames() {
		if (!this.loaded) return
		this.draw()
		this.frameElapsed++

		if(this.frameElapsed === this.frameBuffer) {
			this.frameElapsed = 0
			this.currentFrame++

			if (this.currentFrame === this.frameRate) this.currentFrame = 0
		}
	}
}