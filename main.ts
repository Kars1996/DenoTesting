class Password {
    private _enc = new TextEncoder();
    private _dec = new TextDecoder();

    private _accounts: Record<string, string> = {
        testuser: this.hashPassword("password123"),
        kars: this.hashPassword("example"),
        password: this.hashPassword("password"),
    };

    public hashPassword(password: string): string {
        return this._enc.encode(password).toString();
    }

    public addAccount(username: string, password: string): boolean {
        if (this._accounts[username]) {
            return false;
        }
        this._accounts[username] = this.hashPassword(password);
        return true;
    }

    public removeAccount(username: string): boolean {
        if (username in this._accounts) {
            delete this._accounts[username];
            return true;
        }
        return false;
    }

    public checkPassword(username: string, password: string): boolean {
        return (
            username in this._accounts &&
            this.hashPassword(password) == this._accounts[username]
        );
    }

    public changePassword(
        username: string,
        oldPassword: string,
        newPassword: string
    ): boolean {
        if (this.checkPassword(username, oldPassword)) {
            this._accounts[username] = this.hashPassword(newPassword);
            return true;
        }
        return false;
    }

    public test(): void {
        console.log("Create new account logic");

        let username: string | null =
            prompt("Enter a username >")?.toLowerCase() || "";
        while (username.length === 0) {
            console.log("Username cannot be empty.");
            username = prompt("Enter a username >")?.toLowerCase() || "";
        }

        let userPassword: string | null =
            prompt("Enter a password >")?.toLowerCase() || "";
        while (userPassword.length === 0) {
            console.log("Password cannot be empty.");
            userPassword = prompt("Enter a password >")?.toLowerCase() || "";
        }

        this.addAccount(username, userPassword);

        console.log("\nLogin and check password logic");
        let loginUsername: string | null =
            prompt("Enter your username >")?.toLowerCase() || "";
        while (loginUsername.length === 0) {
            console.log("Username cannot be empty.");
            loginUsername =
                prompt("Enter your username >")?.toLowerCase() || "";
        }

        let loginPassword: string | null =
            prompt("Enter your password >")?.toLowerCase() || "";
        while (loginPassword.length === 0) {
            console.log("Password cannot be empty.");
            loginPassword =
                prompt("Enter your password >")?.toLowerCase() || "";
        }

        if (this.checkPassword(loginUsername, loginPassword)) {
            console.log("Login successful.");
        } else {
            console.log("Account not found.");
        }

        console.log(`Saved data: ${JSON.stringify(this._accounts, null, 2)}`);
    }
}

const pass = new Password
pass.test()