import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseFadeInSoundEffectTag = function (textPlayer, parser, config) {
    var tagName = 'se.fadein'
    parser
        .on(`+${tagName}`, function (time) {
            AppendCommandBase.call(textPlayer,
                'se.fadein',         // name
                FadeInSoundEffect,   // callback
                time,                // params
                textPlayer,          // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var FadeInSoundEffect = function (time) {
    // this: textPlayer
    this.soundManager.fadeInSoundEffect(time);
}

export default OnParseFadeInSoundEffectTag;