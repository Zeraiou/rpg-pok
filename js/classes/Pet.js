class Pet extends Sprite {
	constructor({ position, image, visible = true }) {
		super({ position, image, visible })
		this.health = 100
		this.isAttacking = false

	}

	attack({attack, recipient}) {
		// attackType.innerHTML = attack.type		

		if (attack.name === "Bite") {
			this.biteAnimation(this, recipient, attack.damage)
		}
		else if (attack.name === "Fireball") {
			this.launchFireballAnimation(this, recipient, attack.damage)
		}
	}

	bitedAnimation(recipient, giver, damage) {
		recipient.health -= damage
		const timeline = gsap.timeline()

		timeline.to(recipient.position, {
			x: recipient.position.x - 10,
			duration: 0.05,
		}).to(recipient.position, {
			x: recipient.position.x + 20,
			repeat: 5,
			yoyo: true,
			duration: 0.05,
		}).to(recipient.position, {
			x: recipient.position.x,
			duration: 0.05,
			onComplete() {
				setTimeout(() => {
					giver.isAttacking = false
					// attackType.innerHTML = " "
				}, 1000)
			}
		})

		gsap.to(recipient, {
			opacity: 0,
			repeat: 5,
			yoyo: true,
			duration: 0.03,
		})
	}

	biteAnimation(giver, recipient, damage) {
		const timeline = gsap.timeline()

		const stepMovement = {
			x1: 0,
			x2: 0,
		}

		if (giver === emby) {
			stepMovement.x1 = -10
			stepMovement.x2 = 20
		}
		else if (giver === draggle) {
			stepMovement.x1 = 20
			stepMovement.x2 = -10
		}

		timeline.to(giver.position, {
			x: giver.position.x + stepMovement.x1,
			duration: 0.4,
		}).to(giver.position, {
			x: giver.position.x + stepMovement.x2,
			duration: 0.1,
			onComplete() {
				giver.bitedAnimation(recipient, giver, damage)
			}
		}).to(giver.position, {
			x: giver.position.x,
			duration: 0.2,
		})
	}

	launchFireballAnimation(giver, recipient, damage) {
		const stepMovement = {
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0,
			x3: 0,
			y3: 0
		}

		if (giver === emby) {
			stepMovement.x1 = -3
			stepMovement.y1 = 2
			stepMovement.x2 = -5
			stepMovement.y2 = 3
			stepMovement.x3 = 0
			stepMovement.y3 = 0
		}
		else if (giver === draggle) {
			stepMovement.x1 = 3
			stepMovement.y1 = -2
			stepMovement.x2 = 5
			stepMovement.y2 = -3
			stepMovement.x3 = 0
			stepMovement.y3 = 0
		}


		const timelineX = gsap.timeline()

		timelineX.to(giver.position, {
			x: giver.position.x + stepMovement.x1,
			y: giver.position.y + stepMovement.y1,
			duration: 0.4,
		}).to(giver.position, {
			x: giver.position.x + stepMovement.x2,
			y: giver.position.y + stepMovement.y2,
			duration: 0.1,
			onComplete() {
				giver.fireballAnimation(giver, recipient, damage)
			}
		}).to(giver.position, {
			x: giver.position.x + stepMovement.x3,
			y: giver.position.y + stepMovement.y3,
			duration: 0.1,
		})
	}

	fireballAnimation(giver, recipient, damage) {
		const offset = {
			x: 0,
			y: 0,
		}

		let rotation = 0

		const offsetFinal = {
			x: 0,
			y: 0,
		}

		if (giver === emby) {
			offset.x = 30
			offset.y = -10
			offsetFinal.x = 10
			offsetFinal.y = 15
			rotation = 1.3
		}
		else if (giver === draggle) {
			offset.x = 0
			offset.y = 24
			offsetFinal.x = 10
			offsetFinal.y = 15
			rotation = 4.6
		}

		fireBall.visible = true
		fireBall.rotation = rotation
		fireBall.position.x = giver.position.x + offset.x
		fireBall.position.y = giver.position.y + offset.y

		gsap.to(fireBall.position, {
			x: recipient.position.x + offsetFinal.x,
			y: recipient.position.y + offsetFinal.y,
			duration: 0.8,
			onComplete() {
				fireBall.visible = false
				giver.fireballHitAnimation(giver, recipient, damage)
			}
		})
	}

	fireballHitAnimation(giver, recipient, damage) {
		const stepMovement = {
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0,
			x3: 0,
			y3: 0
		}

		if (giver === emby) {
			stepMovement.x1 = 1
			stepMovement.y1 = -3
			stepMovement.x2 = 3
			stepMovement.y2 = -8
			stepMovement.x3 = 0
			stepMovement.y3 = 0
		}
		else if (giver === draggle) {
			stepMovement.x1 = -1
			stepMovement.y1 = 3
			stepMovement.x2 = -3
			stepMovement.y2 = 8
			stepMovement.x3 = 0
			stepMovement.y3 = 0
		}

		recipient.health -= damage

		const timelineX = gsap.timeline()

		timelineX.to(recipient.position, {
			x: recipient.position.x + stepMovement.x1,
			y: recipient.position.y + stepMovement.y1,
			duration: 0.1,
		}).to(recipient.position, {
			x: recipient.position.x + stepMovement.x2,
			y: recipient.position.y + stepMovement.y2,
			duration: 0.4,
		}).to(recipient.position, {
			x: recipient.position.x + stepMovement.x3,
			y: recipient.position.y + stepMovement.y3,
			duration: 0.1,
			onComplete() {
				setTimeout(() => {
					giver.isAttacking = false
					// attackType.innerHTML = " "
				}, 1000)
			}
		})

		gsap.to(recipient, {
			opacity: 0,
			repeat: 5,
			yoyo: true,
			duration: 0.03,
		})
	}
}