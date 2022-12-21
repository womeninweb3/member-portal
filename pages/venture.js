import { useContext } from "react";
import { UserContext } from "../lib/UserContext";
import Loading from "../components/loading";
import Link from "next/link";

// Styles
import indexStyles from "./styles/pages/index.module.css"
import ventureStyles from "./styles/pages/venture.module.css"
import { Button } from "@material-tailwind/react"

const Venture = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <div>
            <div className={indexStyles.tabcontainer}>
              <Link href="/learn">
                <Button className={indexStyles.Button}>Level 1: Learn</Button>
              </Link>
              <Link href="/prototype">
                <Button className={indexStyles.Button}>Level 2: Prototype</Button>
              </Link>
              <Link href="/venture">
                <Button className={indexStyles.Button}>Level 3: Venture</Button>
              </Link>
            </div>
            <div className={indexStyles.container}>
              <h1 className={indexStyles.h1}>Level 3: Venture</h1>
              <Link href="/venture-builder">Back to Venture Builder</Link>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Venture;
