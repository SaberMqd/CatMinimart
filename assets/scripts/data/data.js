// 收银cash， 补货replenishment， 拖地mop, 捡垃圾gc, 热饭hotmeal ，甜筒ic， 烤肠 Sausages
// 0          1                    2     3            4           5      6
var processorData = [
    {day:1, task: [2,0,0,0,0,0,0],cash:[ {id:1,goods:[1,2,3]} ],},
    {day:2, task: [2,0,0,0,0,0,0],cash:[ {id:2,goods:[1,2,3]} ],},
    {day:3, task: [2,0,0,0,0,0,0],cash:[ {id:3,goods:[1,2,3]} ],},
    {day:4, task: [3,1,0,0,0,0,0],cash:[ {id:4,goods:[1,2,3]} ],},
    {day:5, task: [3,1,0,0,0,0,0],cash:[ {id:5,goods:[1,2,3]} ],},
    {day:6, task: [3,1,0,0,0,0,0],cash:[ {id:6,goods:[1,2,3]} ],},
    {day:7, task: [3,1,0,0,0,0,0],cash:[ {id:7,goods:[1,2,3]} ],},
];

var goods = [
    {id:1, name:"汽水1", val:10},
    {id:2, name:"汽水2", val:10},
    {id:3, name:"汽水3", val:10},
    {id:4, name:"汽水4", val:10},
    {id:5, name:"汽水5", val:10},
    {id:6, name:"汽水6", val:10},
    {id:7, name:"汽水7", val:10},
    {id:8, name:"汽水8", val:10},
    {id:9, name:"汽水9", val:10},
    {id:10, name:"汽水10", val:10},
    {id:11, name:"汽水11", val:10},
];

module.exports.Goods = goods;
module.exports.ProcessorData = processorData;
