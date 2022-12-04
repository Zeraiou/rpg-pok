const canvas = document.querySelector('canvas')
canvas.width = 1024
canvas.height = 576

const blackScreen = document.querySelector(".blackScreen")
const battleOptionsCard = document.querySelector(".battleOptionsCard")
const playerDisplay = document.querySelector(".playerDisplay")
const enemyDisplay = document.querySelector(".enemyDisplay")
const attackType = document.getElementById("attackType")
const enemyHealth = document.getElementById("enemyHealth")
const playerHealth = document.getElementById("playerHealth")
const battleMessagesCard = document.getElementById("battleMessagesCard")
const attack1Card = document.querySelector(".attack1Card")
const attack2Card = document.querySelector(".attack2Card")

let firstMusicStart = false

let mapInterval = null
let battleInterval = null

const c = canvas.getContext('2d')

const offsetInit = {
	x: -740,
	y: -720,
}

const mapBackground = new Sprite({
	position: {
		x: offsetInit.x,
		y: offsetInit.y,
	},
	image: {
		imageSrc: './assets/images/pelletTown.png',
		frameRate: 1,
		frameBuffer: 1,
		loop: true,
		autoplay: true,
	}
})

const mapBackgroundOverhead = new Sprite({
	position: {
		x: offsetInit.x,
		y: offsetInit.y,
	},
	image: {
		imageSrc: './assets/images/pelletTownOverhead.png',
		frameRate: 1,
		frameBuffer: 1,
		loop: true,
		autoplay: true,
	}
})

const battleBackground = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	image: {
		imageSrc: './assets/images/battleBackground.png',
		frameRate: 1,
		frameBuffer: 1,
		loop: true,
		autoplay: true,
	}
})

const draggle = new Pet(pets.draggle)

const emby = new Pet(pets.emby)

const fireBall = new Sprite({
	position: {
		x: 140,
		y: 160,
	},
	image: {
		imageSrc: './assets/images/fireball.png',
		frameRate: 4,
		frameBuffer: 8,
		loop: true,
		autoplay: true,
	}, 
	visible: false,
	rotation: 0,
})


const collisionArr2D = formatArrIn2D(map1Collisions, 70)
const currentMapCollisions = filterArrayForPosition(collisionArr2D, 1025, 4)

const battleZoneArr2D = formatArrIn2D(map1BattleZone, 70)
const currentMapBattleZones = filterArrayForPosition(battleZoneArr2D, 1025, 4)

const keys = {
	"KeyA": {
		pressed: false,
	},
	"KeyD": {
		pressed: false,
	},
	"KeyW": {
		pressed: false,
	},
	"KeyS": {
		pressed: false,
	},
}

let lastKeyPressed = ""

const player = new Player({
	position: {
		x: canvas.width / 2 - 24,
		y: canvas.height / 2 - 34,
	},
	image: {
		imageSrc: './assets/images/playerDown.png',
		frameRate: 4,
		frameBuffer: 12,
		loop: true,
		autoplay: true,
	},
	animations: {
		playerUp: {
			imageSrc: './assets/images/playerUp.png',
			frameRate: 4,
			frameBuffer: 12,
			loop: true,
			autoplay: true,
		},
		playerRight: {
			imageSrc: './assets/images/playerRight.png',
			frameRate: 4,
			frameBuffer: 12,
			loop: true,
			autoplay: true,
		},
		playerDown: {
			imageSrc: './assets/images/playerDown.png',
			frameRate: 4,
			frameBuffer: 12,
			loop: true,
			autoplay: true,
		},
		playerLeft: {
			imageSrc: './assets/images/playerLeft.png',
			frameRate: 4,
			frameBuffer: 12,
			loop: true,
			autoplay: true,
		},
	},
})

const movableObjects = [mapBackground, mapBackgroundOverhead]
currentMapCollisions.forEach(tile => {
	movableObjects.push(tile)
})

currentMapBattleZones.forEach(tile => {
	movableObjects.push(tile)
})

let randomBattleActivationTrigger = setRandom(100, 300)
// let randomBattleActivationTrigger = 60
let battleActivationFrame = 0


function animateMap() {
	mapInterval = window.requestAnimationFrame(animateMap)

	animateMapSequence()
}

function animateMapSequence() {
	if (player.canMove) updateMovableObjectsPosition()

	drawMapBackground()
	player.update()

	// drawCollisions()
	// drawBattleZones()
	drawMapOverhead()
	// drawCenterMap()
}

function animateBattle() {
	battleInterval = window.requestAnimationFrame(animateBattle)

	animateBattleSequence()
}

function drawMapBackground() {
	mapBackground.draw()
}

function drawMapOverhead() {
	mapBackgroundOverhead.draw()
}

function drawCenterMap() {
	c.fillStyle = "red"
	c.fillRect(canvas.width / 2, 0, 1, canvas.height)
	c.fillRect(0, canvas.height / 2, canvas.width, 1)
}

function updateMovableObjectsPosition() {
	let canMove = true
	if (keys.KeyA.pressed) {
		for (let i = 0; i < currentMapCollisions.length; i++) {
			const currentTile = currentMapCollisions[i]

			currentTile.position.x += player.movementSpeed
			if (rectangularCollisionMiddleY(player, currentTile)) {
				canMove = false
				currentTile.position.x -= player.movementSpeed
				break
			} 
			currentTile.position.x -= player.movementSpeed
		}

		if (canMove) {
			movableObjects.forEach(object => {
				object.position.x += player.movementSpeed
			})
			detectBattleZones()
		}
	}
	else if (keys.KeyD.pressed) {
		for (let i = 0; i < currentMapCollisions.length; i++) {
			const currentTile = currentMapCollisions[i]

			currentTile.position.x -= player.movementSpeed
			if (rectangularCollisionMiddleY(player, currentTile)) {
				canMove = false
				currentTile.position.x += player.movementSpeed
				break
			} 
			currentTile.position.x += player.movementSpeed 
		}

		if (canMove) {
			movableObjects.forEach(object => {
				object.position.x -= player.movementSpeed
			})
			detectBattleZones()
		}
	}
	else if (keys.KeyW.pressed) {
		for (let i = 0; i < currentMapCollisions.length; i++) {
			const currentTile = currentMapCollisions[i]

			currentTile.position.y += player.movementSpeed
			if (rectangularCollisionMiddleY(player, currentTile)) {
				canMove = false
				currentTile.position.y -= player.movementSpeed
				break
			} 
			currentTile.position.y -= player.movementSpeed
		}

		if (canMove) {
			movableObjects.forEach(object => {
				object.position.y += player.movementSpeed
			})
			detectBattleZones()
		}
	}
	else if (keys.KeyS.pressed) {
		for (let i = 0; i < currentMapCollisions.length; i++) {
			const currentTile = currentMapCollisions[i]

			currentTile.position.y -= player.movementSpeed
			if (rectangularCollisionMiddleY(player, currentTile)) {
				canMove = false
				currentTile.position.y += player.movementSpeed
				break
			} 
			currentTile.position.y += player.movementSpeed
		}

		if (canMove) {
			movableObjects.forEach(object => {
				object.position.y -= player.movementSpeed
			})
			detectBattleZones()
		}
	}
}

function drawCollisions() {
	currentMapCollisions.forEach(tile => {
		c.fillStyle = "rgba(233, 0, 0, 0.3)"
		c.fillRect(tile.position.x, tile.position.y, tile.width, tile.height)
	})
}

function drawBattleZones() {
	currentMapBattleZones.forEach(tile => {
			c.fillStyle = "rgba(0, 0, 233, 0.3)"
			c.fillRect(tile.position.x, tile.position.y, tile.width, tile.height)
	})
}

function detectBattleZones() {
	// can add overlap
	for (let i = 0; i < currentMapBattleZones.length; i++) {
		const battleTile = currentMapBattleZones[i]
		if (rectangularCollisionMiddleY(player, battleTile)) {
			battleActivationFrame++
			break
		}
	}

	if (battleActivationFrame === randomBattleActivationTrigger) {
		player.canMove = false
		mapMusic.pause()
		mapMusic.currentTime = 0
		initBattle.volume = 0.4
		initBattle.play()
		window.cancelAnimationFrame(mapInterval)
		gsap.to(blackScreen, {
			opacity: 1,
			repeat: 3,
			yoyo: true,
			duration: 0.4,
			onComplete() {
				gsap.to(blackScreen, {
					opacity: 1,
					duration: 0.4,
					onComplete() {
						gsap.to(blackScreen, {
							opacity: 0,
							duration: 0.7,
						})
						animateBattle()
						battleMusic.volume = 0.8
						battleMusic.play()
						attack1Card.innerHTML = emby.attacks[0].name
						attack1Card.dataset.name = emby.attacks[0].name
						attack1Card.dataset.type = emby.attacks[0].type
						attack2Card.innerHTML = emby.attacks[1].name
						attack2Card.dataset.name = emby.attacks[1].name
						attack2Card.dataset.type = emby.attacks[1].type
						enemyDisplay.style.visibility = "visible"
						playerDisplay.style.visibility = "visible"
						battleOptionsCard.style.visibility = "visible"
						setPetName()
					}
				})
			}
		})
	}
}

function setRandom(min, max) {
	return Math.floor((Math.random() * max) + min)
}

function setPetName() {
	document.getElementById("enemyName").innerHTML = draggle.name
	document.getElementById("playerName").innerHTML = emby.name
}

function gameInit() {
	setPetName()
	animateMap()
}

window.addEventListener("load", () => {
	gameInit()
})
