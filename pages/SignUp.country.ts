import { Locator, Page } from '@playwright/test'
import { SignUpPage } from './SignUp'

export class SignUpCountryPage extends SignUpPage {
    readonly countrySelect: Locator;
    readonly nextButton: Locator;

    constructor(page: Page) {
        super(page);
        this.countrySelect = page.locator("data-test=country-input");
        this.nextButton = page.locator("data-test=next-slide-btn");
    }

    async goto() {
        await super.goto();
        await this.companyItem.click();
        await this.nextButtonSignUp.click();
    }

}