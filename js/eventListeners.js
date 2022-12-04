window.addEventListener('keydown', (event) => {
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
		switch(event.target.dataset.id) {
			case "fireballCard":
				draggle.isAttacking = true
				draggle.attack({ 
					attack: attacks.Fireball,
					recipient: emby
				})
				break

			case "biteCard":
				emby.isAttacking = true
				emby.attack({ 
					attack: attacks.Bite,
					recipient: draggle
				})
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

const fireballCard = document.querySelector(".fireballCard")
const biteCard = document.querySelector(".biteCard")

window.addEventListener("mousemove", (event) => {
	if (event.path[0] === fireballCard) attackType.innerHTML = "Fire"
	else if (event.path[0] === biteCard) attackType.innerHTML = "Physical"
	else attackType.innerHTML = " "
})