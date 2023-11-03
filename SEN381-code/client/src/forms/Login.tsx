import { useState } from "react";
import { SetTable } from "../functions/DBOperations";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";

function Login() {
  const [cred, setCred] = useState("");
  const [pass, setPass] = useState("");
  const Base_Url = "https://sen-381-hosting-test.vercel.app/";

  // Making use of a context to authenticate user
  const { login } = useAuth();
  // const navigate = useNavigate();

  function handleLogin(id: number, type: string) {
    // alert(id + " " + type);
    localStorage.setItem("authToken", type);
    localStorage.setItem("Id", String(id));

    // Set authenticated to true.
    login();
    // alert("FROM LOGIN: " + authenticated);
  }

  // const redirectToRegister = () => {
  //   navigate("/register");
  // };

  async function LoginAttempt() {
    const empData =
      cred == "" || pass == ""
        ? []
        : await SetTable(`${Base_Url}DB/LoginEmp/${cred}/${pass}`);

    if (empData.length > 0) {
      empData.map((data) => {
        handleLogin(data["EmpId"], data["Title"]);
        // alert(data["Title"]);
        if (
          data["Title"] == "Service Department" ||
          data["Title"] == "Client Department" ||
          data["Title"] == "Contract Department"
        ) {
          // alert("triggered admin");
          // navigate("/admin");
          window.location.href = "/admin";
        } else if (data["Title"] == "Call Centre") {
          // alert("triggered call centre");
          // navigate("/callcentre");
          window.location.href = "/callcentre";
        } else if (data["Title"] == "Technician") {
          // alert("triggered technician");
          // navigate("/technician");
          window.location.href = "/technician";
        }
      });
      console.log("FOUND EMP!");
    } else {
      const clientData =
        cred == "" || pass == ""
          ? []
          : await SetTable(`${Base_Url}DB/LoginUser/${cred}/${pass}`);

      if (clientData.length > 0) {
        clientData.map((data) => {
          handleLogin(data["EmpId"], "Client");
          // alert("Client");
          window.location.href = "/client";
        });
      } else {
        console.log("USER NOT FOUND");
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex items-center justify-center p-12 bg-white border-[1px] border-gray-500 w-fit rounded-lg">
        <div className="mx-auto w-full max-w-[550px]">
          <form>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Username or email
              </label>
              <input
                type="text"
                name="Username"
                id="Username"
                placeholder="Username or email"
                onChange={(e) => setCred(e.target.value)}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Password
              </label>
              <input
                type="password"
                name="Password"
                id="Password"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
              />
            </div>

            <div>
              <button
                className="group relative overflow-hidden rounded-md w-[5vw] h-[5vh] bg-blue-500 text-lg font-bold text-white ml-[0.5vw]"
                onClick={(event) => {
                  event.preventDefault();

                  LoginAttempt();
                  // handleLogin();
                }}
              >
                Login
                <div className="absolute inset-0 scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30 z-40"></div>
              </button>
              <button
                className="group relative overflow-hidden rounded-md w-[5vw] h-[5vh] bg-gray-500 text-lg font-bold text-white ml-[0.5vw]"
                onClick={(event) => {
                  event.preventDefault();

                  window.location.href = "/register";
                  // handleLogin();
                }}
              >
                Register
                <div className="absolute inset-0 scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30 z-40"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
