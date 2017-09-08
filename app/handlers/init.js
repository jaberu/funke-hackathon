const constants = require('../util/constants');

module.exports = {
    'NewSession': function () {

        let timestamp = this.event.request.timestamp;
        this.attributes.updated = timestamp;
        if (!this.attributes.created) {
            this.attributes.created = timestamp;
        }

        if (!this.handler.state) {
            this.handler.state = constants.states.MAIN_MENU;
        }

        let requestType = this.event.request.type;
        if (requestType === 'LaunchRequest') {
            this.emitWithState('LaunchRequest');
        } else if (requestType === 'IntentRequest') {
            let intentName = this.event.request.intent.name;
            this.emitWithState(intentName);
        } else {
            console.log('Unknown requestType: ' + requestType);
        }
    }
};
