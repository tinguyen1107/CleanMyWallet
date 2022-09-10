export const hide_hidden_tokens = () => {
    const hidden_tokens = localStorage.hidden_tokens;
    const listToken = document.querySelectorAll('div > div.token-box');
    if (hidden_tokens)
        listToken.forEach((element) => {
            const title = element.querySelector('div.desc > span').title;
            if (title != '' && hidden_tokens.includes(title)) {
                element.style.display = 'none';
            }
        });
};
