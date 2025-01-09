const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@wdio/globals');
const path = require('path');
const { $ } = require('@wdio/globals');
const { browser } = require('@wdio/globals');

Given('I am on the profile creation page', async () => {
    await browser.url('/');
});

When('I enter {string} as name', async (name) => {
    await $('#name').setValue(name);
});

When('I enter {string} as age', async (age) => {
    await $('#age').setValue(age);
});

When('I select {string} as gender', async (gender) => {
    await $('#gender').selectByAttribute('value', gender);
});

When('I enter {string} as location', async (location) => {
    await $('#location').setValue(location);
});

When('I enter {string} as interests', async (interests) => {
    await $('#interests').setValue(interests);
});

When('I upload a valid profile picture', async () => {
    const filePath = path.join(__dirname, '../testdata/valid-profile-pic.jpg');
    const remoteFilePath = await browser.uploadFile(filePath);
    await $('#profilePicture').setValue(remoteFilePath);
});

When('I upload an invalid file', async () => {
    const filePath = path.join(__dirname, '../testdata/invalid-file.txt');
    const remoteFilePath = await browser.uploadFile(filePath);
    await $('#profilePicture').setValue(remoteFilePath);
});

When('I click the submit button', async () => {
    await $('#submit-button').click();
});

Then('I should see a success message', async () => {
    const successMessage = await $('.bg-green-100');
    await expect(successMessage).toBeDisplayed();
    await expect(successMessage).toHaveText('Profile created successfully!');
});

Then('the form should be cleared', async () => {
    await expect($('#name')).toHaveValue('');
    await expect($('#age')).toHaveValue('');
    await expect($('#gender')).toHaveValue('');
    await expect($('#location')).toHaveValue('');
    await expect($('#interests')).toHaveValue('');
});

Then('I should see error message for {string} field', async (field) => {
    const errorId = `#${field.replace(' ', '-')}-error`;
    await expect($(errorId)).toBeDisplayed();
});

Then('I should see {string} error for age field', async (errorMessage) => {
    const ageError = await $('#age-error');
    await expect(ageError).toBeDisplayed();
    await expect(ageError).toHaveText(errorMessage);
});

Then('I should see {string} error for profile picture', async (errorMessage) => {
    const pictureError = await $('#profilePicture-error');
    await expect(pictureError).toBeDisplayed();
    await expect(pictureError).toHaveText(errorMessage);
});