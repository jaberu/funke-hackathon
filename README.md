# Alexa Reference Skill: News

Welcome to the Amazon Reference Skill for News. This skill is intended to quickly and easily provide a working Alexa news skill that has both audio and text-to-speech functionality. Follow this guide to get the skill running with mock data, and then read our extended guide for more information on customization and extension of the skill.

For a broader understanding of how Alexa skills work and an explanation of the code structure, see [How It Works](#how-it-works) and [Alexa Skill Overview](#alexa-skill-overview).

---

## How to Run the Reference Skill

### Step 1: Install or Update NodeJS

Ensure that you have NodeJS installed and updated to the Long-Term Support (LTS) version (LTS version is 6.10.2 as of this writing). [Download and install it from the NodeJS site: https://nodejs.org/en/download/](https://nodejs.org/en/download/).

### Step 2: Clone the project and build the skill

```
git clone {github_project_url}  // clone the project
cd Amazon_News_AlexaSkill_Node  // change directory to the project root
npm install                     // install the required node modules for development
gulp build                      // clean, compile, install production node modules, and zips the skill code
```

The build command creates a zipped archive of the skill code (located at `/build/build.zip`). In a later step, we will upload this archive to AWS Lambda.

### Step 3: Create or sign in to your AWS account

You can [create or sign in to an AWS account at https://aws.amazon.com](https://aws.amazon.com).

### Step 4: Create an an IAM Role for Lambda Execution

You will need to create an IAM Role that allows a Lambda function to create logs in CloudWatch and manage a DynamoDB table (user session data for your skill will be stored in DynamoDB).

- In the AWS console, navigate to IAM
- Select the **Roles** submenu, and click **Create New Role**
- In the **AWS Service Roles** group, locate the **AWS Lambda** row and click **Select**
- In the **Attach Policy** pane, check the box next to the following policies:
    - `AmazonDynamoDBFullAccess`
    - `CloudWatchLogsFullAccess`
- Click **Next**
- Give the role a **Name** (e.g., *AmazonNewsLambdaExec*)
- Give the role a **Description** (e.g., *Allows Amazon News Lambda function to access CloudWatch logs & DynamoDB.*)
- Click **Create Role**

### Step 5: Create a Lambda function to run the skill

You will need to create a Lambda function in the `US East (N. Virginia)` or `EU (Ireland)` region, assign it the role we created in Step 4, and upload the skill code that we compiled and zipped in Step 2.

- In the AWS console, make sure you are in the region which makes sense for your skill users:
    - For North America, create the function in `US East (N. Virginia)`
    - For Europe, create the function in `EU (Ireland)`
- Navigate to Lambda
- Click **Create a Lambda function**
- In the **Select blueprint** pane, select: `Blank Function`
- In the **Configure triggers** pane, you must select: `Alexa Skills Kit` as a trigger, which will allow the Alexa Skills Kit to run your function
- Click **Next**
- Give the function a **Name** (e.g., *AmazonNewsAlexaSkill*)
- Select a **Runtime** of: `Node.js 6.10`
- In the **Code entry type**, select: `Upload a .ZIP file`, and select the archived skill function which we zipped in Step 2 (`/build/build.zip`)
- In the **Role** dropdown, select: `Choose an existing role`
- In the **Existing role** dropdown, select the Lambda execution role you created in Step 4 (e.g., *AmazonNewsLambdaExec*)
- Click **Next**
- Click **Create function**
- After your skill is created, take note of the Amazon Resource Name (ARN) on the upper right (e.g., *arn:aws:lambda:us-east-1:######:function:AmazonNewsAlexaSkill*); you will need it in Step 7

### Step 6: Create or sign in to your AWS developer account

You can [create or sign in to a developer account at https://developer.amazon.com](https://developer.amazon.com).

### Step 7. Create a new Alexa Skill

The Amazon Developer portal allows you to create a skill interface which will trigger the Lambda function you created in Step 5.

- In the Amazon Developer console, navigate to the **Alexa** tab (in the top navigation bar)
- Under **Alexa Skills Kit**, click **Get Started**
- Click **Add a New Skill**

#### 7a. Skill Information Panel

- Ensure that **Skill Type** is set to **Custom Interaction Model**
- Give your skill a **Name** (e.g., *Amazon News Alexa Skill*)
- Give your skill an **Invocation Name** (e.g., *headliner*)
- In the **Global Fields** box, **Audio Player** options, select **Yes**
- Click **Save** and then **Next**

#### 7b. Interaction Model Panel

- In the **Intent Schema** text box, paste the contents of: `/speechAssets/intentSchema.json` (Note: `intentSchema.json` already contain the intents required to support audio directives, so you don't have to take any further action in the **Intent Schema** text box)
- In the **Custom Slots** section, create a custom slot called: `LIST_OF_CATEGORIES`, paste the contents of: `/speechAssets/LIST_OF_CATEGORIES.txt`, and click **Add**
- In the **Custom Slots** section, create another custom slot called: `LIST_OF_DESIRES`, paste the contents of: `/speechAssets/LIST_OF_DESIRES.txt`, and click **Add**
- In the **Sample Utterances** text box, paste the contents of: `/speechAssets/Utterances.txt`
- Click **Next** to create and save the interaction model

#### 7c. Configuration Panel

- In the **Global Fields** box, **Endpoint**, **Service Endpoint Type**, select **AWS Lambda ARN (Amazon Resource Name)**
- Select **North America** or **Europe**, depending on which region your Lambda function was created in
- Paste the ARN of your Lambda function from Step 5 into the **North America** or **Europe** box
- Leave all other options in their default state, and click **Next**

### Step 8. Test the skill in the Service Simulator

- On the **Test** pane, ensure that the skill is **Enabled** for testing
- In the **Service Simulator** section, type *"give me design stories"* in the **Enter Utterance** box
- Click **Ask Amazon News Alexa Skill** and you should receive a **Lambda Response**; this response was generated by your Lambda function

### Step 9. Test the skill on Alexa-Enabled Devices

- On your Alexa-Enabled Device (Echo, Dot, etc.), ensure that your device is set up with the same email address associated with your Amazon Developer account
- After the device is set up, you can view your skill in the **Skills Menu**, by clicking **Your Skills**
- Test the skill by asking Alexa to launch the skill with the Invocation Name you set in Step 7a (e.g., *Alexa, launch headliner.*)

---

# How it Works

## index.js

`index.js` is the entry point for the skill. Here, we:

- Set the `appId`: ensures that our function will only run for the skill we define in the Amazon Developer portal; if this `appId` does not match the `appId` of the incoming request, then the Alexa SDK will issue an error and will not execute the skill function
- Set the `dynamoDBTableName`: this defines the table where the skill's user session data will be stored (the skill will create this table on the first run if it doesn't already exist)
- Register state handlers: for each state that we support, we register a handler which will service the incoming intent
- Execute the `alexa-sdk`

## States

We support three states:

- `MAIN_MENU`: the main splash menu of the skill, asks the user whether they want Latest Story or to Browse
- `BROWSE_STORIES`: asks the user for a category, fetches those stories, and then allows the user to browse
- `AUDIO_PLAYBACK`: plays back the Latest Story, allows the user to control audio (pause, resume, start over, etc.)

## Handlers

For each state we have a specific handler that maps the intent to our skill logic:

- `mainMenu.js`
- `browseStories.js`
- `audioPlayback.js`
- `init.js`: we have an additional handler called `init.js`, which handles requests which have no state; it saves timestamps for a given user, and handles all `NewSession` intents

## skillConfig.js

This file contains all basic variables that you can customize in order to make the skill yours (`COMPANY_NAME`, `SKILL_NAME`, `APP_ID`, etc.).

---

# Alexa Skill Overview

In order to create and run an Alexa Skill, you must configure both the code that executes the skill logic (in the AWS console), as well as configure the skill interface (in the Amazon Developer Console), as follows:

## AWS Console: Skill Logic, Lambda Function, DynamoDB Session Table

In the AWS console ([https://aws.amazon.com](https://aws.amazon.com)), we will utilize two AWS services to support the execution of our skill. Firstly, we build the codebase into a zipped archive, and upload it in a Lambda function. This Lambda function must have IAM permissions to access CloudWatch (in order to log events and execution data) and DynamoDB (to create and maintain a data table of user session data).

## Amazon Developer Console: Skill Definition, Details, & Publishing

In the Developer Console ([https://developer.amazon.com](https://developer.amazon.com)), we need to give our skill a Name, Invocation Name, and an Interaction Model. These details help the Alexa Skills Kit (ASK) to recognize when a user is invoking your skill, and capture the user's intent and/or inputs for your skill.

In the Developer Console, you also provide your skill with the ARN for your Lambda function, so that the skill knows to pass the user's intents and data to your specific function.

Finally, when you are ready to submit your skill for certification, you will enter the publishing details into the Developer Console. When all details for your skill have been entered, you can submit it to Amazon for certification.

---

# How to Customize & Extend the Reference Skill

Use the companion documentation provided with this skill for a broader discussion of the skill functionality, and advice on how to customize and extend the reference skill.
