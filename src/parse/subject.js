import { load } from 'cheerio';

function parse(id, pages={}) {
    const data = {id};
    for(const subType in pages) {
        switch (subType) {
            case 'default':
                Object.assign(data, parseDefault(pages[subType]));
                break;
            default:
                break;
        }
    }
    return data;
}

function parseDefault(html) {
    if(!html) return null;
    const $ = load(html);

    const title = parseTitle($);
    if(title == '坟场') return null;

    const type = parseType($);
    if(!type) return null;

    const summary = parseSummary($);
    const infobox = parseInfobox($);
    const chart = parseChart($);
    const tags = parseTags($);
    const connections = parseConnections($);
    return { title, type, summary, infobox, chart, tags, connections };
}

function parseTitle($) {
    // #headerSubject > h1.nameSingle > a
    return $('#headerSubject > h1.nameSingle > a').text();
}

function parseType($) {
    /**
     * 1 = book
     * 2 = anime
     * 3 = music
     * 4 = game
     * 6 = real
     */
    switch($('#navMenuNeue > li > a.focus > span').text()) {
        case '书籍': return 1;
        case '动画': return 2;
        case '音乐': return 3;
        case '游戏': return 4;
        case '三次元': return 6;
        default: return 0;
    }
}

function parseSummary($) {
    // #subject_summary
    return $('#subject_summary').text();
}

function parseInfobox($) {
    // #infobox
    const infobox = {};
    $('#infobox').text().split('\n')
    .map(v=>v.split(': '))
    .forEach(([k='',v=''])=>{
        k = k.trim();
        if(!k) return;
        v = v.trim();
        switch(k) {
            case '别名':
            case '中文名': break;
            default:
                v = v.split('、');
        }
        if(Array.isArray(infobox[k])) infobox[k].push(v);
        else if(infobox[k]) infobox[k] = [infobox[k], v];
        else infobox[k] = v;

        if(Array.isArray(infobox[k])) {
            infobox[k] = infobox[k].flat();
            if(infobox[k].length == 1)
                infobox[k] = infobox[k][0];
        }
    });
    return infobox;
}

function parseChart($) {
    // #ChartWarpper > ul.horizontalChart
    const chart = {};
    $("#ChartWarpper > ul.horizontalChart > li")
    .each((i, li)=>{
        li = $(li);
        chart[li.find('span.label').text()] = Number(li.find('span.count').text().replace(/[\(|\)]/g,''));
    });
    return chart;
}

function parseTags($) {
    // #subject_detail > div.subject_tag_section > div.inner > a
    const tags = [];
    $("#subject_detail > div.subject_tag_section > div.inner > a")
    .each((i, a)=>{
        a = $(a);
        tags.push([a.find('span').text(), Number(a.find('small.gery').text())]);
    });
    return tags;
}

function parseConnections($) {
    // div.subject_section > div.content_inner > ul.browserCoverMedium > li
    const connections = {};
    let connectionTag;
    $("div.subject_section > div.content_inner > ul.browserCoverMedium > li")
    .each((i, li)=>{
        li = $(li);
        if(li.hasClass('sep')) {
            connectionTag = li.find("span.sub").text().trim();
            connections[connectionTag] = [];
        };
        const data = {};
        data.title = li.find('a.title').text().trim();
        data.subject = li.find('a.title').attr('href').replace('/subject/','');
        connections[connectionTag].push(data);
    });
    return connections;
}

export default parse;