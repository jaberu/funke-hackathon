const skillConfig = require('../skillConfig');
const languageStrings = require('../languageStrings.json');
const defaultLocale = 'en-US';
const replacements = [
    [ new RegExp('%%COMPANY_NAME%%', 'g'), skillConfig.COMPANY_NAME ],
    [ new RegExp('%%SKILL_NAME%%', 'g'), skillConfig.SKILL_NAME ],
    [ new RegExp('%%CATEGORY_LIST%%', 'g'), Object.keys(skillConfig.SUPPORTED_CATEGORIES).join(", ") ]
];

module.exports = {
    replacements: replacements,
    get: function (context) {
        let locale = context.event.request.locale || defaultLocale;
        return languageStrings[locale] || languageStrings[defaultLocale];
    },
    replaceHeadline: function (input, headline) {
        return input.replace(new RegExp('%%HEADLINE%%', 'g'), headline);
    },
    replaceStoryText: function (input, storyText) {
        return input.replace(new RegExp('%%STORY_TEXT%%', 'g'), storyText);
    },
    replaceOrdinal: function (input, ordinal) {
        return input.replace(new RegExp('%%ORDINAL%%', 'g'), ordinal);
    },
    replaceCategoryName: function (input, category) {
        return input.replace(new RegExp('%%CATEGORY_NAME%%', 'g'), category);
    },
    replaceCount: function (input, count) {
        return input.replace(new RegExp('%%COUNT%%', 'g'), count);
    }
};
