const enc = new TextEncoder();

function hashString(data: string): string {
    return enc.encode(data).toString();
}

// Usage
const data = "Hello, world!";
const hashedData = hashString(data);
console.log("Hashed data:", hashedData);
console.log("Hashed data: (again)", hashString(data));

