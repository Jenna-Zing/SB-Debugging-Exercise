const accounts = [
	{ id: 1, owner: "Alice", balance: 500 },
	{ id: 2, owner: "Bob", balance: 300 }
];

function getAccountById(id) {
	// FIX #1 - verify the input id is of type number
	if (typeof id !== "number") {
		throw new Error("Invalid account number. The account number must be an integer");
	}

	for (const account of accounts) {
		//  FIX #2: strict equality check for account id
		if (account.id === id) {
			console.log(`Successfully retrieved bank account details for bankAccountId: ${account.id}. Owner: ${account.owner}, balance of $${account.balance}.`);
			return account;  //  JS returns a reference to the original account object, not a copy.
		}
	}

	// NOTE TO SELF:  ideally, this is an error but due to flow of createAccount, this must be a console.log
	console.log(`No bank account found with an id of ${id}.`);
}

function createAccount(newAccountId, newAccountOwner) {
	// FIX #3:  verify if account with the requested id already exists
	const account = getAccountById(newAccountId);
	if (account) {
		throw new Error("An account with this id already exists.");
	}

	// FIX #4:  validate the inputs
	if (!Number.isFinite(newAccountId) || newAccountId <= 0) {
		throw new Error("Invalid account ID. The account ID must be a positive finite integer.");
	}

	if (typeof newAccountOwner !== "string" || newAccountOwner.trim() === "") {
		throw new Error("Invalid account owner. The account owner must be a non-empty string.");
	}

	// FIX #5:  balance must be an integer, so I removed the quotes around balance "0" since balance must be an integer, not a string.
	accounts.push(
		{
			id: newAccountId,
			owner: newAccountOwner,
			balance: 0
		}
	);
	console.log(`Successfully created a bank account with an id of ${newAccountId}, for owner: ${newAccountOwner}, with a balance of $0.`);
}

function depositMoney(accountId, amount) {
	const account = getAccountById(accountId);

	if (!account) {
		throw new Error("Account not found");
	}

	// FIX #6:  validate the input amount
	if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
		throw new Error("Invalid deposit amount. The amount must be a positive finite number.");
	}

	account.balance += amount;
	console.log(`Deposited $${amount} into a bank account with an id of ${accountId} (owner: ${account.owner}).  New account balance: ${account.balance}.`);
}

function withdrawMoney(accountId, amount) {
	const account = getAccountById(accountId);

	if (!account) {
		throw new Error("Account not found.");
	}

	// FIX #7:  Added typeof check for amount
	// FIX #8:  Added validation for amount value (<= 0)
	if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
		throw new Error("Invalid value for withdrawal amount: The amount must be a finite number.");
	}

	// FIX #8:  verify that the account has enough funds to withdraw
	if (account.balance < amount) {
		throw new Error("Insufficient funds for withdrawal.");
	}

	account.balance -= amount;
	console.log(`Withdrew $${amount} from a bank account with an id of ${accountId} (owner: ${account.owner}).  New account balance: ${account.balance}.`);
}

function transferMoney(fromAccountId, toAccountId, amount) {
	const fromAccount = getAccountById(fromAccountId);
	const toAccount = getAccountById(toAccountId);

	if (!fromAccount) {
		throw new Error("Source account not found.");
	}

	// FIX #9:  verify the toAccount also exists 
	if (!toAccount) {
		throw new Error("Destination account not found.");
	}

	// FIX #10:  added "=" to amount validation for "<=" 0
	if (!Number.isFinite(amount) || amount <= 0) {
		throw new Error("Invalid value for transfer amount: The amount must be a positive finite number.");
	}

	// FIX #11:  added balance validation - similar to WithdrawFunds
	if (fromAccount.balance < amount) {
		throw new Error("Insufficient funds for transfer.");
	}

	// FIX #12:  added step for subtracting balance from fromAccount
	fromAccount.balance -= amount;
	toAccount.balance += amount;
	console.log(`Transferred $${amount} from bankAccountId: ${fromAccountId} (owner: ${fromAccount.owner}) to bankAccountId: ${toAccountId} (owner: ${toAccount.owner}).`);
}

// VALID TESTING
try {
	getAccountById(1);

	createAccount(3, "Ben");

	depositMoney(3, 300);  // expect balance of $300
	withdrawMoney(3, 100);  // expect balance of $200 
	transferMoney(1, 3, 500);  // expect balance of $700
}
catch (error) {
	console.log(error.message);
}

/* 
 * Note to self:  I used the provided hint section to test the functions
 * 
 * Added try catch for running the code locally when running "node rich-bank.js" or using ".vscode/launch.json" for stepping through with breakpoints
 * otherwise, you will need to comment out each line as needed when testing via "node rich-bank.js".  You can use the default accounts to test functions like deposit/withdraw/transfer.
 * 
 * (Recommended) Use the launch.json for debugging via VSCode and use breakpoints + type changes then "green restart icon" when debugging.  Also, add console.log for when successful!
 */
try {
	getAccountById("1");   // due to loose equality, this technically worked at first, but it shouldn't have.  See FIX #1 for validating input type is number.

	createAccount(1, "Alice");  // triggers FIX #3:  an account with the requested id already exists
	createAccount("3", "Charlie");  // triggers FIX #1 - invalid account number type - must be number.
	createAccount(-3, "Charlie");  // triggers FIX #4:  validate the inputs (specifically for bad account id)
	createAccount(3, ["Charlie"]);  // triggers FIX #4:  validate the inputs (specifically for newAccountOwner type)
	createAccount(3, "");  // triggers FIX #4:  validate the inputs (specifically for newAccountOwner - cannot be empty after .trim())
	createAccount(3, "  ");  // triggers FIX #4:  validate the inputs (specifically for newAccountOwner - cannot be empty after .trim())

	depositMoney(1, "300")  // triggers FIX #6:  validate the input amount (specifically the typeof to be number - if only "isFinite" check, it coerces the string to a number and 300 is finite)
	depositMoney(1, -300)  // triggers FIX #6:  validate the input amount (specifically the amount <= 0 check)
	depositMoney(1, 0)  // triggers FIX #6:  validate the input amount (specifically the amount <= 0 check)
	depositMoney(1, Infinity)  // triggers FIX #6:  validate the input amount (specifically the !Number.isFinite check -> checks for Infinity or NaN)
	depositMoney(4, 100)  // triggers existing Account not found error in depositMoney function

	withdrawMoney(1, -100)  // triggers FIX #8:  Added validation for amount value (<= 0) 
	withdrawMoney(1, 0)  // triggers FIX #8:  Added validation for amount value (<= 0)
	withdrawMoney(1, 501)  // triggers FIX #8:  verify that the account has enough funds to withdraw (balance < amount error)

	transferMoney(1, 4, 100)  // triggers FIX #9:  verify the toAccount also exists (destination account exists check)
	transferMoney(1, 2, 501);  // triggers FIX #11:  added balance validation for fromAccount (similar to given withDrawMoney check)
	transferMoney(1, 2, 100);  // VALID!
}
catch (error) {
	console.log(error.message);
}

/*
Hints:

getAccountById("1");

createAccount(1, "Alice");
createAccount("3", "Charlie");
createAccount(-3, "Charlie");
createAccount(3, ["Charlie"]);
createAccount(3, "");
createAccount(3, "  ");

depositMoney(1, "300")
depositMoney(1, -300)
depositMoney(1, 0)
depositMoney(1, Infinity)
depositMoney(4, 100)

withdrawMoney(1, -100)
withdrawMoney(1, 0)
withdrawMoney(1, 501)

transferMoney(1, 4, 100)
transferMoney(1, 2, 501);
transferMoney(1, 2, 100);
*/
