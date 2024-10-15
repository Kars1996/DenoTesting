class Calculator {
    public static add(a: number, b: number): number {
        return a + b;
    }
    public static subtract(a: number, b: number): number {
        return a - b;
    }
    public static multiply(a: number, b: number): number {
        return a * b;
    }
    public static divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        return a / b;
    }
}

if (import.meta.main) {
    console.log("Add 2 + 3 =", Calculator.add(2, 3));
    console.log("Subtract 5 - 3 =", Calculator.subtract(5, 3));
    console.log("Multiply 2 * 3 =", Calculator.multiply(2, 3));
    console.log("Divide 10 / 2 =", Calculator.divide(10, 2));
}

export default Calculator