import * as hmUI from "@zos/ui";
import { Fx } from "@x1a0ma17x/zeppos-fx";

Page({
    build() {
        const text = hmUI.createWidget(hmUI.widget.TEXT, {
            // 创建一个简单的 TEXT 控件
            x: 0,
            y: 120,
            w: 288,
            h: 46,
            color: 0xffffff,
            text_size: 36,
            align_h: hmUI.align.CENTER_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: "HELLO ZEPPOS",
        });

        const fx = new Fx({
            delay: 0, // 延迟执行的时间
            begin: 0, // 初始函数值
            end: 1, // 结束函数值
            fps: 60, // 帧率
            time: 1, // 总时长(秒)
            style: Fx.Styles.EASE_IN_OUT_QUAD, // 预设类型
            enabled: true, // 是否默认启用（即创建Fx实例时自动启动）
            onStop() {
                // 动画结束后的回调函数
                console.log("anim stop");
            },
            func: (result) => {
                // 每一帧的回调函数，参数为当前函数值，取值范围为[begin, end]
                text.setProperty(hmUI.prop.MORE, {
                    x: 300 * result,
                });
            },
        });

        // 状态控制
        fx.start();
        // fx.pause();
        // fx.stop();
    },
});
