require('./app/index.js').handler({
    "session": {
      "new": false,
      "sessionId": "SessionId.93d991e7-be4c-4a10-a24d-dec11ae67a0c",
      "application": {
        "applicationId": "amzn1.ask.skill.e8b30761-2f5b-421e-a355-07e1d9aeff46"
      },
      "attributes": {
        "currentVideos": [
          "5569090750001",
          "5566662475001",
          "5567878101001"
        ],
        "currentCategory": "video",
        "previousCateogry": "video",
        "prevOutputMode": "_ASK",
        "prevOutputSpeech": "Der Artikel enthält Videos. Falls du die Videos ansehen magst, sage Videos ansehen. <audio src=\"https://s3-eu-west-1.amazonaws.com/funke-hackathon/Alexa-News-App_select.mp3\" />",
        "created": "2017-09-08T13:22:52Z",
        "STATE": "_BROWSE_STORIES",
        "offsetInMilliseconds": 0,
        "updated": "2017-09-09T09:07:00Z",
        "currentIndex": 0,
        "currentHeadlines": [
          {
            "title": "\n\t\t\tHurrikan: \"Irma\" erreicht Kuba – Florida bereitet Evakuierung vor",
            "description": "\n\t\t\tAuf einigen Karibikinseln sind nach Hurrikan „Irma“ Aufräumarbeiten angelaufen. In Florida rechnet man inzwischen mit dem Schlimmsten.",
            "link": "https://www.morgenpost.de/vermischtes/article211854891/Hurrikan-Irma-tobt-in-der-Karibik-USA-bereiten-sich-vor.html",
            "guid": {
              "_": "211854891",
              "$": {
                "isPermaLink": "false"
              }
            },
            "category": "Aus aller Welt",
            "pubDate": "Fri, 08 Sep 2017 22:20:00 +0200",
            "enclosure": {
              "$": {
                "url": "https://img.morgenpost.de/img/vermischtes/crop211859241/4390569502-w260-cv3_2/14964E0065AB220C.jpg",
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
      "requestId": "EdwRequestId.51cba45a-7977-437c-bfa9-bdef579d6c3d",
      "intent": {
        "name": "ShowVideoIntent",
        "slots": {
          "desire": {
            "name": "desire"
          }
        }
      },
      "locale": "de-DE",
      "timestamp": "2017-09-09T09:07:36Z"
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