import { useContext } from "react";
import { UserContext } from "../lib/UserContext";
import Loading from "../components/loading";
import Link from "next/link";

const Home = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <div>
            <h1>
              <Link href="/venture-builder">Venture Builder</Link>
            </h1>
            <h1>
              <Link href="/proof-of-work">Proof of Work</Link>
            </h1>
          </div>
        )
      )}
    </>
  );
};

export default Home;
