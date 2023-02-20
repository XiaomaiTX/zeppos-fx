<a name="readme-top"></a>


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
    A library for providing simple animations in ZeppOS. 
    <br />
    <a href="https://github.com/XiaomaiTX/zeppos-fx/blob/master/README_zh-CN.md"><strong>中文文档（在写了别催了） »</strong></a>
    <br />
    <br />
    <a href="https://github.com/XiaomaiTX/zeppos-fx/releases">Download</a>
    ·
    <a href="https://github.com/XiaomaiTX/zeppos-fx/issues">Report Bug</a>
    ·
    <a href="https://github.com/XiaomaiTX/zeppos-fx/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The fx.js</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## About The Project

A library for providing simple animations in ZeppOS. 
You can use simple functions to add animations to your UI widgets


Here's why:

- In ZeppOS 1.0, there is no official animation interface for the control, so developers need to write their own animation libraries to implement animation features.
- In order to save your developers' work at the bottom, we have created an animation library for ZeppOS that helps developers to quickly build UI controls with linear or non-linear animations in ZeppOS applets
- You can also easily add custom animations to your UI widgets

Use the <a href="#usage">Usage</a> to easily get started.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

The content here will help you get familiar with the program quickly.

### Prerequisites

Before using this library, please make sure you already have an understanding of ZeppOS applet development, you can refer to the [ZeppOS official documentation](https://docs.zepp.com/docs/intro/).
Also, you need a `code editor(Like Microsoft VSCode)` and `knowledge of JavaScript`.

### Installation

1. To use this library, you need to create a ZeppOS applet project first.refer to the [ZeppOS quick start](https://docs.zepp.com/docs/guides/quick-start/).

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
