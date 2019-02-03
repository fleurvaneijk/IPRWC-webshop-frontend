export class User {

  constructor(public email?: string,
              public name?: string,
              public password?: string,
              public role?: string) {
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getName(): string {
    return this.name;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string) {
    this.password = password;
  }

  getRole(): string {
    return this.role;
  }

  setRole(value: string) {
    this.role = value;
  }
}
