#! /usr/bin/env node
import inquirer from "inquirer";
class Student{
   static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

constructor(name: string){
    this.id = Student.counter++;
    this.name =name;
    this.courses = [];
    this.balance = 100;
}

//METHOD TO ENROLL STUDENT
enroll_course(course:string){
   this.courses.push(course);
}

//METHOD TO VIEW STUDENT'S BALANCE
view_balance(){
console.log(`Balance for ${this.name} is $${this.balance}`);
}

//METHOD TO PAY STUDENT'S FEES
pay_fees(amount:number){
this.balance-= amount;
console.log(`$${amount} Fees paid successfully for ${this.name}`);
console.log(`${this.name} Remaining balance is $${this.balance} `);

}

//METHOD TO DISPLAY STUDENT'S STATUS
show_status(){
   console.log(`ID: ${this.id}`);
   console.log(`Name: ${this.name}`);
   console.log(`Courses: ${this.courses.join(',')}`);
   console.log(`Balance: ${this.balance}`);  
  }

}
//NEW CLASS
class Student_manager{
    students: Student[];

    constructor(){
        this.students = [];
    }
    
//METHOD TO ADD NEW STUDENTS
//inheritence data from old class (Parent class to Child class)
add_students(name:string){
 let student = new Student(name);
 this.students.push(student);
 console.log(`Student ${name} added successfully, Student ID ${student.id}`);
}

//METHOD TO ENROLL STUDENT IN A NEW COURSE
enroll_student(student_id:number, course:string){
    let student = this.find_student(student_id);
    if(student) {
        student.enroll_course(course);
        console.log(`${student.name} enrolled in ${course} sucessfully`);  
    }
}

//METHOD TO VIEW STUDENT'S BALANCE
view_students_balance(student_id: number){
    let student = this.find_student(student_id);
    if(student) {
    student.view_balance();
  }
  else{console.log("Student not found please enter a correct student i.d");
  }
}

//METHOD TO PAY STUDENT FEES
pay_student_fees(student_id:number, amount: number){
    let student = this.find_student(student_id);
    if (student){
        student.pay_fees(amount);
    }
    else{console.log ("Student not found please enter a correct student i.d")

    }
}

//METHOD TO DISPLAY STUDENT'S STATUS
show_student_status(student_id:number){
    let student = this.find_student(student_id);
    if (student){
        student.show_status();
    }
}

//METHOD TO FIND A STUDENT BY STUDENT ID
find_student(student_id: number){
        return this.students.find(std => std.id === student_id);
    }
}

//MAIN FUNCTION TO RUN THE PROGRAM
async function main() {
    console.log("WELCOME TO STUDENT MANAGEMENT SYSTEM BY KANWAL RAFIQE");
    console.log("-".repeat(50));
    
   let student_manager = new Student_manager();
    while (true) {
        let choice = await inquirer.prompt([
           {    name: "choice",
                type: "list",
                message: "Select an option",
                choices:[
                    "Add Student",
                    "Enroll student",
                    "View Student's Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"

                ]
             }
        ]);
// USING "SWITCH CASE" to handle user's choice
        switch(choice.choice){
            case "Add Student": 
                 let name_input = await inquirer.prompt([
                     {
                          name: "name",
                          type: "input",
                          message: "Enter Student's Name",
                     }
                 ]);
                 student_manager.add_students(name_input.name);
                 break;

            case "Enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },

                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    }
                ]);
                 student_manager.enroll_student(course_input.student_id, course_input.course);
                 break;
            case "View Student's Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID",
                    }
                ]);
                student_manager.view_students_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID", 
                    },
                    
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter student ID",  
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;

            case "Exit":
                console.log("Exiting......");
                process.exit();     
        }
    }
}

//Calling main function
main()
