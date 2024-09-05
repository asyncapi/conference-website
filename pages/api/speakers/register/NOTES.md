# Steps to Initialize the speaker registration API (Locally)

1. In the google cloud console
    
    1. Create a new project and enable the <a href="https://console.cloud.google.com/apis/api/sheets.googleapis.com/metrics?project=auth-testing-399611">`Google Sheets API`</a>. 
    2. In the credentials option of the service create new credentials, creating a new service account
    3. After creating the service account, create a new Key for the service account in JSON format.
    4. Download the generated JSON file and rename it to `credentials.json`.
    5. Place the `credentials.json` file at the root of the project. It will be automatically gitignored.

2. In Google Sheets

    1. Create a new Google Sheets spreadsheet name the sheet `Sheet1` (Its the default name in a new spredsheet).
    2. Open the credentials.json file and copy the value of the key named `client_email`.
    3. In the share option of the spreadsheet add the copied email as an Editor for the spreadsheet.
    4. The url for the sheet will be in the format `https://docs.google.com/spreadsheets/d/11qVj842qR1lCQF8XVPspK9MWT80Rhbd0YtgRtVcJjKE/edit?gid=0#gid=0`. The String after `/d/` is the Sheet Id of the sheet, copy it.
    5. Create `.env.local` file at the root of the project. Refer the `example.env.local` file and past the copied Sheet Id to designated key.

3. Initializing app password

    1. Visit https://myaccount.google.com/
    2. Enable 2FA (Just a step to increase security of the account)
    3. In the search bar above search for `App Password`.
    If the option is available follow the further steps else use another email id.
    4. After selecting the App passwords option in the search bar, you will be required to signIn to your account.
    5. After siging type the name you desire and create a new app password.
    6. Copy this and save somewhere safe as its only visible once, if you missed it, delete the old app password and create a new one.
    7. In the `.env.local` paste the App password in designated key with your email id.
    8. __NOTE__:- Always be careful with app passwords, if exposed by accident, delete them immediately!
    9. Configure your sender SMTP service in `./register/index.js` (To be ignored if its gmail).