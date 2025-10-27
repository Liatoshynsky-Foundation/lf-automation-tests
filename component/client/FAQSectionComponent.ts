import {Locator} from "@playwright/test";

export class FAQSectionComponent {
    private root: Locator;
    private questionTitle: Locator;
    private answerContainer: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.answerContainer = this.root.locator('#Faq-content');
        this.questionTitle = this.root.locator('#Faq-header');

    }

    async expand(): Promise<void> {
        await this.questionTitle.click();
    }

    async isExpanded(): Promise<boolean> {
        const attr = await this.questionTitle.getAttribute('aria-expanded');
        return attr === 'true';
    }

    async getAnswerText(): Promise<string | null> {
        const textLocator = this.answerContainer.locator('p').first();

        await textLocator.waitFor({state: "visible"});
        return textLocator.textContent();
    }

    async getQuestionTitleText(): Promise<string | null> {
        return this.questionTitle.textContent();
    }
}