import crawl from './src/crawl/index.js';
import { types } from './src/util/network.js';

async function main(start=1,end=620950,thread=1) {
    const TYPE = types.USER;
    const list = [];
    for(let i = start; i <= end; i++) list.push(i);

    const next = ()=>list.shift();
    const crawlIt = async t => {
        let i;
        while(i = next()) {
            console.info(`User ${i}`);
            // if(await crawl.checkCache(TYPE, i)) continue;
            try{
                await crawl.getPage(TYPE, i);
                await crawl.getPage(TYPE, i, 'friends');
            } catch(e) {
                console.error(`ERROR User ${i}`);
                console.error(e);
            }
        }

    };
    for(let i = 1; i <= thread; i++) crawlIt(i);

}
main(1, 620950, 32);