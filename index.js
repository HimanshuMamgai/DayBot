require('dotenv').config();
const restify = require('restify');
const {
    CloudAdapter,
    ConfigurationServiceClientCredentialFactory,
    createBotFrameworkAuthenticationFromConfiguration,
    MemoryStorage,
    UserState
} = require('botbuilder');

const DayBot = require('./dayBot/bot');

const server = restify.createServer({
    name: "dayBot"
});

server.use(restify.plugins.bodyParser());

server.listen(process.env.port || process.env.PORT || 3000, () => {
    console.log(`${server.name} listening to ${server.url}`);
});

const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
    MicrosoftAppId: process.env.MicrosoftAppId,
    MicrosoftAppPassword: process.env.MicrosoftAppPassword,
    MicrosoftAppType: process.env.MicrosoftAppType,
    MicrosoftAppTenantId: process.env.MicrosoftAppTenantId
});

const botFrameworkAuthentication = createBotFrameworkAuthenticationFromConfiguration(null, credentialsFactory);

const adapter = new CloudAdapter(botFrameworkAuthentication);

const onTurnErrorHandler = async (context, error) => {
    console.error(`\n [onTurnError] unhandled error: ${error}`);

    await context.sendTraceActivity(
        'onTurnError',
        `${error}`
    );

    await context.sendActivity('The bot encountred an errror or bug');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');

    await conversationState.delete(context);
}

adapter.onTurnError = onTurnErrorHandler;

const userState = new UserState(new MemoryStorage());

const myBot = new DayBot(userState);

server.post('/api/messages', async (req, res) => {
    await adapter.process(req, res, (context) => myBot.run(context));
});