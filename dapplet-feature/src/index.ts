import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex08.png';
import HIDE_ICON from './icons/hide-icon.png';
import GRAY_IMG from './icons/ex08-gray.png';
import GOOGLE_IMG from './icons/ex08-quatro.png';
import HI_GIF from './imgs/giphy.gif';
import { hide_hidden_nft_collection, hide_hidden_tokens } from './utils';
import { HIDDEN_NFT_COLLECTIONS_KEY, HIDDEN_TOKENS_KEY, SHOW_NFT_COLLECTION_STATE_KEY, SHOW_TOKEN_STATE_KEY } from './constants';

// chrome.tabs.onUpdated.addListener(()=>{console.log('hello')})
//

// const searchResults = [
//     {
//         title: 'Types of Clouds | NOAA SciJinks - All About Weather',
//         link: 'https://scijinks.gov/clouds/',
//         description:
//             'Mammatus clouds. Mammatus clouds are actually altocumulus, cirrus,\
//       cumulonimbus, or other types of clouds that have these pouch-like shapes hanging \
//       out of the bottom. The pouches are created when cold air within the cloud sinks down \
//       toward the Earth. Weather prediction: Severe weather might be on its way!',
//     },
//     {
//         title: 'Clouds—facts and information - Science',
//         link: 'https://www.nationalgeographic.com/science/article/clouds-1',
//         description:
//             'Altostratus clouds may portend a storm. Nimbostratus clouds are thick \
//       and dark and can produce both rain and snow. Low clouds fall into four divisions: \
//       cumulus, stratus, cumulonimbus, and ...',
//     },
//     {
//         title: 'Types of Clouds | Live Science',
//         link: 'https://www.livescience.com/29436-clouds.html',
//         description:
//             'Clouds of great vertical development: These are the cumulonimbus clouds, \
//       often called a thunderhead because torrential rain, vivid lightning and thunder come \
//       from it. The tops of such clouds may ...',
//     },
// ];

@Injectable
export default class GoogleFeature {
    // LP: insert the correct adapter
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @Inject('example-google-adapter.dapplet-base.eth') public adapter: any; // LP end

    activate(): void {
        const { button, result } = this.adapter.exports;

        console.log('activate')
        hide_hidden_tokens();
        hide_hidden_nft_collection();
        const iconScript = document.createElement('script');
        document.head.appendChild(iconScript);
        iconScript.setAttribute('src', 'https://kit.fontawesome.com/3954a9e6ce.js');
        iconScript.setAttribute('crossorigin', 'anonymous');
        iconScript.onload = () => {
            console.log('handle on loaded');
        };

        window.addEventListener('hashchange', ()=>{
            console.log("tinguyen hashchange")
        })

        this.adapter.attachConfig({
            HIDE_TOKEN_BUTTON: (ctx: any) => {
                const token_box = ctx.insertPoint;
                const desc = token_box.querySelector('div > div.desc > span > a');
                // console.log('tui goi ne, ', desc);
                if (!desc) {
                    return;
                }

                const title = token_box.querySelector('div.desc > span').getAttribute('title');

                const hidden_tokens = localStorage.getItem(HIDDEN_TOKENS_KEY);
                const isHide = hidden_tokens && hidden_tokens.includes(title);

                return button({
                    initial: isHide ? 'HIDE' : 'DEFAULT',
                    DEFAULT: {
                        label: 'hide',
                        tooltip: 'Hide this token',
                        img: HIDE_ICON,
                        icon: 'far fa-eye-slash',
                        exec: (_, me) => {
                            const token_box = ctx.insertPoint;
                            const desc = token_box.querySelector('div > div.desc > span');
                            if (desc.querySelector('a') === undefined) return;

                            const show_token_state = localStorage.getItem(SHOW_TOKEN_STATE_KEY);
                            if (!show_token_state || show_token_state == 'hide')
                                token_box.style.display = 'none';
                            me.state = 'HIDE';

                            const raw = localStorage.getItem(HIDDEN_TOKENS_KEY);
                            let hiddenTokens: any;

                            if (!raw) hiddenTokens = [];
                            else hiddenTokens = JSON.parse(raw);

                            hiddenTokens.push(desc.title);

                            localStorage.setItem(HIDDEN_TOKENS_KEY, JSON.stringify(hiddenTokens));
                        },
                    },
                    HIDE: {
                        label: 'show',
                        tooltip: 'Show this token as default',
                        img: HIDE_ICON,
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
            },
            SHOW_ALL_BUTTON: (ctx) => {
                hide_hidden_tokens()
                return button({
                    initial: 'SHOW',
                    SHOW: {
                        label: 'Show all tokens',
                        tooltip: 'Show in the alert',
                        img: HIDE_ICON,
                        // LP: 4. add the execution - allert with search results: title, link, description
                        exec: (_, me) => {
                            me.state = 'HIDE';
                            const listToken = document.querySelectorAll('div > div.token-box');
                            listToken.forEach((e) => {
                                e.style.display = 'flex';
                            });
                            localStorage.setItem(SHOW_TOKEN_STATE_KEY, 'show_all');
                        },
                        // LP end
                    },
                    HIDE: {
                        label: 'Hide hidden tokens',
                        tooltip: 'Show in the alert',
                        img: HIDE_ICON,
                        // LP: 4. add the execution - allert with search results: title, link, description
                        exec: (_, me) => {
                            me.state = 'SHOW';
                            hide_hidden_tokens();
                            localStorage.setItem(SHOW_TOKEN_STATE_KEY, 'hide');
                        },
                        // LP end
                    },
                })
            },
            HIDE_NFT_COLLECTION_BUTTON: (ctx) => {
                const token_box = ctx.insertPoint;
                const desc = token_box.querySelector('div > div.desc');
                // console.log('tui goi ne nft, ', desc);
                if (!desc) {
                    return;
                }

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
                        exec: (_, me) => {
                            const token_box = ctx.insertPoint;
                            const desc = token_box.querySelector('div > div.desc > a');

                            const show_token_state = localStorage.getItem(SHOW_NFT_COLLECTION_STATE_KEY);
                            if (!show_token_state || show_token_state == 'hide')
                                token_box.style.display = 'none';
                            me.state = 'HIDE';

                            const raw = localStorage.getItem(HIDDEN_NFT_COLLECTIONS_KEY);
                            let hiddenTokens: any;

                            if (!raw) hiddenTokens = [];
                            else hiddenTokens = JSON.parse(raw);

                            hiddenTokens.push(desc.href);

                            localStorage.setItem(HIDDEN_NFT_COLLECTIONS_KEY, JSON.stringify(hiddenTokens));
                        },
                    },
                    HIDE: {
                        label: 'show',
                        tooltip: 'Show this token as default',
                        img: HIDE_ICON,
                        icon: 'far fa-eye',
                        exec: (ctx: any, me) => {
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
                        },
                    },
                });
            },
            SHOW_ALL_NFT_COLLECTION_BUTTON: (ctx) => {
                let url = document.URL
                if (!url.includes("tab=collectibles"))
                    return
                hide_hidden_nft_collection()
                return button({
                    initial: 'SHOW',
                    SHOW: {
                        label: 'Show all tokens',
                        tooltip: 'Show in the alert',
                        img: HIDE_ICON,
                        // LP: 4. add the execution - allert with search results: title, link, description
                        exec: (_, me) => {
                            me.state = 'HIDE';
                            const listToken = document.querySelectorAll('div > div.nft-box');
                            listToken.forEach((e) => {
                                e.style.display = 'flex';
                            });
                            localStorage.setItem(SHOW_NFT_COLLECTION_STATE_KEY, 'show_all');
                        },
                        // LP end
                    },
                    HIDE: {
                        label: 'Hide hidden tokens',
                        tooltip: 'Show in the alert',
                        img: HIDE_ICON,
                        // LP: 4. add the execution - allert with search results: title, link, description
                        exec: (_, me) => {
                            console.log("TINGUYEn, ", document.URL)
                            me.state = 'SHOW';
                            hide_hidden_nft_collection();
                            localStorage.setItem(SHOW_NFT_COLLECTION_STATE_KEY, 'hide');
                        },
                        // LP end
                    },
                })
            },
            // MENU: (ctx) =>
            //     button({
            //         initial: 'RESULTS',
            //         // LP: 5. implement two states:
            //         //          a. replace search results with HI_GIF
            //         //          b. return to default results
            //         RESULTS: {
            //             label: 'Hi',
            //             img: GRAY_IMG,
            //             tooltip: 'Hi, friend!',
            //             isActive: false,
            //             exec: (_, me) => {
            //                 const el = document.querySelector(ctx.insertPoint);
            //                 el.style.display = 'none';
            //                 if (!('replacedEl' in ctx)) {
            //                     ctx.replacedEl = document.createElement('div');
            //                     ctx.replacedEl.style.justifyContent = 'center';
            //                     const elImg = document.createElement('img');
            //                     elImg.src = `${HI_GIF}`;
            //                     ctx.replacedEl.appendChild(elImg);
            //                     el.parentElement.appendChild(ctx.replacedEl);
            //                 }
            //                 ctx.replacedEl.style.display = 'flex';
            //                 me.state = 'FRIENDS';
            //             },
            //         },
            //         FRIENDS: {
            //             label: 'Hi',
            //             img: GOOGLE_IMG,
            //             tooltip: 'Go to results',
            //             isActive: true,
            //             exec: (_, me) => {
            //                 const el = document.querySelector(ctx.insertPoint);
            //                 el.style.display = 'block';
            //                 ctx.replacedEl.style.display = 'none';
            //                 me.state = 'RESULTS';
            //             },
            //         },
            //         // LP end
            //     }),
            //
            // SEARCH_RESULT: (ctx) =>
            //     button({
            //         initial: 'DEFAULT',
            //         DEFAULT: {
            //             label: 'Get data',
            //             tooltip: 'Show in the alert',
            //             img: EXAMPLE_IMG,
            //             // LP: 4. add the execution - allert with search results: title, link, description
            //             exec: () => {
            //                 const { title, link, description } = ctx;
            //                 alert(
            //                     `  title: ${title}\n  link: ${link}\n  description: ${description}`,
            //                 );
            //             },
            //             // LP end
            //         },
            //     }),
            // // LP: 9. Add "result" to WIDGETS.
            // WIDGETS: () =>
            //     result({
            //         initial: 'DEFAULT',
            //         DEFAULT: {
            //             img: GOOGLE_IMG,
            //             title: 'clouds',
            //             searchResults,
            //         },
            //     }),
            // // LP end
            // // LP: 10. Implement the insertion of buttons into our widget.
            // DAPPLET_SEARCH_RESULT: (ctx) =>
            //     button({
            //         initial: 'DEFAULT',
            //         DEFAULT: {
            //             label: 'Get data',
            //             tooltip: 'Show in the alert',
            //             img: EXAMPLE_IMG,
            //             exec: () => {
            //                 const { title, link, description } = ctx;
            //                 alert(
            //                     `  title: ${title}\n  link: ${link}\n  description: ${description}`,
            //                 );
            //             },
            //         },
            //     }),
            // LP end
        });
    }
}
