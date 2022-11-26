// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


module.exports.BindBtn = function(node,cname,hname,data,btn){
		var handler = new cc.Component.EventHandler();
		handler.target = node;
		handler.component = cname;
		handler.handler = hname;
		handler.customEventData = data;
		btn.clickEvents.push(handler);
};

module.exports.Save = function(key,v){
	try {
		if(window["wx"]) {
			// console.log("save: wx set")
			window["wx"].setStorageSync(key, JSON.stringify(v))
		}
		else
			cc.sys.localStorage.setItem(key, JSON.stringify(v));
	} catch (e) { console.log("wx set error") }
}

module.exports.Load = function(key){
	try {
		if(window["wx"]) {
			// console.log("load: wx get")
			const value = window["wx"].getStorageSync(key)
			// console.log(JSON.parse(value))
			return JSON.parse(value)
		}
		else
			return JSON.parse(cc.sys.localStorage.getItem(key));
	} catch (e) {
		return null;
	}
}

module.exports.ShakeArrow = function(node, tag) {
	let offset = 9;
	let x = [offset, 0]
	let y = [0, offset]
	let offarr = x
	if (tag == 'y')
		offarr= y
	let action = cc.sequence(
		cc.moveTo(0.3, cc.v2(node.x + offarr[0], node.y + offarr[1])),
		cc.moveTo(0.3, cc.v2(node.x, node.y))
	)
	node.runAction(cc.repeatForever(action))
};

module.exports.AddSpritePic = function(container, addres){
	//cc.loader.loadRes(addres, cc.SpriteFrame, function (err, spFrame) {
	//	container.spriteFrame = spFrame           
	//});
	cc.resources.load(addres, cc.SpriteFrame, (err, spFrame) => {
		container.spriteFrame = spFrame;
	});
};

module.exports.PassiveShare = function(){
	if (typeof wx === 'undefined') {
		return;
	}

	// 显示当前页面的转发按钮
	wx.showShareMenu({
		success: (res) => {
			// console.log('开启被动转发成功！');
		},
		fail: (res) => {
			console.log(res);
			// console.log('开启被动转发失败！');
		}
	});

	// 监听小程序右上角菜单的「转发」按钮
	wx.onShareAppMessage(() => {
		return {
			title: '快来卷啊，看谁才是卷王之王',
			// imageUrl: cc.url.raw('img.png'),        // 分享图片要放在 wechatgame/res/raw-assets 路径下
			// query: 'shareMsg='+'分享卡片上所带的信息'  // query最大长度(length)为2048
		}
	});
};

module.exports.FitCanvas = function(){
     var canvasNode = cc.find("Canvas");
     // 1. 先找到 SHOW_ALL 模式适配之后，本节点的实际宽高以及初始缩放值
     var srcScaleForShowAll = Math.min(
         cc.view.getCanvasSize().width / canvasNode.width,
         cc.view.getCanvasSize().height / canvasNode.height
     );
     var realWidth = canvasNode.width * srcScaleForShowAll;
     var realHeight = canvasNode.height * srcScaleForShowAll;

     // 2. 基于第一步的数据，再做节点宽高重置
     var newW = canvasNode.width * (cc.view.getCanvasSize().width / realWidth);
     var newH = canvasNode.height * (cc.view.getCanvasSize().height / realHeight);

     var can = canvasNode.getComponent("cc.Canvas")
     can.designResolution = cc.size(newW, newH);

     //UICamera
     var cam = cc.find("UICamera")
     cam.x = newW / 2;
     cam.y = newH / 2;
}

class ADManager{
	constructor() {
		this.matchBannerAD = null;
		this.shopBannerAD = null;
		this.levelUPDoorAD = null;

		this.matchBannerADID = 'adunit-679bf3503de74853';
		this.shopBannerADID = 'adunit-acac6772f677a217';
		this.levelUPDoorADID = 'adunit-84427c716a840923';
		this.rewardVedioADID = 'adunit-9159fc8036ca4053';
	}

	Load(){
		if(!window["wx"]) return;
		this.matchBannerAD = this.LoadBanner(this.matchBannerADID);
		this.shopBannerAD = this.LoadBanner(this.shopBannerADID);

		this.levelUPDoorAD = this.LoadVedio(this.levelUPDoorADID);
	}

	ShowMathBanner(){
		if(!window["wx"]) return;
		this.matchBannerAD.show();
	}

	ShowShopBanner(){
		if(!window["wx"]) return;
		this.shopBannerAD.show();
	}

	HideMathBanner(){
		if(!window["wx"]) return;
		this.matchBannerAD.hide();
	}

	HideShopBanner(){
		if(!window["wx"]) return;
		this.shopBannerAD.hide();
	}

	LoadBanner(id){
		var ad = wx.createBannerAd({
			adUnitId: id,
			adIntervals: 30,  // 自动刷新频率不能小于30秒
			style: {
				left: 0,
				top: 76,
				width: 120,
			}
		})

		ad.onError(err => {
			console.log(err)
		})

		ad.onLoad(() => {
			//console.log('banner 广告加载成功')
		})

		return ad;
	}

	LoadVedio(id) {
		var rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: id })

		rewardedVideoAd.onError(err => {

			console.log(err)
		})

		rewardedVideoAd.onLoad(() => {
			//console.log('激励视频 广告加载成功')
		})

		return rewardedVideoAd;
	}

	ShowLevelUPDoorVedio(f){
		if(!window["wx"]) return;
		var videoAd = this.levelUPDoorAD;

		videoAd.show()
			.catch(() => {
			// 失败重试
			videoAd.load()
				.then(() => videoAd.show())
				.catch(err => {
					console.log('激励视频 广告显示失败')
				})
		})


		videoAd.onClose(res => {
			// 用户点击了【关闭广告】按钮
			// 小于 2.1.0 的基础库版本，res 是一个 undefined
			if (res && res.isEnded || res === undefined) {
					f(true);
			}
			else {
				f(false);
				console.log("not reward")
			}
		})
	}

	HideLevelUPDoorVedio(){
		if(!window["wx"]) return;
		this.levelUPDoorAD.onClose().then(() => console.log('激励视频 广告显示'))
	}
}

var adManager = new ADManager();
module.exports.ADManager = adManager;

/*
var rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: 'xxxx' })

rewardedVideoAd.onLoad(() => {
  console.log('激励视频 广告加载成功')
})

rewardedVideoAd.show()
.then(() => console.log('激励视频 广告显示'))

rewardedVideoAd.show()
.catch(err => {
    rewardedVideoAd.load()
    .then(() => rewardedVideoAd.show())
})
RewardedVideoAd.onClose().then(() => console.log('激励视频 广告显示'))

*/

/*
* // 创建激励视频广告实例，提前初始化
let videoAd = wx.createRewardedVideoAd({
  adUnitId: 'adunit-9159fc8036ca4053'
})

// 用户触发广告后，显示激励视频广告
videoAd.show().catch(() => {
  // 失败重试
  videoAd.load()
    .then(() => videoAd.show())
    .catch(err => {
      console.log('激励视频 广告显示失败')
    })
})
* */