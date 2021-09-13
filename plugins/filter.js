/* Copyright (C) 2020 ameer-kallumthodi.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/
const fs = require('fs')
const Asena = require('../events');
const {MessageType, Mimetype } = require('@adiwajshing/baileys');
const FilterDb = require('./sql/filters');
const Config = require('../config')
const jid = Config.DISBGM != false ? Config.DISBGM.split(',') : [];
const Language = require('../language');
const Lang = Language.getString('filters');

if (Config.WORKTYPE == 'private') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
Asena.addCommand({on: 'text', fromMe: false }, (async (message, match) => {
    if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '918078521369@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/alive.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['Bangster','avide','Ayyo','bgm','brazil','Chirichu','Dilko','Dont','Go','Hoi','Illa','Kittilla','kollam','Mind','Mone','More','NMR','NO','Old','Padi','Pm','Stay','@','1','2','3g','4','5','6','7','10','18','aaa','aara','adi','Adipoli','Africa','Aha','alive','Alone','Andi','Anthas','Arakkal','Arula','Arumilla','As','atha','Avanmar','avide evide','Award','Ayinu','Ayn','Ayye','Ayyo ayyo','Ba','Background','BASITH','Beggin','Believer','Bgm idu','Bhai','bigbro','Biscuit chaya','Boss','brazil','Bro','Cfa','Chekuthan','Chellakutty','Chiri','Christmas','Chunk','Chunke','Chunks','Come on','Come','cr7','Da','Dada','dead','Devil','Dilko karar aya','Dont play with me','Dora','Eda','Eee','Endha endha','Endha','Enemy','Ente mone','Entry','Eppo','Etha','Fake','Fan','Fans','ff','Friend','Friends','Fuck you','Full','Girl','Go go','Good morning','Good night','Group','Grp','Habibi','Haha','hai','happy','harmone','help','I love you','menu','Idfc','Ikka','Illa illa','iloveyou','Indian army','Innale','Iranguva','Iri','Its my life','Jai','Jilebi','Jinn','Kalam','Karanju','kgf','Kili poyi','Killadi','King','Kings','Kittilla crush','Kitty','Kollam','Lalettan','Mama','mammootty','mass','Master','Members','Messi','Midukkan','Mind','mm','Mohanlal','Morning','mrng','Myr','Myran','Myre','N dance','Nadiyon pyar','Nallavan','Nanban','Nanbane','Nari','Naughtyboy','nemisis','Neymar','Ni etha','Nirth','Nirthikko','Nj','njr','NMR nmr','No no','Nokkada','Number','Ok','Old life','Ond','One more','Padi insult','Padik','para','Parayan','Pever','Pha','pinne','Pm pm','Poda','Pode','potte','power','Poyi','Puli','Punda','Rasputin','Re','Revenge','Romantic','sad','Saji','Salt','Sarasu','Sarasuve','sed','Set','Shakthi','Shalyam','Shamil','Show show','Single','Sneham','song','Sulthan','Sundari','Super','Tell me','Thakkali','Thamasha','Tharavadu','Tharilla','Theri','Therikkum','Tune','uff','Umbathe','Umbi','Unstoppable','Urangu','va','Vada','Vannu','Vayya','Venda','Verum','Voice','Wonder','xxx','You','Aah','Adipoli','hi','Irunno','Oo','Ooo','Poda myre','Poli sanam','Poli','Poliya','Pottum','varuva','Wow','Cola','Hlo','Hi','Freefire','11','Basith','Bhai','Bigb','Face','Hy','Kozhi','mukesh','Ok','power','Redbee','Sarasuve','Simple','Tale']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }
    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
}
else if (Config.WORKTYPE == 'public') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
        if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '918078521369@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/alive.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['Bangster','avide','Ayyo','bgm','brazil','Chirichu','Dilko','Dont','Go','Hoi','Illa','Kittilla','kollam','Mind','Mone','More','NMR','NO','Old','Padi','Pm','Stay','@','1','2','3g','4','5','6','7','10','18','aaa','aara','adi','Adipoli','Africa','Aha','alive','Alone','Andi','Anthas','Arakkal','Arula','Arumilla','As','atha','Avanmar','avide evide','Award','Ayinu','Ayn','Ayye','Ayyo ayyo','Ba','Background','BASITH','Beggin','Believer','Bgm idu','Bhai','bigbro','Biscuit chaya','Boss','brazil','Bro','Cfa','Chekuthan','Chellakutty','Chiri','Christmas','Chunk','Chunke','Chunks','Come on','Come','cr7','Da','Dada','dead','Devil','Dilko karar aya','Dont play with me','Dora','Eda','Eee','Endha endha','Endha','Enemy','Ente mone','Entry','Eppo','Etha','Fake','Fan','Fans','ff','Friend','Friends','Fuck you','Full','Girl','Go go','Good morning','Good night','Group','Grp','Habibi','Haha','hai','happy','harmone','help','I love you','menu','Idfc','Ikka','Illa illa','iloveyou','Indian army','Innale','Iranguva','Iri','Its my life','Jai','Jilebi','Jinn','Kalam','Karanju','kgf','Kili poyi','Killadi','King','Kings','Kittilla crush','Kitty','Kollam','Lalettan','Mama','mammootty','mass','Master','Members','Messi','Midukkan','Mind','mm','Mohanlal','Morning','mrng','Myr','Myran','Myre','N dance','Nadiyon pyar','Nallavan','Nanban','Nanbane','Nari','Naughtyboy','nemisis','Neymar','Ni etha','Nirth','Nirthikko','Nj','njr','NMR nmr','No no','Nokkada','Number','Ok','Old life','Ond','One more','Padi insult','Padik','para','Parayan','Pever','Pha','pinne','Pm pm','Poda','Pode','potte','power','Poyi','Puli','Punda','Rasputin','Re','Revenge','Romantic','sad','Saji','Salt','Sarasu','Sarasuve','sed','Set','Shakthi','Shalyam','Shamil','Show show','Single','Sneham','song','Sulthan','Sundari','Super','Tell me','Thakkali','Thamasha','Tharavadu','Tharilla','Theri','Therikkum','Tune','uff','Umbathe','Umbi','Unstoppable','Urangu','va','Vada','Vannu','Vayya','Venda','Verum','Voice','Wonder','xxx','You','Aah','Adipoli','hi','Irunno','Oo','Ooo','Poda myre','Poli sanam','Poli','Poliya','Pottum','varuva','Wow','Cola','Hlo','Hi','Freefire','11','Basith','Bhai','Bigb','Face','Hy','Kozhi','mukesh','Ok','power','Redbee','Sarasuve','Simple','Tale']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }

    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
    if(Config.AUTOSTICKER){
    let banned = jid.find( Jid => Jid === message.jid);
    if(banned !== undefined) return
    if (!!message.mention && message.mention[0] == '918078521369@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./sticker/song.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted : message.data, ptt: false})
    }
const array = ['Pikachu','Msd','Vijay','Rashmika','song','Sry','Line','Aarulle','achodaa','ayin','Aysheri','Ayye','Ayyo','broken','bye','chattho','cute','Da','Eee','Eee2','engane und','Entha','Enthada','Girls','Good morning','Good night','Hi','Hy','ithokke enth','ivan','Kurippe','Kurumb','Love','Mm','naanam','nadakkatte','Ok','paavam','Pattumo','pikachu','Pm','poda','Pova','Save','setth','sho','Shoo','Smile','tag','Udayipp','umma','Vaa','Vannu','yo','ys' ]
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
   await message.client.sendMessage(message.jid, fs.readFileSync('./sticker/' + a + '.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted: message.data, ptt: false})
}
});
}

var filtreler = await FilterDb.getFilter(message.jid);
if (!filtreler) return; 
filtreler.map(
    async (filter) => {
        pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
        if (pattern.test(message.message)) {
            await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
        }
    }
);
}));
}
