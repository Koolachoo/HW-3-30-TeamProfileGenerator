const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const teams = [];

function start() {
    function makeManager() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your manager's name?",
                name: "managerName"
            },
            {
                type: "input",
                message: "what is your managers ID number?",
                name: "managerId"
            },
            {
                type: "input",
                message: "What is your manager's email address?",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "What is your manager's office number?",
                name: "managerOffice"
            }
        ]).then(answer => {
            var manager = new Manager(
                answer.managerName,  answer.managerId, answer.managerEmail, answer.managerOffice
            );
            teams.push(manager);
            makeIntern();
        })
    }
   
    function makeIntern() {
        inquirer.prompt([
    
            {
                type: "input",
                message: "What is your intern's name?",
                name: "internName"
            },
            {
                type: "input",
                message: "what is your intern's ID number?",
                name: "internId"
            },
            {
                type: "input",
                message: "What is your intern's email address?",
                name: "internEmail"
            },
            {
                type: "input",
                message: "What school does your intern go to?",
                name: "internSchool"
            }
        ]).then(answer => {
             var intern = new Intern(
                answer.internId, answer.internName, answer.internEmail, answer.internSchool
            );
            teams.push(intern);
            makeEngineer();
        })
    }
    
    function makeEngineer() {
        inquirer.prompt([
    
            {
                type: "input",
                message: "What is your engineer's name?",
                name: "engineerName"
            },
            {
                type: "input",
                message: "what is your engineers ID number?",
                name: "engineerId"
            },
            {
                type: "input",
                message: "What is your engineer's email address?",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "What is your engineer's GitHub name?",
                name: "engineerHub"
            }
        ]).then(answer => {
            var engineer = new Engineer(
                answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerHub
            );
            teams.push(engineer);
            teamMake();
        })
    }
    makeManager();

    function teamMake() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(teams), "utf-8");
    }

};

start();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

