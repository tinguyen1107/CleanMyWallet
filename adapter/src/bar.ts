let stylesAdded = false;

const addStyles = (): void => {
    const styleTag: HTMLStyleElement = document.createElement('style');
    styleTag.innerHTML = `
    .dapplet-widget-menu {
      display: inline-block;
    }

    .dapplet-widget-tool-bar {
        width: 100%;
        height: 20px;
        background-color: rgb(0, 114, 206);
        display: flex;
        justify-content: center;
    }
  `;
    document.head.appendChild(styleTag);
};

export interface IBarState {
    img: string;
    label: string;
    icon: string;
    loading: boolean;
    disabled: boolean;
    hidden: boolean;
    tooltip: string;
    isActive: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exec: (ctx: any, me: IBarState) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    init: (ctx: any, me: IBarState) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ctx: any;
    insPointName: string;
}

export class Bar {
    public el: HTMLElement;
    public state: IBarState;
    insPointName: string;

    public static contextInsPoints = {
        TOKEN_TOOL_BAR: 'TOKEN_TOOL_BAR',
    };

    public mount(): void {
        if (!this.el) this._createElement();
        if (!stylesAdded) {
            addStyles();
            stylesAdded = true;
        }

        const { img, label, icon, hidden, tooltip, isActive } = this.state;

        if (hidden) {
            this.el.innerHTML = '';
            this.el.style.display = 'none';
            return;
        } else {
            this.el.style.removeProperty('display');
        }

        // LP: 2. implement the button HTML with label, image and tooltip for two insert points: MENU and SEARCH_RESULT
        const activeNavEl: HTMLElement = document.querySelector('.hdtb-msel, .rQEFy');

        switch (this.insPointName) {
            case 'TOKEN_TOOL_BAR':
                this.el.innerHTML = `
          <div>
          </div>
                `;
                break;
        }
    }

    public unmount(): void {
        this.el && this.el.remove();
    }
    private _createElement() {
        this.el = document.createElement('div');
        // LP: 3. add styles for the element depending on the insertion point
        if (this.insPointName === 'MENU') {
            this.el.classList.add('dapplet-widget-menu');
        } else {
            this.el.classList.add('dapplet-widget-tool-bar');
        }
        // LP end
        this.el.addEventListener('click', () => {
            if (!this.state.disabled) {
                this.state.exec?.(this.state.ctx, this.state);
            }
        });
        this.state.init?.(this.state.ctx, this.state);
    }
}
