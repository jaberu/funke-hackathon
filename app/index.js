'use strict';

const Alexa = require('alexa-sdk');
const constants = require('./util/constants');
const skillConfig = require('./skillConfig');
const strings = require('./util/strings');

const mainMenu = require('./handlers/mainMenu');
const audioPlayback = require('./handlers/audioPlayback');
const browseStories = require('./handlers/browseStories');

const initHandler = require('./handlers/init');
const mainMenuHandler = Alexa.CreateStateHandler(constants.states.MAIN_MENU, mainMenu);
const audioPlaybackHandler = Alexa.CreateStateHandler(constants.states.AUDIO_PLAYBACK, audioPlayback);
const browseStoriesHandler = Alexa.CreateStateHandler(constants.states.BROWSE_STORIES, browseStories);

exports.handler = (event, context) => {
    console.log(JSON.stringify(event));
    const alexa = Alexa.handler(event, context);
    alexa.appId = skillConfig.APP_ID;
    alexa.dynamoDBTableName = skillConfig.DYNAMODB_TABLE_NAME;
    alexa.registerHandlers(
        initHandler,
        mainMenuHandler,
        audioPlaybackHandler,
        browseStoriesHandler
    );
    alexa.execute();
};
