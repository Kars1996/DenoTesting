function _addBinary(one: string, two: string): string {
    let result: string = "";
    let carry: number = 0;
    let i = one.length - 1;
    let j = two.length - 1;

    while (i >= 0 || j >= 0 || carry > 0) {
        const bit1 = i >= 0 ? parseInt(one[i]) : 0;
        const bit2 = j >= 0 ? parseInt(two[j]) : 0;

        const sum = bit1 + bit2 + carry;
        result = (sum % 2).toString + result;
        carry = sum / 2;
        i -= 1;
        j -= 1;
    }
    return result;
}
