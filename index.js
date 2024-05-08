const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with the token you got from BotFather
const token = '7049774200:AAEuLIIj8kcImOHA0V4yIkYuANipNCpNDnU';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    // Listen for any kind of message
    if (msg.new_chat_members) {
        msg.new_chat_members.forEach(member => {
            const welcomeMessage = `
❅────✦ ᴡᴇʟᴄᴏᴍᴇ ✦────❅

▰▰▰▰▰▰▰▰▰▰▰▰▰
𝐍𝐚𝐦𝐞 » ${member.first_name}
𝐈𝐝 » ${member.id}
𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞 » ${member.username ? '@' + member.username : '(no username)'}
▰▰▰▰▰▰▰▰▰▰▰▰▰

𝐀𝐥𝐰𝐚𝐲𝐬 𝐛𝐞 𝐡𝐚𝐩𝐩𝐲 💕
𝐓𝐡𝐚𝐧𝐤𝐬 𝐟𝐨𝐫 𝐣𝐨𝐢𝐧𝐢𝐧𝐠 𝐮𝐬.
OWNER:- @Shahil444
❅─────✧❅✦❅✧─────❅`;

            // Check if the new member has a profile picture
            bot.getUserProfilePhotos(member.id, {
                limit: 1
            }).then(photos => {
                if (photos.total_count !== 0) {
                    let file_id = photos.photos[0][0].file_id;
                    // Send the photo with the welcome message as the caption
                    bot.sendPhoto(msg.chat.id, file_id, {
                        caption: welcomeMessage
                    });
                } else {
                    // Send a default message if no profile photo is available
                    bot.sendMessage(msg.chat.id, welcomeMessage);
                }
            }).catch(error => {
                console.error('Error when fetching user profile photos:', error);
                bot.sendMessage(msg.chat.id, welcomeMessage); // Fallback to text message
            });
        });
    }
});

console.log("Bot started successfully");