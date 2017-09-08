const skillConfig = require('../skillConfig');
const request = require('request');
const _ = require('lodash');
const parseString = require('xml2js').parseString;

function isValidRssItem(rssItem) {
  let isValid = _.has(rssItem, 'guid') &&
    _.has(rssItem, 'pubDate') &&
    _.has(rssItem, 'title') &&
    _.has(rssItem, 'description')
  return isValid
}

module.exports = {
  fetch: function(category, onSuccess, onError) {
    return function() {
      let baseUrl = skillConfig.BASE_URL;
      let uri = _.get(skillConfig.SUPPORTED_CATEGORIES, `${category}.URI`, category);
      console.log("baseUrl" + baseUrl + " uri " + uri );
      request.get({
        baseUrl: baseUrl,
        uri: uri
      }, function(err, httpResponse, body) {
        let statusCode = httpResponse.statusCode;
        if (!err && statusCode > 199 && statusCode < 300) {
          parseString(body, {
            explicitArray: false
          }, function(err, result) {
            if (!err && result) {
              try {
                let rssItems = result.rss.channel.item || [];
                if (rssItems.constructor !== Array) {
                  let temp = rssItems
                  rssItems = [temp]
                }
                rssItems = rssItems.filter(isValidRssItem).map(rssItem => _.omitBy(rssItem, _.isEmpty))
                onSuccess(rssItems);
              } catch (error) {
                console.log(error);
                onError();
              }
            } else {
              console.log(err);
              onError();
            }
          });
        } else {
          console.log(err);
          onError();
        }
      });
    }
  }

};
