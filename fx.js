/**
 * fx.js
 * @description A library for providing simple animations in ZeppOS. 一个用于在ZeppOS中提供简单动画的库
 * @version 2.0.0
 * @date 2023/03/15
 * @author XiaomaiTX
 * @license MIT
 * https://github.com/XiaomaiTX/zeppos-fx
 *
 *  */

function normalGetTime() {
	switch (zosAPILevel) {
		case "2.0":
			return new Time().getTime();
		case "1.0":
			return new Date().getTime();
	}
	return;
}

export class Fx {
	constructor(animProfile, animObj) {
		this.objects = animObj;
		this.status = "stop";
		this.tracks = [];
		for (let i = 0; i < animProfile.length; i++) {
			let track = animProfile[i];
			this.tracks.push(track);
		}
		this.progress = [];
		for (let i = 0; i < this.tracks.length; i++) {
			this.progress.push(0);
		}

		this.timers = [];
	}

	start() {
		if (this.status !== "stop" && this.status !== "pause") return;
		this.status = "start";
		console.log("start fx");
		for (let i = 0; i < this.tracks.length; i++) {
			this.scheduleTrack(i);
		}
	}
	scheduleTrack(trackIndex) {
		// 清理之前的定时器
		if (this.timers[trackIndex]) {
			clearTimeout(this.timers[trackIndex]);
		}

		let track = this.tracks[trackIndex];
		let progress = this.progress[trackIndex];
		const executeEffect = () => {
			const currentEffect = track[progress];
			FxInside.fx(
				currentEffect.props.fps,
				currentEffect.props.duration,
				currentEffect.props.fx_style,
				currentEffect.func,
				currentEffect.onStop,
				"static delay"
			);
			if (
				currentEffect.props.repeat === true &&
				progress === track.length - 1
			) {
				progress = 0;
			} else {
				progress++;
			}
			this.progress[trackIndex] = progress;
			// 如果已经到达最后一个效果并且不需要重复，则停止调度
			if (progress < track.length) {
				this.timers[trackIndex] = setTimeout(
					executeEffect,
					track[progress].props.startTime * 1000
				);
			}
		};
		this.timers[trackIndex] = setTimeout(
			executeEffect,
			track[progress].props.startTime * 1000
		);
	}
	pause() {
		if (this.status !== "start") return;
		this.status = "pause";
		this.timers.forEach((timer) => clearTimeout(timer));
	}
	stop() {
		this.status = "stop";
		this.timers.forEach((timer) => clearTimeout(timer));
		this.progress = this.tracks.map(() => 0);
	}
	restart() {
		if (this.status != "stop" && this.status != "pause") return;
		this.status = "start";
		this.progress = 0;
		this.start();
	}

	status() {
		return this.status;
	}
	static Styles = {
		LINEAR: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_SINE: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return 1 - cos((x * Math.PI) / 2);
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_OUT_SINE: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return sin((x * Math.PI) / 2);
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_OUT_SINE: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return -(cos(Math.PI * x) - 1) / 2;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_QUAD: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x * x;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_OUT_QUAD: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return 1 - (1 - x) * (1 - x);
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_OUT_QUAD: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_CUBIC: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x * x * x;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_OUT_CUBIC: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return 1 - Math.pow(1 - x, 3);
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_OUT_CUBIC: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x < 0.5
					? 4 * x * x * x
					: 1 - Math.pow(-2 * x + 2, 3) / 2;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_QUART: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x * x * x * x;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_OUT_QUART: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return 1 - Math.pow(1 - x, 4);
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_OUT_QUART: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x < 0.5
					? 8 * x * x * x * x
					: 1 - Math.pow(-2 * x + 2, 4) / 2;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_QUINT: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x * x * x * x * x;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_OUT_QUINT: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return 1 - Math.pow(1 - x, 4);
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_OUT_QUINT: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x < 0.5
					? 16 * x * x * x * x * x
					: 1 - Math.pow(-2 * x + 2, 5) / 2;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_EXPO: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_OUT_EXPO: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_OUT_EXPO: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x === 0
					? 0
					: x === 1
					? 1
					: x < 0.5
					? Math.pow(2, 20 * x - 10) / 2
					: (2 - Math.pow(2, -20 * x + 10)) / 2;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_CIRC: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return 1 - Math.sqrt(1 - Math.pow(x, 2));
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_OUT_CIRC: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return Math.sqrt(1 - Math.pow(x - 1, 2));
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_OUT_CIRC: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x < 0.5
					? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
					: (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_BACK: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return 1.70158 + 1 * x * x * x - 1.70158 * x * x;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_OUT_BACK: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return (
					1 +
					1.70158 +
					1 * Math.pow(x - 1, 3) +
					1.70158 * Math.pow(x - 1, 2)
				);
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_OUT_BACK: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x < 0.5
					? (Math.pow(2 * x, 2) *
							((1.70158 * 1.525 + 1) * 2 * x - 1.70158 * 1.525)) /
							2
					: (Math.pow(2 * x - 2, 2) *
							((1.70158 * 1.525 + 1) * (x * 2 - 2) +
								1.70158 * 1.525) +
							2) /
							2;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_ELASTIC: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x === 0
					? 0
					: x === 1
					? 1
					: -Math.pow(2, 10 * x - 10) *
					  sin(((x * 10 - 10.75) * (2 * Math.PI)) / 3);
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_OUT_ELASTIC: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x === 0
					? 0
					: x === 1
					? 1
					: Math.pow(2, -10 * x) *
							sin(((x * 10 - 0.75) * (2 * Math.PI)) / 3) +
					  1;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_OUT_ELASTIC: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x === 0
					? 0
					: x === 1
					? 1
					: x < 0.5
					? -(
							Math.pow(2, 20 * x - 10) *
							sin(((20 * x - 11.125) * (2 * Math.PI)) / 4.5)
					  ) / 2
					: (Math.pow(2, -20 * x + 10) *
							sin(((20 * x - 11.125) * (2 * Math.PI)) / 4.5)) /
							2 +
					  1;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_BOUNCE: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return 1 - bounceOut(1 - x);
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_OUT_BOUNCE: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return bounceOut(x);
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
		EASE_IN_OUT_BOUNCE: function (now_x, begin, end, max_x) {
			function math_func(x) {
				return x < 0.5
					? (1 - bounceOut(1 - 2 * x)) / 2
					: (1 + bounceOut(2 * x - 1)) / 2;
			}
			return begin + (end - begin) * math_func(now_x / max_x);
		},
	};
}

class FxInside {
	constructor() {}
	static fx(fps, duration, fx_style, callback, onStop, mode) {
		this.x_now = 0;
		this.per_clock = 1000 / fps;
		console.log("per_clock", this.per_clock);
		console.log("mode", mode);
		switch (mode) {
			case "static delay":
				let timer = setInterval(() => {
					callback(fx_style((this.x_now += 1), 0, 1, fps * duration));
					if (this.x_now >= fps * duration) {
						clearInterval(timer);
						timer = null;

						if (onStop != undefined) {
							onStop(
								fx_style(fps * duration, 0, 1, fps * duration)
							);
						}
					}
				}, per_clock);

				break;

			case "dynamic delay":
				(function loop() {
					timer = setTimeout(() => {
						callback(
							fx_style((this.x_now += 1), 0, 1, fps * duration)
						);
						if (this.x_now > fps * duration) {
							if (onStop != undefined) {
								onStop();
								clearTimeout(timer);
								timer = null;
							}
						}

						loop();
					}, per_clock);
				})();

				break;
		}
	}
}

// class Timer {
// 	constructor(callback, interval, errorAdjustmentInterval = 1000) {
// 		this.callback = callback; // 要执行的回调函数
// 		this.interval = interval; // 计时器的间隔时间，以毫秒为单位
// 		this.timerId = null; // 保存计时器的 ID，用于停止计时器
// 		this.startTime = null; // 计时器的开始时间
// 		this.nextTick = null; // 下一次 tick（执行回调）的时间点
// 		this.errorAdjustmentInterval = errorAdjustmentInterval; // 误差调整间隔
// 		this.lastAdjustmentTime = null; // 上一次误差调整的时间点
// 		this.drift = 0; // 累积的误差
// 	}
// 	start(delay = 0) {
// 		this.startTime = normalGetTime() + delay; // 设置开始时间，加上可选的延迟
// 		this.nextTick = this.startTime + this.interval; // 计算第一次 tick 的时间点
// 		this.lastAdjustmentTime = this.startTime; // 初始化上一次误差调整的时间点

// 		this.timerId = setInterval(() => {
// 			this.tick();
// 		}, this.interval);
// 	}
// 	stop() {
// 		clearInterval(this.timerId);
// 		this.timerId = null;
// 		this.timer = null;
// 	}
// 	tick() {
// 		const currentTime = normalGetTime();

// 		// 执行回调
// 		this.callback();

// 		// 更新下一次 tick 的时间点
// 		this.nextTick += this.interval;

// 		// 检查是否需要调整误差
// 		if (
// 			currentTime - this.lastAdjustmentTime >=
// 			this.errorAdjustmentInterval
// 		) {
// 			// 计算误差
// 			const drift = currentTime - this.nextTick + this.interval;
// 			this.nextTick += drift; // 调整下一次 tick 的时间点
// 			this.lastAdjustmentTime = currentTime; // 更新上一次误差调整的时间点

// 			// 清除并重新启动计时器，以适应误差调整后的间隔
// 			clearInterval(this.timerId);
// 			this.timerId = setInterval(() => {
// 				this.tick();
// 			}, this.interval);
// 		}
// 	}
// }
