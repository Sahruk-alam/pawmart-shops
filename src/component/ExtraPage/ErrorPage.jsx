import { Link } from "react-router";


const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-6xl font-bold">404 </h1>

      <p className="text-xl mt-3"> Page Not Found  </p>
      <Link  to="/" className="btn btn-primary mt-5">
        Back Home </Link>
    </div>
  );
};

export default ErrorPage;