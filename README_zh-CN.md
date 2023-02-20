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
    <a href="https://github.com/XiaomaiTX/zeppos-fx/blob/master/README.md"><strong>English Document »</strong></a>
    <br />
    <p>我在写文档的时候优先用的英语哦~建议优先读完英文版 当然，中文版更方便大部分大陆开发者使用习惯
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

2. 请前往 [Releases](https://github.com/XiaomaiTX/zeppos-fx/releases) 下载最新稳定版fx.js，然后把fx.js放到项目根目录的 `utils/` 目录中

3. 在项目中添加对fx.js的引用


```js
import { Fx } from "../utils/fx"; // 这里换成fx.js相对于该文件的相对路径
```

至此，你可以尽情享受fx.js带来的动画效果了，什么？不知道怎么用？那就看看Usage吧

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 如何使用

可以参考这个简单的示例，如果正常运行，文本控件的x值应该由100变为200，即向右进行非线性移动
如果有什么问题可以提交issue或联系XiaomaiTX，但是在发问前请确保自己已经经过思考
当然，你可以先看看我博客的文章[《提问的智慧》](https://blog.uuu4.cn/archives/12/)

```js
    const text = hmUI.createWidget(hmUI.widget.TEXT, {
      // 创建一个简单的 TEXT 控件
      x: 100,
      y: 120,
      w: 288,
      h: 46,
      color: 0xffffff,
      text_size: 36,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: 'HELLO ZEPPOS'
    })

let fx = new Fx({
    begin: 100, // 初始函数值
    end: 200, // 目标函数值
    fps: 60, // 帧率
    time: 1, // 总时长(秒)
     style: Fx.Styles.EASE_IN_OUT_QUAD, //   预设类型 见fx.js中的Fx.Style

     onStop() {
       console.log("anim stop");
     }, // 动画结束后的回调函数

     // 每一帧的回调函数，参数为当前函数值，取值范围为[begin, end]
      func: (result) => text.setProperty(hmUI.prop.X, result),
});
fx.restart(); // 播放动画 可以重复多次调用
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Roadmap

- [x] 添加一些基本的动画预设
- [x] 添加颜色混合动画函数
- [ ] 添加更多的预设（咕咕咕，靠大家的贡献啦~）
- [ ] 为README编写多语言适配（感觉中英就够了？）
  - [x] English
  - [ ] 中文


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

Project Link: [https://github.com/XiaomaiTX/zeppos-fx](https://github.com/XiaomaiTX/zeppos-fx)

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
