// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Utils = require('utils');
import GameManager from './core/gamemgr'

import { AudioPlayer,ClickVoice } from  './util/audio_player'
import Log from './util/log'

cc.Class({
    extends: cc.Component,
    properties: {
        player:{
            default:null,
            type:cc.Node            
        },
        cam:{
            default:null,
            type:cc.Node
        },
    },
    onLoad () {
        // Utils.ADManager.Load();
        // Utils.PassiveShare();
        // Utils.FitCanvas();
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        this.gm = new GameManager();
        this.gm.persistenctData.Load();
        this.minimartScene = cc.find("Scene/Minimart");
        this.minimartSceneWall = cc.find("Scene/wall_shop_south");
        this.minimartCollDisp = cc.find("Minimart")
        this.houseScene = cc.find("Scene/House");
        this.joystick = cc.find("Canvas/Joystick");
        this.home = cc.find("Canvas/Home");
        this.cash = cc.find("Canvas/Cash");
        this.house = cc.find("Canvas/House");
        this.transition = cc.find("Canvas/Transition");
        this.minimartGame = cc.find("GameMinimart")

        var sgBtn = cc.find("Canvas/Home/StartGameBtn").getComponent(cc.Button);
        Utils.BindBtn(this.node, 'core', 'onStartGameClick', '', sgBtn);     

        this.toHome();
        //this.toMinimart();
    },
    start () { },
    onStartGameClick(event, customEventData) {
        AudioPlayer.Play(ClickVoice);
        this.toMinimart();
    },
    toHome(){
        this.joystick.active = false;
        this.minimartScene.active = false;
        this.minimartSceneWall.active = false;
        this.houseScene.active = false;
        this.home.active = true;
        this.minimartGame.active = false;
        this.cash.active = false;
        this.transition.active = false;
        this.minimartCollDisp.active = false;
        this.house.active = false;
    },
    toMinimart(){
        this.gm.ResetTask()
        this.joystick.active = true;
        this.minimartScene.active = true;
        this.minimartSceneWall.active = true;
        this.houseScene.active = false;
        this.home.active = false;
        this.minimartGame.active = true;
        this.minimartCollDisp.active = true;
        this.cash.active = false;
        this.transition.active = false;
        this.player.setPosition(0,0);
        this.player.getComponent(cc.RigidBody).syncPosition(true);
        this.cam.x = this.player.x;
        this.cam.y = this.player.y;
        this.house.active = false;
    },
    toHouse(){
        this.gm.persistenctData.offWork();
        this.minimartGame.active = false; 
        this.joystick.active = true;
        this.houseScene.active = true;
        this.minimartScene.active = false;
        this.minimartSceneWall.active = false;
        this.home.active = false;
        this.cash.active = false;
        this.transition.active = false;
        this.minimartCollDisp.active = false;
        this.player.setPosition(0,0);
        this.player.getComponent(cc.RigidBody).syncPosition(true);
        this.cam.x = this.player.x;
        this.cam.y = this.player.y;
        this.house.active = true;

    },
    toOffWork(){
        this.transition.getComponent("transition").offWork();
        this.transition.active = true;
    },
    toWork(){
        this.gm.persistenctData.work();
        this.transition.getComponent("transition").work();
        this.transition.active = true;
    }
});
