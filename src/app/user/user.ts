export class User {

  private _email: string;
  private _name: string;
  private _password: string;
  private _role: string;

  constructor(email: string, name: string, password: string, role: string) {
    this._email = email;
    this._name = name;
    this._password = password;
    this._role = role;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }
}
