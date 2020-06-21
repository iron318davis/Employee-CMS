let inquire = require("inquirer");
let mysql = require("MySQL");
let cTable = require("console.table");

// let PORT = process.env.PORT || 8081;
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "cms"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// * Add departments, roles, employees
// * View departments, roles, employees
// * Update employee roles

function beginning(){
inquire.prompt(
    {
        type: "list",
        name: "whattodo",
        message: "What would you like to do?",
        choices: [
            "Add departmentto database",
            "Add role",
            "Add employee",
            "View departments",
            "View roles",
            "View employees",
            "Update employee role",
            "Update employee managers",
            "View employees by manager",
            "Delete departments, roles, and employees",
            "View the total utilized budget of a department",
            "Exit"
        ]
    },
).then(answers => {
    switch (answers.whattodo){
        case "Add departmentto database":
            addDept();
        break;
        case "Add role":
            addRole();
        break;
        case "Add employee":
            addEmp();
        break;
        case "View departments":
            viewDepts();
        break;
        case "View roles":
            viewRoles();
        break;
        case "View employees":
            viewEmps();
        break;
        case "Update employee role":
            updateEmpRole();
        break;

// OPTIONAL ITEMS BELOW
        case "Update employee managers":
            console.log("Optional.  ToDo")
        break;
        case "View employees by manager":
            console.log("Optional.  ToDo")
        break;
        case "Delete departments, roles, and employees":
            console.log("Optional.  ToDo")
        break;
        case "View the total utilized budget of a department":
            console.log("Optional.  ToDo")
        break;

    }
});
}





// app.listen(PORT, function () {
//     // Log (server-side) when our server has started
//     console.log("Server listening on: http://localhost:" + PORT);
// });

beginning();