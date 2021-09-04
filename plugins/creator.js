const asena = require('../events');

const {MessageType} = require('@adiwajshing/baileys');

const OWNER = "it sends details of owner"

const GIT = "it sends links"

const Config = require('../config');

if (Config.WORKTYPE == 'private') {

        asena.addCommand({pattern: 'owner', fromMe: true, deleteCommand: true, desc: OWNER,}, (async (message, match) => {

    var r_text = new Array ();

    

    r_text[1] = "*╔═════😎KANNAPPI😎═════╗*\n           \n*⚜═Sophia═⚜*\n\n*owner Hisham - http://Wa.me/+919567941560*\n* *\n🔰instagram:- https://instagram.com/_jr_nihal_?utm_medium=copy_link*            *\n*╚══════🔱🔱🔱🔱🔱═════╝*\n\n*▷Creator: JR-NIHAL*"

    

    await message.client.sendMessage(

        message.jid,(r_text[1]), MessageType.text);

    }));

        asena.addCommand({pattern: 'git', fromMe: true, deleteCommand: true, desc: GIT,}, (async (message, match) => {

        var r_text = new Array ();

    

        r_text[1] = "*Git links*\n           *\n💥═Kannappi Owner JR-NIHAL═💥*\n\n*💘 https://github.com/jr-nihal-kkd/kannappi*\n*"

    

        await message.client.sendMessage(

            message.jid,(r_text[1]), MessageType.text);

    

        }));    

    }

    

    if (Config.WORKTYPE == 'public') {

        asena.addCommand({pattern: 'creator', fromMe: false, deleteCommand: true, desc: OWNER,}, (async (message, match) => {

    var r_text = new Array ();

    

    r_text[1] = "*╔═════😎KANNAPPI😎═════╗*\n           \n*⚜═kannappi═⚜*\n\n*owner JR-NIHAL - http://Wa.me/+919567941560*\n* *\n🔰Youtube: https://youtu.be/_vW1_apf9tQ*            *\n*╚══════🔱🔱🔱🔱🔱═════╝*\n\n*▷Creator: JR-NIHAL*"

    

    await message.client.sendMessage(

        message.jid,(r_text[1]), MessageType.text);

    }));

        asena.addCommand({pattern: 'git', fromMe: false, deleteCommand: true, desc: GIT,}, (async (message, match) => {

        var r_text = new Array ();

    

        r_text[1] = "*Git links*\n           *\n💥═kannappi Owner JR-NIHAL═💥*\n\n*💘 https://github.com/jr-nihal-kkd/kannappi*\n*     *\n\n⚜yt link:- https://youtu.be/_vW1_apf9tQ*"

    

        await message.client.sendMessage(

            message.jid,(r_text[1]), MessageType.text);

    

        }));    

    }

