// smoothTimer.js 稳定计时器 用于解决Zepp OS timer计时器不准的问题
// @author CuberQAQ
// @date 2022/12/24
// Open Source Lisence: MIT <https://opensource.org/licenses/mit-license.php>

const SMOOTH_TIMER_TEST_CIRCLE = 1
const SMOOTH_TIMER_SAFE_TIME = 30
const hmTime = hmSensor.createSensor(hmSensor.id.TIME)


export class SmoothTimer {
  /**
  * Create a smooth timer.
  * 创建一个稳定的计时器
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
          if(this.mode == SmoothTimer.modes.MAX_LIMIT) {
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
 * Smooth Timer Mode 稳定计时器运行模式
 * 
 * DYNAMIC_SMOOTH: 动态稳定 Try to make total callback times smooth 尝试稳定总回调次数
 * 
 * MAX_LIMIT: 限制速度 Can't run faster then setting 在限定范围内运行
 */
SmoothTimer.modes = {
  DYNAMIC_SMOOTH: 1, // 动态稳定
  MAX_LIMIT: 2, // 限制速度
}

/**
  * Create a smooth timer.
  * 创建一个稳定的计时器
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