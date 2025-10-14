//Basic Types
let id: number = 5
let company: string = 'AlexCo'
let isTrue: boolean = true
let x: any = 'Hello'

let ids: number[] = [1,2,3,3]
let array: any[] = [1, true, 'hello']

//tuple
let person: [number, string, boolean] = [1, "ok", true]

//tupple array
let employee: [number, string][]

employee = [[12, "Bob"], [8, 'George']]

//union
let pid: number | string = 22
pid = "221asdf12f"

//Enum
enum Direction1 { //default values are:
    Up, //0
    Down, //1
    Left, //2
    Right //3
}

enum Direction2 {
    Up = 'Up',
    Down = 'Down'
}

//Objects
type User = {
    id: number,
    name: string
}

const user: User = {
    id: 1,
    name: 'Alex'
}

//Type Assertion
let cid: any = 1
// let customerId = <number>cid
// let customerId = cid as number

//Functions
function addNum(x: number, y: number): number {
    return x + y
}

function log(message: string | number): void{
    console.log(message)
}

//Interfaces
interface IUser {
    readonly id: number
    name: string
    age?: number
}

const user1: IUser = {
    id: 1,
    name: 'John'
}

// user1.id = 5;

//can't use interface with primitives
type Point = number | string
const p1: Point = 1

interface MathFunc {
    (x: number, y: number): number
}

const add: MathFunc = (x: number, y: number): number => x+y
const sub: MathFunc = (x: number, y: number): number => x-y


interface IPerson{
    id: number
    name: string
    register(): string
}
//Classes
class Person implements IPerson {
    id: number
    name: string

    constructor(id: number, name: string){
        this.id = id
        this.name = name
    }

    register() {
        return `${this.name} is registered`
    }
}

const brad = new Person(12, "alex")
// brad.id = 5

class Employee extends Person {
    position: string

    constructor(id: number, name: string, position: string) {
        super(id, name)
        this.position = position
    }
}

const emp = new Employee(3, 'Mia', 'Developer')

//Generics
function getArray<T>(items: T[]): T[] {
    return new Array<T>().concat(items)
}

let numArray = getArray<number>([1,2,3,4])
let strArray = getArray<string>(['brad', 'john', 'joe'])

numArray.push(1)