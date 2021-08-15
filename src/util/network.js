/**
 * 获取bgm页面
 */
import axios from 'axios';

const HOST = 'https://bgm.tv';
const types = {
    BLOG: 'blog', // 日志
    CHARACTER: 'character', // 角色
    EP: 'ep', // 章节
    GROUP: 'group', // 小组
    GROUP_LIST: 'group/all', // 小组列表
    GROUP_TOPIC: 'group/topic', // 小组话题
    INDEX: 'index', // 目录
    INDEX_LIST: 'index/browser', // 目录列表
    PERSON: 'person', // 人物
    SUBJECT: 'subject', // 条目
    SUBJECT_TOPIC: 'subject/topic', // 条目讨论
    USER: 'user', // 用户
};

function getUrls(type, id) {
    switch(type) {
        case types.BLOG: return {
            default: `${HOST}/${type}/${id}`, // 日志
        };
        case types.CHARACTER: return {
            default: `${HOST}/${type}/${id}`, // 角色
            collections: `${HOST}/${type}/${id}/collections`, // 角色收藏
        };
        case types.EP: return {
            default: `${HOST}/${type}/${id}`, // 章节
        };
        case types.GROUP: return {
            default: `${HOST}/${type}/${id}`, // 小组
            forum: `${HOST}/${type}/${id}/forum`, // 小组讨论列表
            members: `${HOST}/${type}/${id}/members`, // 小组成员列表
        };
        case types.GROUP_LIST: return {
            default: `${HOST}/${type}`, // 小组列表
        };
        case types.GROUP_TOPIC: return {
            default: `${HOST}/${type}/${id}`, // 小组话题
        };
        case types.INDEX: return {
            default: `${HOST}/${type}/${id}`, // 目录
            comments: `${HOST}/${type}/${id}/comments`, // 目录留言
        };
        case types.INDEX_LIST: return {
            default: `${HOST}/${type}`, // 目录列表
        };
        case types.PERSON: return {
            default: `${HOST}/${type}/${id}`, // 人物
            voice: `${HOST}/${type}/${id}/works/voice`, // 人物角色
            works: `${HOST}/${type}/${id}/works`, // 人物作品
            collections: `${HOST}/${type}/${id}/collections`, // 人物收藏
        };
        case types.SUBJECT: return {
            default: `${HOST}/${type}/${id}`, // 条目
            ep: `${HOST}/${type}/${id}/ep`, // 条目章节
            characters: `${HOST}/${type}/${id}/characters`, // 条目角色
            persons: `${HOST}/${type}/${id}/persons`, // 条目staff
            comments: `${HOST}/${type}/${id}/comments`, // 条目吐槽
            reviews: `${HOST}/${type}/${id}/reviews`, // 条目评论
            board: `${HOST}/${type}/${id}/board`, // 条目讨论版
        };
        case types.SUBJECT_TOPIC: return {
            default: `${HOST}/${type}/${id}`, // 条目讨论帖
        };
        case types.USER: return {
            default: `${HOST}/${type}/${id}`, // 用户时光机

            mono: `${HOST}/${type}/${id}/mono`, // 用户人物收藏
            mono_character: `${HOST}/${type}/${id}/mono/character`, // 用户虚拟人物收藏
            mono_person: `${HOST}/${type}/${id}/mono/person`, // 用户现实人物收藏

            blog: `${HOST}/${type}/${id}/blog`, // 用户日志

            index: `${HOST}/${type}/${id}/index`, // 用户目录
            collect: `${HOST}/${type}/${id}/collect`, // 用户收藏的目录

            timeline: `${HOST}/${type}/${id}/timeline`, // 用户时间胶囊

            groups: `${HOST}/${type}/${id}/groups`, // 用户参与的小组

            friends: `${HOST}/${type}/${id}/friends`, // 用户好友
            rev_friends: `${HOST}/${type}/${id}/rev_friends`, // 用户反向好友

            wiki: `${HOST}/${type}/${id}/wiki`, // 用户维基
            wiki_character: `${HOST}/${type}/${id}/wiki/character`, // 用户维基角色
            wiki_person: `${HOST}/${type}/${id}/wiki/person`, // 用户维基人物
            wiki_ep: `${HOST}/${type}/${id}/wiki/ep`, // 用户维基章节
            wiki_subject_relation: `${HOST}/${type}/${id}/wiki/subject_relation`, // 用户维基条目关联
            wiki_subject_person_relation: `${HOST}/${type}/${id}/wiki/subject_person_relation`, // 用户维基人物关联
            wiki_subject_character_relation: `${HOST}/${type}/${id}/wiki/subject_character_relation`, // 用户维基角色关联

            anime_wish: `${HOST}/anime/list/${id}/wish`, // 用户动画想看
            anime_collect: `${HOST}/anime/list/${id}/collect`, // 用户动画看过
            anime_do: `${HOST}/anime/list/${id}/do`, // 用户动画在看
            anime_on_hold: `${HOST}/anime/list/${id}/on_hold`, // 用户动画搁置
            anime_dropped: `${HOST}/anime/list/${id}/dropped`, // 用户动画抛弃

            book_wish: `${HOST}/book/list/${id}/wish`, // 用户书籍想读
            book_collect: `${HOST}/book/list/${id}/collect`, // 用户书籍读过
            book_do: `${HOST}/book/list/${id}/do`, // 用户书籍在读
            book_on_hold: `${HOST}/book/list/${id}/on_hold`, // 用户书籍搁置
            book_dropped: `${HOST}/book/list/${id}/dropped`, // 用户书籍抛弃

            game_wish: `${HOST}/game/list/${id}/wish`, // 用户游戏想玩
            game_collect: `${HOST}/game/list/${id}/collect`, // 用户游戏玩过
            game_do: `${HOST}/game/list/${id}/do`, // 用户游戏在玩
            game_on_hold: `${HOST}/game/list/${id}/on_hold`, // 用户游戏搁置
            game_dropped: `${HOST}/game/list/${id}/dropped`, // 用户游戏抛弃

            music_wish: `${HOST}/music/list/${id}/wish`, // 用户音乐想听
            music_collect: `${HOST}/music/list/${id}/collect`, // 用户音乐听过
            music_do: `${HOST}/music/list/${id}/do`, // 用户音乐在听
            music_on_hold: `${HOST}/music/list/${id}/on_hold`, // 用户音乐搁置
            music_dropped: `${HOST}/music/list/${id}/dropped`, // 用户音乐抛弃

            real_wish: `${HOST}/real/list/${id}/wish`, // 用户电视剧想看
            real_collect: `${HOST}/real/list/${id}/collect`, // 用户电视剧看过
            real_do: `${HOST}/real/list/${id}/do`, // 用户电视剧在看
            real_on_hold: `${HOST}/real/list/${id}/on_hold`, // 用户电视剧搁置
            real_dropped: `${HOST}/real/list/${id}/dropped`, // 用户电视剧抛弃

        };
        default: return {};
    }

}

function getUrl(type, id, subType='default') {
    return getUrls(type, id)[subType];
}

const headers = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4595.0 Safari/537.36',
    Cookie:
        'chii_cookietime=0; prg_display_mode=tiny; chii_theme_choose=1; chii_theme=dark; chii_sec_id=dDiHmgsO3OzT745yiZFnpTZG+OzlKgvp2F342rXH; chii_sid=zwz0wH',
};

async function getPage(type, id, subType='default') {
    const url = getUrl(type, id, subType);
    return (await axios({ url, headers })).data;
}

export { types, getUrls, getUrl, getPage };