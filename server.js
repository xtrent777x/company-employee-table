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
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', "Update current employee", "quit"]
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

// functions for all responses
//https://www.w3schools.com/nodejs/nodejs_mysql_select.asp --- show example how run with sql connecting pulling tables request

viewDepartments = () => {
    const query = `select id AS department_id, name AS Departments from departments;`;
    connection.query(query, function(err, query){
      console.table(query);
      startApp();
    });
  };
// //view by role, show job title table

viewRoles = () => {
    const query = `select id AS role_id, title, salary from role;`;
    connection.query(query, function(err, query){
      console.table(query);
      startApp();
    });
  };  

//view employees show employee table

viewEmployees = () => {
    var query = `select employees.id, employees.first_name, employees.last_name, role.title, departments.name AS department, role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN role on employees.role_id = role.id 
    LEFT JOIN departments on role.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;`;
    connection.query(query, function(err, query){
        console.table(query);
        startApp();
    });
};


//add department prompt of what department to add





//add a role, enter name salary and department





//add employee, prompt first than last name  and role




//update employee role, slect empoyee and new role




// quit function to end node function

quit = () => {
    connection.end();  //https://stackoverflow.com/questions/20692989/node-mysql-where-does-connection-end-go
}
