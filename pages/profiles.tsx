import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useCurrentuser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";

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

const Profiles = () => {
  const { data: user } = useCurrentuser();
  const router = useRouter();
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-center text-3xl text-black md:text-6xl">
          Who is watching
        </h1>
        <div className="mt-10 flex items-center justify-center gap-8">
          <div onClick={() => router.push("/")}>
            <div className="group mx-auto w-44 flex-row">
              <div className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-md border-2 border-transparent group-hover:cursor-pointer group-hover:border-white">
                <img src="/images/default-blue.png" />
              </div>
              <div className="mt-4 text-center text-2xl text-gray-400 group-hover:text-white">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
