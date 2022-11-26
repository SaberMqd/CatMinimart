import * as Utils from '../utils'

export default class Persistence {
    constructor(){
        this.data = {
            day:1,
            offWork:2, // 1 下班 2 上班
        }
    }

    Load(){
        var d = Utils.Load("data");
        if(d == null) return;
        this.data = d;
    }

    offWork(){
        this.data.offWork = 1;
        this.Save();
    }

    work(){
        this.data.offWork = 2;
        this.data.day++;
        this.Save();
    }

    GetPlayCount(){
        return this.data.count;
    }

    Day(){
        return this.data.day;
    }

    Save(){
        Utils.Save("data",this.data);
    }
}