const strings = require('../util/strings');
const constants = require('../util/constants');
const alexaResponse = require('../util/alexaResponse');
const skillConfig = require('../skillConfig');

let mainMenu = {
    newSession: function () {
        // forward request to generic NewSession handler
        this.emit('NewSession');
    },
    launch: function () {
        // launch the skill, read the main menu
        this.handler.state = constants.states.MAIN_MENU;
        let outputSpeech = strings.get(this).WELCOME_BACK_NO_CATEGORY.DIALOGUE;
        let repromptSpeech = strings.get(this).WELCOME_FIRST_VISIT.REPROMPT;

        // read 'first visit' text if it is the user's first time
        if (!this.attributes.completedFirstSession) {
            this.attributes.completedFirstSession = true;
            outputSpeech = strings.get(this).WELCOME_FIRST_VISIT.DIALOGUE;
        }

        // offer the recent category if it exists
        if (this.attributes.previousCateogry) {
            let recent = strings.get(this).WELCOME_BACK_CATEGORY.DIALOGUE;
            recent = strings.replaceCategoryName(recent, this.attributes.previousCateogry);
            outputSpeech = recent;
        }

        alexaResponse.ask(outputSpeech, repromptSpeech).call(this);
    },
    browseStories: function () {
        // change state and start browsing stories
        this.handler.state = constants.states.BROWSE_STORIES;
        this.emitWithState('BrowseStoriesIntent');
    },
    repeat: function () {
        // repeat the last thing said to the user
        alexaResponse.repeat().call(this);
    },
    cancel: function () {
        // end the session
        let outputSpeech = strings.get(this).EXIT_CONFIRM.DIALOGUE;
        alexaResponse.tell(outputSpeech).call(this);
    },
    help: function () {
        // provide main menu help
        let outputSpeech = strings.get(this).HELP_START.DIALOGUE;
        alexaResponse.ask(outputSpeech, outputSpeech).call(this);
    },
    unhandled: function () {
        // provide main menu error recovery
        let outputSpeech = strings.get(this).GENERAL_ERROR.DIALOGUE;
        alexaResponse.ask(outputSpeech, outputSpeech).call(this);
    }
};

module.exports = {
    'NewSession': mainMenu.newSession,
    'LaunchRequest': mainMenu.launch,
    'CategoryOnlyIntent': mainMenu.browseStories,
    'BrowseStoriesIntent': mainMenu.browseStories,
    'AMAZON.HelpIntent': mainMenu.help,
    'AMAZON.StartOverIntent': mainMenu.launch,
    'AMAZON.RepeatIntent': mainMenu.repeat,
    'AMAZON.StopIntent': mainMenu.cancel,
    'AMAZON.CancelIntent': mainMenu.cancel,
    'SessionEndedRequest': mainMenu.cancel,
    'Unhandled': mainMenu.unhandled
};
