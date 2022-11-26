var Utils = require('../utils');
import { AudioPlayer,ClickVoice } from  '../util/audio_player'
import * as Data from '../data/data'

cc.Class({
    extends: cc.Component,
    properties: {
        closeBtn:{
            default:null,
            type:cc.Button            
        },
        resetBtn:{
            default:null,
            type:cc.Button            
        },
        completeBtn:{
            default:null,
            type:cc.Button            
        },
        checkoutBtn:{
            default:null,
            type:cc.Button            
        },
        good1:{
            default:null,
            type:cc.Node    
        },
        good2:{
            default:null,
            type:cc.Node    
        },
        good3:{
            default:null,
            type:cc.Node    
        },
        good4:{
            default:null,
            type:cc.Node    
        },
        good5:{
            default:null,
            type:cc.Node    
        },
        coin1:{
            default:null,
            type:cc.Node    
        },
        coin2:{
            default:null,
            type:cc.Node    
        },
        coin3:{
            default:null,
            type:cc.Node    
        },
        coin4:{
            default:null,
            type:cc.Node    
        },
        coin5:{
            default:null,
            type:cc.Node    
        },
        coin6:{
            default:null,
            type:cc.Node    
        },
        title1:{
            default:null,
            type:cc.Label    
        },
        title2:{
            default:null,
            type:cc.Label    
        },
        title3:{
            default:null,
            type:cc.Label    
        },
        val:{
            default:null,
            type:cc.Label    
        },
        gname:{
            default:null,
            type:cc.Label    
        },
        sum:{
            default:null,
            type:cc.Label    
        },
        ava:{
            default:null,
            type:cc.Sprite    
        },
    },
    onLoad() {
        // Utils.PassiveShare();
        this.core = cc.find("GameCore").getComponent("core"); 
        this.gm = this.core.gm;
        this.goods = [this.good1,this.good2,this.good3,this.good4,this.good5];
        this.coins = [this.coin1,this.coin2,this.coin3,this.coin4,this.coin5,this.coin6];
        Utils.BindBtn(this.node, 'cash', 'onCloseClick', '', this.closeBtn);     
        Utils.BindBtn(this.node, 'cash', 'onResetClick', '', this.resetBtn);     
        Utils.BindBtn(this.node, 'cash', 'onCompleteClick', '', this.completeBtn);     
        Utils.BindBtn(this.node, 'cash', 'onCheckoutClick', '', this.checkoutBtn);  

        for(var i = 0;i < this.coins.length;i++){
            this.coins[i].active = false;
        }

        this.sumval = 0;
        this.sum.string = "合计： "+this.sumval;
        this.title1.string = "";
        this.title2.string = "";
        this.title3.string = "";
        this.gname.string = "";
        this.val.string = "";
        this.customerID = 0;
        this.customerGoods = [];

        this.clistID = [];
        this.clistGoods = [];
        this.clistCount = 0;
    },
    setCustomer(id,goods){
        this.customerID = id;
        this.customerGoods = goods;
        Utils.AddSpritePic(this.ava, "character/"+id);

        for(var i = 0;i < this.goods.length;i++){
            this.goods[i].active = false;
        }

        for(var i = 0;i < this.customerGoods.length;i++){
            this.goods[i].getComponent("good").setID(this.customerGoods[i]);
            this.goods[i].active = true;
        }
    },
    addCustomer(id, goods){
        if(this.clistCount == 7){
            return false;
        }

        if(this.customerID == 0){
            this.setCustomer(id,goods);
            return true;
        }

        return true;
    },
    reset(){
        for(var i = 0;i < this.coins.length;i++){
            this.coins[i].active = false;
        }
        for(var i = 0;i < this.goods.length;i++){
            this.goods[i].getComponent("good").reset();
        }
        this.sumval = 0;
        this.sum.string = "合计： "+this.sumval;
        this.title1.string = "";
        this.title2.string = "";
        this.title3.string = "";
        this.gname.string = "";
        this.val.string = "";
    },
    onCloseClick(event, customEventData){
        AudioPlayer.Play(ClickVoice);
        this.node.active = false;
    },
    onResetClick(event, customEventData){
        AudioPlayer.Play(ClickVoice);
       this.reset();
    },
    onCompleteClick(event, customEventData){
        AudioPlayer.Play(ClickVoice);
        this.gm.curTask[0]++;
        if(this.gm.CanOffWork()){
            this.node.active = false;
            this.core.toOffWork();
        }
    },
    onCheckoutClick(event, customEventData){
        AudioPlayer.Play(ClickVoice);
         for(var i = 0;i < this.coins.length;i++){
            this.coins[i].active = true;
        }
    },
    scan(id){
        var g = Data.Goods[id];
        this.sumval += g.val;

        this.title3.string = this.title2.string;
        this.title2.string = this.title1.string;
        this.title1.string = g.name + " x 1";

        this.gname.string = g.name;
        this.val.string = g.val;
        this.sum.string = "合计： "+this.sumval;
    }
});
