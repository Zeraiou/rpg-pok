const pets = {
	emby: {
		position: {
			x: 310,
			y: 320,
		},
		image: {
			imageSrc: './assets/images/embySprite.png',
			frameRate: 4,
			frameBuffer: 14,
			loop: true,
			autoplay: true,
		},
		name: "Emby",
		attacks: [attacks.Bite, attacks.Fireball],
	},
	draggle: {
		position: {
			x: 800,
			y: 100,
		},
		image: {
			imageSrc: './assets/images/draggleSprite.png',
			frameRate: 4,
			frameBuffer: 17,
			loop: true,
			autoplay: true,
		},
		name: "Draggle",
		attacks: [attacks.Fireball, attacks.Bite]
	},
}