class User {
    id: string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    dob: Date;
    street: string;
    city: string;
    zip: string;
    state: string;
  
    constructor(id: string, fname: string, lname: string, email: string, password: string, dob: Date, street: string, city: string, zip: string, state: string) {
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

export default User;