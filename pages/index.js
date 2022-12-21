import { useContext } from "react";
import { UserContext } from "../lib/UserContext";
import Loading from "../components/loading";
import Link from "next/link";

// Styles:
import indexStyles from "./styles/pages/index.module.css"
import { Button } from "@material-tailwind/react";

const Home = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <div>
            <div className={indexStyles.tabcontainer}>
              <Link href="/venture-builder">
                <Button className={indexStyles.Button}>Venture Builder</Button>
              </Link>
              <Link href="/proof-of-work">
                <Button className={indexStyles.Button}>Proof of Work</Button>
              </Link>
            </div>
            <div className={indexStyles.container}>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Home;
