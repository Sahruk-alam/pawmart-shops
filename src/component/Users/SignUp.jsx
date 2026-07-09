import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import usePageTitle from "../../hooks/usePageTitle";
import { fireThemedAlert } from "../../utils/themedAlert";

const SignUp = () => {
  usePageTitle("Sign Up");
  const { CreateUser, setUser, updateUser, googleSign } = use(AuthContext);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const photo = event.target.photo.value;
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (name.length < 3) {
      setNameError("Name must be at least 3 characters long.");
      return;
    }
    setNameError("");
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Required uppercase, lowercase with minimum 6 characters.",
      );
      return;
    }
    setPasswordError("");
    const pattern = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) {
      setEmailError("Required a valid email address.");
      return;
    }
    setEmailError("");

    CreateUser(email, password)
      .then((result) => {
        updateUser({
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...result.user, displayName: name, photoURL: photo });
            if (result.user) {
              fireThemedAlert({
                title: "Success",
                text: "Account created successfully!",
                icon: "success",
              });
              navigate("/");
            }
          })
          .catch(() => {
            fireThemedAlert({
              title: "Error!",
              text: "Error updating profile:",
              icon: "error",
            });
            setUser(result.user);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        fireThemedAlert({
          title: "Error!",
          text: errorMessage,
          icon: "error",
        });
      });
  };
  const handleGoogle = () => {
    googleSign()
      .then((result) => {
        setUser(result.user);
        navigate(location?.state?.from?.pathname || "/");
      })
      .catch(() => {
        fireThemedAlert({
          title: "Error!",
          text: "Error during Google sign-in:",
          icon: "error",
        });
      });
  };
  const handleEye = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-12  transition-colors duration-300">
      <div className="card py-6 bg-base-100 text-base-content w-full max-w-sm shrink-0 shadow-2xl border border-base-300">
        <h2 className="font-bold text-2xl text-center">
          Register your account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            <label className="label font-bold">Your Name </label>
            <input
              type="text"
              name="name"
              required
              className="input input-bordered w-full"
              placeholder="Enter your Name"
            />
            {nameError && (
              <p className="text-red-600 font-semibold">{nameError}</p>
            )}
            <label className="label font-bold">Photo URL</label>
            <input
              type="text"
              name="photo"
              required
              className="input input-bordered w-full"
              placeholder="Enter your Photo URL"
            />

            <label className="label font-bold">Email address</label>
            <input
              type="email"
              name="email"
              required
              className="input input-bordered w-full"
              placeholder="Enter your Email"
            />
            {emailError && (
              <p className="text-red-600 font-semibold">{emailError}</p>
            )}
            <label className="label font-bold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full"
                name="password"
                placeholder="Password"
              />
              <button className="absolute top-4 right-5" onClick={handleEye}>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-600 font-semibold">{passwordError}</p>
            )}
            <div className="flex mt-2">
              <input
                type="checkbox"
                name="terms"
                required
                id="terms"
                className="mr-2"
              />
              <p className="text-base-content/80">
                Agree to terms and conditions
              </p>
            </div>

            <button
              type="submit"
              className="btn btn-primary text-primary-content mt-2"
            >
              Register
            </button>

            <p className="text-center font-semibold pt-3">
              Already have an account?
              <Link
                to="/login"
                className="link text-blue-600 dark:text-blue-400"
              >
                Login
              </Link>
            </p>
          </fieldset>
        </form>
        <div className="card  px-6">
          <button
            onClick={handleGoogle}
            className="btn btn-outline text-base-content outline-1"
          >
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
