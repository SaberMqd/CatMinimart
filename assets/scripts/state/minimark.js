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
        cashBtn:{
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

        this.lt = cc.find("Scene/pos/left_top");
        this.lb = cc.find("Scene/pos/left_bottom")
        this.rt = cc.find("Scene/pos/right_top")
        this.rb = cc.find("Scene/pos/right_bottom")

        Utils.BindBtn(this.node, 'minimark', 'onStartCashClick', '', this.cashBtn);     

        JoystickEvent.getInstance().on(JoystickEnum.JoystickEventType.TOUCH_START, this.onTouchStart, this);
        JoystickEvent.getInstance().on(JoystickEnum.JoystickEventType.TOUCH_MOVE, this.onTouchMove, this);
        JoystickEvent.getInstance().on(JoystickEnum.JoystickEventType.TOUCH_END, this.onTouchEnd, this);
    },
    doActive(){
    },
    move() {
        this.prigid.linearVelocity = this.moveDir.mul(this._moveSpeed)

        // this.cam.x = this.player.x;
        // this.cam.y = this.player.y;

        var nx = this.player.x;
        var ny = this.player.y;

        var xx = cc.view.getDesignResolutionSize().width / 2;
        var yy = cc.view.getDesignResolutionSize().height / 2;

        if(nx + xx > this.rt.x){
            nx = this.rt.x - xx;
        }

        if(nx - xx < this.lt.x){
            nx = this.lt.x + xx;
        }

        if(ny + yy > this.rt.y){
            ny = this.rt.y - yy;
        }

        if(ny - yy < this.rb.y){
            ny = this.rb.y + yy;
        }

        this.cam.x = nx;
        this.cam.y = ny;
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
    onStartCashClick(event, customEventData){
        AudioPlayer.Play(ClickVoice);
        cc.find("Canvas/Cash").active = true;
        cc.find("Canvas/Cash").getComponent("cash").addCustomer(1,[1,2,3])
        cc.find("Canvas/Cash").getComponent("cash").reset();
    }
});
