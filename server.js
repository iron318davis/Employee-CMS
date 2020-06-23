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
    // console.log("connected as id " + connection.threadId);
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
            "Add department",
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
        case "Add department":
            addDept();
        break;
        case "Add role":
            addRole();
        break;
        case "Add employee":
            addEmp();
        break;
        case "View departments":
            view("department" , " Departments ");
        break;
        case "View roles":
            view("role", " Roles ");
        break;
        case "View employees":
            view("employee", " Employees ");
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
        case "Exit":
            exitprogram()
        break;
    }
});
}

// Add functions
function addDept(){
    inquire.prompt([
        {
            name: "deptID",
            type: "input",
            message: "Enter Department ID Number:"
        },
        {
            name: "deptName",
            type: "input",
            message: "Enter Department Name:"
        }
    ]).then(answer => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                id: answer.deptID,
                name: answer.deptName
            },
            function (err) {
                if (err) throw err;
                console.log("Department " + answer.deptName + " added");
                beginning();
            }
        )
    })
}

function addRole(){
    inquire.prompt([
        {
            name: "roleID",
            type: "input",
            message: "Enter Role ID Number:"
        },
        {
            name: "roleTitle",
            type: "input",
            message: "Enter Title for Role:"
        },
        {
            name: "salary",
            type: "input",
            message: "Enter Salary Amount:"
        },
        {
            name: "roledeptID",
            type: "input",
            message: "Enter Department ID for this Role:"
        }
    ]).then(answer => {
        connection.query(
            "INSERT INTO role SET ?",
            {
                id: answer.roleID,
                title: answer.roleTitle,
                salary: answer.salary,
                department_id: answer.roledeptID
            },
            function (err) {
                if (err) throw err;
                console.log("Role " + answer.roleTitle + " added");
                beginning();
            }
        )
    })
}

function addEmp(){
    inquire.prompt([
        {
            name: "empID",
            type: "input",
            message: "Enter Employee's ID Number:"
        },
        {
            name: "empFirstName",
            type: "input",
            message: "Enter Employee's First Name:"
        },
        {
            name: "empLastName",
            type: "input",
            message: "Enter Employee's Last Name:"
        },
        {
            name: "empRoleID",
            type: "input",
            message: "Enter Employee's Role ID:"
        },
        {
            name: "empManagerID",
            type: "input",
            message: "Enter Employee's Manager's ID:"
        },
    ]).then(answer => {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                id: answer.empID,
                first_name: answer.empFirstName,
                last_name: answer.empLastName,
                role_id: answer.empRoleID,
                manager_id: answer.empManagerID
            },
            function (err) {
                if (err) throw err;
                console.log("Employee " + answer.empFirstName + " " + answer.empLastName + " added");
                beginning();
            }
        )
    })
}
// View functions
function view(tableName, displayName) {
    connection.query(`SELECT * FROM ${tableName}`, function (err, data) {
      if (err) throw err;
      console.table(`\n ${displayName}`, data);
      beginning();
    });
  }

// Update functions
function updateEmpRole() {
    inquire.prompt([
        {
            name: "UDEmpRoleID",
            type: "input",
            message: "Enter ID of the employee to be updated"
        },
        {
            type: "input",
            name: "UDEmpRoleNewRole",
            message: "Enter New Role for Employee"
        }
    ]).then(answer =>{ 
        let promptone = answer.UDEmpRoleID;
        let prompttwo = answer.UDEmpRoleNewRole
        connection.query(
            `UPDATE employee SET role_id = ${prompttwo} WHERE id = ${promptone}`,
            function (err) {
                if (err) throw err;
                console.log("Employee #" + answer.UDEmpRoleID + " role updated to " + answer.UDEmpRoleNewRole);
                beginning();
            }
        )
    })
}


// Exit function
function exitprogram() {
    connection.end();
};
// Run master function
beginning();