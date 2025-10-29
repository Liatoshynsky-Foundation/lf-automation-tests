import { type Locator, type Page } from '@playwright/test';

type InputFieldName = 'name' | 'email' | 'phoneNumber' | 'message';

export class InputFieldC {
    public readonly fieldLocator: Locator;
    public readonly input: Locator;
    public readonly errorText: Locator;

    /**
     * @param page Playwright Page object.
     * @param name The 'name' attribute of the input field (e.g., 'name', 'email').
     */
    constructor(page: Page, name: InputFieldName) {
        this.fieldLocator = page.locator(`
            .MuiFormControl-root[name="${name}"],.MuiFormControl-root:has(input[name="${name}"]),.MuiFormControl-root:has(textarea[name="${name}"])
        `);
        
       
        if (name === 'message') {
            this.input = this.fieldLocator.locator('textarea').first();
        } else {
            this.input = this.fieldLocator.locator('input').first();
        }
        

        this.errorText = this.fieldLocator.locator('.Mui-error'); 
    }

   
    async fill(text: string): Promise<void> {
        await this.input.fill(text);
    }

  
    async clear(): Promise<void> {
        await this.input.clear();
    }

   
    async getValue(): Promise<string> {
        return this.input.inputValue();
    }

   
    async getErrorText(): Promise<string | null> {
        const text = await this.errorText.textContent();
        return text ? text.trim() : null;
    }
}