window.addEventListener('keydown', (event) => {
	if (!firstMusicStart) {
		mapMusic.play()
		firstMusicStart = true
	}
	switch(event.code) {
		case "KeyA":
			keys.KeyA.pressed = true
			lastKeyPressed = "KeyA"
			break

		case "KeyD":
			keys.KeyD.pressed = true
			lastKeyPressed = "KeyD"
			break

		case "KeyW":
			keys.KeyW.pressed = true
			lastKeyPressed = "KeyW"
			break

		case "KeyS":
			keys.KeyS.pressed = true
			lastKeyPressed = "KeyS"
			break

		default: break
	}
})

window.addEventListener('keyup', (event) => {
	switch(event.code) {
		case "KeyA":
			keys.KeyA.pressed = false
			break

		case "KeyD":
			keys.KeyD.pressed = false
			break

		case "KeyW":
			keys.KeyW.pressed = false
			break

		case "KeyS":
			keys.KeyS.pressed = false
			break

		default: break
	}
})

window.addEventListener('click', (event) => {
	if (!draggle.isAttacking) {
		switch(event.target.dataset.name) {
			case "Bite":
				emby.isAttacking = true
				emby.attack({ 
					attack: attacks.Bite,
					recipient: draggle
				})

				addingToEnemyQueue(draggle)
				break

			case "Fireball":
				emby.isAttacking = true
				emby.attack({ 
					attack: attacks.Fireball,
					recipient: draggle
				})

				addingToEnemyQueue(draggle)
				break

			default: break	
		}
	}
})

const mouse = {
	position: {
		x: 0,
		y: 0,
	}
}

window.addEventListener("mousemove", (event) => {
	if (event.path[0] === attack1Card) attackType.innerHTML = attack1Card.dataset.type
	else if (event.path[0] === attack2Card) attackType.innerHTML = attack2Card.dataset.type
	else attackType.innerHTML = " "
})