const constants = require('../util/constants');
const text = require('../util/text');

module.exports = {
    ask: function (outputSpeech, outputReprompt) {
        return function () {
            outputSpeech = text.sanitizeSpeech(outputSpeech);
            outputReprompt = text.sanitizeSpeech(outputReprompt);

            this.attributes.prevOutputMode = constants.modes.OUTPUT_MODE_ASK;
            this.attributes.prevOutputSpeech = outputSpeech;
            this.response.speak(outputSpeech).listen(outputReprompt);
            this.emit(':responseReady');
        }
    },
    askWithCard: function (outputSpeech, outputReprompt, cardTitle, cardContent, cardImageObject) {
        return function () {
            outputSpeech = text.sanitizeSpeech(outputSpeech);
            outputReprompt = text.sanitizeSpeech(outputReprompt);
            cardTitle = text.stripSSML(cardTitle);
            cardContent = text.stripSSML(cardContent);

            this.attributes.prevOutputMode = constants.modes.OUTPUT_MODE_ASK;
            this.attributes.prevOutputSpeech = outputSpeech;
            this.response.speak(outputSpeech).listen(outputReprompt);
            this.response.cardRenderer(cardTitle, cardContent, cardImageObject);
            this.response.shouldEndSession = false;
            this.emit(':responseReady');
        }
    },
    tell: function (outputSpeech) {
        return function () {
            outputSpeech = text.sanitizeSpeech(outputSpeech);

            this.attributes.prevOutputMode = constants.modes.OUTPUT_MODE_TELL;
            this.attributes.prevOutputSpeech = outputSpeech;
            this.response.speak(outputSpeech);
            this.emit(':responseReady');
        }
    },
    tellWithCard: function (outputSpeech, cardTitle, cardContent, cardImageObject) {
        return function () {
            outputSpeech = text.sanitizeSpeech(outputSpeech);
            cardTitle = text.stripSSML(cardTitle);
            cardContent = text.stripSSML(cardContent);
            
            this.attributes.prevOutputMode = constants.modes.OUTPUT_MODE_ASK;
            this.attributes.prevOutputSpeech = outputSpeech;
            this.response.speak(outputSpeech);
            this.response.cardRenderer(cardTitle, cardContent, cardImageObject);
            this.emit(':responseReady');
        }
    },
    repeat: function () {
        let alexaResponse = this;
        return function () {
            let prevOutputMode = this.attributes.prevOutputMode;
            let prevOutputSpeech = this.attributes.prevOutputSpeech;

            if (prevOutputMode === constants.modes.OUTPUT_MODE_ASK) {
                alexaResponse.ask(prevOutputSpeech, prevOutputSpeech).call(this);
            } else {
                alexaResponse.tell(prevOutputSpeech).call(this);
            }
        }
    },
    saveState: function () {
        return function () {
            this.emit(':saveState', true);
        }
    }
};
