import { IFeature } from '@dapplets/dapplet-extension';
import { Button } from './button';
import { Result } from './result';
import { Bar } from './bar';

type ContextBuilder = {
    [propName: string]: string;
};
type Exports = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [propName: string]: any;
};

@Injectable
export default class GoogleAdapter {
    public exports = (): Exports => ({
        button: this.adapter.createWidgetFactory(Button),
        result: this.adapter.createWidgetFactory(Result),
        bar: this.adapter.createWidgetFactory(Bar),
    });

    // LP: 1. implement communication between dapplets and pages
    public config = {
        // TOKEN
        TOKEN_TOOL_BAR: {
            containerSelector: '#app-container',
            contextSelector: '.left',
            insPoints: {
                TOKEN_TOOL_BAR: {
                    selector: '.tokens',
                    insert: 'end',
                },
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            contextBuilder: (searchNode: any): ContextBuilder => ({
                id: 'id-ne',
                title: 'title ne',
                link: 'link ne',
                insertPoint: searchNode,
            }),
        },
        HIDE_TOKEN_BUTTON: {
            containerSelector: '#app-container',
            contextSelector: '.left > div > .token-box',
            insPoints: {
                HIDE_TOKEN_BUTTON: {
                    selector: '.token-box > div > div.balance',
                    insert: 'begin',
                },
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            contextBuilder: (searchNode: any): ContextBuilder => ({
                id: 'id-ne',
                title: 'title ne',
                link: 'link ne',
                insertPoint: searchNode,
            }),
        },
        REMOVE_TOKEN_BUTTON: {
            containerSelector: '#app-container',
            contextSelector: '.left > div > .token-box',
            insPoints: {
                REMOVE_TOKEN_BUTTON: {
                    selector: '.token-box > div > div.balance',
                    insert: 'start',
                },
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            contextBuilder: (searchNode: any): ContextBuilder => ({
                id: 'id-ne',
                ftContracId: searchNode.querySelector('.desc > span').title,
                link: 'link ne',
                insertPoint: searchNode.querySelector('.desc > span').title,
            }),
        },
        SHOW_ALL_BUTTON: {
            containerSelector: '#app-container',
            contextSelector: '.left > .tokens',
            insPoints: {
                SHOW_ALL_BUTTON: {
                    selector: 'span',
                },
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            contextBuilder: (searchNode: any): ContextBuilder => ({
                id: 'id-ne',
                title: 'title ne',
                link: 'link ne',
                description: 'hello',
                insertPoint: searchNode,
            }),
        },
        // NFT
        HIDE_NFT_COLLECTION_BUTTON: {
            containerSelector: '#app-container',
            contextSelector: '.left > div > .nft-box',
            insPoints: {
                HIDE_NFT_COLLECTION_BUTTON: {
                    selector: '.nft-box > div.nft-header > div.desc',
                    insert: 'end',
                },
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            contextBuilder: (searchNode: any): ContextBuilder => ({
                id: 'id-ne',
                title: 'title ne',
                link: 'link ne',
                insertPoint: searchNode,
            }),
        },
        SHOW_ALL_NFT_COLLECTION_BUTTON: {
            containerSelector: '.sc-lcepkR.kEbpqt',
            contextSelector: '',
            insPoints: {
                SHOW_ALL_NFT_COLLECTION_BUTTON: {
                    selector: 'div:nth-child(1)',
                    insert: 'begin',
                },
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            contextBuilder: (searchNode: any): ContextBuilder => ({
                id: 'id-ne',
                title: 'title ne',
                link: 'link ne',
                insertPoint: searchNode,
            }),
        },
        // MENU: {
        //     containerSelector: '#cnt, .ndYZfc',
        //     contextSelector: '#top_nav, #topstuff .jZWadf',
        //     insPoints: {
        //         MENU: {
        //             selector: '.MUFPAc, .T47uwc',
        //             insert: 'inside',
        //         },
        //     },
        //     contextBuilder: (): ContextBuilder => ({
        //         id: '',
        //         insertPoint: '#rcnt, .mJxzWe',
        //     }),
        // },
        // SEARCH_RESULT: {
        //     containerSelector: '#search',
        //     contextSelector:
        //         '#rso > .g .jtfYYd, #rso > div > .g .jtfYYd, #rso > div > div > .g .jtfYYd, .MjjYud',
        //     insPoints: {
        //         SEARCH_RESULT: {
        //             selector: '.yuRUbf',
        //             insert: 'inside',
        //         },
        //     },
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //     contextBuilder: (searchNode: any): ContextBuilder => ({
        //         id: searchNode.querySelector('.yuRUbf > a')?.href,
        //         title: searchNode.querySelector('h3')?.textContent,
        //         link: searchNode.querySelector('.yuRUbf > a')?.href,
        //         description:
        //             searchNode.querySelector('.uUuwM')?.textContent ||
        //             searchNode.querySelector('.IsZvec')?.textContent,
        //     }),
        // },
        // // LP: 6. Add new insertion point WIDGETS on the top of Google widgets.
        // WIDGETS: {
        //     containerSelector: '#search',
        //     contextSelector: '#rso',
        //     insPoints: {
        //         WIDGETS: {
        //             selector: '.ULSxyf',
        //             insert: 'begin',
        //         },
        //     },
        //     contextBuilder: (): ContextBuilder => ({
        //         id: '',
        //     }),
        // },
        // // LP end
        // // LP: 7. Add a new insertion point DAPPLET_SEARCH_RESULT, which is similar to SEARCH_RESULT but adds a button to our search widget.
        // DAPPLET_SEARCH_RESULT: {
        //     containerSelector: '#search',
        //     contextSelector: '.hlcw0c-dapp .tF2Cxc',
        //     insPoints: {
        //         DAPPLET_SEARCH_RESULT: {
        //             selector: '.yuRUbf',
        //             insert: 'inside',
        //         },
        //     },
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //     contextBuilder: (searchNode: any): ContextBuilder => ({
        //         id: searchNode.querySelector('.yuRUbf > a').href,
        //         title: searchNode.querySelector('h3 > span').textContent,
        //         link: searchNode.querySelector('.yuRUbf > a').href,
        //         description: searchNode.querySelector('.IsZvec').textContent,
        //     }),
        // },
        // LP end
    };
    // LP end

    constructor(
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
        @Inject('dynamic-adapter.dapplet-base.eth') readonly adapter: any,
    ) {
        this.adapter.configure(this.config);
    }

    public attachConfig(feature: IFeature): void {
        this.adapter.attachConfig(feature);
    }

    public detachConfig(feature: IFeature): void {
        this.adapter.detachConfig(feature);
    }
}
