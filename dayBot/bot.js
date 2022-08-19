const { ActivityHandler, MessageFactory, CardFactory } = require('botbuilder');

const WELCOMED = 'welcomedUser';

class DayBot extends ActivityHandler {
    constructor(userState) {
        super();
        this.welcomedUser = userState.createProperty(WELCOMED);

        this.userState = userState;

        this.onMessage(async (context, next) => {
            const didBotWelcomedUser = await this.welcomedUser.get(context, false);

            if(didBotWelcomedUser === false) {
                await context.sendActivity(MessageFactory.text('To get the details about the days, please type \'sunday\', \'monday\', \'tuesday\', \'wednesday\', \'thursday\', \'friday\', \'saturday\' '));
                await context.sendActivity(MessageFactory.text('To continue chat enter type other than these day\'s names'));

                await this.welcomedUser.set(context, true);
            } else {
                const text = context.activity.text.toLowerCase();

                switch(text) {
                    case 'hello':
                    case 'hii':
                    case 'hi':
                        await context.sendActivity(MessageFactory.text(context.activity.text));
                        break;
                    case 'sunday':
                        await this.sendSundayCard(context);
                        break;
                    case 'monday':
                        await this.sendMondayCard(context);
                        break;
                    case 'tuesday':
                        await this.sendTuesdayCard(context);
                        break;
                    case 'wednesday':
                        await this.sendWedenesdayCard(context);
                        break;
                    case 'thursday':
                        await this.sendThursdayCard(context);
                        break;
                    case 'friday':
                        await this.sendFridayCard(context);
                        break;
                    case 'saturday':
                        await this.sendSaturdayCard(context);
                        break;
                    default:
                        await context.sendActivity(MessageFactory.text('You can get details of the days, if you get bored from chatting'));
                }
            }

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            for (let i in context.activity.membersAdded) {
                if(context.activity.membersAdded[i].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(`Hello and welcome ${context.activity.from.name}, i detect you locale is ${context.activity.locale}.`));
                    await context.sendActivity(MessageFactory.text(`This is a welcome message from the DayBot, you can get details of the different days!`));
                }
            }

            await next();
        });
    }

    async run(context) {
        await super.run(context);

        await this.userState.saveChanges(context);
    }

    async sendSundayCard(context) {
        const card = CardFactory.adaptiveCard(
            {
                "type": "AdaptiveCard",
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.3",
                "body": [
                    {
                        "type": "TextBlock",
                        "wrap": true,
                        "text": "Sunday clears away the rust of the whole week.",
                        "horizontalAlignment": "Center",
                        "color": "Attention",
                        "weight": "Bolder",
                        "size": "ExtraLarge",
                        "isSubtle": true
                    },
                    {
                        "type": "Image",
                        "url": "https://1.bp.blogspot.com/-MnvFNYw5V5Q/XOhXr9gRQ3I/AAAAAAAAS0w/bsiCnXAZof40yWbspiNsJ71SUrRRTI-4wCLcBGAs/s1600/Sunday-Status-in-English.jpg"
                    }
                ]
            }
        );

        await context.sendActivity(MessageFactory.attachment(card));
    }

    async sendMondayCard(context) {
        const card = CardFactory.adaptiveCard(
            {
                "type": "AdaptiveCard",
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.3",
                "body": [
                    {
                        "type": "TextBlock",
                        "wrap": true,
                        "text": "Monday morning you sure look fine.",
                        "horizontalAlignment": "Center",
                        "color": "Good",
                        "weight": "Bolder",
                        "size": "ExtraLarge",
                        "isSubtle": true
                    },
                    {
                        "type": "Image",
                        "url": "https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTc1OTk0MTE3ODI1NjYx/hello-monday---text-on-a-display-lightbox-on-blue-and-pink-bright-background.jpg"
                    }
                ]
            }
        );

        await context.sendActivity(MessageFactory.attachment(card));
    }

    async sendTuesdayCard(context) {
        const card = CardFactory.adaptiveCard(
            {
                "type": "AdaptiveCard",
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.3",
                "body": [
                    {
                        "type": "TextBlock",
                        "wrap": true,
                        "text": "After Tuesday, even the calendar goes W - T - F",
                        "horizontalAlignment": "Center",
                        "color": "Warning",
                        "weight": "Bolder",
                        "size": "ExtraLarge",
                        "isSubtle": true
                    },
                    {
                        "type": "Image",
                        "url": "https://parade.com/.image/t_share/MTkwNTgxMTMwODk5NjI5MTgx/tuesday-quotes-1.jpg",
                        "spacing": "Small",
                        "size": "Stretch",
                        "width": "1px",
                        "selectAction": {
                            "type": "Action.ToggleVisibility"
                        }
                    },
                    {
                        "type": "Image",
                        "url": "https://parade.com/.image/t_share/MTkwNTgxMTMwODk5NjI5MTgx/tuesday-quotes-1.jpg"
                    }
                ]
            }
        );

        await context.sendActivity(MessageFactory.attachment(card));
    }

    async sendWedenesdayCard(context) {
        const card = CardFactory.adaptiveCard(
            {
                "type": "AdaptiveCard",
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.3",
                "body": [
                    {
                        "type": "TextBlock",
                        "wrap": true,
                        "text": "Wednesday a new day, rather than looking forward to the weekend, live this day!",
                        "horizontalAlignment": "Center",
                        "color": "Accent",
                        "weight": "Bolder",
                        "size": "ExtraLarge",
                        "isSubtle": true
                    },
                    {
                        "type": "Image",
                        "url": "https://parade.com/.image/t_share/MTkwNTgxMTMwODk5NjI5MTgx/tuesday-quotes-1.jpg",
                        "spacing": "Small",
                        "size": "Stretch",
                        "width": "1px",
                        "selectAction": {
                            "type": "Action.ToggleVisibility"
                        }
                    },
                    {
                        "type": "Image",
                        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48-jq90xMvv09mMI2vbtQuYYW9-0iY6vAO0Epp8B2Xg&s",
                        "size": "Large",
                        "horizontalAlignment": "Center",
                        "width": "500px"
                    }
                ]
            }
        );

        await context.sendActivity(MessageFactory.attachment(card));
    }

    async sendThursdayCard(context) {
        const card = CardFactory.adaptiveCard(
            {
                "type": "AdaptiveCard",
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.3",
                "body": [
                    {
                        "type": "TextBlock",
                        "wrap": true,
                        "text": "There are so many days in a week but my favorite is still Thursday because it is totally fabulous.",
                        "horizontalAlignment": "Center",
                        "color": "Dark",
                        "weight": "Bolder",
                        "size": "ExtraLarge",
                        "isSubtle": true
                    },
                    {
                        "type": "Image",
                        "url": "https://parade.com/.image/t_share/MTkwNTgxMTMwODk5NjI5MTgx/tuesday-quotes-1.jpg",
                        "spacing": "Small",
                        "size": "Stretch",
                        "width": "1px",
                        "selectAction": {
                            "type": "Action.ToggleVisibility"
                        }
                    },
                    {
                        "type": "Image",
                        "url": "https://i.pinimg.com/originals/b1/46/2d/b1462d7a5a516396999b6476637e9940.jpg",
                        "size": "Large",
                        "horizontalAlignment": "Center",
                        "width": "500px"
                    }
                ]
            }
        );

        await context.sendActivity(MessageFactory.attachment(card));
    }

    async sendFridayCard(context) {
        const card = CardFactory.adaptiveCard(
            {
                "type": "AdaptiveCard",
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.3",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": "May your Good Friday be blessed with the presents of Jesus on your lips, and his never ending grace in your heart.",
                        "wrap": true,
                        "fontType": "Default",
                        "size": "ExtraLarge",
                        "weight": "Bolder",
                        "color": "Attention",
                        "isSubtle": true,
                        "horizontalAlignment": "Center",
                        "spacing": "Large"
                    },
                    {
                        "type": "Image",
                        "url": "https://www.rd.com/wp-content/uploads/2021/08/friday-quote-nanea-hoffman.jpg",
                        "separator": true
                    }
                ]
            }
        );

        await context.sendActivity(MessageFactory.attachment(card));
    }

    async sendSaturdayCard(context) {
        const card = CardFactory.adaptiveCard(
            {
                "type": "AdaptiveCard",
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.3",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": "Love me like Saturday night, like three glasses of champagne, like the room is spinning, like you're drunk on my love.",
                        "wrap": true,
                        "fontType": "Default",
                        "size": "ExtraLarge",
                        "weight": "Bolder",
                        "color": "Dark",
                        "isSubtle": true,
                        "horizontalAlignment": "Center",
                        "spacing": "Large"
                    },
                    {
                        "type": "Image",
                        "url": "data:image/jpeg;base64,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",
                        "separator": true,
                        "width": "500px",
                        "horizontalAlignment": "Center"
                    }
                ]
            }
        );

        await context.sendActivity(MessageFactory.attachment(card));
    }
}

module.exports = DayBot;