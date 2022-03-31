# Abstract

Muninn is death. 

# Working with Munnin

## Steps for setting up/using MongoDB
1. Create a [`MongoDB`](https://www.mongodb.com/) account or `sign-in` to your account.
2. Ask the `project manager` to add your account as a `New Database User`
3. 
## Setting the environment for Muninn
> The following steps should be done after MongoDB is setup

1. Install NodeJS from their [website](https://nodejs.org/en/download/) and setup `NodeJS` on your machine.
    - we recommend using the `LTS` of node (version: 16.14.2)

2. Run `npm install mongoDB` within your command line.
    > ```npm install mongoDB```
3. Run `npm install dotenv` within your command line.
    > ```npm install dotenv```
4. Create an `.env` file in the root directory and add the following code: 
    ``` 
        USER_NAME=<insert username>
        USER_PASSWORD=<insert password>
    ```
    > make sure there are no spaces between the equal sign and your username and password! 
5. Open `testDatabase.js` file and `run without debugging`.
    - Ways to run the `testDatabase.js` file: 
      - Open the debugger on the side panel and click `launch Program`.
      - Click `FN5` to run the file
  