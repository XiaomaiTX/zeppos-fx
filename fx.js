/**
 * fx.js
 * @description 一个用于在ZeppOS中提供简单动画的库
 * @version 2.0.2
 * @date 2025/11/28
 * @author CuberQAQ XiaomaiTX
 * @license MIT
 * @repository https://github.com/XiaomaiTX/zeppos-fx
 */

/**
 * 弹跳函数辅助计算
 * @param {number} x 输入值 [0,1]
 * @returns {number} 计算结果
 * @private
 */
const bounceOut = function (x) {
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
};

/**
 * 动画类
 */
export class Fx {
    /**
     * 创建动画实例
     * @param {Object} options 配置选项
     * @param {number} [options.delay=0] 延迟执行时间(毫秒)
     * @param {number} [options.begin=0] 初始函数值
     * @param {number} [options.end=100] 目标函数值
     * @param {number} [options.x_start] 自定义函数的开始x坐标
     * @param {number} [options.x_end] 自定义函数的结束x坐标
     * @param {number} [options.time=1] 执行总时间(秒)
     * @param {Function} [options.fx] 自定义x=>y动画函数
     * @param {Function} options.func 每帧执行的回调函数，参数为当前值
     * @param {number} [options.fps=60] 动画帧率
     * @param {boolean} [options.enable=true] 是否启用
     * @param {number} [options.style=0] 内置预设类型，使用Fx.Styles中的值
     * @param {Function} [options.onStop] 动画结束后的回调函数
     */
    constructor({
        delay = 0,
        begin = 0,
        end = 100,
        x_start,
        x_end,
        time = 1,
        fx,
        func,
        fps = 60,
        enable = true,
        style = 0,
        onStop,
    } = {}) {
        this.begin = begin;
        this.end = end;
        this.fps = fps;
        this.time = time;
        this.per_clock = 1000 / fps;
        this.delay = delay;
        this.func = func;
        this.onStop = onStop;
        this.enable = enable;
        this.timer = null;

        if (fx) {
            // 使用自定义函数
            this.x_start = x_start != null ? x_start * 1.0 : 0;
            this.x_end = x_end != null ? x_end * 1.0 : 1;
            this.fx = fx;
            this.speed = (this.x_end - this.x_start) / (time * fps);
        } else {
            // 使用预设样式
            const styleName = this._getStyleName(style);
            this.fx = (x) => Fx.Easing[styleName](x, begin, end, fps * time);
            this.x_start = 0;
            this.x_end = fps * time;
            this.speed = 1;
        }

        this.x_now = this.x_start;

        if (enable) {
            this.registerTimer();
        }
    }

    /**
     * 获取样式名称
     * @param {number} styleValue 样式枚举值
     * @returns {string} 样式名称
     * @private
     */
    _getStyleName(styleValue) {
        for (const key in Fx.Styles) {
            if (Fx.Styles[key] === styleValue) {
                return key;
            }
        }
        return "LINEAR";
    }

    /**
     * 重新开始动画
     */
    restart() {
        this.x_now = this.x_start;
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }
        this.setEnable(true);
        this.registerTimer();
    }

    /**
     * 设置动画是否启用
     * @param {boolean} enable 是否启用
     */
    setEnable(enable) {
        if (this.enable === enable) return;

        this.enable = enable;
        if (enable) {
            this.registerTimer();
        } else if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }
    }

    /**
     * 注册定时器
     * @private
     */
    registerTimer() {
        if (this.timer) {
            this.timer.stop();
        }

        this.timer = new ZeppTimer(() => {
            // 更新位置
            this.x_now += this.speed;

            // 检查是否完成
            if (this.x_now >= this.x_end) {
                this.x_now = this.x_end;
                this.func(this.fx(this.x_end));

                this.timer.stop();
                this.timer = null;
                this.enable = false;
                if (typeof this.onStop === "function") {
                    this.onStop();
                }
                return;
            }

            // 执行动画回调
            this.func(this.fx(this.x_now));
        }, this.per_clock);

        this.timer.start();
    }

    /**
     * 获取两个颜色的混合色
     * @param {number} color1 初始颜色1 (6位十六进制)
     * @param {number} color2 初始颜色2 (6位十六进制)
     * @param {number} percentage 混合百分比 [0,1]，越小越接近color1
     * @returns {number} 混合后的颜色
     */
    static getMixColor(color1, color2, percentage) {
        // 提取RGB分量
        const r1 = (color1 >> 16) & 0xff;
        const g1 = (color1 >> 8) & 0xff;
        const b1 = color1 & 0xff;

        const r2 = (color2 >> 16) & 0xff;
        const g2 = (color2 >> 8) & 0xff;
        const b2 = color2 & 0xff;

        // 计算混合色
        const r = Math.floor(r1 + (r2 - r1) * percentage);
        const g = Math.floor(g1 + (g2 - g1) * percentage);
        const b = Math.floor(b1 + (b2 - b1) * percentage);

        return (r << 16) | (g << 8) | b;
    }

    static getRainbowColor(percentage) {
        const colors = [
            0xff0000, // 红色
            0xffff00, // 黄色
            0x00ff00, // 绿色
            0x00ffff, // 青色
            0x0000ff, // 蓝色
            0xff00ff, // 紫色
            0xff0000, // 回到红色，形成循环
        ];
        // 根据value值计算当前颜色段
        const segment = percentage * (colors.length - 1);
        const colorIndex = Math.floor(segment);
        const blendRatio = segment - colorIndex;

        // 获取当前颜色段的两个颜色并进行混合
        const currentColor = this.getMixColor(
            colors[colorIndex],
            colors[colorIndex + 1],
            blendRatio
        );
        return currentColor;
    }

    /**
     * 获取两个边框的混合值
     * @param {{x?:number, y?:number, w?:number, h?:number, radius?:number}} border1 边框1
     * @param {{x?:number, y?:number, w?:number, h?:number, radius?:number}} border2 边框2
     * @param {number} percentage 混合百分比 [0,1]
     * @returns {{x:number, y:number, w:number, h:number, radius:number}} 混合后的边框
     */
    static getMixBorder(border1, border2, percentage) {
        return {
            x: border1.x + (border2.x - border1.x) * percentage,
            y: border1.y + (border2.y - border1.y) * percentage,
            w: border1.w + (border2.w - border1.w) * percentage,
            h: border1.h + (border2.h - border1.h) * percentage,
            radius:
                border1.radius + (border2.radius - border1.radius) * percentage,
        };
    }
}

/**
 * 动画样式预设常量
 * @enum {number}
 */
Fx.Styles = {
    LINEAR: 0,
    EASE_IN_SINE: 1,
    EASE_OUT_SINE: 2,
    EASE_IN_OUT_SINE: 3,
    EASE_IN_QUAD: 4,
    EASE_OUT_QUAD: 5,
    EASE_IN_OUT_QUAD: 6,
    EASE_IN_CUBIC: 7,
    EASE_OUT_CUBIC: 8,
    EASE_IN_OUT_CUBIC: 9,
    EASE_IN_QUART: 10,
    EASE_OUT_QUART: 11,
    EASE_IN_OUT_QUART: 12,
    EASE_IN_QUINT: 13,
    EASE_OUT_QUINT: 14,
    EASE_IN_OUT_QUINT: 15,
    EASE_IN_EXPO: 16,
    EASE_OUT_EXPO: 17,
    EASE_IN_OUT_EXPO: 18,
    EASE_IN_CIRC: 19,
    EASE_OUT_CIRC: 20,
    EASE_IN_OUT_CIRC: 21,
    EASE_IN_BACK: 22,
    EASE_OUT_BACK: 23,
    EASE_IN_OUT_BACK: 24,
    EASE_IN_ELASTIC: 25,
    EASE_OUT_ELASTIC: 26,
    EASE_IN_OUT_ELASTIC: 27,
    EASE_IN_BOUNCE: 28,
    EASE_OUT_BOUNCE: 29,
    EASE_IN_OUT_BOUNCE: 31,
};

/**
 * 缓动函数集合
 * @see https://easings.net/
 */
Fx.Easing = {
    LINEAR: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * x;
    },

    EASE_IN_SINE: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (1 - Math.cos((x * Math.PI) / 2));
    },

    EASE_OUT_SINE: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * Math.sin((x * Math.PI) / 2);
    },

    EASE_IN_OUT_SINE: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (-(Math.cos(Math.PI * x) - 1) / 2);
    },

    EASE_IN_QUAD: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (x * x);
    },

    EASE_OUT_QUAD: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (1 - (1 - x) * (1 - x));
    },

    EASE_IN_OUT_QUAD: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return (
            begin +
            (end - begin) *
                (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)
        );
    },

    EASE_IN_CUBIC: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (x * x * x);
    },

    EASE_OUT_CUBIC: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (1 - Math.pow(1 - x, 3));
    },

    EASE_IN_OUT_CUBIC: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return (
            begin +
            (end - begin) *
                (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
        );
    },

    EASE_IN_QUART: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (x * x * x * x);
    },

    EASE_OUT_QUART: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (1 - Math.pow(1 - x, 4));
    },

    EASE_IN_OUT_QUART: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return (
            begin +
            (end - begin) *
                (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2)
        );
    },

    EASE_IN_QUINT: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (x * x * x * x * x);
    },

    EASE_OUT_QUINT: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (1 - Math.pow(1 - x, 5));
    },

    EASE_IN_OUT_QUINT: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return (
            begin +
            (end - begin) *
                (x < 0.5
                    ? 16 * x * x * x * x * x
                    : 1 - Math.pow(-2 * x + 2, 5) / 2)
        );
    },

    EASE_IN_EXPO: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (x === 0 ? 0 : Math.pow(2, 10 * x - 10));
    },

    EASE_OUT_EXPO: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
    },

    EASE_IN_OUT_EXPO: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return (
            begin +
            (end - begin) *
                (x === 0
                    ? 0
                    : x === 1
                    ? 1
                    : x < 0.5
                    ? Math.pow(2, 20 * x - 10) / 2
                    : (2 - Math.pow(2, -20 * x + 10)) / 2)
        );
    },

    EASE_IN_CIRC: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (1 - Math.sqrt(1 - Math.pow(x, 2)));
    },

    EASE_OUT_CIRC: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * Math.sqrt(1 - Math.pow(x - 1, 2));
    },

    EASE_IN_OUT_CIRC: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return (
            begin +
            (end - begin) *
                (x < 0.5
                    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2)
        );
    },

    EASE_IN_BACK: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        const c1 = 1.70158;
        return begin + (end - begin) * (c1 * x * x * x - c1 * x * x);
    },

    EASE_OUT_BACK: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        const c1 = 1.70158;
        return (
            begin +
            (end - begin) *
                (1 + c1 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2))
        );
    },

    EASE_IN_OUT_BACK: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        const c1 = 1.70158;
        const c2 = c1 * 1.525;

        return (
            begin +
            (end - begin) *
                (x < 0.5
                    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) +
                          2) /
                      2)
        );
    },

    EASE_IN_ELASTIC: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        const c4 = (2 * Math.PI) / 3;

        return (
            begin +
            (end - begin) *
                (x === 0
                    ? 0
                    : x === 1
                    ? 1
                    : -Math.pow(2, 10 * x - 10) *
                      Math.sin((x * 10 - 10.75) * c4))
        );
    },

    EASE_OUT_ELASTIC: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        const c4 = (2 * Math.PI) / 3;

        return (
            begin +
            (end - begin) *
                (x === 0
                    ? 0
                    : x === 1
                    ? 1
                    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1)
        );
    },

    EASE_IN_OUT_ELASTIC: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        const c5 = (2 * Math.PI) / 4.5;

        return (
            begin +
            (end - begin) *
                (x === 0
                    ? 0
                    : x === 1
                    ? 1
                    : x < 0.5
                    ? -(
                          Math.pow(2, 20 * x - 10) *
                          Math.sin((20 * x - 11.125) * c5)
                      ) / 2
                    : (Math.pow(2, -20 * x + 10) *
                          Math.sin((20 * x - 11.125) * c5)) /
                          2 +
                      1)
        );
    },

    EASE_IN_BOUNCE: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * (1 - bounceOut(1 - x));
    },

    EASE_OUT_BOUNCE: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return begin + (end - begin) * bounceOut(x);
    },

    EASE_IN_OUT_BOUNCE: function (now_x, begin, end, max_x) {
        const x = now_x / max_x;
        return (
            begin +
            (end - begin) *
                (x < 0.5
                    ? (1 - bounceOut(1 - 2 * x)) / 2
                    : (1 + bounceOut(2 * x - 1)) / 2)
        );
    },
};

/**
 * zeppos-timer.js
 * @description An accurate timer for ZeppOS. 一个适用于ZeppOS的准确的计时器
 * @version 1.0.0
 * @date 2023/04/07
 * @author XiaomaiTX
 * @license MIT
 * https://github.com/XiaomaiTX/zeppos-timer
 *
 * */
import { Time } from "@zos/sensor";

class ZeppTimer {
    constructor(callback, interval) {
        this.callback = callback;
        this.interval = interval;
        this.timerId = null;
        this.startTime = null;
        this.nextTick = null;
        this.time = new Time();
        this.stopped = false;
    }

    start(delay = 0) {
        this.startTime = this.time.getTime() + delay;
        this.nextTick = this.startTime + this.interval;
        this.scheduleTick();
    }

    stop() {
        this.stopped = true;
        this.timerId && clearTimeout(this.timerId);
    }

    scheduleTick() {
        if (this.stopped) return;
        const currentTime = this.time.getTime();
        const delay = Math.max(0, this.nextTick - currentTime);
        this.timerId = setTimeout(() => {
            this.tick();
        }, delay);
    }

    tick() {
        const currentTime = this.time.getTime();

        // 计算误差，确保计时器的准确性
        const error = currentTime - this.nextTick;

        if (error > this.interval) {
            // 如果误差大于一个间隔时间，则将 nextTick 更新为当前时间
            this.nextTick = currentTime;
        } else {
            // 否则将 nextTick 加上一个间隔时间
            this.nextTick += this.interval;
        }

        // 调用回调函数
        this.callback();

        // 继续调度下一个 tick
        this.scheduleTick();
    }
}
