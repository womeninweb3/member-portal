import { useContext, useEffect, useState} from "react";
import { UserContext } from "../lib/UserContext";
import Loading from "../components/loading";
import Link from "next/link";

// Styles
import indexStyles from "./styles/pages/index.module.css"
import learnStyles from "./styles/pages/learn.module.css" 
import { Button } from "@material-tailwind/react"

// Airtable
import { getCurrentUser } from "../lib/getCurrentUser";
import { updateCurrentLevel } from "../lib/updateCurrentLevel";
import { createUser } from "../lib/createUser";

const Learn = () => {

  // User data:
  const [user] = useContext(UserContext);
  const [currentLevel, setCurrentLevel] = useState('');
  const [lockPage2Status, setLockPage2Status] = useState(true);
  const [lockPage3Status, setLockPage3Status] = useState(true);
  const [submissionURL, setSubmissionURL] = useState([]);

  // Gets users data:
  async function getUsersData(user){
    try{ 
      return await getCurrentUser(user);
    } catch (error) {
        console.log("error" + error);
    } finally {
      console.log("Task is done");
    }
  }

  // Gets users current level: 
  async function getCurrentLevel(user){
    if(user !== null && user !== undefined){
      console.log("getCurrentLevel: User Email: ", user);

    }
    // Get user data:
    getUsersData(user).then(data => {      

      // Gets the current level: 
      console.log("USER DATA INSIDE: ", data["Current Level"]);
      setCurrentLevel(data["Current Level"]);

      // If level is 1 - lock 2 and 3 
      (data["Current Level"] === 1) ? setLockPage2Status(true) : setLockPage2Status(false);
      (data["Current Level"] === 1) ? setLockPage3Status(true) : setLockPage3Status(false);
    });
  }


  // Gets users data:
  async function updateUsersLevel(){
    console.log("Starting to update User");
    try{ 
      return await updateCurrentLevel("recks2cuxl24w7NAX","betonelon@gmail.com", "0x0", "4", 2);
    } catch (error) {
        console.log("error" + error);
    } finally {
      console.log("Task is done");
      setLockPage2Status(false);
    }
  }
  
  // Handles users submission:
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${submissionURL}`)
    // Update current level: 
    updateUsersLevel();
  }
  
  useEffect(() => {
    
    if(user?.email !== null && user?.email !== undefined){
      console.log("1st: User Email: ", user?.email);
      getCurrentLevel(user.email);
      // createUser();
     }
  }, [user?.email]);

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <div>
            <div className={indexStyles.tabcontainer}>
              <Link href="/learn">
                <Button 
                  className={indexStyles.Button}>Level 1: Learn</Button>
              </Link>
              <Link href="/prototype">
                <Button className={indexStyles.Button} disabled={lockPage2Status}>Level 2: Prototype</Button>
              </Link>
              <Link href="/venture">
                <Button className={indexStyles.Button} disabled={lockPage3Status}>Level 3: Venture</Button>
              </Link>
            </div>
            <div className={indexStyles.container}>
              <div className={indexStyles.mainWrapper}>

                {/* Left Hand Wrapper */}
                <div className={indexStyles.innerWrapper}>
                  <h1 className={indexStyles.title}>Level 1: Learn: {user.email} </h1>
                  <h1 className={indexStyles.label}>Current Level: {currentLevel}</h1>
                  {/* <Link className={learnStyles.label} href="/venture-builder">Back to Venture Builder</Link> */}
                </div>
                
                {/* Right Hand Wrapper */}
                <div className={indexStyles.innerWrapper}>

                  {/* Requirements Data: */}
                  <hr className={indexStyles.hr}/>
                  <label className={indexStyles.label}>Requirements</label>
                  <hr className={indexStyles.hr}/>
                  <div className={indexStyles.colGrid}>
                    <label className={indexStyles.label}>1. Title and Tagline</label>
                    <label className={indexStyles.label}>2. Vision</label>
                    <label className={indexStyles.label}>3. Problem</label>
                    <label className={indexStyles.label}>4. Solution</label>
                    <label className={indexStyles.label}>5. Market</label>
                    <label className={indexStyles.label}>7. Product Focus</label>
                    <label className={indexStyles.label}>8. Competition</label>
                    <label className={indexStyles.label}>9. Team</label>
                  </div>

                  {/* Submission Data: */}
                  <hr className={indexStyles.hr}/>
                  <label className={indexStyles.label}>SUBMISSION</label>
                  <hr className={indexStyles.hr}/>

                  {/* Form Data: */}
                  <form onSubmit={handleSubmit}>
                    <div className={indexStyles.innerBg}>
                      <label className={indexStyles.warningLabel}>Due: 27 Jan 2023</label>
                      <div className={indexStyles.innerBg}>
                        <label className={indexStyles.label}>Enter your submission:</label></div>
                      <div className={indexStyles.innerBg}>  
                        <input 
                          className={indexStyles.input}
                          type="text" 
                          value={submissionURL}
                          onChange={(e) => {setSubmissionURL(e.target.value)}}
                        />
                      </div>
                      <div className={indexStyles.innerBg}>
                        <input className={indexStyles.submitInput} type="submit" value="SUBMIT"/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Learn;
