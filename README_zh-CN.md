<a name="readme-top"></a>
# 在写了，别急

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/XiaomaiTX/zeppos-fx">
    <img src="fx.js.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">fx.js</h3>

  <p align="center">
    一个用于在ZeppOS中提供简单动画的库
    <br />
    <a href="https://github.com/XiaomaiTX/zeppos-fx/blob/master/README.md"><strong>English Docu »</strong></a>
    <br />
    <br />
    <a href="https://github.com/XiaomaiTX/zeppos-fx/releases">下载稳定版</a>
    ·
    <a href="https://github.com/XiaomaiTX/zeppos-fx/issues">反馈Bug</a>
    ·
    <a href="https://github.com/XiaomaiTX/zeppos-fx/issues">提交新建议</a>
  </p>
</div>

<details>
  <summary>目录</summary>
  <ol>
    <li>
      <a href="#about-the-project">关于 fx.js</a>
    </li>
    <li>
      <a href="#getting-started">快速开始</a>
      <ul>
        <li><a href="#prerequisites">前期准备</a></li>
        <li><a href="#installation">安装</a></li>
      </ul>
    </li>
    <li><a href="#usage">如何使用</a></li>
    <li><a href="#roadmap">TODO</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">开源协议</a></li>
    <li><a href="#contact">联系我们</a></li>
  </ol>
</details>


## 关于 fx.js

这是一个一个用于在ZeppOS中提供简单动画的库
你可以用非常简单的方式来为现有的UI控件添加各种动画效果

为什么选择fx.js呢:

- 在 ZeppOS 1.0中，官方并没有提供控件动画效果的接口，我们认为开发者可以通过这个fx库来为 ZeppOS 1.0 小程序添加有意思的动画（比如给小米手环7写小程序）
- 为了方便开发者快速接入现有项目，开发者可以极为方便的使用fx.js来添加线性或非线性动画，而这一切只需要引入fx.js这个库即可
- 当然，也欢迎各位开发者们添加更多有意思的动画效果

快速开始？看看下面的 <a href="#usage">Usage</a> 吧

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 快速开始

以下内容可以让开发者们快速上手

### 前期准备

在接入fx.js库之前，请确保你已经对 ZeppOS 小程序开发有了一定了解，当然，你也可以从头开始，从 [ZeppOS 官方文档](https://docs.zepp.com/docs/intro/)入手，相信你一定可以快速掌握的
Also, you need a `code editor(Like Microsoft VSCode)` and `knowledge of JavaScript`.
emmm，你还需要一个代码编辑器（比如微软的VSCode），以及有关JavaScript的知识

### 安装

1. 使用fx.js之前，你需要准备一个 ZeppOS 小程序项目，如果还没有创建，你可以参考这部分的文档 [ZeppOS quick start](https://docs.zepp.com/docs/guides/quick-start/).

2. Please download the latest `fx.js` file in the [Releases](https://github.com/XiaomaiTX/zeppos-fx/releases), and place `fx.js` in the `utils/` directory of the root of the applet

3. Add a reference to fx.js in the project

```js
import { Fx } from "../utils/fx"; // Replace with the path to your fx.js
```

At this point, you're ready to use the `fx.js` library

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Usage

```js
let fx = new Fx({
    begin: 100, // Initial value of function.
    end: 200, // Target value of function. 
    fps: 60, // FPS. 
    time: 1, // Total during time (s). 
     style: Fx.Styles.EASE_IN_OUT_QUAD, // Types of animation presets used, seeing @Fx.Style. 
     onStop() {
       console.log("anim stop");
     }, // Callback function at the end of the animation. 

     // Callback function for each frame, the parameter is the current function value, the value range is [begin, end]
      func: (result) => text.setProperty(hmUI.prop.X, result),
});
fx.restart(); // Replay animation can be called multiple times. 
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Roadmap

- [x] Add basic presets
- [x] Add function to mix colors
- [ ] Add more presets
- [ ] Multi-language Support for README
  - [ ] Chinese

See the [open issues](https://github.com/XiaomaiTX/zeppos-fx/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Contact

XiaomaiTX - i@lenrome.cn

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/XiaomaiTX/zeppos-fx.svg?style=for-the-badge
[contributors-url]: https://github.com/XiaomaiTX/zeppos-fx/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/XiaomaiTX/zeppos-fx.svg?style=for-the-badge
[forks-url]: https://github.com/XiaomaiTX/zeppos-fx/network/members
[stars-shield]: https://img.shields.io/github/stars/XiaomaiTX/zeppos-fx.svg?style=for-the-badge
[stars-url]: https://github.com/XiaomaiTX/zeppos-fx/stargazers
[issues-shield]: https://img.shields.io/github/issues/XiaomaiTX/zeppos-fx.svg?style=for-the-badge
[issues-url]: https://github.com/XiaomaiTX/zeppos-fx/issues
[license-shield]: https://img.shields.io/github/license/XiaomaiTX/zeppos-fx.svg?style=for-the-badge
[license-url]: https://github.com/XiaomaiTX/zeppos-fx/blob/master/LICENSE.txt
