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
//    {
//      name: "App-Name",
//     type: "input",
//      message: "What is the name of your app?"
//    },
    {
      type: "front end",
      name: "type",
      message: "What is the file extension?",
      choices: ["web app", "mobile app"],
      filter: function(val) {
        return val.split(".")[1];
      }
    }
    
  ];
  return inquirer.prompt(questions);
};

const scripts = (type) => {
  try{
  var clone = await exec('./tasks/pull.sh', function(error, stdout, stderr) {
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
  var api = await exec('./tasks/add_main.sh', function(error, stdout, stderr) {
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
  var api = await exec('./tasks/add_api.sh', function(error, stdout, stderr) {
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
  var push = await exec('./tasks/push.sh', function(error, stdout, stderr) {
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
    const { type } = answers;
    scripts(type);
    success();
}

run();
