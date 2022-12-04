function formatArrIn2D(array, amountX) {
	const arrayTemp = []

	for (let i = 0; i < array.length; i += amountX) {
		arrayTemp.push(array.slice(i, i + amountX))
	}

	return arrayTemp
}

function filterArrayForPosition(array, symbolChar, scale) {
	const arrayTemp = []

	array.forEach((row, rowIndex) => {
		row.forEach((tile, tileIndex) => {
			if (tile === symbolChar) {
				arrayTemp.push({
					index: {
						x: tileIndex,
						y: rowIndex,
					},
					width: 12 * scale,
					height: 12 * scale,
					position: {
						x: tileIndex * 12 * scale + offsetInit.x,
						y: rowIndex * 12 * scale + offsetInit.y,
					}
				})
			}
		})
	})

	return arrayTemp
}

function rectangularCollision(object1, object2) {
	return (
		object1.position.x + object1.width >= object2.position.x &&
		object1.position.x <= object2.position.x + object2.width &&
		object1.position.y + object1.height >= object2.position.y &&
		object1.position.y <= object2.position.y + object2.height
	)
}

function rectangularCollisionMiddleY(object1, object2) {
	return (
		object1.position.x + object1.width >= object2.position.x &&
		object1.position.x <= object2.position.x + object2.width &&
		object1.position.y + object1.height >= object2.position.y &&
		object1.center.y <= object2.position.y + object2.height
	)
}

function showBattleMessage(message) {
	battleMessagesCard.style.visibility = "visible"
	battleMessagesCard.innerHTML = message

	setTimeout(() => {
		battleMessagesCard.style.visibility = "hidden"
		battleMessagesCard.innerHTML = " "

		detectDeath()
		if (enemyActionsQueue.length > 0) {
			enemyActionsQueue[0]()
			enemyActionsQueue.shift()
		}
	}, 3000)
}

function addingToEnemyQueue(pet) {
	let attackTemp = {}
	if (pet.attacks.length > 1) {
		const random = Math.floor(Math.random() * 10)
		if (random < 6) attackTemp = pet.attacks[0]
		else attackTemp = pet.attacks[1]
	}
	else attackTemp = pet.attacks[1]

	console.log(attackTemp)

	enemyActionsQueue.push(() => {
		draggle.isAttacking = true
		draggle.attack({
			attack: attackTemp,
			recipient: emby
		})
	})
}