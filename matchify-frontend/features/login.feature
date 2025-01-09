Feature: Profile Creation
  As a user
  I want to create my profile
  So that I can use the application

  Background:
    Given I am on the profile creation page

  Scenario: Successfully create a profile with valid inputs
    When I enter "John Doe" as name
    And I enter "25" as age
    And I select "male" as gender
    And I enter "New York" as location
    And I enter "Reading, Traveling" as interests
    And I upload a valid profile picture
    And I click the submit button
    Then I should see a success message
    And the form should be cleared

  Scenario: Display validation errors for empty form submission
    When I click the submit button
    Then I should see error message for "name" field
    And I should see error message for "age" field
    And I should see error message for "gender" field
    And I should see error message for "location" field
    And I should see error message for "interests" field
    And I should see error message for "profilePicture" field

  Scenario: Validate age requirement
    When I enter "John Doe" as name
    And I enter "15" as age
    And I select "male" as gender
    And I enter "New York" as location
    And I enter "Reading" as interests
    And I click the submit button
    Then I should see "Valid age is required (18+)" error for age field

  Scenario: Validate image upload
    When I upload an invalid file
    Then I should see "Please upload a valid image file" error for profile picture