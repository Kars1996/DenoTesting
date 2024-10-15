function stringCheck(word: string): boolean {
    const seenChars: string[] = [];
    for (let i = 0; i < word.length; i++) {
        if (seenChars.includes(word[i])) {
            return false;
        }
        seenChars.push(word[i]);
    }
    return true;
}

if (import.meta.main) {
    console.log(stringCheck("hello"));
    console.log(stringCheck("world"));
    console.log(stringCheck("abc"));
    console.log(stringCheck("aabbcc"));
    console.log(stringCheck("12345"));
    console.log(stringCheck("123456"));
    console.log(stringCheck("abcdefghijklmnopqrstuvwxyz"));
    console.log(stringCheck("zyxwvutsrqponmlkjihgfedcba"));
    console.log(stringCheck("1234567890"));
}
