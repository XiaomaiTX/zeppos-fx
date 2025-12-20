<a name="readme-top"></a>

![npm version](https://img.shields.io/npm/v/@x1a0ma17x/zeppos-fx)
![minified size](https://img.shields.io/bundlephobia/min/@x1a0ma17x/zeppos-fx)
![license](https://img.shields.io/npm/l/@x1a0ma17x/zeppos-fx)

<br />
<div align="center">
  <a href="https://github.com/XiaomaiTX/zeppos-fx">
    <img src="fx.js.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ZeppOS Fx</h3>

  <p align="center">
    一个用于在ZeppOS中提供简单动画的库
    <br />
    <a href="https://github.com/XiaomaiTX/zeppos-fx/blob/master/README.md"><strong>English</strong></a> | 中文文档
  </p>
</div>

这是一个灵活的、优雅、高性能的适用于 ZeppOS 的动画库

你可以用非常简单的方式来为现有的UI控件添加各种优雅的动画效果

为什么选择fx.js呢:

- ✅ 高性能的非线性动画计算
- ✅ 丰富的动画预设
- ✅ 完整的状态控制
- ✅ 一切只需要引入ZeppOS Fx即可

~~在 ZeppOS 1.0中，官方并没有提供控件动画效果的接口，我们认为开发者可以通过这个fx库来为 ZeppOS 1.0 小程序添加有意思的动画（比如给小米手环7写小程序）~~

## 🚀 快速开始

### 📦 安装

```bash
pnpm install @x1a0ma17x/zeppos-fx
```

## 如何使用

可以参考这个简单的示例，如果正常运行，文本控件的x值应该由100变为200，即向右进行非线性移动

```js
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
                text.setProperty(hmUI.prop.X, 300 * result);
            },
        });

        // 状态控制
        fx.start();
        // fx.pause();
        // fx.stop();
    },
});
```

## Roadmap

- [ ] 动态兼容 ZeppOS API
- [x] 添加状态管理
- [x] 添加一些基本的动画预设
- [x] 添加颜色混合动画函数
- [x] 添加更多的预设
- [x] 为README编写多语言适配
  - [x] English
  - [x] 中文

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
