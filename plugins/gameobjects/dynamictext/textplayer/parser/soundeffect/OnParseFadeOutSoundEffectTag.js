import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseFadeOutSoundEffectTag = function (textPlayer, parser, config) {
    var tagName = 'se.fadeout';
    parser
        .on(`+${tagName}`, function (time, isStopped) {
            isStopped = (isStopped === 'stop');
            AppendCommandBase.call(textPlayer,
                'se.fadeout',        // name
                FadeOutSoundEffect,  // callback
                [time, isStopped],   // params
                textPlayer,          // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var FadeOutSoundEffect = function (params) {
    // this: textPlayer
    this.soundManager.fadeOutSoundEffect(...params);
}

export default OnParseFadeOutSoundEffectTag;