import { formateCurrency } from "../../scripts/Utils/money.js";

console.log("test suite: formate currency");

//Basic Test Case
console.log("convert cents into dollors");

if (formateCurrency (2095) === '20.95'){
    console.log("passed");
} else {
    console.log("failed");
}

//Edge Test Case
console.log("work with 0");

if (formateCurrency (0) === '0.00'){
    console.log("passed");
} else {
    console.log("failed");
}

console.log("rounds up to the nearest cents");

if (formateCurrency (2000.5) === '20.01'){
    console.log("passed");
} else {
    console.log("failed");
}