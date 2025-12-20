import hmUI from "@zos/ui";
import { getText } from "@zos/i18n";
import * as Styles from "zosLoader:./index.[pf].layout.js";
import { Fx } from "../../fx";
import { AnimProfile } from "./index.anim";
import * as STYLE from "./index.style";

Page({
	build() {
		console.log(getText("example"));
		const button = hmUI.createWidget(hmUI.widget.BUTTON, STYLE.BUTTON);
		const anim = new Fx(AnimProfile, button);
		anim.start();
		// anim.stop();
		// anim.pause();
		// anim.restart();
		// anim.status();
	},
});
