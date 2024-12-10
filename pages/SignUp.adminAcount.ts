import { Locator, Page } from '@playwright/test';
import { SignUpAddressPage } from './SignUpAddress';

export class SignUpAdminPage extends SignUpAddressPage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.locator('data-test=admin-email-input').getByRole('textbox');
        this.passwordInput = page.locator('data-test=admin-password-input').getByRole('textbox');
        this.confirmPasswordInput = page.locator('data-test=admin-password-confirmation-input').getByRole('textbox');
    }

    async goto() {
        await super.goto();

        await this.fillStreetInput('Test street');
        await this.fillCityInput('Test city');
        await this.fillZipCodeInput('Test zip');
        await this.fillStateInput('Test state');
        await this.fillCinInput('Test cin');
        await this.fillVinInput('Test vin');

        await this.nextButton.click();
    }

    generateGmailAliasEmail(baseEmail: string): string {
        const timestamp = Date.now();
        const [localPart, domain] = baseEmail.split('@');

        if (domain !== 'gmail.com') {
            throw new Error('This function is specifically for Gmail addresses.');
        }

        return `${localPart}+${timestamp}@${domain}`;
    }

    async fillEmailInput(email: string) {
        await this.emailInput.fill(this.generateGmailAliasEmail(email));
    }

    async fillPasswordInput(password: string) {
        await this.passwordInput.fill(password);
    }

    async fillConfirmPassword(confirmPassword) {
        await this.confirmPasswordInput.fill(confirmPassword);
    }


}