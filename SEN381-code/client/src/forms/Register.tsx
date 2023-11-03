import { GetUserMode } from "../functions/UserMode";

const clients = [
  {
    userId: "123",
    name: "John",
    surname: "doe",
    username: "user1",
    phone: "0715489875",
    email: "John@gmail.com",
    password: "password1",
    street: "2 Road",
    suburb: "suburb1",
    city: "city2",
    role: "admin",
  },
  {
    userId: "124",
    name: "Jane",
    surname: "doe",
    username: "user2",
    phone: "0123456789",
    email: "Jane@gmail.com",
    password: "password2",
    street: "3 Road",
    suburb: "suburb5",
    city: "city1",
    role: "admin",
  },
];

const employees = [
  {
    empId: "1235",
    name: "John",
    surname: "Doe",
    username: "emp1",
    phone: "0254789643",
    email: "Johnemp@gmail.com",
    password: "password1",
    role: "Admin",
    street: "street8",
    suburb: "suburb2",
    city: "city6",
  },
  {
    empId: "1235",
    name: "Jane",
    surname: "Doe",
    username: "emp2",
    phone: "2548976354",
    email: "Janeemp@gmail.com",
    password: "password2",
    role: "technician",
    street: "street8",
    suburb: "suburb2",
    city: "city6",
  },
];

var name = "";
var surname = "";
var username = "";
var phone = "";
var email = "";
var password = "";
var street = "";
var suburb = "";
var city = "";
var role = "";
var userId = "1234";
var empId = "1235";

function VerifyCredentials() {
  var valid = true;

  const user = clients.find((u) => u.username === username);
  const emp = employees.find((e) => e.username === username);

  if (user || emp) {
    valid = false;
    alert("User already exist.");
  } else {
    if (username.length == 0 || username == " ") {
      valid = false;
      alert("Invalid username");
    }
    if (password.length == 0 || password == " ") {
      valid = false;
      alert("Invalid password");
    }
    if (name.length == 0 || username == " ") {
      valid = false;
      alert("Invalid name");
    }
    if (surname.length == 0 || surname == " ") {
      valid = false;
      alert("Invalid surname");
    }
    if (phone.length < 10 || phone.length > 10) {
      valid = false;
      alert("Invalid phone number");
    }
    if (email.length == 0 || email == " " || email.indexOf("@") == 0) {
      valid = false;
      alert("Invalid email address");
    }
    if (street.length == 0 || street == " ") {
      valid = false;
      alert("Invalid name");
    }
    if (suburb.length == 0 || suburb == " ") {
      valid = false;
      alert("Invalid name");
    }
    if (city.length == 0 || city == " ") {
      valid = false;
      alert("Invalid name");
    }
  }

  return valid;
}

function AddNewUser() {
  if (VerifyCredentials()) {
    if (role == "client") {
      const newClient = {
        userId,
        name,
        surname,
        username,
        phone,
        email,
        password,
        street,
        suburb,
        city,
        role,
      };

      clients.push(newClient);
      redirectToLogin();
    } else {
      const newEmp = {
        empId,
        name,
        surname,
        username,
        phone,
        email,
        password,
        street,
        suburb,
        city,
        role,
      };

      employees.push(newEmp);
    }
  }
}

const redirectToLogin = () => {
  window.location.href = "/";
};

function Register() {
  const isMobile = GetUserMode();

  if (isMobile) {
    return (
      <body className="bg-black h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-black">
            Premier Service
          </h2>
          <h2 className="text-2xl font-bold text-center mb-4 text-black">
            Solution
          </h2>

          <form onSubmit={AddNewUser}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              id="firstName"
              onChange={(e) => (name = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              onChange={(e) => (surname = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              onChange={(e) => (username = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="Phone"
              name="phone"
              id="phone"
              onChange={(e) => (phone = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="email"
              name="email"
              id="email"
              onChange={(e) => (email = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={(e) => (password = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="street"
              name="street"
              id="street"
              onChange={(e) => (street = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="Suburb"
              name="suburb"
              id="suburb"
              onChange={(e) => (suburb = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="City"
              name="city"
              id="city"
              onChange={(e) => (city = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <select name="role" id="role">
              <option value="client">Client</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
              <option value="technician">Technician</option>
            </select>

            <div className="flex flex-col justify-center items-center">
              <button
                type="submit"
                className="bg-red-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32 mb-2 mt-2"
              >
                Register
              </button>
              <button
                className="bg-red-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32"
                onClick={redirectToLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </body>
    );
  } else {
    return (
      <body className="bg-black h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-4 text-black">
            Premier Service Solutions
          </h2>

          <form onSubmit={AddNewUser}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              id="firstName"
              onChange={(e) => (name = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              onChange={(e) => (password = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              onChange={(e) => (username = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="Phone"
              name="phone"
              id="phone"
              onChange={(e) => (phone = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="email"
              name="email"
              id="email"
              onChange={(e) => (email = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={(e) => (password = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="street"
              name="street"
              id="street"
              onChange={(e) => (street = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="Suburb"
              name="suburb"
              id="suburb"
              onChange={(e) => (suburb = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <input
              type="text"
              placeholder="City"
              name="city"
              id="city"
              onChange={(e) => (city = e.target.value)}
              className="border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-red-500 mb-2"
              required
            ></input>

            <select name="role" id="role">
              <option value="client">Client</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
              <option value="technician">Technician</option>
            </select>

            <div className="flex flex-col justify-center items-center">
              <button
                type="submit"
                className="bg-red-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32 mb-2 mt-2"
              >
                Register
              </button>
              <button
                className="bg-red-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32"
                onClick={redirectToLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </body>
    );
  }
}

export default Register;
