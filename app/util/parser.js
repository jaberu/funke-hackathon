/*
How to use

let parser = require('./parser')

let politik = 'https://www.morgenpost.de/politik/?service=Rss'
let article = 'https://www.morgenpost.de/politik/ausland/article211855877/Orban-sieht-trotz-des-EuGH-Urteils-keinen-Handlungsbedarf.xmli'

parser(article, ['body.content', 'p'], ['media'])
  .then((response) => {
    console.log(response)
  })

*/

const request = require('superagent')
const sax = require('sax')
const Promise = require('bluebird')

function parseBackendResponse (response) {
  return new Promise((resolve, reject) => {
    let parser = sax.parser(true)
    let buffer = null
    let currentTag = null
    let result = []
    let ignore = false
    let ignoreTag = null
    let media = []

    parser.onerror = function (e) {
      return reject(e)
    }
    parser.ontext = function (t) {
      if (currentTag) {
        buffer = buffer + t
      }
    }
    parser.onopentag = function (node) {
      if (node.name === "media") {
          if (node.attr("display-option") === "brightcove") {
              media[] = node.attr("video-id")
          }
        ignore = true
        ignoreTag = node.name
      } else if (!ignore && (node.name === 'body.content' || node.name === 'p')) {
        currentTag = node.name
        buffer = ''
      }
    }
    parser.onclosetag = function (tagName) {
      // clsoe a tag.  tagName is node name
      if (ignoreTag === tagName) {
        ignore = false
        buffer = null
        currentTag = null
      } else if (!ignore && currentTag === tagName) {
        if (buffer === '') {
          buffer = null
        } else {
          result.push(buffer)
        }
        currentTag = null
        buffer = null
      }
    }
    // parser.onattribute = function (attr) {
      // an attribute.  attr has "name" and "value"
    // };
    parser.onend = function () {
      // parser stream is done, and ready to have more stuff written to it.
      return resolve({
            text : result,
            videos : media
          })
    }

    parser.write(response).close()
  })
}

// channel -> item[] -> title
module.exports = (url, includeList, excludeList) => {
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, response) => {
        if (err) {
          return reject(err)
        }
        return resolve(response.text)
      })
  })
    .then((response) => {
      return parseBackendResponse(response, includeList, excludeList)
    })
    .map((item) => {
      return item.replace(/\s\s+/g, ' ')
    })
    .then((response) => {
      let arrRes = response.join('</p><p>')
      return `<p>${arrRes}</p>`
    })
}
