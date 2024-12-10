import { expect, type Locator, type Page } from '@playwright/test';

export class SignUpPage {
    readonly page: Page;
    readonly companyItem: Locator;
    readonly familyItem: Locator;
    readonly individualItem: Locator;
    readonly backButton: Locator;
    readonly nextButtonSignUp: Locator;
    readonly countryInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.companyItem = page.locator("data-test=company-select-item");
        this.familyItem = page.locator("data-test=family-select-item");
        this.individualItem = page.locator("data-test=individual-select-item");
        this.backButton = page.getByRole('button', { name: 'Back to Sign In' });
        this.nextButtonSignUp = page.getByRole('button', { name: 'Next' });
        this.countryInput = page.locator('data-test=country-input');
    }

    async goto() {
        await this.page.goto('https://securitycheck-rc.redamp.eu/sign-up');
    }
}