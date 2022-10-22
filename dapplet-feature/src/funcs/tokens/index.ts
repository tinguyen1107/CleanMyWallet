import { HIDDEN_TOKENS_KEY, SHOW_TOKEN_STATE_KEY } from '../../constants';
import { hide_hidden_tokens } from '../../utils';

export const hideToken = (ctx: any, me: any) => {
    const token_box = ctx.insertPoint;
    const desc = token_box.querySelector('div > div.desc > span');
    if (desc.querySelector('a') === undefined) return;

    const show_token_state = localStorage.getItem(SHOW_TOKEN_STATE_KEY);
    if (!show_token_state || show_token_state == 'hide') token_box.style.display = 'none';
    me.state = 'HIDE';

    const raw = localStorage.getItem(HIDDEN_TOKENS_KEY);
    let hiddenTokens: any;

    if (!raw) hiddenTokens = [];
    else hiddenTokens = JSON.parse(raw);

    hiddenTokens.push(desc.title);

    localStorage.setItem(HIDDEN_TOKENS_KEY, JSON.stringify(hiddenTokens));
};

export const showToken = (ctx: any, me: any) => {
    const token_box = ctx.insertPoint;
    const desc = token_box.querySelector('div > div.desc > span');
    if (desc.querySelector('a') === undefined) return;

    token_box.style.display = 'flex';
    me.state = 'DEFAULT';

    const raw = localStorage.getItem(HIDDEN_TOKENS_KEY);
    let hiddenTokens: any;

    if (!raw) hiddenTokens = [];
    else hiddenTokens = JSON.parse(raw);

    hiddenTokens = hiddenTokens.filter((e: any) => e !== desc.title);

    localStorage.setItem(HIDDEN_TOKENS_KEY, JSON.stringify(hiddenTokens));
};

export const showAllTokens = (_: any, me: any) => {
    me.state = 'HIDE';
    const listToken = document.querySelectorAll('div > div.token-box');
    listToken.forEach((e: HTMLElement) => {
        e.style.display = 'flex';
    });
    localStorage.setItem(SHOW_TOKEN_STATE_KEY, 'show_all');
};

export const hideHiddenTokens = (_: any, me: any) => {
    me.state = 'SHOW';
    hide_hidden_tokens();
    localStorage.setItem(SHOW_TOKEN_STATE_KEY, 'hide');
};
