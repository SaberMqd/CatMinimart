import JoystickEnum from "../joystick/JoystickEnum";
import JoystickEvent from "../joystick/JoystickEvent";

var Utils = require('../utils');
import { AudioPlayer,ClickVoice } from  '../util/audio_player'

cc.Class({
    extends: cc.Component,
    properties: {
        moveDir: {
            default: cc.v2(0, 0),
            displayName: 'Move Dir',
            tooltip: '移动方向',
        },
        _speedType: {
            default: JoystickEnum.SpeedType.STOP,
            displayName: 'Speed Type',
            type: JoystickEnum.SpeedType,
            tooltip: '速度级别'
        },
        _moveSpeed: {
            default: 0,
            displayName: 'Move Speed',
            tooltip: '移动速度'
        },
        stopSpeed: {
            default: 0,
            type: cc.Integer,
            tooltip: '停止时速度'
        },
        cam:{
            default:null,
            type:cc.Node
        },
        player:{
            default:null,
            type:cc.Node            
        },
        workBtn:{
            default: null,
            type:cc.Button
        }
    },
    onLoad() {
        // Utils.PassiveShare();

        this.core = cc.find("GameCore").getComponent("core"); 
        this.gm = this.core.gm;

        this.fastSpeed = 500;
        this.normalSpeed = 300;
        this.prigid = this.player.getComponent(cc.RigidBody);
        this.tarDir = cc.v2(0, 0);

         Utils.BindBtn(this.node, 'house', 'onWorkClick', '', this.workBtn);     

        JoystickEvent.getInstance().on(JoystickEnum.JoystickEventType.TOUCH_START, this.onTouchStart, this);
        JoystickEvent.getInstance().on(JoystickEnum.JoystickEventType.TOUCH_MOVE, this.onTouchMove, this);
        JoystickEvent.getInstance().on(JoystickEnum.JoystickEventType.TOUCH_END, this.onTouchEnd, this);
    },
    doActive(){
    },
    move() {
        this.prigid.linearVelocity = this.moveDir.mul(this._moveSpeed)

        this.cam.x = this.player.x;
        this.cam.y = this.player.y;
    },
    onTouchStart(event, data) {
        this.moveDir = cc.v2(0,0);
    },
    onTouchMove(event, data) {
        this._speedType = data.speedType;
        this.moveDir = data.moveDistance;
        this.setSpeed()
    },
    onTouchEnd(event, data) {   
        this._speedType = data.speedType;
        this.moveDir = cc.v2(0,0);
        this.setSpeed()
    },
    update(dt) {
        if(this.gm.stw) return;
        this.move();
    },
    setSpeed(){
       switch (this._speedType) {
        case JoystickEnum.SpeedType.STOP:
            this._moveSpeed = this.stopSpeed;
            break;
        case JoystickEnum.SpeedType.NORMAL:
            this._moveSpeed = this.normalSpeed;
            break;
        case JoystickEnum.SpeedType.FAST:
            this._moveSpeed = this.fastSpeed;
            break;
        default:
            break;
        }
    },
    onWorkClick(){
        this.node.active = false;
        cc.find("Canvas/House").active = false;
        this.core.toWork();
    }
});
