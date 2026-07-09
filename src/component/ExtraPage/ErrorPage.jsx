import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <h1 className="text-6xl font-bold">404 </h1>

      <p className="text-xl mt-3 text-slate-600 dark:text-slate-300">
        {" "}
        Page Not Found{" "}
      </p>
      <Link to="/" className="btn btn-primary text-primary-content mt-5">
        Back Home{" "}
      </Link>
    </div>
  );
};

export default ErrorPage;
