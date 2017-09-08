require('./app/index.js').handler({
    "session": {
      "new": false,
      "sessionId": "SessionId.8a90f473-48a3-40c9-9feb-ab6a62cc30f6",
      "application": {
        "applicationId": "amzn1.ask.skill.e8b30761-2f5b-421e-a355-07e1d9aeff46"
      },
      "attributes": {
        "previousCateogry": "Berlin",
        "prevOutputMode": "_ASK",
        "prevOutputSpeech": "Es tut mir leid, aber ich kann die Artikel für diese Rubrik nicht erreichen. Möchtest du die Rubriken durchstöbern oder dir neusten Artikel hören?",
        "created": "2017-09-08T13:22:52Z",
        "STATE": "_BROWSE_STORIES",
        "offsetInMilliseconds": 0,
        "updated": "2017-09-08T13:44:53Z"
      },
      "user": {
        "userId": "amzn1.ask.account.AE2QHEW6KM36WCN2RUTD7OZUKXN45AQFGHWUT3ARMNYY7QK4TSBRMK27QEMPMSZJXQXY3NWHNO7AA2VYJSEPOQA36BT7EBYRZUTQ4PYII3EKRWGCYUB23IHPTHUZ23X6IB76XIQSNIHHF3L2DNDZ5QSQJ2ANGKH5E3DZSGUTBRYMUVPQZQTIG5OOOA3GJBHLOXNSJCZBLLWVVAY"
      }
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "EdwRequestId.99a9cf40-0cf2-4c55-8969-51cf92a08142",
      "intent": {
        "name": "CategoryOnlyIntent",
        "slots": {
          "category": {
            "name": "category",
            "value": "Berlin"
          }
        }
      },
      "locale": "de-DE",
      "timestamp": "2017-09-08T13:45:30Z"
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