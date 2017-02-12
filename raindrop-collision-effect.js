(function() {
	function RaindropCollisionEffect(config) {
		var that = this;

		that.context = config.context;
		that.scene = config.scene;
	}

	RaindropCollisionEffect.prototype = {
		update: function () {
			var that = this;
		},

		render: function() {
			var that = this,
				ctx = that.context;
		}
	};

	window.RainingNamespace = window.RainingNamespace || {};
	RainingNamespace.RaindropCollisionEffect = RaindropCollisionEffect;

	const
		WIDTH = 600,
		HEIGHT = 600,
		MAX_LENGTH = 20;
})();