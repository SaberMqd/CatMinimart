import Persistence from './persistence'
import * as Data from '../data/data'

export default class GameManager {
    constructor(){
        this.stw = false;
        this.persistenctData = new Persistence();
        this.curTask = [0,0,0,0,0,0,0];
    }

    ResetTask(){
        this.curTask = [0,0,0,0,0,0,0];
    }

    CanOffWork(){
        var day = this.persistenctData.Day();
        for(var i = 0;i < this.curTask.length;i++){
            if (this.curTask[i] <  Data.ProcessorData[day].task[i]){
                return false;
            }
        }

        return true;
    }

    STW(enable){
        this.stw = enable;
    }
}