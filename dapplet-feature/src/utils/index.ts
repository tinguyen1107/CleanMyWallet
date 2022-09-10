
export const hide_hidden_tokens = () => {
    let hidden_tokens = localStorage.hidden_tokens;
    let listToken = document.querySelectorAll('div > div.token-box');
    if (!!hidden_tokens)
        listToken.forEach(element => {
            let title = element.querySelector('div.desc > span').title
            if (title != "" && hidden_tokens.includes(title)) { 
                element.style.display = 'none'
            }
        })
}
