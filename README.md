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
    A library for providing simple animations in ZeppOS. 
    <br />
    English | <a href="https://github.com/XiaomaiTX/zeppos-fx/blob/master/README_zh-CN.md"><strong>中文文档</strong></a>
  </p>
</div>

This is a flexible, elegant, and high-performance animation library for ZeppOS.

You can effortlessly add various elegant animation effects to existing UI controls.

Why choose fx.js:

- ✅ High-performance non-linear animation calculations

- ✅ Extensive animation presets

- ✅ Complete state control

- ✅ Simply import ZeppOS Fx to implement

~~In ZeppOS 1.0, the official platform does not provide interfaces for control animations. We believe developers can use this fx library to add engaging animations to ZeppOS 1.0 mini-programs (e.g., developing mini-programs for the Xiaomi Mi Band 7)~~

## 🚀 Quick Start

### 📦 Installation

```bash
pnpm install @x1a0ma17x/zeppos-fx
```

## Usage Guide

Refer to this simple example: If executed correctly, the text control's x-value should transition from 100 to 200, indicating a nonlinear movement to the right

```js
import * as hmUI from "@zos/ui";
import { Fx } from "@x1a0ma17x/zeppos-fx";

Page({
    build() {
        const text = hmUI.createWidget(hmUI.widget.TEXT, {
            // Create a simple TEXT Widget
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
            delay: 0, // Delay before execution (in seconds)
            begin: 0, // Initial function value
            end: 1, // Final function value
            fps: 60, // Frame rate (frames per second)
            time: 1, // Total duration (in seconds)
            style: Fx.Styles.EASE_IN_OUT_QUAD, // Preset animation style
            enabled: true, // Whether enabled by default (i.e., animation starts automatically when Fx instance is created)
            onStop() {
                // Callback function after animation ends
                console.log("anim stop");
            },
            func: (result) => {
                // Callback function for each frame, with the current function value (range: [begin, end])
                text.setProperty(hmUI.prop.X, 300 * result);
            },
        });

        // State control
        fx.start();
        // fx.pause();
        // fx.stop();
    },
});
```

## Roadmap

- [ ] Dynamic compatibility with ZeppOS API
- [x] Add state management
- [x] Add basic animation presets
- [x] Add color blending animation functions
- [x] Increase preset options
- [x] Implement multilingual support for README
  - [x] English
  - [x] Chinese

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

Distributed under the MIT License. See `LICENSE.txt` for more information.
