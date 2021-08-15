import { load } from 'cheerio';

function parse(number, pages={}) {
    const data = {number};
    for(const subType in pages) {
        const pageHTML = pages[subType];
        let parseFunction;
        switch (subType) {
            case 'default': parseFunction = parseDefault; break;
            case 'friends': parseFunction = parseFriends; break;
            default: continue;
        }
        Object.assign(data, parseFunction(pageHTML));
    }
    return data;
}

function parseDefault(html) {
    if(!html) return null;
    const $ = load(html);

    const id = parseId($);
    const nickname = parseNickName($);
    const bio = parseBio($);
    const regist_time = parseRegistTime($);
    const network_service = parseNetworkService($);

    return { id, nickname, bio, regist_time, network_service };
}

function parseFriends(html) {
    if(!html) return null;
    const $ = load(html);

    // ul#memberUserList > li
    const friends = [];
    $("ul#memberUserList > li")
    .each((i, li)=>{
        li = $(li);
        friends.push(
            li.find('strong > a.avatar').attr('href').replace('/user/','').trim()
        );
    });
    return { friends };
}

function parseId($) {
    // #headerProfile > div.subjectNav > div.headerContainer > h1.nameSingle > div.inner > small.grey
    return $('#headerProfile > div.subjectNav > div.headerContainer > h1.nameSingle > div.inner > small.grey').text().trim().substr(1);
}

function parseNickName($) {
    // #headerProfile > div.subjectNav > div.headerContainer > h1.nameSingle > div.inner > small.grey
    return $('#headerProfile > div.subjectNav > div.headerContainer > h1.nameSingle > div.inner > a').text().trim();
}

function parseBio($) {
    // div.bio
    return $('div.bio').html();
}
function parseRegistTime($) {
    // ul.network_service > li
    return $($("ul.network_service > li")[0]).find("span.tip").text().replace('加入','').trim();
}

function parseNetworkService($) {
    // ul.network_service > li

    const network_service = {};
    $("ul.network_service > li")
    .each((i, li)=>{
        if(!i) return;
        li = $(li);
        network_service[li.find('span.service').text()] = {
            id: li.find('a').text().trim(),
            link: li.find('a').attr('href')
        };
    });
    return network_service;
}



export default parse;