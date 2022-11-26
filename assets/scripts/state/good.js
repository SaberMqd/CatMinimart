var Utils = require('../utils');
import { AudioPlayer,ScanVoice } from  '../util/audio_player'

cc.Class({
    extends: cc.Component,
    properties: {
        tar:{
            default:null,
            type:cc.Node
        },
        cash:{
            default:null,
            type:cc.Node
        },
        sp:{
            default:null,
            type:cc.Sprite    
        },
    },
    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.on_touch_start,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.on_touch_move,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.on_touch_end,this);

        this.isScaned = false;
        this.isStorged = false;
        this.defaultPos = this.node.position;
        this.id = 1;
    },
    setID(id){
        this.id = id;
        Utils.AddSpritePic(this.sp, "ui/cash/"+id);
    },
    reset(){
        this.isScaned = false;
        this.isStorged = false;
        this.isOver = false;
        this.node.setPosition(this.defaultPos);
    },
    start () {
        this.reset();
    },
    on_touch_start(t){
    },
    on_touch_move(t){
        if(this.isOver){
            return;
        }

        var delta = t.getDelta();
        np = this.node.position;
        np.x += delta.x;
        np.y += delta.y;
        this.node.position = np;
    },
    on_touch_end(t){
        if(this.isStorged){
            this.isOver = true;
            this.node.setPosition(this.tar.position);
        }
    },    
    onCollisionEnter(other, self){
        if(other.node.name == "scancoll"){
            AudioPlayer.Play(ScanVoice);
            this.cash.getComponent("cash").scan(this.id);
            this.isScaned = true;
        }
        if(other.node.name == "storgecoll"){
            this.isStorged = true;
        }
    },
    onCollisionStay(other, self){
        if(other.node.name == "storgecoll"){
            this.isStorged = true;
        }
    },
    onCollisionExit(other, self){
        if(other.node.name == "scancoll"){
            this.isScaned = false;
        }
        if(other.node.name == "storgecoll"){
             this.isStorged = false;
        }
    },
});
