import {expect, Locator, Page} from '@playwright/test';
import {BaseComponent} from './BaseComponent';
import {SupportFoundationBtn} from './SupportFundationBtn';
import {FooterChangeLangBtn} from './FooterChangeLangBtn';
import {ContactUsBtn} from './ContactUsBtn';
import {MediaMenuBtn} from './MediaMenuBtn';
import * as allure from "allure-js-commons";
import {ClientBasePage} from '../../page/client/ClientBasePage';
import {FooterPageMenuComponent} from './FooterPageMenuComponent';
import { LegalMenuComponent } from './LegalMenuComponent';

export class FooterComponent extends BaseComponent {
    logo: Locator;
    infoName: Locator;
    infoAddress: Locator;
    infoPhone: Locator;
    infoEmail: Locator;
    contactUsBtn: ContactUsBtn;
    supportFundBtn: SupportFoundationBtn;
    legalMenu: LegalMenuComponent;
    copyrightText: Locator;
    changeLangBtn: FooterChangeLangBtn;
    pageMenu: FooterPageMenuComponent;
    mediaMenu: MediaMenuBtn;
    developedBy: Locator;
    bigFooterImage: Locator;

    constructor(page: Page) {
        super(page, page.locator('footer'));
        this.logo = this.parent.locator('svg[title="Company logo"]');
        this.infoName = this.parent.locator('//div[2]/div[3]/div/div[1]/p');
        this.infoAddress = this.parent.locator('//div[2]/div[3]/div/div[1]/div/p');
        this.infoPhone = this.parent.locator('//div[2]/div[3]/div/div[2]/div[1]');
        this.infoEmail = this.parent.locator('//div[2]/div[3]/div/div[2]/div[2]');
        this.contactUsBtn = new ContactUsBtn(this.parent);
        this.supportFundBtn = new SupportFoundationBtn(this.parent);
        this.legalMenu = new LegalMenuComponent(this.parent.locator('//div[2]/div[7]/div/ul'));
        this.copyrightText = this.parent.locator('//div[2]/div[7]/div/p');
        this.changeLangBtn = new FooterChangeLangBtn(this.page, this.parent);
        this.pageMenu = new FooterPageMenuComponent(this.parent.locator('//div[2]/div[6]/div'));
        this.mediaMenu = new MediaMenuBtn(this.parent.locator('//div[2]/div[5]/div'));
        this.developedBy = this.parent.locator('img[alt="OpenTech Academy logo"]');
        this.bigFooterImage = this.parent.locator('img[alt="Lyatoshynsky Foundation"]');
    }

    async checkInfoName(str: string): Promise<void> {
        await allure.step(`Check OrgName to be ${str}`, async () => {
            await this.infoName.waitFor({state: 'visible'});
            await this.infoName.scrollIntoViewIfNeeded();
            await expect(this.infoName).toHaveText(str);
        })
    }

    async checkInfoAddress(str: string): Promise<void> {
        await allure.step(`Check Address to be ${str}`, async () => {
            await this.infoAddress.waitFor({state: 'visible'});
            await this.infoAddress.scrollIntoViewIfNeeded();
            await expect(this.infoAddress).toHaveText(str);
        })
    }

    async checkInfoPhone(str: string, clientPage: ClientBasePage): Promise<void> {
        await allure.step(`Check Phone number to be ${str}`, async () => {
            await this.infoPhone.waitFor({state: 'visible'});
            await this.infoPhone.scrollIntoViewIfNeeded();

            const currentLang = await clientPage.getCurrentPageLanguage();
            const expectedLabel = currentLang === 'uk' ? 'Телефон:' : 'Phone:';

            const actualLabel = await this.infoPhone.locator('p').innerText();
            const actualPhone = await this.infoPhone.locator('a').innerText();

            await allure.parameter('Language', currentLang);
            await allure.parameter('Expected Label', expectedLabel);
            await allure.parameter('Actual Label', actualLabel);
            await allure.parameter('Expected Phone', str);
            await allure.parameter('Actual Phone', actualPhone);


            expect(actualLabel).toEqual(expectedLabel);
            expect(actualPhone).toEqual(str);
        })
    }

    async clickInfoPhone(): Promise<void> {
        await allure.step('Click Phone number', async () => {
            await this.infoPhone.waitFor({state: 'visible'});
            await this.infoPhone.scrollIntoViewIfNeeded();
            await this.infoPhone.locator('a').click({force: true});
        })
    }

    async checkInfoEmail(str: string): Promise<void> {
        await allure.step(`Check Email to be ${str}`, async () => {
            await this.infoEmail.waitFor({state: 'visible'});
            await this.infoEmail.scrollIntoViewIfNeeded();
            await expect(this.infoEmail.locator('p')).toHaveText("Email:");
            await expect(this.infoEmail.locator('a')).toHaveText(str);
        })
    }

    async clickInfoEmail(): Promise<void> {
        await allure.step('Click Email', async () => {
            await this.infoEmail.waitFor({state: 'visible'});
            await this.infoEmail.scrollIntoViewIfNeeded();
            const link = this.infoEmail.locator('a');
            await expect(link).toHaveAttribute('href', /mailto:/);
            await link.click({force: true});
        })
    }

    async checkCopyrightText(str: string): Promise<void> {
        await allure.step(`Check copyright text to be ${str}`, async () => {
            await this.copyrightText.waitFor({state: 'visible'});
            await this.copyrightText.scrollIntoViewIfNeeded();
            await expect(this.copyrightText).toHaveText(str);
        })
    }

    
}

