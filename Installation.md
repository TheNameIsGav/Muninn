# Abstract

Muninn is death. 

# Working with Munnin

## MongoDB Setup - Internal Developer
1. Create a [`MongoDB`](https://www.mongodb.com/) account or `sign-in` to your account.
2. Ask a Project Owner to add your account as a `New Database User` on MongoDB
    - AKA `Database Account`

## MongoDB Setup - External Developer
1. Obtain a User name and password from a Project Owner
    - AKA `Database Account`
2. Download [`MongoDBCompass`](https://www.mongodb.com/products/compass) (If you want to have a GUI for MongoDB)

## Setting the environment for Muninn
> The following steps should be done after MongoDB setup

1. Install NodeJS from their [website](https://nodejs.org/en/download/) and setup `NodeJS` on your machine.
    - we recommend using the `LTS` of node (version: 16.14.2)

2. Run `npm install` within your command line.
    > ```npm install```

3. Create an `.env` file in the root directory and add the following code: 
    ``` 
        USER_NAME=<insert database account username>
        USER_PASSWORD=<insert database account password>
    ```
    > make sure there are no spaces between the equal sign and your username and password! 
4. Open `testDatabase.js` file and `run without debugging`.
    - Ways to run the `testDatabase.js` file: 
      - Open the debugger on the side panel and click `launch Program`.
      - Click `FN5` to run the file
  
