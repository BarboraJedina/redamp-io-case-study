import { Locator, Page } from '@playwright/test';
import { SignUpCompanyNamePage } from './SignUp.companyName';
import { SignUpCountryPage } from './SignUp.country'

export class SignUpAddressPage extends SignUpCompanyNamePage {
    readonly streetInput: Locator;
    readonly cityInput: Locator;
    readonly zipCodeInput: Locator;
    readonly stateInput: Locator;
    readonly cinInput: Locator;
    readonly vinInput: Locator;
    readonly validationMessageStreet: Locator;
    readonly validationMessageCity: Locator;
    readonly validationMessageZip: Locator;
    readonly validationMessageCin: Locator;
    readonly adminAccount: Locator;

    constructor(page: Page) {
        super(page);
        this.streetInput = page.locator('data-test=street-input').getByRole('textbox');
        this.cityInput = page.locator('data-test=city-input').getByRole('textbox');
        this.zipCodeInput = page.locator('data-test=zipcode-input').getByRole('textbox');
        this.stateInput = page.locator('data-test=state-input').getByRole('textbox');
        this.cinInput = page.locator('data-test=cin-input').getByRole('textbox');
        this.vinInput = page.locator('data-test=vin-input').getByRole('textbox');
        this.validationMessageStreet = page.getByText('Street is required!');
        this.validationMessageCity = page.getByText('City is required!');
        this.validationMessageZip = page.getByText('ZIP Code must be at most 10 characters.');
        this.validationMessageCin = page.getByText('Company Identification Number is required!');
        this.adminAccount = page.getByRole('heading', { name: 'Create your admin account' });
    }

    async goto() {
        await super.goto();

        await this.fillInCompanyName('Test');
        await this.nextButton.click();
    }

    async fillStreetInput(street: string) {
        await this.streetInput.fill(street);
    }

    async fillCityInput(city: string) {
        await this.cityInput.fill(city);
    }

    async fillZipCodeInput(zipcode: string) {
        await this.zipCodeInput.fill(zipcode);
    }

    async fillStateInput(state: string) {
        await this.stateInput.fill(state);
    }

    async fillCinInput(cin: string) {
        await this.cinInput.fill(cin);
    }

    async fillVinInput(vin: string) {
        await this.vinInput.fill(vin);
    }
}