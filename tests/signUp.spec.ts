import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/SignUp';
import { SignUpCountryPage } from '../pages/SignUp.country';
import { SignUpPartnersNetworkPage } from '../pages/SignUp.partnersNetwork';
import { SignUpCompanyNamePage } from '../pages/SignUp.companyName';
import { SignUpAddressPage } from '../pages/SignUpAddress';
import { SignUpAdminPage } from '../pages/SignUp.adminAcount';
import { SignUpReviewInformationPage } from '../pages/SignUp.reviewInformation';
import { SignUpCompleteRegistrationPage } from '../pages/SignUp.completeRegistration';

test.describe('Sign up page', () => {
    test('#1:  Successful Page Load', async ({ page }) => {
        const signUp = new SignUpPage(page);

        await signUp.goto();

        await expect(signUp.companyItem).toBeVisible();
        await expect(signUp.familyItem).toBeVisible();
        await expect(signUp.individualItem).toBeVisible();
        await expect(signUp.backButton).toBeVisible();
    });

    test('#2: NEXT Button Is Not Displayed When No Option Is Selected ', async ({ page }) => {
        const signUp = new SignUpPage(page);

        await signUp.goto();

        await expect(signUp.companyItem).toBeVisible();
        await expect(signUp.nextButtonSignUp).not.toBeVisible()
    })

    test('#3: NEXT Button Is Displayed When the Company Option Is Selected ', async ({ page }) => {
        const signUp = new SignUpPage(page);

        await signUp.goto();

        await expect(signUp.nextButtonSignUp).not.toBeVisible()

        await signUp.companyItem.click();

        await expect(signUp.nextButtonSignUp).toBeVisible()

    });

    test('#4: Redirect to https://www.redamp.io/cs/download When Individual Option Is Selected', async ({ page, context }) => {
        const signUp = new SignUpPage(page);
        const pagePromise = context.waitForEvent('page');

        await signUp.goto();

        await signUp.individualItem.click();
        await signUp.nextButtonSignUp.click();

        const newPage = await pagePromise;
        // await newPage.waitForURL('https://www.redamp.io/cs/download');
        await expect(newPage).toHaveURL('https://www.redamp.io/en/');
    });

    test('#5: When Company Option is Selected Country input is Visible', async ({ page }) => {
        const signUp = new SignUpPage(page);

        await signUp.goto();
        await signUp.companyItem.click();
        await signUp.nextButtonSignUp.click();
        await expect(signUp.countryInput).toBeVisible();
    });
})

test.describe('Country page', () => {
    test('#6: NEXT button is not displayed When Country is not selected', async ({ page }) => {
        const signUpCountry = new SignUpCountryPage(page);

        await signUpCountry.goto();

        await expect(signUpCountry.nextButton).toBeDisabled()
    });
})

test.describe('Partners network page', () => {
    test('#7: Redirect to Partner Network page When Czech Republic is Selected', async ({ page }) => {
        const signUpPartnersNetwork = new SignUpPartnersNetworkPage(page);

        await signUpPartnersNetwork.goto();
        await expect(signUpPartnersNetwork.partnersNetwork).toBeVisible();
    });
})

test.describe('Company name page', () => {
    test('#8: Redirect to Company name page When Austria is Selected', async ({ page }) => {
        const signUpCompanyName = new SignUpCompanyNamePage(page);

        await signUpCompanyName.goto();
        await expect(signUpCompanyName.companyNameInput).toBeVisible();
    });

    test('#9: Check if Company name is required', async ({ page }) => {
        const signUpCompanyName = new SignUpCompanyNamePage(page);

        await signUpCompanyName.goto();

        await expect(signUpCompanyName.nextButton).toBeDisabled();

        await signUpCompanyName.fillInCompanyName('Test', true);
        await expect(signUpCompanyName.nextButton).toBeEnabled();

        await signUpCompanyName.clearCompanyName();
        await expect(signUpCompanyName.nextButton).toBeDisabled();
    })

    test('#10: The Company Name Has the Required Number of Characters', async ({ page }) => {
        const signUpCompanyName = new SignUpCompanyNamePage(page);

        await signUpCompanyName.goto();

        await signUpCompanyName.fillInCompanyName('Ab', false);
        await expect(signUpCompanyName.validationMessage).toBeVisible();
    });
})

test.describe('Address page', () => {
    test('#11: Fill in valid Address data', async ({ page }) => {
        const signUpAddress = new SignUpAddressPage(page);

        await signUpAddress.goto();

        await signUpAddress.fillStreetInput('Test street');
        await signUpAddress.fillCityInput('Test city');
        await signUpAddress.fillZipCodeInput('Test zip');
        await signUpAddress.fillStateInput('Test state');
        await signUpAddress.fillCinInput('Test cin');
        await signUpAddress.fillVinInput('Test vin');

        await signUpAddress.nextButton.click();
        await expect(signUpAddress.adminAccount).toBeVisible();
    });

    //ocakavala by som ze next bude disabled
    test('#12: Fill in invalid Address data', async ({ page }) => {
        const signUpAddress = new SignUpAddressPage(page);

        await signUpAddress.goto();

        await signUpAddress.fillStreetInput('');
        await signUpAddress.fillCityInput('');
        await signUpAddress.fillZipCodeInput('Test zip test zip');
        await signUpAddress.fillStateInput('Test state');
        await signUpAddress.fillCinInput('');
        await signUpAddress.fillVinInput('Test cin');

        await signUpAddress.nextButton.click();

        await expect(signUpAddress.validationMessageStreet).toBeVisible();
        await expect(signUpAddress.validationMessageCity).toBeVisible();
        await expect(signUpAddress.validationMessageZip).toBeVisible();
        await expect(signUpAddress.validationMessageCin).toBeVisible();
    });
})

test.describe('Admin page', () => {
    test('#13: Fill in valid Admin account data', async ({ page }) => {
        const signUpAdmin = new SignUpAdminPage(page);

        await signUpAdmin.goto();

        await signUpAdmin.fillEmailInput('barbora.xjedina@gmail.com');
        await signUpAdmin.fillPasswordInput('Abc123456.');

        await expect(signUpAdmin.nextButton).toBeDisabled();
        await signUpAdmin.fillConfirmPassword('Abc123456.');

        await expect(signUpAdmin.nextButton).toBeVisible();
    });

    test('#14: Fill in invalid Admin account data', async ({ page }) => {
        const signUpAdmin = new SignUpAdminPage(page);

        await signUpAdmin.goto();

        await signUpAdmin.fillEmailInput('barbora.xjedina@gmail.com');

        //Less then 10 characters
        await signUpAdmin.fillPasswordInput('Ab123456.');
        await signUpAdmin.fillConfirmPassword('Ab123456.');
        await expect(signUpAdmin.nextButton).toBeDisabled();

        //Without special character
        await signUpAdmin.fillPasswordInput('Abc1234567');
        await signUpAdmin.fillConfirmPassword('Abc1234567');
        await expect(signUpAdmin.nextButton).toBeDisabled();

        //Without uppercase letter
        await signUpAdmin.fillPasswordInput('abc123456.');
        await signUpAdmin.fillConfirmPassword('abc123456.');
        await expect(signUpAdmin.nextButton).toBeDisabled();

        //Without lowercase letter
        await signUpAdmin.fillPasswordInput('ABC123456.');
        await signUpAdmin.fillConfirmPassword('ABC123456.');
        await expect(signUpAdmin.nextButton).toBeDisabled();

        //Without number
        await signUpAdmin.fillPasswordInput('abcdefghi.');
        await signUpAdmin.fillConfirmPassword('abcdefghi.');
        await expect(signUpAdmin.nextButton).toBeDisabled();

        //password not match
        await signUpAdmin.fillPasswordInput('abc123456.');
        await signUpAdmin.fillConfirmPassword('abd123456.');
        await expect(signUpAdmin.nextButton).toBeDisabled();
    });
})

test.describe('Review information page', () => {
    //V tomto teste by sa mala testovat zhodnost dat, ale nad prvkami nie je
    // data-test
    test('#15: Check terms and conditions', async ({ page }) => {
        const signUpReviewInformation = new SignUpReviewInformationPage(page);

        await signUpReviewInformation.goto();

        await expect(signUpReviewInformation.finishRegistration).toBeDisabled();
        await signUpReviewInformation.checkBox.check();
        await expect(signUpReviewInformation.finishRegistration).toBeEnabled();
    });
})

test.describe('Complete registration page', () => {
    test('#16: Complete registration', async ({ page }) => {
        const signUpCompleteRegistration = new SignUpCompleteRegistrationPage(page);

        await signUpCompleteRegistration.goto();

        const request = await signUpCompleteRegistration.registrationPromise;
        const postData = request.postData();

        const bodyData = JSON.parse(postData ?? '{}');

        expect(bodyData).toMatchObject(expect.objectContaining({
            admin_email: expect.stringContaining('barbora.xjedina'),
            admin_password: 'Abc123456.',
            city: 'Test city',
            state: 'Test state',
            street: 'Test street',
            zip_code: 'Test zip'
        }));

        await expect(signUpCompleteRegistration.completeRegistration).toBeVisible();
    })
})