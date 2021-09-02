/* Codded by @Ravindu Manoj

Telegram: t.me/RavinduManoj

Facebook: https://www.facebook.com/ravindu.manoj.79

Licensed under the  GPL-3.0 License;

you may not use this file except in compliance with the License.

Whats bot - Ravindu Manoj

*/

const SewRavi = require('../events');

const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');

const fs = require('fs');

const axios = require('axios');

const request = require('request');

const got = require("got");

const Config = require('../config');

const des = "You Can Png From Any Emoji"

const iii = "Only work with emoji\n emojiyil mathrame work aavukayullu😁"

if (Config.WORKTYPE == 'private') {

    SewRavi.addCommand({pattern: 'png ?(.*)', fromMe: true, desc: des}, (async (message, match) => {

        if (match[1] === '') return await message.sendMessage(iii);

        var webimage = await axios.get(`https://docs-jojo.herokuapp.com/api/emoji2png?emoji=${encodeURIComponent(match[1])}&type=apple`, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.png, caption: 'Made by Sophia bot'})

    }));

}

else if (Config.WORKTYPE == 'public') {

    SewRavi.addCommand({pattern: 'png ?(.*)', fromMe: false, desc: des}, (async (message, match) => {

        if (match[1] === '') return await message.sendMessage(iii);

        var webimage = await axios.get(`https://docs-jojo.herokuapp.com/api/emoji2png?emoji=${encodeURIComponent(match[1])}&type=apple`, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.png, caption: 'Mady by Sophia'})

    }));

    SewRavi.addCommand({pattern: 'png ?(.*)', fromMe: true,dontAddCMDList: true}, (async (message, match) => {

        if (match[1] === '') return await message.sendMessage(iii);

        var webimage = await axios.get(`https://docs-jojo.herokuapp.com/api/emoji2png?emoji=${encodeURIComponent(match[1])}&type=apple`, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.png, caption: 'Made by Sophia bot'})

    }));

}
