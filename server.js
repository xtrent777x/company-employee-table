const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');





// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
    
      user: 'root',
      // MySQL password
      password: '',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );



  //connection
 connection.connect(function(err) {
    if (err) throw err;
    startApp();
  });

  //Start application with choices too (view all departments) table showing all departments
startApp = () => {
    inquirer
    .prompt({
        type: 'list',
        name: 'choice',
        message: 'Make your selection',
        choices: ['View all departments?', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', "Update current employee", "quit"]
    }).then(function (answer) {
        // list choice response based of selection
        switch (answer.choice) {
            case 'View all departments':
                viewDepartments();
                break;
                case 'View all roles':
                viewRoles();
                break;
                case 'View all employees':
                viewEmployees();
                break;
                case 'Add a departments':
                addDepartment();
                break;
                case 'Add a role':
                addRole();
                break;
                case 'Add a Employee':
                addEmployee();
                break;
                case 'Update current employee':
                updateEmployee();
                break;
                case "quit":
                quit();
                break;
        }
    })
}