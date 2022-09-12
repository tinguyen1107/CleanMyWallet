import { HIDDEN_NFT_COLLECTIONS_KEY, HIDDEN_TOKENS_KEY } from '../constants';

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

export const hide_hidden_nft_collection = () => {
    const hidden_nft_collection = localStorage.getItem(HIDDEN_NFT_COLLECTIONS_KEY);
    const listToken = document.querySelectorAll('div > div.nft-box');
    if (hidden_nft_collection)
        listToken.forEach((element) => {
            const title = element.querySelector('div.desc > a').getAttribute('href');

            if (hidden_nft_collection.includes(title)) {
                element.style.display = 'none';
            }
        });
};
