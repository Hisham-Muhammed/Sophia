/*
Copyright (C) 2021 Queen Amdi.
Re edited by hisham
*/


//Basic requirements
const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const axios = require('axios');
const got = require("got");

// Config Checker
const read = require('../config');

//Language
const Language = require('../language');
const Lang = Language.getString('font');

if (read.WORKTYPE == 'private') {
    
	Asena.addCommand({pattern: 'fancy ?(.*)', fromMe: true, desc: Lang.FONT_DESC,  deleteCommand: false}, async (message, match) => {
        if (match[1] === 'xx') return await message.reply(Lang.NEED_WORD);
        const url = `https://hadi-api.herokuapp.com/api/font?teks=${match[1]}`;
        const url1 = `https://hadi-api.herokuapp.com/api/font2?teks=${match[1]}`;
        try {
            const response = await got(url);
            const response1 = await got(url1);

            const json = JSON.parse(response.body);
            const json1 = JSON.parse(response1.body);

            if (response.statusCode === 200) return await message.client.sendMessage(message.jid, json.result + '\n\n' + json1.result , MessageType.text);
        } catch {
            return await message.client.sendMessage(message.jid, Lang.NO_RESULT, MessageType.text);
        }
    });
}

else if (read.WORKTYPE == 'public') {
    Asena.addCommand({pattern: 'fancy ?(.*)', fromMe: false, desc: Lang.FONT_DESC}, async (message, match) => {
        if (match[1] === 'xx') return await message.reply(Lang.NEED_WORD);
        const url = `https://hadi-api.herokuapp.com/api/font?teks=${match[1]}`;
        const url1 = `https://hadi-api.herokuapp.com/api/font2?teks=${match[1]}`;
        try {
            const response = await got(url);
            const response1 = await got(url1);

            const json = JSON.parse(response.body);
            const json1 = JSON.parse(response1.body);

            if (response.statusCode === 200) return await message.client.sendMessage(message.jid, json.result + '\n\n' + json1.result , MessageType.text);
        } catch {
            return await message.client.sendMessage(message.jid, Lang.NO_RESULT, MessageType.text);
        }
    });
}
