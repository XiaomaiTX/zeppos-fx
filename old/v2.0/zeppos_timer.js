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

export class ZeppTimer {
    constructor(callback, interval) {
        this.callback = callback;
        this.interval = interval;
        this.timerId = null;
        this.startTime = null;
        this.nextTick = null;
        this.time = new Time();
    }

    start(delay = 0) {
        this.startTime = this.time.getTime() + delay;
        this.nextTick = this.startTime + this.interval;
        this.scheduleTick();
    }

    stop() {
        clearTimeout(this.timerId);
    }

    scheduleTick() {
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
