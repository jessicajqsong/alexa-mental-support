/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.c9178642-ece1-4ec4-886f-1bd55f313f46';

const SKILL_NAME = 'mental support';
const GET_FACT_MESSAGE = [
    "I’m sad you’re hurting like this, ",
    "I’m sorry to hear that, ",
    "It breaks my mechanical heart to hear you say that,"
    ];
const HELP_MESSAGE = 'You can tell me if you want mental support, or, you can say exit... I wanna help you. What can I do to help?';
const HELP_REPROMPT = 'I want to help you. What can I do to help?';
const STOP_MESSAGE = 'Goodbye! I hope you’ll keep talking to me about your thoughts when you are not happy. I love you';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
    'I’m here for you. You are not alone',
    'Please, you are important to me',
    'I wanna give you a hug',
    'When all this is over, I’ll still be here and so will you.',
    'Sorry I’m only a virtual assistant and I can’t really understand what you are feeling, but I wanna offer my compassion.',
    'I’m not going to leave you or abandon you.',
    'I love you.',
    'I’m sorry that you’re in so much pain. I am not going to leave you.',
    'Your life makes a difference to me.',
    'It’s okay to feel this way. I understand.',
    'There is hope. Please don’t give up. I love you.',
    'You are a good person. Everything is going to be okay.',
    'It’s not your fault. It’s okay to feel this way. I understand.'
   ];
const data2 = [
    'Funny jokes! Coming right up! Do you know what did Jay-Z call his girlfriend before they got married? Feyonce.',
    'I’ll try my best! Do you know why are frogs so happy? Because they eat whatever bugs them.',
    'How about this one, do you know why wouldn’t the shrimp share his treasure? Because he was a little shellfish.'
];
const data3 = [
    'Sure! I’d love to play you a song if that can cheer you up. How about this one?',
    'Of course! I know some really good songs. Enjoy.',
    'Okay! Let me see. Ah I found one, here you go'
];
//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('BeingNiceIntent');
        this.emit('TellJokesIntent');
    },
    'BeingNiceIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        
        const openingArr = GET_FACT_MESSAGE;
        const openingIndex = Math.floor(Math.random() * openingArr.length);
        const randomOpening = openingArr[openingIndex];
        
        const speechOutput = randomOpening + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'TellJokesIntent': function () {
        const factArr = data2;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        
        const speechOutput = "Sure!" + randomFact;

        this.response.cardRenderer("Tell me a joke", randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
     'PlayMeMusicIntent': function () {
        const openArr = data3;
        const openIndex = Math.floor(Math.random() * openArr.length);
        const randomOpening = openArr[openIndex];
        
        const speechOutput = randomOpening;
        const audio1 = 'audio src="https://s3.amazonaws.com/tamilcomedydialogues/Gowndamani+-+Azhagu+Raja.mp3"/>';
        
        this.response.speak(speechOutput);
        this.emit(':ask','${audio1}','Aw I wish you liked it.');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
