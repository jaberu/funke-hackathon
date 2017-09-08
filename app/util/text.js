module.exports = {
    sayAsOrdinal: function (i) {
        return "<say-as interpret-as=\"ordinal\">" + i + "</say-as>";
    },
    stripSSML: function(inputText) {
        if (inputText) {
            var regex = /(<([^>]+)>)/ig;
            return inputText.replace(regex, '');
        } else {
            return '';
        }
    },
    sanitizeSpeech: function(inputText) {
        if (inputText) {
            return inputText.replace('&', 'and');
        } else {
            return '';
        }
    }
};
