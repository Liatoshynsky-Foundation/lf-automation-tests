import {Page} from '@playwright/test';
import {HeaderComponent} from '../../component/client/HeaderComponent';
import {FooterComponent} from '../../component/client/FooterComponent';
import {CookiesModal} from "../../component/client/CookiesModal";
import * as allure from "allure-js-commons";
import {BasePage} from "../BasePage";
import {SupportedLang} from '../../data/orgInfo';

const supportedLangs = ['en', 'fr', 'de', 'es', 'it', 'pt', 'ru', 'zh', 'ja'];

export class ClientBasePage extends BasePage {
    header: HeaderComponent;
    footer: FooterComponent;
    protected cookiesModal: CookiesModal;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);
        this.cookiesModal = new CookiesModal(page);
    }

    async getPathCurrentLanguage(path: string): Promise<string> {
        const currentURL = new URL(this.page.url());
        const firstSegment = currentURL.pathname.split('/')[1];

        if (supportedLangs.includes(firstSegment)) {
            return `/${firstSegment}/${path}`;
        } else {
            return `/${path}`;
        }
    }

    async goto(path: string): Promise<void> {
        await this.page.goto(path, {waitUntil: 'domcontentloaded'});
        await this.cookiesModal.acceptAll(10000);
    }

    async getTitleText(): Promise<string> {
        let text = '';
        await allure.step('Get Page title', async () => {
            text = await this.title.textContent() || '';
        });
        return text;
    }

    async getCurrentPageLanguage(): Promise<SupportedLang> {
        let lang: SupportedLang = 'en';
        await allure.step('Get current language of the page', async () => {
            const currentURL = new URL(await this.page.url());
            const firstSegment = currentURL.pathname.split('/')[1];

            if (firstSegment === 'uk') {
                lang = 'uk';
            } else {
                lang = 'en';
            }
        });
        return lang;
    }

}
