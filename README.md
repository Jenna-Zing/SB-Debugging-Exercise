# Debugging Exercise

Hello, future software developer! In this exercise, you will practice debugging. 🐛

As a systems engineer 🧑‍💻 in the Rich Bank 🏦, you know:

- 📋 Each account has the ID (positive integer), the owner (non-empty string), and the balance (non-negative number).
- 🧐 Account holders can view their accounts using their ID (See: `getAccountById`).
- 🥳 Customers can create a new account with an ID and their name with 0 balance (See: `createAccount`).
- 💸 Account holders can deposit money to their accounts with their ID if the amount to be deposited is greater than 0, of course! (See: `depositMoney`).
- 💰 Account holders can withdraw money from their accounts with their ID if the amount to be withdrawn is greater than 0, of course! (See: `withdrawMoney`).
- 🛫 Account holders can transfer their money to another account holder's account using IDs if the amount to be transferred is greater than 0, of course! (See: `transferMoney`).

The starter code is full of bugs. Your task is fixing the bugs using the knowledge above.

### Starter Code

[Starter Code.zip](https://prod-files-secure.s3.us-west-2.amazonaws.com/163f1722-85e9-4a3c-adba-457a91094f00/ddbfd3d8-3aca-49d8-8cdf-21872502fd8b/Starter_Code_2.zip)

<aside>
💡 Hints:

- At the end of the `rich-bank.js` file, you will find function calls, each representing a hint of a bug.
- You might be fixing an equality check, adding code logic, or throwing an error where missing.
</aside>

Happy coding!

### After you complete the exercise, please take a look at our solution:
Resources: 
- debugging exercise - Starter Code.zip 
- Solution.zip


# Jenna's Notes:
- For running the project, run `node rich-bank.js` from the "Starter Code" folder.  Or double-click to open the "index.html` file from File Explorer and Right Click > Inspect > Console + Sources for breakpoints to debug it in the browser.  You should add console.log to state if successful when doing this way.
- (Recommended) For debugging, in VSCode > Run > Start Debugging -> will create launch.json in hidden folder called ".vscode". You will need to add a breakpoint, e.g. on createAccount function definition to walk through the logic - make sure to call the function in a try catch for debugging.