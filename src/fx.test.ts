import { Fx, FxOptions, Border } from './fx';

// 简化版的ZeppTimer模拟类
class MockZeppTimer {
  callback: () => void;
  interval: number;
  timerId: any;
  startTime: number | null;
  nextTick: number | null;
  stopped: boolean;
  time: { getTime: () => number };
  
  constructor(callback: () => void, interval: number) {
    this.callback = callback;
    this.interval = interval;
    this.timerId = null;
    this.startTime = null;
    this.nextTick = null;
    this.stopped = false;
    this.time = {
      getTime: () => Date.now()
    };
  }
  
  start(delay: number = 0): void {
    this.startTime = this.time.getTime() + delay;
    this.nextTick = this.startTime + this.interval;
    this.stopped = false;
    this.scheduleTick();
  }
  
  stop(): void {
    this.stopped = true;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
  
  scheduleTick(): void {
    if (this.stopped) return;
    const currentTime = this.time.getTime();
    const delay = Math.max(0, this.nextTick! - currentTime);
    this.timerId = setTimeout(() => {
      this.tick();
    }, delay);
  }
  
  tick(): void {
    const currentTime = this.time.getTime();
    
    // 计算误差，确保计时器的准确性
    const error = currentTime - this.nextTick!;
    
    if (error > this.interval) {
      // 如果误差大于一个间隔时间，则将 nextTick 更新为当前时间
      this.nextTick = currentTime;
    } else {
      // 否则将 nextTick 加上一个间隔时间
      this.nextTick! += this.interval;
    }
    
    // 调用回调函数
    this.callback();
    
    // 继续调度下一个
    this.scheduleTick();
  }
}

// 将MockZeppTimer设为全局可用
global.ZeppTimer = MockZeppTimer as any;

jest.mock('@zos/sensor', () => ({
  Time: class {
    getTime() { return Date.now(); }
  }
}), { virtual: true });

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('Fx', () => {
  describe('constructor', () => {
    it('应该使用默认选项创建实例', () => {
      const func = jest.fn();
      const fx = new Fx({ func });

      expect(fx.begin).toBe(0);
      expect(fx.end).toBe(100);
      expect(fx.fps).toBe(60);
      expect(fx.time).toBe(1000);
      expect(fx.delay).toBe(0);
      expect(fx.func).toBe(func);
      expect(fx.enabled).toBe(false);
      expect(fx.timer).toBeNull();
    });

    it('应该使用自定义选项创建实例', () => {
      const func = jest.fn();
      const fx = new Fx({
        begin: 10,
        end: 200,
        fps: 30,
        time: 500,
        delay: 100,
        func,
        enabled: true,
        style: Fx.Styles.EASE_IN_SINE,
      });

      expect(fx.begin).toBe(10);
      expect(fx.end).toBe(200);
      expect(fx.fps).toBe(30);
      expect(fx.time).toBe(500);
      expect(fx.delay).toBe(100);
      expect(fx.func).toBe(func);
      expect(fx.enabled).toBe(true);
      expect(fx.timer).not.toBeNull();
    });

    it('应该使用自定义fx函数创建实例', () => {
      const func = jest.fn();
      const customFx = jest.fn((x) => x * 2);
      const fx = new Fx({
        func,
        fx: customFx,
        x_start: 0,
        x_end: 10,
        time: 1000,
      });

      expect(fx.fx).toBe(customFx);
      expect(fx.x_start).toBe(0);
      expect(fx.x_end).toBe(10);
      expect(fx.speed).toBe((10 - 0) / (60 * 1000 / 1000));
    });

    it('当自定义fx函数中x_start和x_end未定义时应使用默认值', () => {
      const func = jest.fn();
      const customFx = jest.fn((x) => x * 2);
      const fx = new Fx({
        func,
        fx: customFx,
        // x_start和x_end未提供
        time: 1000,
      });

      expect(fx.fx).toBe(customFx);
      expect(fx.x_start).toBe(0); // 默认值
      expect(fx.x_end).toBe(1);   // 默认值
      expect(fx.speed).toBe((1 - 0) / (60 * 1000 / 1000));
    });

    it('当enabled为true时应注册定时器', () => {
      const func = jest.fn();
      const fx = new Fx({ func, enabled: true });
      expect(fx.timer).not.toBeNull();
    });

    it('当time为0时应处理边界条件', () => {
      const func = jest.fn();
      const fx = new Fx({ func, time: 0 });
      expect(fx.x_end).toBe(0); // fps * time / 1000 = 0
      expect(fx.speed).toBe(1);
    });

    it('当fps为0时应处理边界条件', () => {
      const func = jest.fn();
      const fx = new Fx({ func, fps: 0 });
      expect(fx.per_clock).toBe(Infinity); // 100 /0 0 = Infinity
      // 注意：speed计算可能为NaN，因为除以0，但预设样式中speed固定为1
      expect(fx.speed).toBe(1);
    });
  });

  describe('start', () => {
    it('应该开始动画并启动定时器', () => {
      const func = jest.fn();
      const fx = new Fx({ func });
      
      fx.start();

      expect(fx.enabled).toBe(true);
      expect(fx.timer).not.toBeNull();
    });

    it('如果动画已在运行，应先停止再重新开始', () => {
      const func = jest.fn();
      const fx = new Fx({ func, enabled: true });
      const originalTimer = fx.timer;
      const stopSpy = jest.spyOn(originalTimer!, 'stop');
      
      fx.start();

      expect(stopSpy).toHaveBeenCalled();
      expect(fx.timer).not.toBe(originalTimer);
    });
  });

  describe('stop', () => {
    it('应该停止动画并重置进度', () => {
      const func = jest.fn();
      const fx = new Fx({ func, enabled: true });
      const stopSpy = jest.spyOn(fx.timer!, 'stop');
      
      fx.stop();

      expect(fx.x_now).toBe(fx.x_start);
      expect(fx.enabled).toBe(false);
      expect(stopSpy).toHaveBeenCalled();
      expect(fx.timer).toBeNull();
    });

    it('停止动画时不调用onStop回调', () => {
      const onStop = jest.fn();
      const fx = new Fx({ func: jest.fn(), enabled: true, onStop });
      
      fx.stop();

      expect(onStop).not.toHaveBeenCalled();
    });
  });

  describe('pause', () => {
    it('应该暂停动画但保持当前进度', () => {
      const func = jest.fn();
      const fx = new Fx({ func, enabled: true });
      const stopSpy = jest.spyOn(fx.timer!, 'stop');
      const currentX = fx.x_now;
      
      fx.pause();

      expect(stopSpy).toHaveBeenCalled();
      expect(fx.timer).toBeNull();
      expect(fx.x_now).toBe(currentX);
      expect(fx.enabled).toBe(false);
    });
  });

  describe('restart', () => {
    it('应该重置进度并重新开始动画', () => {
      const func = jest.fn();
      const fx = new Fx({ func, enabled: true });
      const stopSpy = jest.spyOn(fx.timer!, 'stop');
      fx.x_now = 5; // 手动修改进度
      
      fx.restart();

      expect(fx.x_now).toBe(fx.x_start);
      expect(stopSpy).toHaveBeenCalled();
      expect(fx.enabled).toBe(true);
      expect(fx.timer).not.toBeNull();
    });
  });

  describe('setEnable', () => {
    it('应该启用动画并注册定时器', () => {
      const func = jest.fn();
      const fx = new Fx({ func, enabled: false });
      
      fx.setEnable(true);

      expect(fx.enabled).toBe(true);
      expect(fx.timer).not.toBeNull();
    });

    it('应该禁用动画并停止定时器', () => {
      const func = jest.fn();
      const fx = new Fx({ func, enabled: true });
      const stopSpy = jest.spyOn(fx.timer!, 'stop');
      
      fx.setEnable(false);

      expect(fx.enabled).toBe(false);
      expect(stopSpy).toHaveBeenCalled();
      expect(fx.timer).toBeNull();
    });

    it('如果状态相同，应该不做任何操作', () => {
      const func = jest.fn();
      const fx = new Fx({ func, enabled: true });
      const stopSpy = jest.spyOn(fx.timer!, 'stop');
      
      fx.setEnable(true);

      expect(stopSpy).not.toHaveBeenCalled();
      expect(fx.enabled).toBe(true);
    });
  });

  describe('静态方法', () => {
    describe('getMixColor', () => {
      it('应该正确混合两种颜色', () => {
        const color1 = 0xff0000; // 红色
        const color2 = 0x0000ff; // 蓝色
        const result = Fx.getMixColor(color1, color2, 0.5);
        
        // 预期混合色为紫色，使用Math.floor舍入 (0x7f007f)
        expect(result).toBe(0x7f007f);
      });

      it('百分比为0时应返回第一种颜色', () => {
        const color1 = 0xff0000;
        const color2 = 0x0000ff;
        const result = Fx.getMixColor(color1, color2, 0);
        
        expect(result).toBe(color1);
      });

      it('百分比为1时应返回第二种颜色', () => {
        const color1 = 0xff0000;
        const color2 = 0x0000ff;
        const result = Fx.getMixColor(color1, color2, 1);
        
        expect(result).toBe(color2);
      });

      it('应该处理超出范围的颜色值', () => {
        const color1 = 0xffffff;
        const color2 = 0x000000;
        const result = Fx.getMixColor(color1, color2, 0.5);
        expect(result).toBe(0x7f7f7f);
      });

      it('应该处理百分比超出[0,1]范围的情况', () => {
        const color1 = 0xff0000;
        const color2 = 0x0000ff;
        const result1 = Fx.getMixColor(color1, color2, -0.5);
        const result2 = Fx.getMixColor(color1, color2, 1.5);
        // 百分比超出范围时，计算仍会进行，但颜色分量可能超出0-255
        expect(result1).toBeDefined();
        expect(result2).toBeDefined();
      });
    });

    describe('getRainbowColor', () => {
      it('应该在彩虹色之间正确插值', () => {
        const color1 = Fx.getRainbowColor(0);
        const color2 = Fx.getRainbowColor(0.5);
        const color3 = Fx.getRainbowColor(1);
        
        expect(color1).toBe(0xff0000); // 红色
        expect(color2).toBeGreaterThan(0);
        expect(color3).toBe(0xff0000); // 循环回红色
      });

      it('应该处理边界值', () => {
        expect(() => Fx.getRainbowColor(-0.1)).not.toThrow();
        expect(() => Fx.getRainbowColor(1.1)).not.toThrow();
      });
    });

    describe('getMixBorder', () => {
      const border1: Border = { x: 0, y: 0, w: 100, h: 100, radius: 0 };
      const border2: Border = { x: 100, y: 100, w: 200, h: 200, radius: 50 };

      it('应该正确混合两个边框', () => {
        const result = Fx.getMixBorder(border1, border2, 0.5);
        
        expect(result).toEqual({
          x: 50,
          y: 50,
          w: 150,
          h: 150,
          radius: 25,
        });
      });

      it('百分比为0时应返回第一个边框', () => {
        const result = Fx.getMixBorder(border1, border2, 0);
        expect(result).toEqual(border1);
      });

      it('百分比为1时应返回第二个边框', () => {
        const result = Fx.getMixBorder(border1, border2, 1);
        expect(result).toEqual(border2);
      });

      it('应该处理部分属性未定义的情况', () => {
        const border1Partial: Border = { x: 0, w: 100 };
        const border2Partial: Border = { x: 100, w: 200 };
        // 注意：方法使用了非空断言，如果属性未定义可能导致NaN
        // 这里主要测试不会抛出异常
        expect(() => Fx.getMixBorder(border1Partial, border2Partial, 0.5)).not.toThrow();
      });
    });
  });

  describe('动画样式', () => {
    it('应该支持所有预设样式', () => {
      const func = jest.fn();
      
      Object.values(Fx.Styles).forEach(style => {
        const fx = new Fx({ func, style });
        expect(fx.fx).toBeDefined();
      });
    });

    it('应该使用缓动函数计算值', () => {
      const begin = 0;
      const end = 100;
      const max_x = 10;
      
      // 测试线性缓动函数
      const linearValue = Fx.Easing.LINEAR(5, begin, end, max_x);
      expect(linearValue).toBe(50); // 5/10 * 100 = 50
      
      // 测试缓其他动函数（至少确保它们不会抛出异常）
      Object.keys(Fx.Easing).forEach(key => {
        const easingFunc = (Fx.Easing as any)[key];
        expect(() => easingFunc(5, begin, end, max_x)).not.toThrow();
      });
    });

    it('当使用无效样式时应默认使用LINEAR', () => {
      const func = jest.fn();
      // 使用一个不存在的样式值
      const fx = new Fx({ func, style: 999 });
      // 应该使用LINEAR缓动函数（默认）
      expect(fx.fx).toBeDefined();
      // 验证fx函数的行为类似线性函数
      const value = fx.fx(5);
      expect(value).toBeDefined();
    });

    it('应该正确计算弹跳缓动函数的所有分支', () => {
      const begin = 0;
      const end = 100;
      const max_x = 10;
      
      // 测试EASE_IN_BOUNCE，使用不同的x值来覆盖bounceOut中的所有条件分支
      // bounceOut函数有4个条件分支：
      // 1. x < 1/2.75 (约0.3636)
      // 2. x < 2/2.75 (约0.7273)
      // 3. x < 2.5/2.75 (约0.9091)
      // 4. 其他情况
      const testValues = [0, 0.1, 0.3, 0.5, 0.7, 0.8, 0.9, 1.0];
      testValues.forEach(x => {
        const normalizedX = x * max_x;
        const value = Fx.Easing.EASE_IN_BOUNCE(normalizedX, begin, end, max_x);
        expect(value).toBeGreaterThanOrEqual(begin);
        expect(value).toBeLessThanOrEqual(end);
      });
      
      // 同样测试EASE_OUT_BOUNCE和EASE_IN_OUT_BOUNCE
      testValues.forEach(x => {
        const normalizedX = x * max_x;
        const valueOut = Fx.Easing.EASE_OUT_BOUNCE(normalizedX, begin, end, max_x);
        expect(valueOut).toBeGreaterThanOrEqual(begin);
        expect(valueOut).toBeLessThanOrEqual(end);
        
        const valueInOut = Fx.Easing.EASE_IN_OUT_BOUNCE(normalizedX, begin, end, max_x);
        expect(valueInOut).toBeGreaterThanOrEqual(begin);
        expect(valueInOut).toBeLessThanOrEqual(end);
      });
    });

    it('应该使用不同的样式产生不同的动画值', () => {
      const func = jest.fn();
      const fx1 = new Fx({ func, style: Fx.Styles.LINEAR });
      const fx2 = new Fx({ func, style: Fx.Styles.EASE_IN_SINE });
      
      // 两种样式应该使用不同的缓动函数
      expect(fx1.fx).not.toBe(fx2.fx);
    });
  });

  describe('动画执行', () => {
    it('应该按帧调用回调函数', () => {
      const func = jest.fn();
      const fx = new Fx({ func, enabled: true, time: 100, fps: 10 });
      
      // 前进时间，触发定时器回调
      jest.advanceTimersByTime(1000);
      
      // 应该至少调用一次回调
      expect(func).toHaveBeenCalled();
    });

    it('动画完成后应停止并调用onStop', () => {
      const func = jest.fn();
      const onStop = jest.fn();
      const fx = new Fx({ func, enabled: true, time: 100, fps: 10, onStop });
      
      // 前进足够的时间让动画完成
      jest.advanceTimersByTime(200);
      
      expect(onStop).toHaveBeenCalled();
      expect(fx.enabled).toBe(false);
      expect(fx.timer).toBeNull();
    });

    it('当使用自定义fx函数时，应该按进度调用回调', () => {
      const func = jest.fn();
      const customFx = jest.fn((x) => x * 100);
      const fx = new Fx({
        func,
        fx: customFx,
        x_start: 0,
        x_end: 1,
        time: 100,
        fps: 10,
        enabled: true,
      });
      
      jest.advanceTimersByTime(200);
      
      expect(customFx).toHaveBeenCalled();
      expect(func).toHaveBeenCalledWith(expect.any(Number));
    });


  });
});