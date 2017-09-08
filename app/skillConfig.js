module.exports = {
    APP_ID: '', // TODO replace with your app ID (OPTIONAL)
    DYNAMODB_TABLE_NAME: 'AmazonNewsAlexaSkill', // TODO customize DynamoDB table name
    AUDIO_FILE_URL: 'https://s3.amazonaws.com/amazon-headliner/latest_news.mp3', // TODO provide url to your own news audiofile
    COMPANY_NAME: 'Amazon', // TODO customize company/organization name
    SKILL_NAME: 'Headliner', // TODO customize skill name
    BASE_URL: 'https://yomnhwdx8b.execute-api.us-east-1.amazonaws.com/dev/',
    LATEST_URI: 'latest',
    SUPPORTED_CATEGORIES: {
        politics: {
            URI: 'politics',
            synonyms: [
              'political'
            ]
        },
        business: {
            URI: 'business',
            synonyms: [
              'industry',
              'trade',
              'trading',
              'commerce',
              'financial',
              'finance'
            ]
        },
        technology: {
            URI: 'technology',
            synonyms: [
              'tech',
              'technological',
              'technical'
            ]
        },
        science: {
            URI: 'science',
            synonyms: [
              'scientific',
              'stem',
              'engineering',
              'environment',
              'environmental',
              'climate',
              'nature'
            ]
        },
        design: {
            URI: 'design',
            synonyms: [
              'designer'
            ]
        }
    }
};
