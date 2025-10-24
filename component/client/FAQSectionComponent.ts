import { Locator } from "@playwright/test";
export class FAQSectionComponent{
    private root: Locator;
    private questionTitle: Locator;
    private questionAnswer: Locator;
    private answerContainer: Locator;

    constructor(root: Locator){
        this.root = root;
        this.answerContainer = this.root.locator('#Faq-content');
        this.questionAnswer = this.answerContainer.locator('p').first();
        this.questionTitle = this.root.locator('#Faq-header');
        
    }

    async expandQuestionSection(): Promise<void>{
        await this.questionTitle.click();
    }

    async getAnswerText(): Promise<string | null> {
        await this.questionAnswer.waitFor({state : "visible"});
        return this.questionAnswer.textContent();
    }

    async getTitleText(): Promise<string|null> {
        return this.questionTitle.textContent();
    }


}