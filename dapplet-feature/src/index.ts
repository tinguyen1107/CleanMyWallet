import { } from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './assets/icons/ex08.png';
import HIDE_ICON from './assets/icons/hide-icon.png';
import TRASH_ICON from './assets/icons/trash-icon.png';
import GRAY_IMG from './assets/icons/ex08-gray.png';
import GOOGLE_IMG from './assets/icons/ex08-quatro.png';
import HI_GIF from './assets/imgs/giphy.gif';
import { hide_hidden_nft_collection, hide_hidden_tokens } from './utils';
import {
    HIDDEN_NFT_COLLECTIONS_KEY,
    HIDDEN_TOKENS_KEY,
    SHOW_NFT_COLLECTION_STATE_KEY,
    SHOW_TOKEN_STATE_KEY,
} from './constants';

import * as Tokens from './funcs/tokens';
import * as NFTs from './funcs/nfts';

@Injectable
export default class NearWalletFeature {
    // LP: insert the correct adapter
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @Inject('clean-my-wallet-adapter.dapplet-base.eth') public adapter: any; // LP end
    private overlay = Core.overlay({ name: 'main', title: 'Example 14' });

    activate(): void {
        const { button, result, bar } = this.adapter.exports;

        console.log('activate', this.adapter);
        hide_hidden_tokens();
        hide_hidden_nft_collection();
        const iconScript = document.createElement('script');
        document.head.appendChild(iconScript);
        iconScript.setAttribute('src', 'https://kit.fontawesome.com/3954a9e6ce.js');
        iconScript.setAttribute('crossorigin', 'anonymous');
        iconScript.onload = () => {
            console.log('Loaded font awesome');
        };

        console.log('call activate');
        this.adapter.attachConfig({
            REMOVE_NFT_BUTTON: (ctx: any) => {
                const urlParsed = document.URL.split('/').slice(-2);
                console.log('url', urlParsed);
                return button({
                    initial: 'DEFAULT',
                    DEFAULT: {
                        label: 'Remove',
                        tooltip: 'Remove this NFT',
                        img: TRASH_ICON,
                        icon: 'fa-solid fa-trash',
                        exec: () => this.removeNFTHandler(urlParsed[0], urlParsed[1]),
                    },
                });
            },
            // TOKEN_TOOL_BAR: (ctx) => {
            //     hide_hidden_tokens();
            //     return bar({
            //         initial: 'SHOW',
            //         SHOW: {
            //             label: 'Show all tokens',
            //             tooltip: 'Show in the alert',
            //             img: HIDE_ICON,
            //             exec: Tokens.showAllTokens,
            //         },
            //         HIDE: {
            //             label: 'Hide hidden tokens',
            //             tooltip: 'Show in the alert',
            //             img: HIDE_ICON,
            //             exec: Tokens.hideHiddenTokens,
            //         },
            //     });
            // },
            HIDE_TOKEN_BUTTON: (ctx: any) => {
                console.log('tinguyen before activate token button');
                const token_box = ctx.insertPoint;
                // const desc = token_box.querySelector('div > div.desc > span > a');
                // if (!desc) return;

                const title = token_box.querySelector('div.desc > span').getAttribute('title');
                const hidden_tokens = localStorage.getItem(HIDDEN_TOKENS_KEY);
                const isHide = hidden_tokens && hidden_tokens.includes(title);
                console.log('tinguyen activate token button');

                return button({
                    initial: isHide ? 'HIDE' : 'DEFAULT',
                    DEFAULT: {
                        label: 'hide',
                        tooltip: 'Hide this token',
                        img: HIDE_ICON,
                        icon: 'far fa-eye-slash',
                        exec: Tokens.hideToken,
                    },
                    HIDE: {
                        label: 'show',
                        tooltip: 'Show this token as default',
                        img: HIDE_ICON,
                        icon: 'far fa-eye',
                        exec: Tokens.showToken,
                    },
                });
            },
            REMOVE_TOKEN_BUTTON: (ctx: any) => {
                return button({
                    initial: 'DEFAULT',
                    DEFAULT: {
                        label: 'hide',
                        tooltip: 'tip other',
                        img: TRASH_ICON,
                        icon: 'fa-solid fa-trash',
                        exec: this.removeButtonClickHandler,
                    },
                });
            },
            SHOW_ALL_BUTTON: (ctx) => {
                hide_hidden_tokens();
                return button({
                    initial: 'SHOW',
                    SHOW: {
                        label: 'Show all tokens',
                        tooltip: 'Show in the alert',
                        img: HIDE_ICON,
                        exec: Tokens.showAllTokens,
                    },
                    HIDE: {
                        label: 'Hide hidden tokens',
                        tooltip: 'Show in the alert',
                        img: HIDE_ICON,
                        exec: Tokens.hideHiddenTokens,
                    },
                });
            },
            HIDE_NFT_COLLECTION_BUTTON: (ctx) => {
                const token_box = ctx.insertPoint;
                const desc = token_box.querySelector('div > div.desc');
                if (!desc) return;

                const title = token_box.querySelector('div.desc > a').getAttribute('href');
                const hidden_tokens = localStorage.getItem(HIDDEN_NFT_COLLECTIONS_KEY);
                const isHide = hidden_tokens && hidden_tokens.includes(title);

                return button({
                    initial: isHide ? 'HIDE' : 'DEFAULT',
                    DEFAULT: {
                        label: 'hide',
                        tooltip: 'Hide this token',
                        img: HIDE_ICON,
                        icon: 'far fa-eye-slash',
                        exec: NFTs.hideNFT,
                    },
                    HIDE: {
                        label: 'show',
                        tooltip: 'Show this token as default',
                        img: HIDE_ICON,
                        icon: 'far fa-eye',
                        exec: NFTs.showNFT,
                    },
                });
            },
            SHOW_ALL_NFT_COLLECTION_BUTTON: (ctx: any) => {
                hide_hidden_nft_collection();
                return button({
                    initial: 'SHOW',
                    SHOW: {
                        label: 'Show all NFTs',
                        tooltip: 'Show all NFTs',
                        img: HIDE_ICON,
                        exec: NFTs.showAllNFTs,
                    },
                    HIDE: {
                        label: 'Hide hidden NFTs',
                        tooltip: 'Hide hidden NFTs',
                        img: HIDE_ICON,
                        exec: NFTs.hideHiddenNFTs,
                    },
                });
            },
        });
    }

    removeButtonClickHandler = async (tweet: any) => {
        console.log(`this is arg: ${JSON.stringify(tweet)}`);
        // this.overlay.open();

        // LP: 7. Create new NEAR session or reuse existing
        const prevSessions = await Core.sessions();
        const prevSession = prevSessions.find((x) => x.authMethod === 'near/testnet');
        const session =
            prevSession ??
            (await Core.login({ authMethods: ['near/testnet'], target: this.overlay }));
        // LP end

        // LP: 8. NEAR wallet interaction
        const wallet = await session.wallet();
        console.log('Your NEAR address', wallet.accountId);
        // LP end

        // LP: 9. NEAR contract interaction
        const contract = await session.contract(tweet.ftContracId, {
            changeMethods: ['storage_unregister'],
        });

        contract.account.functionCall(
            tweet.ftContracId,
            'storage_unregister',
            { force: true },
            undefined,
            '1',
        );

        // const tweets = await contract.getTweets({ nearId: wallet.accountId }); // read
        // console.log('Tweets from NEAR contract', tweets);
        // await contract.storage_unregister({}); // write
        // LP end
    };

    removeNFTHandler = async (contractId: string, nftId: string) => {
        console.log(`this is arg: `, contractId, nftId);
        // this.overlay.open();

        // LP: 7. Create new NEAR session or reuse existing
        const prevSessions = await Core.sessions();
        const prevSession = prevSessions.find((x) => x.authMethod === 'near/testnet');
        const session =
            prevSession ??
            (await Core.login({ authMethods: ['near/testnet'], target: this.overlay }));
        // LP end

        // LP: 8. NEAR wallet interaction
        const wallet = await session.wallet();
        console.log('Your NEAR address', wallet.accountId);
        // LP end

        // LP: 9. NEAR contract interaction
        const contract = await session.contract(contractId, {
            changeMethods: ['nft_transfer'],
        });

        contract.account.functionCall(
            contractId,
            'nft_transfer',
            { receiver_id: 'black_hole.testnet', token_id: nftId },
            undefined,
            '1',
        );
    };
}
