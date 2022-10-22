import { HIDDEN_TOKENS_KEY, SHOW_TOKEN_STATE_KEY } from '../constants';

export const hideTokenButton = (component: any): any => {
    return (ctx: any) => {
        const token_box = ctx.insertPoint;
        const desc = token_box.querySelector('div > div.desc > span > a');
        console.log('tui goi ne, ', desc);
        if (!desc) {
            return;
        }

        const title = token_box.querySelector('div.desc > span').getAttribute('title');

        const hidden_tokens = localStorage.getItem(HIDDEN_TOKENS_KEY);
        const isHide = hidden_tokens && hidden_tokens.includes(title);

        return component({
            initial: isHide ? 'HIDE' : 'DEFAULT',
            DEFAULT: {
                label: 'hide',
                tooltip: 'Show in the alert',
                icon: 'far fa-eye-slash',
                exec: (_, me) => {
                    const token_box = ctx.insertPoint;
                    const desc = token_box.querySelector('div > div.desc > span');
                    if (desc.querySelector('a') === undefined) return;

                    const show_token_state = localStorage.getItem(SHOW_TOKEN_STATE_KEY);
                    if (!show_token_state || show_token_state == 'hide')
                        token_box.style.display = 'none';
                    me.state = 'HIDE';

                    // ctx.insertPoint.remove()
                    const raw = localStorage.getItem(HIDDEN_TOKENS_KEY);
                    let hiddenTokens: any;

                    if (!raw) hiddenTokens = [];
                    else hiddenTokens = JSON.parse(raw);

                    hiddenTokens.push(desc.title);

                    localStorage.setItem(HIDDEN_TOKENS_KEY, JSON.stringify(hiddenTokens));
                    // ctx.insertPoint.style.display = 'none';
                    // const newElement = document.createElement(null);
                    // ctx.insertPoint.parentElement.appendChild(newElement)
                    // console.log("tinguyen, ", localStorage.hidden_tokens);
                    // newElement.outerHTML = localStorage.hidden_tokens;
                },
            },
            HIDE: {
                label: 'show',
                tooltip: 'Show this token as default',
                icon: 'far fa-eye',
                exec: (ctx: any, me) => {
                    const token_box = ctx.insertPoint;
                    const desc = token_box.querySelector('div > div.desc > span');
                    if (desc.querySelector('a') === undefined) return;

                    token_box.style.display = 'flex';
                    me.state = 'DEFAULT';

                    const raw = localStorage.getItem(HIDDEN_TOKENS_KEY);
                    let hiddenTokens: any;

                    if (!raw) hiddenTokens = [];
                    else hiddenTokens = JSON.parse(raw);

                    hiddenTokens = hiddenTokens.filter((e) => e !== desc.title);

                    localStorage.setItem(HIDDEN_TOKENS_KEY, JSON.stringify(hiddenTokens));
                },
            },
        });
    };
};
