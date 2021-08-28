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
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update current employee', 'quit']
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
                case 'Add a department':
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
//https://www.w3schools.com/sql/sql_join.asp
//https://www.w3schools.com/sql/func_sqlserver_concat.asp
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
//https://www.w3schools.com/sql/sql_insert.asp
//https://www.youtube.com/watch?v=3Qq93zqO3GE
addDepartment = () => {
    inquirer
      .prompt([
      {
        name: 'department',
        type: 'input',
        message: 'Enter new departments name:'
      }
    ])
    .then(function(answer) {
      connection.query(
        'INSERT INTO departments SET ?',
        {
          name: answer.dept
        },
        function(err) {
          if (err) throw err;
          console.log('Department ' + answer.department +  'successfully created!');
          startApp();
        }
      );
    });
  };



//add a role, enter name salary and department

addRole = () => {
    var departmentChoice = [];
      connection.query('SELECT * FROM departments', function(err, resDepartment) {
        if (err) throw err;
        for (var i = 0; i < resDepartment.length; i++) {
          var departmentList = resDepartment[i].name;
          departmentChoice.push(departmentList);
      }
  
    inquirer
    .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter new roles name:'
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Enter roles salary:'
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Role department:',
      choices: departmentChoice
    }
  ])
  .then(function(answer) {
  
    var chosenDepartment;
          for (var i = 0; i < resDepartment.length; i++) {
            if (resDepartment[i].name === answer.department_id) {
              chosenDepartment = resDepartment[i];
            }
          };
  
    connection.query(
      'INSERT INTO role SET ?',
      {
        title: answer.title,
        salary:answer.salary,
        department_id: chosenDepartment.id
      },
      function(err) {
        if (err) throw err;
        console.log('New role' + answer.title + 'Role updated!');
        startApp();
      }
    );
  });
  })
  };



//add employee, prompt first than last name  and role

addEmployee = () => {
 
    var roleChoice = [];
    connection.query('SELECT * FROM role', function(err, resRole) {
      if (err) throw err;
      for (var i = 0; i < resRole.length; i++) {
        var roleList = resRole[i].title;
        roleChoice.push(roleList);
      };
  
      var departmentChoice = [];
      connection.query('SELECT * FROM departments', function(err, resDepartment) {
        if (err) throw err;
        for (var i = 0; i < resDepartment.length; i++) {
          var departmentList = resDepartment[i].name;
          departmentChoice.push(departmentList);
      }
      
    inquirer
      .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'employees first name:'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'employees last name:'
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'employee role:',
        choices: roleChoice
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'employees department:',
        choices: departmentChoice
      },
  
    ])
      .then(function(answer) {
        var chosenRole;
          for (var i = 0; i < resRole.length; i++) {
            if (resRole[i].title === answer.role_id) {
              chosenRole = resRole[i];
            }
          };
  
          var chosenDepartment;
          for (var i = 0; i < resDepartment.length; i++) {
            if (resDepartment[i].name === answer.department_id) {
              chosenDepartment = resDepartment[i];
            }
          };
        connection.query(
          'INSERT INTO employees SET ?',
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: chosenRole.id, 
            department_id: chosenDepartment.id
          },
          function(err) {
            if (err) throw err;
            console.log('employee' + answer.firstName + " " + answer.lastName + 'employee added!');
            startApp();
          }
        );
      })
     });
    })
  };
  


//update employee role, slect empoyee and new role




// quit function to end node function

quit = () => {
    connection.end();  //https://stackoverflow.com/questions/20692989/node-mysql-where-does-connection-end-go
}
