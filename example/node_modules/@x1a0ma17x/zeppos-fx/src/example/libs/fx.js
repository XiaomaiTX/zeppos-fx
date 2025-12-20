/**
 * fx.js
 * @description A library for providing animations in ZeppOS. 一个用于在ZeppOS中提供动画的库
 * @version 3.0.0
 * @date 2024/11/02
 * @author XiaomaiTX
 * @license MIT
 * https://github.com/XiaomaiTX/zeppos-fx
 *
 * **/

export class Fx {
    constructor(params) {
        this.tracks = params.tracks;
        this.metadata = params.metadata;
        this.status = "stop";
    }

    start() {
        if (this.status == "stop" || this.status == "pause") {
            this.status = "start";
            for (let i = 0; i < this.tracks.length; i++) {
                let track = this.tracks[i];
            }
        }
    }
    tick(track) {
        /**
         * @param track
         * @param track.progress 进度
         * @param track.totalFrame 总帧数
         */
        if (
            this.status == "start" &&
            track.progress < track.totalFrame
        ) {
            
        }
    }
    stop() {
        if (this.status != "stop") {
            this.status = "stop";
        }
    }

    restart() {
        this.status = "start";
    }
    pause() {
        if (this.status == "start") {
            this.status = "pause";
        }
    }
    getStatus() {
        return this.status;
    }
}
Fx.Styles = {
    /**
     * List of preset styles
     * @example EXAMPLE: indexNumber,
     *
     * */
    // TODO Add more style

    // The following presets are available for reference https://easings.net/
    // 以下预设可参考 https://easings.net/

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
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
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
                      ((1.70158 * 1.525 + 1) * (x * 2 - 2) + 1.70158 * 1.525) +
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
            return 1 - Fx.Styles.bounceOut(1 - x);
        }
        return begin + (end - begin) * math_func(now_x / max_x);
    },
    EASE_OUT_BOUNCE: function (now_x, begin, end, max_x) {
        function math_func(x) {
            return Fx.Styles.bounceOut(x);
        }
        return begin + (end - begin) * math_func(now_x / max_x);
    },
    EASE_IN_OUT_BOUNCE: function (now_x, begin, end, max_x) {
        function math_func(x) {
            return x < 0.5
                ? (1 - Fx.Styles.bounceOut(1 - 2 * x)) / 2
                : (1 + Fx.Styles.bounceOut(2 * x - 1)) / 2;
        }
        return begin + (end - begin) * math_func(now_x / max_x);
    },
    bounceOut: function (x) {
        /**
         * Returns the bounce out result of x
         * @param {number} x
         * @returns {number}
         */
        const n1 = 7.5625;
        const d1 = 2.75;

        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    },
};

export default Fx;
