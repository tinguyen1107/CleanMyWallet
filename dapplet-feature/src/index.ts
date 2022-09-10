import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex08.png';
import HIDE_ICON from './icons/hide-icon.png';
import GRAY_IMG from './icons/ex08-gray.png';
import GOOGLE_IMG from './icons/ex08-quatro.png';
import HI_GIF from './imgs/giphy.gif';
import { hide_hidden_tokens } from './utils';

const searchResults = [
    {
        title: 'Types of Clouds | NOAA SciJinks - All About Weather',
        link: 'https://scijinks.gov/clouds/',
        description:
            'Mammatus clouds. Mammatus clouds are actually altocumulus, cirrus,\
      cumulonimbus, or other types of clouds that have these pouch-like shapes hanging \
      out of the bottom. The pouches are created when cold air within the cloud sinks down \
      toward the Earth. Weather prediction: Severe weather might be on its way!',
    },
    {
        title: 'Clouds—facts and information - Science',
        link: 'https://www.nationalgeographic.com/science/article/clouds-1',
        description:
            'Altostratus clouds may portend a storm. Nimbostratus clouds are thick \
      and dark and can produce both rain and snow. Low clouds fall into four divisions: \
      cumulus, stratus, cumulonimbus, and ...',
    },
    {
        title: 'Types of Clouds | Live Science',
        link: 'https://www.livescience.com/29436-clouds.html',
        description:
            'Clouds of great vertical development: These are the cumulonimbus clouds, \
      often called a thunderhead because torrential rain, vivid lightning and thunder come \
      from it. The tops of such clouds may ...',
    },
];

@Injectable
export default class GoogleFeature {
    // LP: insert the correct adapter
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @Inject('example-google-adapter.dapplet-base.eth') public adapter: any; // LP end

    activate(): void {
        const { button, result } = this.adapter.exports;

        hide_hidden_tokens();

        this.adapter.attachConfig({
            MENU: (ctx) =>
                button({
                    initial: 'RESULTS',
                    // LP: 5. implement two states:
                    //          a. replace search results with HI_GIF
                    //          b. return to default results
                    RESULTS: {
                        label: 'Hi',
                        img: GRAY_IMG,
                        tooltip: 'Hi, friend!',
                        isActive: false,
                        exec: (_, me) => {
                            const el = document.querySelector(ctx.insertPoint);
                            el.style.display = 'none';
                            if (!('replacedEl' in ctx)) {
                                ctx.replacedEl = document.createElement('div');
                                ctx.replacedEl.style.justifyContent = 'center';
                                const elImg = document.createElement('img');
                                elImg.src = `${HI_GIF}`;
                                ctx.replacedEl.appendChild(elImg);
                                el.parentElement.appendChild(ctx.replacedEl);
                            }
                            ctx.replacedEl.style.display = 'flex';
                            me.state = 'FRIENDS';
                        },
                    },
                    FRIENDS: {
                        label: 'Hi',
                        img: GOOGLE_IMG,
                        tooltip: 'Go to results',
                        isActive: true,
                        exec: (_, me) => {
                            const el = document.querySelector(ctx.insertPoint);
                            el.style.display = 'block';
                            ctx.replacedEl.style.display = 'none';
                            me.state = 'RESULTS';
                        },
                    },
                    // LP end
                }),
            HIDE_TOKEN_BUTTON: (ctx: any) => {
                const token_box = ctx.insertPoint;
                const desc = token_box.querySelector('div > div.desc > span > a');
                console.log('tui goi ne, ', desc);
                if (desc === undefined) {
                    return;
                }
                return button({
                    initial: 'DEFAULT',
                    DEFAULT: {
                        label: 'hide',
                        tooltip: 'Show in the alert',
                        img: HIDE_ICON,
                        exec: (_, me) => {
                            const token_box = ctx.insertPoint;
                            const desc = token_box.querySelector('div > div.desc > span');
                            if (desc.querySelector('a') === undefined) return;

                            token_box.style.display = 'none';

                            console.log('tinguyen before ', desc.title);

                            // ctx.insertPoint.remove()
                            let hidden_tokens = localStorage.hidden_tokens;

                            if (hidden_tokens === undefined) hidden_tokens = [];
                            else hidden_tokens = JSON.parse(hidden_tokens);

                            hidden_tokens.push(desc.title);

                            localStorage.setItem('hidden_tokens', JSON.stringify(hidden_tokens));
                            // ctx.insertPoint.style.display = 'none';
                            // const newElement = document.createElement(null);
                            // ctx.insertPoint.parentElement.appendChild(newElement)
                            // console.log("tinguyen, ", localStorage.hidden_tokens);
                            // newElement.outerHTML = localStorage.hidden_tokens;
                        },
                    },
                    NONE: {
                        label: 'none',
                        tooltip: 'none',
                        img: HIDE_ICON,
                        exec: () => {
                            console.log('test tin ne ', ctx.insertPoint);
                            ctx.insertPoint.remove();
                            let hidden_tokens = localStorage.hidden_tokens;

                            if (hidden_tokens === undefined) hidden_tokens = [];
                            else hidden_tokens = JSON.parse(hidden_tokens);

                            hidden_tokens.push(ctx.insertPoint.outerHTML);

                            localStorage.setItem('hidden_tokens', JSON.stringify(hidden_tokens));
                            // ctx.insertPoint.style.display = 'none';
                            // const newElement = document.createElement(null);
                            // ctx.insertPoint.parentElement.appendChild(newElement)
                            // console.log("tinguyen, ", localStorage.hidden_tokens);
                            // newElement.outerHTML = localStorage.hidden_tokens;
                        },
                    },
                });
            },
            SHOW_ALL_BUTTON: (ctx) =>
                button({
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
                        },
                        // LP end
                    },
                }),

            SEARCH_RESULT: (ctx) =>
                button({
                    initial: 'DEFAULT',
                    DEFAULT: {
                        label: 'Get data',
                        tooltip: 'Show in the alert',
                        img: EXAMPLE_IMG,
                        // LP: 4. add the execution - allert with search results: title, link, description
                        exec: () => {
                            const { title, link, description } = ctx;
                            alert(
                                `  title: ${title}\n  link: ${link}\n  description: ${description}`,
                            );
                        },
                        // LP end
                    },
                }),
            // LP: 9. Add "result" to WIDGETS.
            WIDGETS: () =>
                result({
                    initial: 'DEFAULT',
                    DEFAULT: {
                        img: GOOGLE_IMG,
                        title: 'clouds',
                        searchResults,
                    },
                }),
            // LP end
            // LP: 10. Implement the insertion of buttons into our widget.
            DAPPLET_SEARCH_RESULT: (ctx) =>
                button({
                    initial: 'DEFAULT',
                    DEFAULT: {
                        label: 'Get data',
                        tooltip: 'Show in the alert',
                        img: EXAMPLE_IMG,
                        exec: () => {
                            const { title, link, description } = ctx;
                            alert(
                                `  title: ${title}\n  link: ${link}\n  description: ${description}`,
                            );
                        },
                    },
                }),
            // LP end
        });
    }
}
