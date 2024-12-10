import { Locator, Page } from '@playwright/test';
import { SignUpPage } from './SignUp';
import { SignUpCountryPage } from './SignUp.country';

export class SignUpPartnersNetworkPage extends SignUpCountryPage {
    readonly selectedCountry: Locator;
    readonly partnersNetwork: Locator;

    constructor(page: Page) {
        super(page);
        this.selectedCountry = page.getByText('Czech Republic');
        this.partnersNetwork = page.getByText('Choose from our partners network');
    }

    async goto() {
        super.goto();
        await this.countrySelect.click();

        await this.selectedCountry.click();
        await this.nextButton.click();
    }

}