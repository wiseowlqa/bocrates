# bocrates
Test api's on Bank of Canada Valet Webservices

Pre-requisites for running tests:
* VS Code 
* Node JS
* Playwright. Refer (https://playwright.dev/docs/getting-started-vscode)

Reporter: The test reports are available using the default html reporter, as well as 3rd party reporting tool 'Monocart'. 
Command to install Monocart : 
npm i -D monocart-reporter
Refer: https://github.com/cenfun/monocart-reporter?tab=readme-ov-file#tutorial

The tests are written using Playwright with Typescript. The test accepts series names (multiple or single) and number of weeks values as parameters

Tests covered:
* Validation of api response for valid series names such as FXUSDCAD,FXEURCAD. Multiple series name can be provided as input. Validation is done to confirm that dates and rates are being returned, and the dates are all before the current date
* Validation of appropriate error message in api response for invalid series names such as FXUSY
* Validation of appropriate error message in api response for negative value of number of weeks