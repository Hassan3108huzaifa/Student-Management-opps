#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    static counter = 10000;
    id;
    name;
    course;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.course = [];
        this.balance = 100;
    }
    enroll_course(course) {
        this.course.push(course);
    }
    view_balance() {
        console.log(`Balance for ${this.name} : $ ${this.balance}`);
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`Fees paid: $${amount} from ${this.name}. Balance: $${this.balance}`);
    }
    student_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.course}`);
        console.log(`Balance: $ ${this.balance}`);
    }
}
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student ${name} added Successfully with ID ${student.id}`);
    }
    enroll_course(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} is enrolled in ${course}`);
        }
        else {
            console.log(`Student with ID ${student_id} not found`);
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(`Student with ID ${student_id} not found`);
        }
    }
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(`Student with ID ${student_id} not found`);
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.student_status();
        }
        else {
            console.log(`Student with ID ${student_id} not found`);
        }
    }
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
async function main() {
    console.log(`Welcome to HassanRJ _ Student-Management-System`);
    console.log(`Made with Object Oriented Programming (OOP).`);
    console.log("-".repeat(50));
    let studentManager = new StudentManager();
    while (true) {
        let choices = await inquirer.prompt([
            {
                name: 'Options',
                type: 'list',
                message: 'What do you want to do?',
                choices: [
                    'Add Student',
                    'Enroll Student',
                    'View Student Balance',
                    'Pay Student Fees',
                    'Show Student Status',
                    'Exit'
                ]
            }
        ]);
        switch (choices.Options) {
            case 'Add Student':
                let name_input = await inquirer.prompt([
                    {
                        name: 'name',
                        type: 'input',
                        message: 'Enter Student Name:',
                    }
                ]);
                studentManager.add_student(name_input.name);
                break;
            case 'Enroll Student':
                let enroll_input = await inquirer.prompt([
                    {
                        name: 'student_id',
                        type: 'input',
                        message: 'Enter Student ID:',
                    },
                    {
                        name: 'course',
                        type: 'input',
                        message: 'Enter Course Name :',
                    }
                ]);
                studentManager.enroll_course(parseInt(enroll_input.student_id), enroll_input.course);
                break;
            case 'View Student Balance':
                let student_id_input = await inquirer.prompt([
                    {
                        name: 'student_id',
                        type: 'input',
                        message: 'Enter Student ID:',
                    }
                ]);
                studentManager.view_student_balance(parseInt(student_id_input.student_id));
                break;
            case 'Pay Student Fees':
                let pay_input = await inquirer.prompt([
                    {
                        name: 'student_id',
                        type: 'input',
                        message: 'Enter Student ID:',
                    },
                    {
                        name: 'amount',
                        type: 'input',
                        message: 'Enter Amount:',
                    }
                ]);
                studentManager.pay_student_fees(parseInt(pay_input.student_id), parseInt(pay_input.amount));
                break;
            case 'Show Student Status':
                let student_status_input = await inquirer.prompt([
                    {
                        name: 'student_id',
                        type: 'input',
                        message: 'Enter Student ID:',
                    }
                ]);
                studentManager.show_student_status(parseInt(student_status_input.student_id));
                break;
            case 'Exit':
                console.log("Exiting...");
                process.exit(0);
        }
    }
}
main();
