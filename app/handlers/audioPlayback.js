const constants = require('../util/constants');
const skillConfig = require('../skillConfig');
const alexaResponse = require('../util/alexaResponse');
const strings = require('../util/strings');
const api = require('../util/api')
const _ = require('lodash');

const playBehavior = 'REPLACE_ALL'; // always REPLACE_ALL because we are not queueing files
const token = 'A7A553CBAE9F5FAED16ED754A27CE'; // a unique identifier for our audio file

let audio = {
    newSession: function () {
        // forward request to generic NewSession handler
        this.emit('NewSession');
    },
    start: function () {
        // start audio playback from offset of 0 ms
        let offset = 0;
        let outputSpeech = strings.get(this).LATEST_NEWS.DIALOGUE;
        let cardTitle = strings.get(this).LATEST_NEWS.CARD_TITLE;
        let cardContent = strings.get(this).LATEST_NEWS.CARD_CONTENT;

        let onError = function() {
          let errorSpeech = strings.get(this).AUDIO_PLAYBACK_NEXT_STORY_ERROR.DIALOGUE;
          alexaResponse.tell(errorSpeech).call(this);
        }.bind(this)

        api.fetch(skillConfig.LATEST_URI, (headlines) => {
          console.log('got the latest news')
          if (headlines.length > 0) {
            let latest = headlines[0]
            console.log(latest)
            let url = _.get(latest, 'enclosure.$.url')
            console.log(url)
            if (url) {
              this.attributes.lastAudio = url
              this.response.audioPlayerPlay(playBehavior, url, token, null, offset);
              alexaResponse.tellWithCard(outputSpeech, cardTitle, cardContent, null).call(this);
            } else {
              onError()
            }
          } else {
            onError()
          }
        }, onError).call(this)

    },
    resume: function () {
        // start audio playback from saved offset point (ms)
        let offset = this.attributes.offsetInMilliseconds ? this.attributes.offsetInMilliseconds : 0;
        let url = this.attributes.lastAudio

        if (url) {
          this.response.audioPlayerPlay(playBehavior, url, token, null, offset);
          this.emit(':responseReady');
        } else {
          let errorSpeech = strings.get(this).AUDIO_PLAYBACK_NEXT_STORY_ERROR.DIALOGUE;
          alexaResponse.tell(errorSpeech).call(this);
        }
    },
    pause: function () {
        // stop audio playback and save the offset point (ms)
        this.attributes.offsetInMilliseconds = this.event.context.AudioPlayer.offsetInMilliseconds;
        this.response.audioPlayerStop();
        this.emit(':responseReady');
    },
    playbackStarted: function () {
        // take no action
        this.emit(':responseReady');
    },
    playbackStopped: function () {
        // take no action
        this.emit(':responseReady');
    },
    playbackNearlyFinished: function () {
        // take no action
        this.emit(':responseReady');
    },
    playbackFailed: function () {
        // log the error in the event of playback failure
        console.log('audio - playbackfailed : %j', _.get(this, 'event.request.error'));
        this.context.succeed(true);
    },
    playbackFinished: function () {
        // reset offset (ms) to start of audio file
        this.handler.state = constants.states.MAIN_MENU;
        this.attributes.offsetInMilliseconds = 0;
        this.attributes.lastAudio = undefined
        this.emit(':saveState', true);
    },
    unhandled: function () {
        // tell the user that the given action is not supported
        let intent = this.event.request.intent ? this.event.request.intent.name : '';
        let outputSpeech;
        if (intent === 'AMAZON.PreviousIntent' || intent === 'PreviousStoryIntent') {
          outputSpeech = strings.get(this).AUDIO_PLAYBACK_PREVIOUS_STORY_ERROR.DIALOGUE;
        }
        else if (intent === 'AMAZON.NextIntent' || intent === 'NextStoryIntent') {
          outputSpeech = strings.get(this).AUDIO_PLAYBACK_NEXT_STORY_ERROR.DIALOGUE;
        }
        else {
          outputSpeech = strings.get(this).AUDIO_PLAYBACK_ERROR.DIALOGUE;
        }
        alexaResponse.tell(outputSpeech).call(this);
    },
    launchRequest: function () {
        // change state and forward request to MAIN_MENU LaunchRequest
        this.handler.state = constants.states.MAIN_MENU;
        this.attributes.offsetInMilliseconds = 0;
        this.attributes.lastAudio = undefined
        this.response.audioPlayerStop();
        this.response.audioPlayerClearQueue('CLEAR_ALL');
        this.emitWithState('LaunchRequest');
    },
    browseStories: function () {
        // change state and forward request to MAIN_MENU BrowseStoriesIntent
        this.handler.state = constants.states.MAIN_MENU;
        this.attributes.offsetInMilliseconds = 0;
        this.attributes.lastAudio = undefined;
        this.response.audioPlayerStop();
        this.response.audioPlayerClearQueue('CLEAR_ALL');
        this.emitWithState('BrowseStoriesIntent');
    },
    latestNews: function () {
        // change state and forward request to MAIN_MENU BrowseStoriesIntent
        this.handler.state = constants.states.MAIN_MENU;
        this.attributes.offsetInMilliseconds = 0;
        this.attributes.lastAudio = undefined;
        this.response.audioPlayerStop();
        this.response.audioPlayerClearQueue('CLEAR_ALL');
        this.emitWithState('LatestNewsIntent');
    },
};

module.exports = {
    'NewSession': audio.newSession,
    'LaunchRequest': audio.launchRequest,
    'CategoryOnlyIntent': audio.browseStories,
    'BrowseStoriesIntent': audio.browseStories,
    'LatestNewsIntent': audio.start,
    'AMAZON.StartOverIntent': audio.start,
    'AMAZON.RepeatIntent': audio.start,
    'AMAZON.PauseIntent': audio.pause,
    'AMAZON.CancelIntent': audio.pause,
    'AMAZON.ResumeIntent': audio.resume,
    'PlaybackStarted': audio.playbackStarted,
    'PlaybackFinished': audio.playbackFinished,
    'PlaybackStopped': audio.playbackStopped,
    'PlaybackNearlyFinished': audio.playbackNearlyFinished,
    'PlaybackFailed': audio.playbackFailed,
    'SessionEndedRequest': audio.pause,
    'Unhandled': audio.unhandled
};
