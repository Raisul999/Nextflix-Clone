import { getSession, signIn, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentuser from "../hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default function Home() {
  const { data: user } = useCurrentuser();
  // console.log("user", user);
  return (
    <div>
      <h1 className="text-center text-3xl font-extrabold">Netflix clone</h1>
      <p className="text-center">Logged in as:{user?.email}</p>
      <button
        className="h-10 w-full bg-white text-black "
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}
