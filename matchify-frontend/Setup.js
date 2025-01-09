var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: './reports/cucumber_report.json',
        output: './features/report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": "STAGING",
            "Browser": "Chrome  54.0.2840.98",
            "Platform": "Macbook Pro",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        },
        failedSummaryReport: true,
};

reporter.generate(options);
