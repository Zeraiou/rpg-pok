const enemyActionsQueue = []

function animateBattleSequence() {
	drawBattleBackground()
	draggle.updateFrames()
	if (fireBall.visible) fireBall.updateFrames()
	emby.updateFrames()
	updateHealthBar()
	// detectDeath()
}

function drawBattleBackground() {
	battleBackground.draw()
}

function updateHealthBar() {
	if (draggle.health <= 0 && !draggle.isDiying) {
		battleMusic.pause()
		battleMusic.currentTime = 0
		endBattle.play()
		draggle.isDiying = true
		draggle.health = 0
		gsap.to(draggle, {
			opacity: 0,
			duration: 1,
		})
	}
	if (emby.health <= 0 && !emby.isDiying) {
		battleMusic.pause()
		battleMusic.currentTime = 0
		endBattle.play()
		emby.isDiying = true
		emby.health = 0
		gsap.to(emby, {
			opacity: 0,
			duration: 1,
		})
	}

	if (emby.health === 100) playerHealth.style.width = emby.health + "%" 
	else {
		gsap.to(playerHealth, {
			width: emby.health + "%"
		})
	}

	if (draggle.health === 100) enemyHealth.style.width = draggle.health + "%" 
	else {
		gsap.to(enemyHealth, {
			width: draggle.health + "%"
		})
	}
}

function detectDeath() {
	if (draggle.health === 0 || emby.health === 0) {
		// const changeSequence = setTimeout(() => {
		// 	switchToMap()
		// }, 3000)

		while(enemyActionsQueue.length > 0) {
			enemyActionsQueue.shift()
		}
		switchToMap()
	}
}

function switchToMap() {
	randomBattleActivationTrigger = setRandom(100, 300)
	battleActivationFrame = 0

	const timeline = gsap.timeline()
	timeline.to(blackScreen, {
		opacity: 1,
		onComplete() {
			window.cancelAnimationFrame(battleInterval)
			enemyDisplay.style.visibility = "hidden"
			playerDisplay.style.visibility = "hidden"
			battleOptionsCard.style.visibility = "hidden"
			player.currentFrame = 0
			player.frameElapsed = 0
			mapMusic.play()
			animateMap()
			emby.health = 100
			draggle.health = 100
			emby.opacity = 1
			draggle.opacity = 1
		}
	}).to(blackScreen, {
		opacity: 0,
		onComplete() {
			player.canMove = true
		}
	})
}