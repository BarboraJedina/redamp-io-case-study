import { Locator, Page, Request } from '@playwright/test';
import { SignUpReviewInformationPage } from './SignUp.reviewInformation';

export class SignUpCompleteRegistrationPage extends SignUpReviewInformationPage {
    readonly completeRegistration: Locator;
    readonly finishRegistration: Locator;
    readonly registrationPromise: Promise<Request>;

    constructor(page: Page) {
        super(page);
        this.completeRegistration = page.getByText("We've sent you an activation email!");
        this.finishRegistration = page.locator('data-test=finish-registration-btn');

        this.registrationPromise = page.waitForRequest(request => {
            return request.method() === 'POST' &&
                request.url().includes('/api/v1/clients'); // Add your API endpoint
        });
    }

    async goto() {
        await super.goto();

        await this.checkBox.check();

        await this.finishRegistration.click();
    }
}