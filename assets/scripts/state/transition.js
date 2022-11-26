var Utils = require('../utils');
import { AudioPlayer,ClickVoice } from  '../util/audio_player'

cc.Class({
    extends: cc.Component,
    properties: {
        text:{
            default:null,
            type:cc.Label
        },
    },
    onLoad() {
        // Utils.PassiveShare();
        this.core = cc.find("GameCore").getComponent("core"); 
        this.t = 0;
        this.next = 1; // 1 home 2 minimart
    },
    update(dt){
        this.t += dt;
        if (this.t >= 1){
            this.t = 0;
            this.node.active = false;
            if (this.next == 1){
                this.core.toHouse();
            }
            if (this.next == 2){
                this.core.toMinimart();
            }
        }
    },
    offWork(){
        this.t = 0;
        this.text.string = "下班啦~~~";
        this.next = 1;
    },
    work(){
        this.t = 0;
        this.text.string = "上班啦~~~";
        this.next = 2;
    }
});
