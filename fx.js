/**
 * fx.js
 * @description A library for providing simple animations in ZeppOS. 一个用于在ZeppOS中提供简单动画的库
 * @version 1.0.1
 * @date 2023/03/07
 * @author CuberQAQ XiaomaiTX
 * @license MIT
 * https://github.com/XiaomaiTX/zppos-fx
 *
 * @class Fx Animations
 * Provides two ways to use the preset and not to use the preset. 提供了使用预设和不使用预设两种方式
 * A total of 31 presets are currently available, see @Fx.Style. 目前提供的预设共31种，详见下面的Fx.Style
 * It's too much of a hassle not to use presets. 不使用预设太麻烦了 不如不用
 * @example let fx = new Fx({params})
 * let fx = new Fx({
 *   begin: 100, // Initial value of function. 初始函数值
 *   end: 200,   // Target value of function. 目标函数值
 *   fps: 60,    // FPS. 帧率
 *   time: 1,    // Total during time (s). 总时长(秒)
 *   style: Fx.Styles.EASE_IN_OUT_QUAD, // Types of animation presets used, seeing @Fx.Style. 预设类型 见下面的Fx.Style
 *   onStop() {console.log("anim stop")}, // Callback function at the end of the animation. 动画结束后的回调函数
 *
 *   // Callback function for each frame, the parameter is the current function value, the value range is [begin, end]
 *   // 每一帧的回调函数，参数为当前函数值，取值范围为[begin, end]
 *   func: result => text.setProperty(hmUI.prop.X, result)
 * })
 * fx.restart() // Replay animation can be called multiple times. 播放动画 可以重复多次调用
 *
 * @function getMixColor()
 * It also provides a @function getMixColor() designed for color gradients, which can get the middle color of two colors.
 * 还提供了一个专为颜色渐变设计的函数getMixColor，可以获取两个颜色的中间色
 * @example ```js
 * let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
 *   x: 0,
 *   y: 0,
 *   w: 50,
 *   h: 100,
 *   radius: 10,
 *   color: 0xff3232,
 * });
 * let fx = new Fx({
 *   begin: 0, // 初始函数值
 *   end: 1, // 结束函数值
 *   fps: 60, // 帧率
 *   time: 1, // 总时长(秒)
 *   style: Fx.Styles.EASE_IN_OUT_QUAD, // 预设类型 见注释第7-9行
 *   onStop() {
 *     console.log("anim stop");
 *   }, // 动画结束后的回调函数
 *   // 每一帧的回调函数，参数为当前函数值，取值范围为[begin, end]
 *   func: (result) => {
 *     rect.setProperty(
 *       hmUI.prop.COLOR,
 *       Fx.getMixColor(0xff3232, 0x3232ff, result)
 *     );
 *     rect.setProperty(hmUI.prop.MORE, {
 *       ...Fx.getMixBorder(
 *         {
 *           x: 0,
 *           y: 0,
 *           w: 50,
 *           h: 100,
 *           radius: 10,
 *         },
 *         {
 *           x: 150,
 *           y: 200,
 *           w: 200,
 *           h: 250,
 *           radius: 75
 *         },
 *         result
 *       ),
 *     });
 *   },
 *   // useSmoothTimer: false // 若不需要稳定的计时器可取消注释
 * });
 * fx.restart(); // 播放动画 可以重复多次调用
 * ```
 * 
 * 
 */


const bounceOut = function (x) {
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
};

export class Fx {
  /**
   * @class Fx
   *
   * @constructor 构造函数
   *
   * @description Provide animations method. 提供动画的方法，使用例子上述已说明
   *
   * @param {number} delay 延迟执行
   * @param {number} begin 初始函数值
   * @param {number} end 目标函数值
   * @param {number} (已弃用) x_start 函数开始的x坐标
   * @param {number} (已弃用) x_end 函数结束的x坐标
   * @param {number} time 执行总时间
   * @param {*} (已弃用) fx x => y 动画函数
   * @param {*} func 执行的函数，每次的y值会作为第一个参数传给func
   * @param {number} fps 动画帧率
   * @param {*} enable
   * @param {string} style 内置预设类型
   * @param {*} onStop 结束后执行的函数
   */
  constructor({
    delay,
    begin,
    end,
    x_start,
    x_end,
    time,
    fx,
    func,
    fps,
    enable,
    style,
    onStop,
    outTimer,
    useSmoothTimer,
  }) {
    if (fx) {
      // 不使用预设
      this.x_start = x_start * 1.0;
      this.x_end = x_end * 1.0;
      this.fx = fx;
      this.speed = (x_end - x_start) / (time * fps);
    } else {
      // 使用预设
      this.begin = begin;
      this.end = end;
      this.fps = fps;
      this.time = time;
      switch (style) {
        case Fx.Styles.LINEAR:
          this.fx = (x) => fx_inside.LINEAR(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_SINE:
          this.fx = (x) => fx_inside.EASE_IN_SINE(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_OUT_SINE:
          this.fx = (x) => fx_inside.EASE_OUT_SINE(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_OUT_SINE:
          this.fx = (x) =>
            fx_inside.EASE_IN_OUT_SINE(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_QUAD:
          this.fx = (x) => fx_inside.EASE_IN_QUAD(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_OUT_QUAD:
          this.fx = (x) => fx_inside.EASE_OUT_QUAD(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_OUT_QUAD:
          this.fx = (x) =>
            fx_inside.EASE_IN_OUT_QUAD(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_CUBIC:
          this.fx = (x) => fx_inside.EASE_IN_CUBIC(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_OUT_CUBIC:
          this.fx = (x) => fx_inside.EASE_OUT_CUBIC(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_OUT_CUBIC:
          this.fx = (x) =>
            fx_inside.EASE_IN_OUT_CUBIC(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_QUART:
          this.fx = (x) => fx_inside.EASE_IN_QUART(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_OUT_QUART:
          this.fx = (x) => fx_inside.EASE_OUT_QUART(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_OUT_QUART:
          this.fx = (x) =>
            fx_inside.EASE_IN_OUT_QUART(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_QUINT:
          this.fx = (x) => fx_inside.EASE_IN_QUINT(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_OUT_QUINT:
          this.fx = (x) => fx_inside.EASE_OUT_QUINT(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_OUT_QUINT:
          this.fx = (x) =>
            fx_inside.EASE_IN_OUT_QUINT(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_EXPO:
          this.fx = (x) => fx_inside.EASE_IN_EXPO(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_OUT_EXPO:
          this.fx = (x) => fx_inside.EASE_OUT_EXPO(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_OUT_EXPO:
          this.fx = (x) =>
            fx_inside.EASE_IN_OUT_EXPO(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_CIRC:
          this.fx = (x) => fx_inside.EASE_IN_CIRC(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_OUT_CIRC:
          this.fx = (x) => fx_inside.EASE_OUT_CIRC(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_OUT_CIRC:
          this.fx = (x) =>
            fx_inside.EASE_IN_OUT_CIRC(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_BACK:
          this.fx = (x) => fx_inside.EASE_IN_BACK(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_OUT_BACK:
          this.fx = (x) => fx_inside.EASE_OUT_BACK(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_OUT_BACK:
          this.fx = (x) =>
            fx_inside.EASE_IN_OUT_BACK(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_ELASTIC:
          this.fx = (x) => fx_inside.EASE_IN_ELASTIC(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_OUT_ELASTIC:
          this.fx = (x) =>
            fx_inside.EASE_OUT_ELASTIC(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_OUT_ELASTIC:
          this.fx = (x) =>
            fx_inside.EASE_IN_OUT_ELASTIC(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_BOUNCE:
          this.fx = (x) => fx_inside.EASE_IN_BOUNCE(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_OUT_BOUNCE:
          this.fx = (x) => fx_inside.EASE_OUT_BOUNCE(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
        case Fx.Styles.EASE_IN_OUT_BOUNCE:
          this.fx = (x) =>
            fx_inside.EASE_IN_OUT_BOUNCE(x, begin, end, fps * time);
          this.x_start = 0;
          this.x_end = fps * time;
          this.speed = 1;
          break;
      }
    }
    this.per_clock = 1000 / fps;
    this.delay = delay;
    this.func = func;
    this.x_now = this.x_start;
    this.onStop = onStop;
    this._enable = enable | false;
    this._timer = null;
    this._outTimer = outTimer | false;
    this._useSmoothTimer = useSmoothTimer | true;
    this.setEnable(this._enable);
  }
  restart() {
    this.x_now = this.x_start;
    this.setEnable(false);
    this.setEnable(true);
  }
  setEnable(enable) {
    this._enable = enable;
    if (enable) {
      if (!this._outTimer) {
        this.registerTimer();
      }
    } else {
      if (this._timer) {
        timer.stopTimer(this._timer);
        this._timer = null;
      }
    }
  }
  step() {
    if (this._outTimer) {
      if (this._enable) {
        this.func(this.fx((this.x_now += this.speed)));
        if (this.x_now > this.x_end) {
          //防止不到终点
          this.func(this.fx(this.x_end));
          //执行onStop
          if (this.onStop != undefined) {
            this.onStop();
          }
          this._enable = false;
        }
      }
    }
  }
  registerTimer() {
    let callback = (option) => {
      this.func(this.fx((this.x_now += this.speed)));
      if (this.x_now > this.x_end) {
        //防止不到终点
        this.func(this.fx(this.x_end));
        //执行onStop
        if (this.onStop != undefined) {
          this.onStop();
        }
        //停止timer
        this._useSmoothTimer
          ? stopSmoothTimer(this._timer)
          : timer.stopTimer(this._timer);
        this._timer = null;
        this._enable = false;
      }
    };
    this._timer = this._useSmoothTimer
      ? createSmoothTimer(
        this.delay ? this.delay : 0,
        this.per_clock,
        callback,
        {},
        SmoothTimer.modes.DYNAMIC_SMOOTH
      )
      : timer.createTimer(
        this.delay ? this.delay : 0,
        this.per_clock,
        callback,
        {}
      );
  }
  /**
     * @function getMixColor()
     * @description Get the middle color of two colors.
     * @param {number} color 1. 初始颜色1 (6位十六进制)
     * @param {number} color 2. 初始颜色2 (6位十六进制)
     * @param {number} percentage (range [0,1], the smaller the closer to color0). 混合百分比(范围[0,1]，越小越接近color0)
     */
  static getMixColor(color1, color2, percentage) {
    let r0 = color1 & 0xff0000,
      g0 = color1 & 0x00ff00,
      b0 = color1 & 0x0000ff;
    let r1 = color2 & 0xff0000,
      g1 = color2 & 0x00ff00,
      b1 = color2 & 0x0000ff;
    return (
      (Math.floor((r1 - r0) * percentage + r0) & 0xff0000) +
      (Math.floor((g1 - g0) * percentage + g0) & 0x00ff00) +
      (Math.floor((b1 - b0) * percentage + b0) & 0x0000ff)
    );
  }
  /**
   * @description Get the mixture of to border(x, y, w, h, radius) 获取两个边框(x,y,w,h)的混合值
   * @param {{x?:number, y?:number, w?:number, h?:number, radius?:number}} border1 边框1 不一定需要给四个参数
   * @param {{x?:number, y?:number, w?:number, h?:number, radius?:number}} border2 边框2 不一定需要给四个参数
   * @param {number} percentage 混合百分比 取值[0,1] 若取0则为border1 取1则为border2
   * @returns {x?:number, y?:number, w?:number, h?:number, radius?:number} 混合后的边框
   */
  static getMixBorder(border1, border2, percentage) {
    return {
      x: border1.x + (border2.x - border1.x) * percentage,
      y: border1.y + (border2.y - border1.y) * percentage,
      w: border1.w + (border2.w - border1.w) * percentage,
      h: border1.h + (border2.h - border1.h) * percentage,
      radius: border1.radius + (border2.radius - border1.radius) * percentage,
    };
  }
}
Fx.Styles = {
  /**
   * List of preset styles
   * @example EXAMPLE: indexNumber,
   */
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
const fx_inside = {
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
      return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
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
      return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
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
      return 1 + 1.70158 + 1 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2);
    }
    return begin + (end - begin) * math_func(now_x / max_x);
  },
  EASE_IN_OUT_BACK: function (now_x, begin, end, max_x) {
    function math_func(x) {
      return x < 0.5
        ? (Math.pow(2 * x, 2) * ((1.70158 * 1.525 + 1) * 2 * x - 1.70158 * 1.525)) /
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
          : -Math.pow(2, 10 * x - 10) * sin(((x * 10 - 10.75) * (2 * Math.PI)) / 3);
    }
    return begin + (end - begin) * math_func(now_x / max_x);
  },
  EASE_OUT_ELASTIC: function (now_x, begin, end, max_x) {
    function math_func(x) {
      return x === 0
        ? 0
        : x === 1
          ? 1
          : Math.pow(2, -10 * x) * sin(((x * 10 - 0.75) * (2 * Math.PI)) / 3) + 1;
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
            ? -(Math.pow(2, 20 * x - 10) * sin(((20 * x - 11.125) * (2 * Math.PI)) / 4.5)) / 2
            : (Math.pow(2, -20 * x + 10) * sin(((20 * x - 11.125) * (2 * Math.PI)) / 4.5)) /
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



const SMOOTH_TIMER_TEST_CIRCLE = 1
const hmTime = hmSensor.createSensor(hmSensor.id.TIME)

/** 
 * @description SmoothTimer 稳定计时器 用于解决Zepp OS timer计时器不准的问题
 * @author CuberQAQ
 * @date 2022/12/24 于2023/3/8合并至fx.js
 */
export class SmoothTimer {
  /**
  * @function constructor
  * @description Create a smooth timer. 创建一个稳定的计时器
  * @param {number} delay Time to start. 延迟执行的时间。
  * @param {number} circle The Loop Circle(ms). 循环周期(单位:毫秒)。
  * @param {(option: any) => void} func Function Callback. 回调函数。
  * @param {*} option As the param when call the Callback Function. 回调函数的参数
  * @param {SmoothTimer.modes} mode The mode of smoothTimer. 稳定计时器的模式 @see SmoothTimer.modes
  * @returns {SmoothTimer} Smooth Timer Object. Will be used when delete timer. 稳定计时器实例，删除计时器时用到
  * @author CuberQAQ
  */
  constructor(delay, circle, func, option, mode) {
    this._lastUtc_ = hmTime.utc + delay - circle
    //if (frequency != undefined) { circle = Math.round(1000 / frequency) }
    if (circle == undefined)
      return null
    this.mode = mode || SmoothTimer.modes.DYNAMIC_SMOOTH
    this._circle_ = circle
    this._hmTimer_ = timer.createTimer(
      0,
      SMOOTH_TIMER_TEST_CIRCLE,
      param => {
        // 检测是否到达指定时间
        if (hmTime.utc - this._lastUtc_ >= circle) { // 到达并执行
          if (this.mode == SmoothTimer.modes.MAX_LIMIT) {
            this._lastUtc_ = hmTime.utc - 0.75
          }
          else if (this.mode == SmoothTimer.modes.DYNAMIC_SMOOTH) {
            this._lastUtc_ += circle // 更新上一次执行的时间戳
          }

          func(param) // 执行
        }
        // // 检测是否到达指定时间
        // while(hmTime.utc - this._lastUtc_ >= circle + SMOOTH_TIMER_SAFE_TIME) { // 到达并执行
        //   this._lastUtc_ += circle // 更新上一次执行的时间戳
        //   func(param) // 执行
        // }
      },
      option
    )
  }
}

/**
 * @description Smooth Timer Mode 稳定计时器运行模式
 * @property {SmoothTimer.modes} DYNAMIC_SMOOTH 动态稳定 Try to make total callback times smooth 尝试稳定总回调次数
 * @property {SmoothTimer.modes} MAX_LIMIT: 限制速度 Can't run faster then setting 在限定范围内运行
 */
SmoothTimer.modes = {
  DYNAMIC_SMOOTH: 1, // 动态稳定
  MAX_LIMIT: 2, // 限制速度
}

/**
  * Create a smooth timer.
  * 创建一个稳定的计时器(若省略mode则用法与Zepp的timer.createTimer用法相同)
  * @param {number} delay Time to start. 延迟执行的时间。
  * @param {number} circle The Loop Circle(ms). 循环周期(单位:毫秒)。
  * @param {(option: any) => void} func Function Callback. 回调函数。
  * @param {*} option As the param when call the Callback Function. 回调函数的参数
  * @param {SmoothTimer.modes|undefined} mode The mode of smoothTimer. 稳定计时器的模式 @see SmoothTimer.modes
  * @returns {SmoothTimer} Smooth Timer Object. Will be used when delete timer. 稳定计时器实例，删除计时器时用到
  * @author CuberQAQ
  */
export function createSmoothTimer(delay, circle, func, option, mode) {
  return new SmoothTimer(delay, circle, func, option, mode)
}

/**
 * Delete a smooth timer.
 * 删除已启用的稳定计时器 
 * @param {SmoothTimer} instance Smooth Timer Instance. 已启用的SmoothTimer实例
 * @returns {boolean} If successfully stop. 是否成功删除
 */
export function stopSmoothTimer(instance) {
  if (instance._hmTimer_) { timer.stopTimer(instance._hmTimer_); return true }
  return false
}