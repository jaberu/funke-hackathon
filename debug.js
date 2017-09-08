require('./app/index.js').handler({
    "session": {
      "new": false,
      "sessionId": "SessionId.bc604780-e516-4897-86a1-a799e1e98d26",
      "application": {
        "applicationId": "amzn1.ask.skill.e8b30761-2f5b-421e-a355-07e1d9aeff46"
      },
      "attributes": {
        "currentCategory": "video",
        "previousCateogry": "video",
        "prevOutputMode": "_ASK",
        "prevOutputSpeech": "Es gibt 1 neue Artikel in der Rubrik video. Der erste Artikel lautet: \n\t\t\tHurrikan: \"Irma\" – Ganz Florida bereitet sich auf Evakuierung vor. Möchtest du den Artikel hören oder weiter zum nächsten? <audio src=\"https://s3-eu-west-1.amazonaws.com/funke-hackathon/Alexa-News-App_select.mp3\" />",
        "created": "2017-09-08T13:22:52Z",
        "STATE": "_BROWSE_STORIES",
        "offsetInMilliseconds": 0,
        "updated": "2017-09-08T19:29:06Z",
        "currentIndex": 0,
        "currentHeadlines": [
          {
            "title": "\n\t\t\tHurrikan: \"Irma\" – Ganz Florida bereitet sich auf Evakuierung vor",
            "description": "\n\t\t\tAuf einigen Karibikinseln sind nach Hurrikan „Irma“ Aufräumarbeiten angelaufen. In Florida rechnet man inzwischen mit dem Schlimmsten.",
            "link": "https://www.morgenpost.de/vermischtes/article211854891/Hurrikan-Irma-tobt-in-der-Karibik-USA-bereiten-sich-vor.html",
            "guid": {
              "_": "211854891",
              "$": {
                "isPermaLink": "false"
              }
            },
            "category": "Aus aller Welt",
            "pubDate": "Fri, 08 Sep 2017 06:40:00 +0200",
            "enclosure": {
              "$": {
                "url": "https://img.morgenpost.de/img/vermischtes/crop211859241/7070561412-w260-cv3_2/14964E0065AB220C.jpg",
                "length": "0",
                "type": "image/jpeg"
              }
            }
          }
        ]
      },
      "user": {
        "userId": "amzn1.ask.account.AE2QHEW6KM36WCN2RUTD7OZUKXN45AQFGHWUT3ARMNYY7QK4TSBRMK27QEMPMSZJXQXY3NWHNO7AA2VYJSEPOQA36BT7EBYRZUTQ4PYII3EKRWGCYUB23IHPTHUZ23X6IB76XIQSNIHHF3L2DNDZ5QSQJ2ANGKH5E3DZSGUTBRYMUVPQZQTIG5OOOA3GJBHLOXNSJCZBLLWVVAY"
      }
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "EdwRequestId.fe82dd8c-7856-4080-bd5a-5d166ba7ba22",
      "intent": {
        "name": "FullStoryIntent",
        "slots": {
          "desire": {
            "name": "desire"
          }
        }
      },
      "locale": "de-DE",
      "timestamp": "2017-09-08T20:09:20Z"
    },
    "context": {
      "AudioPlayer": {
        "playerActivity": "IDLE"
      },
      "System": {
        "application": {
          "applicationId": "amzn1.ask.skill.e8b30761-2f5b-421e-a355-07e1d9aeff46"
        },
        "user": {
          "userId": "amzn1.ask.account.AE2QHEW6KM36WCN2RUTD7OZUKXN45AQFGHWUT3ARMNYY7QK4TSBRMK27QEMPMSZJXQXY3NWHNO7AA2VYJSEPOQA36BT7EBYRZUTQ4PYII3EKRWGCYUB23IHPTHUZ23X6IB76XIQSNIHHF3L2DNDZ5QSQJ2ANGKH5E3DZSGUTBRYMUVPQZQTIG5OOOA3GJBHLOXNSJCZBLLWVVAY"
        },
        "device": {
          "supportedInterfaces": {}
        }
      }
    },
    "version": "1.0"
  }, console.log)