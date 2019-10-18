export default {
	data() {
		return {
			para_distance: 300,
			para_start: 0,
			para_end: 0,
			para_state: 'translateY(0)'
		}
	},
	computed: {
		transform() {
			if (process.isClient) {
				if (window.innerHeight > window.innerWidth * .8 || window.matchMedia("(min-width: 1300px)").matches) {
					return { 'transform': this.para_state }
				}
				else {
					return {
						'transform': 'none'
					}
				}
			}
			else {
				return
			}
		}
	},
	methods: {
		para_update() {
			this.para_start = 0
			this.para_end = this.$el.offsetHeight * -1
		},
		para_move() {
			let top = this.$el.getBoundingClientRect().top
			let move = this.between(top, this.para_start, this.para_end) * this.para_distance

			this.para_state = `translateY(${move}px)`
		},
		between(val, min, max, percent = false) {
			let upper = val - min;
			let lower = max - min;
			let result = (upper / lower);

			if (percent) {
				result = result * 100;
			}

			result = parseFloat(result.toFixed(8));

			return result;
		}
	},
	mounted() {
		if (process.isClient) {
			window.addEventListener('scroll', this.para_move)
			window.addEventListener('resize', this.para_update)
			window.addEventListener('orientationchange', this.para_update)
			this.para_update()
			this.para_move()
		}
	},
	beforeDestroy() {
		if (process.isClient) {
			window.removeEventListener('scroll', this.para_move)
			window.removeEventListener('resize', this.para_update)
			window.removeEventListener('orientationchange', this.para_update)
		}
	}
}