import { Locator, Page } from '@playwright/test';
import { SignUpAdminPage } from './SignUp.adminAcount';

export class SignUpReviewInformationPage extends SignUpAdminPage {
    readonly checkBox: Locator;
    readonly finishRegistration: Locator;

    constructor(page: Page) {
        super(page);
        this.checkBox = page.locator('label:below(p:text("Terms of Service")) span').first();
        this.finishRegistration = page.locator('data-test=finish-registration-btn')
    }

    async goto() {
        await super.goto();

        await this.fillEmailInput('barbora.xjedina@gmail.com');
        await this.fillPasswordInput('Abc123456.');
        await this.fillConfirmPassword('Abc123456.');

        await this.nextButton.click();
    }
}