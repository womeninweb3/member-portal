import { useContext } from "react";
import { UserContext } from "../lib/UserContext";
import Loading from "../components/loading";
import Link from "next/link";

// Styles:
import indexStyles from "./styles/pages/index.module.css"
import { Button } from "@material-tailwind/react";

const Profile = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <>
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
                <div className="label">Email</div>
                <div className="profile-info">{user.email}</div>

                <div className="label">User Id</div>
                <div className="profile-info">{user.issuer}</div>
              </div>
            </div>
          </>
        )
      )}
      <style jsx>{`
        .label {
          font-size: 12px;
          color: #6851ff;
          margin: 30px 0 5px;
          margin-left: 2%;
        }
        .profile-info {
          color: white;
          font-size: 17px;
          word-wrap: break-word;
          margin-left: 2%;
        }
      `}</style>
    </>
  );
};

export default Profile;
