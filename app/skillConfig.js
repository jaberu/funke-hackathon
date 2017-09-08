module.exports = {
    APP_ID: '', // TODO replace with your app ID (OPTIONAL)
    DYNAMODB_TABLE_NAME: 'BerlinerMorgenpostNewsAlexaSkill', // TODO customize DynamoDB table name
    AUDIO_FILE_URL: 'https://s3.amazonaws.com/amazon-headliner/latest_news.mp3', // TODO provide url to your own news audiofile
    COMPANY_NAME: 'Funke Digital',
    SKILL_NAME: 'Berliner Morgenpost News',
    BASE_URL: 'https://www.morgenpost.de/',
    LATEST_URI: '?service=Rss',
    SUPPORTED_CATEGORIES: {
        politik: {
            URI: 'politik/?service=Rss',
            synonyms: [
              'politik'
            ]
        },
        berlin: {
            URI: 'berlin/?service=Rss',
            synonyms: [
              'berlin'
            ]
        },
        sport: {
            URI: 'sport/?service=Rss',
            synonyms: [
              'sport'
            ]
        },
        neueste: {
            //URI: '?service=Rss',
            URI: 'sport/?service=Rss',
            synonyms: [
              'neueste Nachrichten',
              'neueste'
            ]
        }
    }
};
