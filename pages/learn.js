import { useContext } from "react";
import { UserContext } from "../lib/UserContext";
import Loading from "../components/loading";
import Link from "next/link";

const Learn = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <div>
            <h1>Level 1: Learn</h1>
            <Link href="/venture-builder">Back to Venture Builder</Link>
          </div>
        )
      )}
    </>
  );
};

export default Learn;
