(function() {
	class LighteningEffect {
		constructor(config) {
			this.context = config.context;
			this.scene = config.scene;
			this.begin = config.begin;
			this.duration = 250;

			this.currentFlashIndex = 0;
			this.flashes = [
				{
					duration: 250,
					isDone: false
				},
				{
					duration: 150,
					isDone: false,
					isDummy: true
				},
				{
					duration: 100,
					isDone: false
				}
			];
		}

		update() {
			let now = new Date(),
				flash = this.flashes[this.currentFlashIndex];

			if (now.getTime() - this.begin.getTime() > flash.duration) {
				if (this.currentFlashIndex < this.flashes.length - 1) {
					this.begin = new Date();
					this.currentFlashIndex++;
				} else {
					this.scene.onLighteningEffectDone(this);
				}
			}
		}

		render() {
			let ctx = this.context,
				flash = this.flashes[this.currentFlashIndex];

			if (flash.isDummy) {
				return;
			}

			ctx.beginPath();
			ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
			ctx.rect(0, 0, 600, 600);
			ctx.fill();
		}
	};

	window.RainingNamespace = window.RainingNamespace || {};
	RainingNamespace.LighteningEffect = LighteningEffect;
})();