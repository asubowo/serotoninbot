/**
 * @author Andrew Subowo
 * @since 1.0 contributory
 */

/**
 * @param msg The msg body
 */
const https = require('https');
const Discord = require('discord.js');

/**
 * 
 * @param {DiscordWrapper} discordWrapper 
 */
var getbreakups = function (discordWrapper) {
    https.get('https://labs.andrewsubowo.com/exidents/breakups', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Exidents Happen')
                .setURL('https://labs.andrewsubowo.com/exidents')
                .addFields(
                    { name: 'Breakups', value: JSON.parse(data).breakups.toString() },
                    { name: 'Since', value: JSON.parse(data).lastRecordedDate.toString() }
                )
                .setFooter('Data provided by Subowo Labs - Subowo Labs is not responsible for relationship problems from correlated data.');
            discordWrapper.msg.channel.send(embed);
        });

        resp.on('error', (err) => {
            console.log(err);
        }); 
    })
}

module.exports = {
    getbreakups : getbreakups
}