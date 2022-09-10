import { HIDDEN_TOKENS_KEY } from "../constants";

export const hide_hidden_tokens = () => {
    const hidden_tokens = localStorage.getItem(HIDDEN_TOKENS_KEY);
    const listToken = document.querySelectorAll('div > div.token-box');
    if (hidden_tokens)
        listToken.forEach((element) => {
            const title = element.querySelector('div.desc > span').getAttribute('title');
            
            if (hidden_tokens.includes(title)) {
                element.style.display = 'none';
            }
        });
};
