import { Locator, Page } from '@playwright/test';
import { SignUpCountryPage } from './SignUp.country'

export class SignUpCompanyNamePage extends SignUpCountryPage {
    readonly selectedCountry: Locator;
    readonly companyNameInput: Locator;
    readonly validationMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.selectedCountry = page.getByText('Austria');
        this.companyNameInput = page.locator('data-test=company-name-input').getByRole('textbox');
        this.validationMessage = page.getByText('Company Name must be at least 3 characters.');
    }

    async goto() {
        await super.goto();

        await this.countrySelect.click();

        await this.selectedCountry.click();
        await this.nextButton.click();
    }

    async fillInCompanyName(name: string, addTimestamp: boolean = true) {
        const timestamp = Date.now();

        if (addTimestamp) {
            this.companyNameInput.fill(`${name} ${timestamp}`);
        } else {
            this.companyNameInput.fill(name);
        }

    }

    async clearCompanyName() {
        this.companyNameInput.clear();
    }

}