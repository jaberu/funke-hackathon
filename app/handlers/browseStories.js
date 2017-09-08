const fuzzy = require('fuzzy')
const strings = require('../util/strings')
const text = require('../util/text')
const constants = require('../util/constants')
const alexaResponse = require('../util/alexaResponse')
const skillConfig = require('../skillConfig')
const api = require('../util/api')
const asyncX = require('asyncawait/async');
const awaitX = require('asyncawait/await');

let controller = {
  isValidBrowse: function () {
    return function () {
            // check for needed browse information (category, headlines, and index)
      return this.attributes.currentCategory &&
                this.attributes.currentHeadlines &&
                this.attributes.currentIndex > -1
    }
  },
  getCategoryValue: function (categorySlot) {
    return function () {
        // look for matching category using fuzzy search
      let returnValue = categorySlot
      let valid = false
      let validCategories = Object.keys(skillConfig.SUPPORTED_CATEGORIES)
      validCategories.some(function (category) {
        if (category.toLowerCase() === categorySlot.toLowerCase()) {
          valid = true
          return true
        }
        var categoryObj = skillConfig.SUPPORTED_CATEGORIES[category]
        var results = fuzzy.filter(categorySlot, categoryObj.synonyms)
        if (results && results.length) {
          returnValue = category
          valid = true
          return true
        } else {
          return false
        }
      })
      return { category: returnValue, valid: valid }
    }
  },
  resetBrowseMode: function () {
    return function () {
            // clear session and prompt user for category
      this.attributes.currentCategory = undefined
      this.attributes.currentHeadlines = undefined
      this.attributes.currentIndex = undefined
      this.emitWithState('BrowseStoriesIntent')
    }
  },
  readHeadlineWithCount: function () {
    return function () {
            // tell the user how many stories are in the list
            // read the first headline in the list
      let count = this.attributes.currentHeadlines.length
      let categoryName = this.attributes.currentCategory
      let headline = this.attributes.currentHeadlines[this.attributes.currentIndex].title
      let outputSpeech = strings.get(this).STORY_LIST_START.DIALOGUE
      outputSpeech = strings.replaceCount(outputSpeech, count)
      outputSpeech = strings.replaceCategoryName(outputSpeech, categoryName)
      outputSpeech = strings.replaceHeadline(outputSpeech, headline)
      let repromptSpeech = strings.get(this).STORY_LIST_START.REPROMPT
      repromptSpeech = strings.replaceHeadline(repromptSpeech, headline)
      alexaResponse.ask(outputSpeech, repromptSpeech).call(this)
    }
  },
  readHeadline: function () {
    return function () {
            // read a single headline in the list
      let ordinal = text.sayAsOrdinal(this.attributes.currentIndex + 1)
      let headline = this.attributes.currentHeadlines[this.attributes.currentIndex].title
      let outputSpeech = strings.get(this).STORY_NEXT.DIALOGUE
      outputSpeech = strings.replaceOrdinal(outputSpeech, ordinal)
      outputSpeech = strings.replaceHeadline(outputSpeech, headline)
      let repromptSpeech = strings.get(this).STORY_NEXT.REPROMPT
      repromptSpeech = strings.replaceHeadline(repromptSpeech, headline)
      alexaResponse.ask(outputSpeech, repromptSpeech).call(this)
    }
  },
  readLastHeadline: function () {
    return function () {
            // read the last headline in the list
      let categoryName = this.attributes.currentCategory
      let headline = this.attributes.currentHeadlines[this.attributes.currentIndex].title
      let outputSpeech = strings.get(this).STORY_LAST.DIALOGUE
      outputSpeech = strings.replaceCategoryName(outputSpeech, categoryName)
      outputSpeech = strings.replaceHeadline(outputSpeech, headline)
      let repromptSpeech = strings.get(this).STORY_LAST.REPROMPT
      repromptSpeech = strings.replaceHeadline(repromptSpeech, headline)
      alexaResponse.ask(outputSpeech, repromptSpeech).call(this)
    }
  },
  firstHeadlineError: function () {
    return function () {
            // let the user know they cannot go back
      let ordinal = text.sayAsOrdinal(this.attributes.currentIndex + 1)
      let headline = this.attributes.currentHeadlines[this.attributes.currentIndex].title
      let outputSpeech = strings.get(this).STORY_BEGINNING_ERROR.DIALOGUE
      outputSpeech = strings.replaceOrdinal(outputSpeech, ordinal)
      outputSpeech = strings.replaceHeadline(outputSpeech, headline)
      let repromptSpeech = strings.get(this).STORY_BEGINNING_ERROR.REPROMPT
      repromptSpeech = strings.replaceHeadline(repromptSpeech, headline)
      alexaResponse.ask(outputSpeech, repromptSpeech).call(this)
    }
  },
  lastHeadlineError: function () {
    return function () {
            // let the user know they cannot go forward
      let ordinal = text.sayAsOrdinal(this.attributes.currentIndex + 1)
      let headline = this.attributes.currentHeadlines[this.attributes.currentIndex].title
      let outputSpeech = strings.get(this).STORY_END_ERROR.DIALOGUE
      outputSpeech = strings.replaceOrdinal(outputSpeech, ordinal)
      outputSpeech = strings.replaceHeadline(outputSpeech, headline)
      let repromptSpeech = strings.get(this).STORY_END_ERROR.REPROMPT
      repromptSpeech = strings.replaceHeadline(repromptSpeech, headline)
      alexaResponse.ask(outputSpeech, repromptSpeech).call(this)
    }
  },
  readStory: function () {
    return asyncX(function () {
            // read the full story text, then give the user options
      let currentStory = this.attributes.currentHeadlines[this.attributes.currentIndex]
      let headline = currentStory.title.replace(/\s\s+/g, ' ')
      let xmli = currentStory.link.replace('.html', '.xmli')
      let storyText = awaitX(require('../util/parser')(xmli, ['body.content', 'p'], ['media', 'hl1', 'hl2', 'hl3']))
      // let storyText = currentStory.description
      let cardImageObject = null

            // include an image object only if both image urls are provided
      if (currentStory.enclosureSmall && currentStory.enclosureLarge) {
        cardImageObject = {
          smallImageUrl: currentStory.enclosureSmall.$.url,
          largeImageUrl: currentStory.enclosureLarge.$.url
        }
      }

      let lastStory = this.attributes.currentHeadlines.length - 1
      let outputSpeech, repromptSpeech, cardTitle, cardContent

      if (this.attributes.currentIndex === lastStory) {
        outputSpeech = strings.get(this).STORY_FULL_STORY_LAST.DIALOGUE
        repromptSpeech = strings.get(this).STORY_FULL_STORY_LAST.REPROMPT
        cardTitle = strings.get(this).STORY_FULL_STORY_LAST.CARD_TITLE
        cardContent = strings.get(this).STORY_FULL_STORY_LAST.CARD_CONTENT
      } else {
        outputSpeech = strings.get(this).STORY_FULL_STORY.DIALOGUE
        repromptSpeech = strings.get(this).STORY_FULL_STORY.REPROMPT
        cardTitle = strings.get(this).STORY_FULL_STORY.CARD_TITLE
        cardContent = strings.get(this).STORY_FULL_STORY.CARD_CONTENT
      }

      outputSpeech = strings.replaceStoryText(outputSpeech, storyText)
      cardTitle = strings.replaceHeadline(cardTitle, headline)
      cardContent = strings.replaceStoryText(cardContent, storyText)

      alexaResponse.ask(outputSpeech, repromptSpeech).call(this)
    })
  },
  askForCategory: function () {
    return function () {
            // prompt the user for a category
      this.attributes.currentCategory = undefined
      this.attributes.currentHeadlines = undefined
      this.attributes.currentIndex = undefined
      let outputSpeech = strings.get(this).CATEGORY_LIST.DIALOGUE
      alexaResponse.ask(outputSpeech, outputSpeech).call(this)
    }
  },
  clarifyCategory: function (categoryName) {
    return function () {
            // ask the user to clarify the category
      this.attributes.currentCategory = undefined
      this.attributes.currentHeadlines = undefined
      this.attributes.currentIndex = undefined
      let outputSpeech = strings.get(this).CATEGORY_ERROR.DIALOGUE
      outputSpeech = strings.replaceCategoryName(outputSpeech, categoryName)
      let repromptSpeech = strings.get(this).CATEGORY_ERROR.REPROMPT
      alexaResponse.ask(outputSpeech, repromptSpeech).call(this)
    }
  },
  apiError: function () {
    return function () {
            // notify the user that there was a problem and start browse over
      this.attributes.currentCategory = undefined
      this.attributes.currentHeadlines = undefined
      this.attributes.currentIndex = undefined
      let outputSpeech = strings.get(this).STORY_FETCH_ERROR.DIALOGUE
      alexaResponse.ask(outputSpeech, outputSpeech).call(this)
    }
  },
  noStoriesError: function () {
    return function () {
            // no stories returned from endpoint, ask the user for another category
      this.attributes.currentCategory = undefined
      this.attributes.currentHeadlines = undefined
      this.attributes.currentIndex = undefined
      let outputSpeech = strings.get(this).STORY_LIST_ZERO.DIALOGUE
      alexaResponse.ask(outputSpeech, outputSpeech).call(this)
    }
  }
}

let browseStories = {
  newSession: function () {
        // forward request to generic NewSession handler
    this.emit('NewSession')
  },
  launch: function () {
        // change state and forward request to MAIN_MENU LaunchRequest
    this.handler.state = constants.states.MAIN_MENU
    this.emitWithState('LaunchRequest')
  },
  cancel: function () {
        // change state and end the session
    this.handler.state = constants.states.MAIN_MENU
    let outputSpeech = strings.get(this).EXIT_CONFIRM.DIALOGUE
    this.attributes.currentHeadlines = undefined
    this.attributes.currentIndex = undefined
    alexaResponse.tell(outputSpeech).call(this)
  },
  unhandled: function () {
        // try to clarify the category with the user
    let outputSpeech = strings.get(this).CATEGORY_SELECTION_ERROR.DIALOGUE
    let repromptSpeech = strings.get(this).CATEGORY_SELECTION_ERROR.REPROMPT
    alexaResponse.ask(outputSpeech, repromptSpeech).call(this)
  },
  latestNews: function () {
        // change state and forward request to MAIN_MENU LatestNewsIntent
    //this.handler.state = constants.states.MAIN_MENU
    //this.emitWithState('LatestNewsIntent')

    if (!intent.slots) {
      intent.slots = {}
    }
    
    intent.slots.category = "neuste"
    browseStories()
  },
  help: function () {
        // offer the user context sensitive browsing help
        // based on if they have currentHeadlines
    let outputSpeech = (this.attributes.currentHeadlines) ? strings.get(this).HELP_BROWSE_GUIDE.DIALOGUE : strings.get(this).HELP_BROWSE.DIALOGUE
    alexaResponse.ask(outputSpeech, outputSpeech).call(this)
  },
  repeat: function () {
        // repeat the last thing said to the user
    alexaResponse.repeat().call(this)
  },
  browseStories: function () {
        // check for category, clarify category, and fetch stories by category
    let intent = this.event.request.intent
    let category = (intent.slots && intent.slots.category) ? intent.slots.category : undefined
    let categorySlot = (category && category.value) ? category.value : undefined
    if (!categorySlot) {
      controller.askForCategory().call(this)
    } else {
      let categoryValue = controller.getCategoryValue(categorySlot).call(this)
      if (!categoryValue.valid) {
        controller.clarifyCategory(categoryValue.category).call(this)
      } else {
        this.attributes.currentCategory = categoryValue.category
        this.attributes.previousCateogry = categoryValue.category
        let that = this
        let onError = function () {
          controller.apiError().call(that)
        }
        let onSuccess = function (headlines) {
          if (headlines.length < 1) {
            controller.noStoriesError().call(that)
          } else {
            that.attributes.currentIndex = 0
            that.attributes.currentHeadlines = headlines
            controller.readHeadlineWithCount().call(that)
          }
        }
        api.fetch(categoryValue.category, onSuccess, onError).call(that)
      }
    }
  },
  next: function () {
        // if the user is browsing, move to next story,
        // or let the user know they are on the last story
    if (controller.isValidBrowse().call(this)) {
      let lastStory = this.attributes.currentHeadlines.length - 1
      if (this.attributes.currentIndex < lastStory) {
        this.attributes.currentIndex += 1
        if (this.attributes.currentIndex == lastStory) {
          controller.readLastHeadline().call(this)
        } else {
          controller.readHeadline().call(this)
        }
      } else {
        controller.lastHeadlineError().call(this)
      }
    } else {
      controller.resetBrowseMode().call(this)
    }
  },
  previous: function () {
        // if the user is browsing, move to previous story,
        // or let the user know they are on the first story
    if (controller.isValidBrowse().call(this)) {
      if (this.attributes.currentIndex > 0) {
        this.attributes.currentIndex -= 1
        controller.readHeadline().call(this)
      } else {
        controller.firstHeadlineError().call(this)
      }
    } else {
      controller.resetBrowseMode().call(this)
    }
  },
  fullStory: function () {
        // if the user is browsing, read the full text of the story
    if (controller.isValidBrowse().call(this)) {
      controller.readStory().call(this)
    } else {
      controller.resetBrowseMode().call(this)
    }
  }
}

module.exports = {
  'NewSession': browseStories.newSession,
  'LaunchRequest': browseStories.launch,
  'SessionEndedRequest': browseStories.cancel,
  'Unhandled': browseStories.unhandled,
  'LatestNewsIntent': browseStories.latestNews,
  'CategoryOnlyIntent': browseStories.browseStories,
  'BrowseStoriesIntent': browseStories.browseStories,
  'FullStoryIntent': browseStories.fullStory,
  'NextStoryIntent': browseStories.next,
  'PreviousStoryIntent': browseStories.previous,
  'AMAZON.HelpIntent': browseStories.help,
  'AMAZON.StopIntent': browseStories.cancel,
  'AMAZON.CancelIntent': browseStories.cancel,
  'AMAZON.StartOverIntent': browseStories.launch,
  'AMAZON.RepeatIntent': browseStories.repeat,
  'AMAZON.NextIntent': browseStories.next,
  'AMAZON.PreviousIntent': browseStories.previous
}
