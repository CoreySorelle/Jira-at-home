"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, fname, lname, email, password, dob, street, city, zip, state) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
        this.dob = dob;
        this.street = street;
        this.city = city;
        this.zip = zip;
        this.state = state;
    }
}
exports.default = User;
