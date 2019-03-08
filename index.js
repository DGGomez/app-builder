#!/usr/bin/env node
const fs = require('fs');
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const uuidv4 = require('uuid/v4');
var exec = require('child_process').exec;

var filename = uuidv4();

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("Node JS CLI", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
}

// add more questions as more languages come

const askQuestions = () => {
  const questions = [
    {
      name: "App-Name",
     type: "input",
      message: "What is the name of your app?"
    },
    {
      type: "front end",
      name: "type",
      message: "What kind of app is this?",
      choices: ["web app", "mobile app"],
      filter: function(val) {
        return val.split(".")[1];
      }
    },
    {
      type: "Back end",
      name: "backend",
      message: "What language to use for your backend?",
      choices: ["node js", "spring", "none"],
      filter: function(val) {
        return val.split(".")[1];
      }
    },
    {
      type: "Back end type",
      name: "backend-type",
      message: "What kind of database?",
      choices: ["mongodb", "mysql", "none"],
      filter: function(val) {
        return val.split(".")[1];
      }},
        {
      type: "Add Login",
      name: "login",
      message: "Do you need login in this app?",
      choices: ["Yes", "No"],
      filter: function(val) {
        return val.split(".")[1];
      }},
//         {
//       type: "Add a pipeline",
//       name: "pipeline",
//       message: "Add a pipeline to this?",
//       choices: ["Yes", "No"],
//       filter: function(val) {
//         return val.split(".")[1];
//       }}
    
    // after this would need specification for pipeline
  ];
  return inquirer.prompt(questions);
};

const scripts = (filename, type, backend, backend-type, login) => {
  try{
  var clone = await exec(`./tasks/pull.sh ${filename} ${type} ${backend}`, function(error, stdout, stderr) {
    if (error) {
      console.log(error.code);
      process.exit();

    }
  });}
  catch(err){
    console.log(err);
    process.exit();
  }
  
  try{
  var api = await exec(`.${filename}/add_api.sh ${backend-type}`, function(error, stdout, stderr) {
    if (error) {
      console.log(error.code);
      process.exit();

    }
  });}
  catch(err){
    console.log(err);
    process.exit();
  }
  
   try{
  var push = await exec(`./tasks/push.sh ${filename}`, function(error, stdout, stderr) {
    if (error) {
      console.log(error.code);
      process.exit();

    }
  });}
  catch(err){
    console.log(err);
    process.exit();
  }
  
  // for future
  
//      try{
//   var push = await exec('./tasks/set_pipeline.sh', function(error, stdout, stderr) {
//     if (error) {
//       console.log(error.code);
//       process.exit();

//     }
//   });}
//   catch(err){
//     console.log(err);
//     process.exit();
//   }
};

const success = () => {
  console.log(
    chalk.white.bgGreen.bold(`Done!`)
  );
};

const run = async () => {
    const fd = fs.openSync(filename, 'w')
    init();    
    const answers = await askQuestions();
    const { name, type, backend, backend-type, login } = answers;
    scripts(filename, type, backend, backend-type, login);
    success();
}

run();
