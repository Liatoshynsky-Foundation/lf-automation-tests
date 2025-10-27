import { type Locator, type Page } from '@playwright/test';

export type Platform = 'instagram' | 'facebook' | 'youtube';

export class ContactsInfoComponent {
    private  page: Page;
    public  mainContainer: Locator;
    public  phoneNumberLink: Locator;
    public  emailLink: Locator;
    private socialMediaBlock: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainContainer = page.locator('.MuiBox-root.css-1ak52z1');
        
        this.phoneNumberLink = this.mainContainer.locator('a').filter({ hasText: '067 963 8366' });
        this.emailLink = this.mainContainer.locator('a').filter({ hasText: 'liatoshynsky@gmail.com' });
        
        this.socialMediaBlock = this.mainContainer.locator('.MuiBox-root.css-1gxeym5');
    }

    async getPhoneNumber(): Promise<string> {
      return(await this.phoneNumberLink.textContent()) ?? '';
    }

    async clickEmail(): Promise<void> {
      await this.emailLink.click();
    }

    /**
     * @param platform ('instagram', 'facebook', 'youtube').
     */
    async clickSocialLink(platform: Platform): Promise<void> {
      const linkLocator = this.socialMediaBlock.locator(`a[href*="${platform}"]`);
      await linkLocator.click();
    }

    getSocialLink(platform: Platform): Locator {
      return this.socialMediaBlock.locator(`a[href*="${platform}"]`);
    }
}