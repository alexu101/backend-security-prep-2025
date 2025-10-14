"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Basic Types
let id = 5;
let company = 'AlexCo';
let isTrue = true;
let x = 'Hello';
let ids = [1, 2, 3, 3];
let array = [1, true, 'hello'];
//tuple
let person = [1, "ok", true];
//tupple array
let employee;
employee = [[12, "Bob"], [8, 'George']];
//union
let pid = 22;
pid = "221asdf12f";
//Enum
var Direction1;
(function (Direction1) {
    Direction1[Direction1["Up"] = 0] = "Up";
    Direction1[Direction1["Down"] = 1] = "Down";
    Direction1[Direction1["Left"] = 2] = "Left";
    Direction1[Direction1["Right"] = 3] = "Right"; //3
})(Direction1 || (Direction1 = {}));
var Direction2;
(function (Direction2) {
    Direction2["Up"] = "Up";
    Direction2["Down"] = "Down";
})(Direction2 || (Direction2 = {}));
const user = {
    id: 1,
    name: 'Alex'
};
//Type Assertion
let cid = 1;
// let customerId = <number>cid
// let customerId = cid as number
//Functions
function addNum(x, y) {
    return x + y;
}
function log(message) {
    console.log(message);
}
const user1 = {
    id: 1,
    name: 'John'
};
const p1 = 1;
const add = (x, y) => x + y;
const sub = (x, y) => x - y;
//Classes
class Person {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    register() {
        return `${this.name} is registered`;
    }
}
const brad = new Person(12, "alex");
// brad.id = 5
class Employee extends Person {
    position;
    constructor(id, name, position) {
        super(id, name);
        this.position = position;
    }
}
const emp = new Employee(3, 'Mia', 'Developer');
//Generics
function getArray(items) {
    return new Array().concat(items);
}
let numArray = getArray([1, 2, 3, 4]);
let strArray = getArray(['brad', 'john', 'joe']);
numArray.push(1);
//# sourceMappingURL=ts-revise.js.map