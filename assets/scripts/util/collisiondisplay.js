cc.Class({
    extends: cc.Component,
    properties: {
        btn:{
            default:null,
            type:cc.Node            
        },
    },
    onCollisionEnter(other,self){
    },
    onCollisionStay(other, self){
    },
    onCollisionExit(other,self){
    },
    onBeginContact(contact, selfCollider, otherCollider){
        this.btn.active = true;
    },
    onEndContact(contact, selfCollider, otherCollider){
        this.btn.active = false;
    },
});
