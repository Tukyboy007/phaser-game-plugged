import Transition from '../transition/Transition.js';
import PopUp from '../../popup.js';
import ScaleDownDestroy from '../../scale-down-destroy.js';
import NOOP from '../../utils/object/NOOP.js';
import AwaitLoader from '../../awaitloader.js';
import GetProgress from './GetProgress.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class LoadingProgress extends Transition {
    constructor(gameObject, config) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('transitIn')) {
            config.transitIn = PopUp;
        }
        if (!config.hasOwnProperty('transitOut')) {
            config.transitOut = ScaleDown;
        }

        super(gameObject, config);
        // this.parent = gameObject;
        // this.scene

        this.setProgressCallback(GetValue(config, 'progress'));

        this.start();
    }

    setProgressCallback(callback) {
        if (!callback) {
            callback = NOOP;
        }

        this.progressCallback = callback;
        return this;
    }

    start() {
        var self = this;
        AwaitLoader.call(this.scene.load, function (successCallback, failureCallback) {
            self.once('close', successCallback);
        })

        super.start();
    }

    onOpen() {
        this.scene.load.on('progress', this.onProgress, this);
        this.emit('open', this.parent, this);
        super.onOpen();
        this.onProgress(); // Might requestClose if progress === 1
    }

    onClose() {
        this.scene.load.off('progress', this.onProgress, this);
        this.emit('close', this.closeEventData);
        super.onClose();
    }

    onProgress() {
        var progress = GetProgress(this.scene);
        this.progressCallback(this.parent, progress);
        this.emit('progress', progress);
        if (progress === 1) {
            this.requestClose();
        }
    }
}

var ScaleDown = function (gameObject, duration) {
    // Don't destroy here
    ScaleDownDestroy(gameObject, duration, undefined, undefined, false);
}

export default LoadingProgress;