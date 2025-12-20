import { getText } from '@zos/i18n'
import * as Styles from 'zosLoader:./index.[pf].layout.js'
import { Fx } from '../libs/fx';
import { ANIM_PROFILE } from './anim';

Page({
  build() {
    const anim = new Fx(ANIM_PROFILE);
    
    anim.start();
    console.log(anim.getStatus());
  }
})
