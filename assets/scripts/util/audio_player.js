class AudioPlay {
    constructor() {
        this._audioArr = new Map();
    }

    Play(name) {
        var clip = this._audioArr.get(name);
        var play = function (_clip) {
                cc.audioEngine.play(_clip, false, 1);
        }.bind(this);

        if (!clip) {
            cc.loader.load(cc.url.raw("resources/audio/" + name), function (err, data) {
                this._audioArr.set(data.name, data);
                play(data);
            }.bind(this));
        } else {
            play(clip);
        }
    }
}

var AudioPlayer = new AudioPlay();
module.exports.AudioPlayer = AudioPlayer;
module.exports.ClickVoice = "button.mp3";
module.exports.ScanVoice = "scan.wav";




