let myNum: any = 21.1111;
let myStr: any = "Benson Boone";

console.log("My num is: ",myNum);
console.log("My string is: ", myStr);

myNum = true;
myStr = 33;

console.log("My num is: ",myNum);
console.log("My string is: ", myStr);


let person: {
    name: string;
    age: number;
    jobTitle: string;
    address: {
        street: string;
        city: string;
    };
}

let blakpink1: typeof person = {
    name: "Jennie",
    age: 28,
    jobTitle: "singer",
    address: {
        street: "someStreet",
        city: "SomeKoreanCity",
    },
}

let blakpink2: typeof person = {
    name: "Rosie",
    age: 26,
    jobTitle: "singer",
    address: {
        street: "someStreet",
        city: "SomeKoreanCity",
    },
}
console.log(blakpink1);

function howOld(person1: typeof person) : number {
    return person1.age;
}
function whatName(person1: typeof person) : string {
    return person1.name;
}
console.log("The first memebr of black pink is named ",whatName(blakpink1), " and her age is ", howOld(blakpink1));

//defualt and optionan parameters?

function greetings(name: string, job?: string): void {
    if(job != undefined){
        console.log(`Hi ${name}!\nDamn I heared you are a ${job} wanna hangout so you can tell me more about it?`);
    } else {
        console.log("Hi",name+"!");
    }
}

function mneanGreet(name: string, job: string = "unemployed") {
    if(job == "unemployed"){
        console.log(`Hi ${name}!\nDamn I heared you are a ${job} now?`);
    } else {
        console.log(`Hi ${name}!\nDamn I heared you are a ${job} wanna hangout so you can tell me more about it?`);
    }
}

mneanGreet(blakpink1.name, blakpink1.jobTitle);
mneanGreet(blakpink2.name);

function addAll(...nums: number []) : number {
    let result = 0;
    for (let i = 0; i < nums.length; i++){
        result += nums[i];
    }
    return result;
}

console.log(addAll(10,20.333,22,33,11));

const addArrow = (num1:number, num2: number) : number => num1 + num2;
const subbArrow = (num1:number, num2: number) : number => num1 - num2;

console.log(addArrow(2,3));
console.log(subbArrow(3,2));

  