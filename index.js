import inquirer from "inquirer";
const complexObject = {
    name: "John Doe",
    age: 30,
    isStudent: false,
    interests: ["programming", "music", "hiking"],
    address: {
        street: "123 Main St",
        city: "Exampleville",
        postalCode: "12345",
    },
    grades: {
        math: {
            midterm: 85,
            final: 92,
        },
        science: {
            midterm: 78,
            final: 88,
        },
    },
    contact: {
        email: "john.doe@example.com",
        phone: "+1234567890",
    },
    tuple: [1, "two", true],
    functionExample: function (x) {
        return x * 2;
    },
};
let account = {
    accountNumber: "PKMZEN0407",
    pin: "1234",
    balance: 1000,
    transactions: [],
};
function isValidPin(pin) {
    return pin === account.pin;
}
// Login Logic
async function login() {
    let userDetails = await inquirer.prompt([
        {
            name: "accountNumber",
            type: "string",
            message: "Enter Your Account Number",
        },
        {
            name: "pin",
            type: "password",
            message: "Enter Your pin",
            mask: "*",
        },
    ]);
    if (userDetails.accountNumber === account.accountNumber &&
        isValidPin(userDetails.pin)) {
        console.log("Login Successful");
        performAction();
    }
    else {
        console.log("Login Error");
    }
}
// Check Balance Logic
async function checkBalance() {
    console.log(`Account Balance: ${account.balance}`);
    performAction();
}
// Withdraw Logic Here
async function withdraw() {
    let withdrawDetails = await inquirer.prompt([
        {
            name: "amount",
            type: "number",
            message: "Enter The Amount You Want To Withdraw",
            validate: (input) => (input > 0 && input < account.balance) ||
                "Invalid withdrawal amount or insufficient balance",
        },
    ]);
    const amount = withdrawDetails.amount;
    account.balance -= amount;
    account.transactions.push(`Withdraw: $${amount}`);
    console.log(`Withdrawl Amount:$${amount} Remaning Amount:$${account.balance}`);
    performAction();
}
// View Transaction Logic
function viewTransaction() {
    if (account.transactions.length > 0) {
        console.log("Previous Transaction ");
        account.transactions.forEach((transaction, index) => {
            console.log(`${index + 1}. ${transaction}`);
        });
    }
    else {
        console.log("No Previous Transaction");
    }
    performAction();
}
// Logout Logic
function logout() {
    console.log("Log Out Successfully");
}
async function performAction() {
    const transactionPrompt = await inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["Check Balance", "Withdraw", "View Transaction", "Logout"],
        },
    ]);
    const choice = transactionPrompt.action;
    switch (choice) {
        case "Check Balance":
            await checkBalance();
            break;
        case "Withdraw":
            await withdraw();
            break;
        case "View Transaction":
            viewTransaction();
            break;
        case "Logout":
            logout();
            break;
        default:
            performAction();
            break;
    }
}
login();
