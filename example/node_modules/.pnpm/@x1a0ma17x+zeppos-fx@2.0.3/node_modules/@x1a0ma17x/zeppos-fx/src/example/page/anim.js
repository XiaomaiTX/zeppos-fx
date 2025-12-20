import { Fx } from "../libs/fx";
import * as hmUI from "@zos/ui";

export const ANIM_PROFILE = {
    metadata: {
        version: 1,
        author: "XiaomaiTX",
        default_config: {
            track: {
                startTime: 0,
            },
            frame: {
                fps: 60,
                time: 1,
                style: Fx.Styles.EASE_IN_OUT_QUAD,
            },
        },
    },
    tracks: [
        {
            config: {
                startTime: 0,
            },
            frames: [
                {
                    delay: 0,
                    fps: 60,
                    time: 1,
                    style: Fx.Styles.EASE_IN_OUT_QUAD,
                    init_func: () => {
                        console.log("init");
                        const text = hmUI.createWidget(hmUI.widget.TEXT, {
                            x: 0,
                            y: 0,
                            w: 100,
                            h: 100,
                            text: "Hello World",
                            color: 0xff3232,
                        });
                        return text;
                    },
                    runtime_func: (wgtObj, progress) => {
                        let begin = 0;
                        let end = 100;
                        console.log(begin + (end - begin) * progress);
                        wgtObj.setProperty(
                            hmUI.prop.X,
                            begin + (end - begin) * progress
                        );
                        return wgtObj;
                    },

                    callback_func: (wgtObj) => {
                        console.log("callback");
                    },
                },
            ],
        },
    ],
};
