import { HIDDEN_NFT_COLLECTIONS_KEY, SHOW_NFT_COLLECTION_STATE_KEY } from '../../constants';
import { hide_hidden_nft_collection } from '../../utils';

export const hideNFT = (ctx: any, me: any) => {
    const token_box = ctx.insertPoint;
    const desc = token_box.querySelector('div > div.desc > a');

    const show_token_state = localStorage.getItem(SHOW_NFT_COLLECTION_STATE_KEY);
    if (!show_token_state || show_token_state == 'hide') token_box.style.display = 'none';
    me.state = 'HIDE';

    const raw = localStorage.getItem(HIDDEN_NFT_COLLECTIONS_KEY);
    let hiddenTokens: any;

    if (!raw) hiddenTokens = [];
    else hiddenTokens = JSON.parse(raw);

    hiddenTokens.push(desc.href);

    localStorage.setItem(HIDDEN_NFT_COLLECTIONS_KEY, JSON.stringify(hiddenTokens));
};

export const showNFT = (ctx: any, me) => {
    const token_box = ctx.insertPoint;
    const desc = token_box.querySelector('div > div.desc > a');
    // if (desc.querySelector('a') === undefined) return;

    token_box.style.display = 'flex';
    me.state = 'DEFAULT';

    const raw = localStorage.getItem(HIDDEN_NFT_COLLECTIONS_KEY);
    let hiddenTokens: any;

    if (!raw) hiddenTokens = [];
    else hiddenTokens = JSON.parse(raw);

    hiddenTokens = hiddenTokens.filter((e) => e !== desc.href);

    localStorage.setItem(HIDDEN_NFT_COLLECTIONS_KEY, JSON.stringify(hiddenTokens));
};

export const showAllNFTs = (_, me) => {
    me.state = 'HIDE';
    const listToken = document.querySelectorAll('div > div.nft-box');
    listToken.forEach((e: HTMLElement) => {
        e.style.display = 'flex';
    });
    localStorage.setItem(SHOW_NFT_COLLECTION_STATE_KEY, 'show_all');
};

export const hideHiddenNFTs = (_, me) => {
    me.state = 'SHOW';
    hide_hidden_nft_collection();
    localStorage.setItem(SHOW_NFT_COLLECTION_STATE_KEY, 'hide');
};
