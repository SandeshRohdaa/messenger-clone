import Image from "next/image";
import Authform from "./components/Authform";

export default function Home() {
  return (
    // background styling
    <div
      className="
    flex
    min-h-full
    flex-col
    justify-center
    py-12
    sm:px-6
    lg:px-8
    bg-gray-100
    "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          height="48"
          width="48"
          className="mx-auto w-auto"
          src="/images/logo.png"
        />
        <h2
          // sign in to your account styling
          className="
        mt-6
        text-center
        text-3xl
        font-bold
        tracking-tight
        text-gray-900
        "
        >
          Sign in your account
        </h2>
      </div>
      <Authform />
    </div>
  );
}
