(function() {
	function LighteningEffect(config) {
		var that = this;

		that.context = config.context;
		that.scene = config.scene;
		that.begin = config.begin;
		that.duration = 250;

		that.currentFlashIndex = 0;
		that.flashes = [
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
		]
	}

	LighteningEffect.prototype = {
		update: function () {
			var that = this,
				now = new Date(),
				flash = that.flashes[that.currentFlashIndex];

			if (now.getTime() - that.begin.getTime() > flash.duration) {
				if (that.currentFlashIndex < that.flashes.length - 1) {
					that.begin = new Date();
					that.currentFlashIndex++;
				} else {
					that.scene.onLighteningEffectDone(that);
				}
			}
		},

		render: function() {
			var that = this,
				ctx = that.context,
				flash = that.flashes[that.currentFlashIndex];

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