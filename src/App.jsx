import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import handleError from './assets/handleError'


function App() {
  let faceio;
  const [errorMessage, setErrorMessage] = useState()
  const [userData, setUserData] = useState(null)

  const [creatingUser, setCreatingUser] = useState(false)

  const [loader, setLoader] = useState(false)

  

  useEffect(() => {
    faceio = new faceIO("fioa32c5");
  }, []);

  const handleSignIn = async () => {
    setLoader(true)
    setCreatingUser(true)
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: "example@gmail.com",
          pin: "12345",
        },
      });
      // console.log(response);
    } catch (error) {
      console.log(error);
      setErrorMessage(handleError(error))
    } finally {
      setLoader(false)
    }
  };

  const handleLogIn = async () => {
    setLoader(true)
    try {
      let response = await faceio.authenticate({
        locale: "auto",
      });
      setUserData({ facialId: response.facialId, pin: response.payload.pin })

      // console.log(` Unique Facial ID: ${response.facialId}
      //     PayLoad: ${response.payload}
      //     `);
    } catch (error) {
      console.log(error);
      setErrorMessage(handleError(error))
    } finally {
      setLoader(false)
    }
  };

  return (
    <section>
      <div>
        <h1 style={{ color: "#646cff", lineHeight: "0px" }}>
          faciem
        </h1>
        <hr/>
        <h2 style={{ marginTop: "0" }}>Face Authentication</h2>
      </div>
      {userData && (
          <>
            <h2 style={{ color: "green" }}>You are logged in!</h2>
            Your face ID: {userData?.facialId}
            <br/>
          </>
        )}
      {(errorMessage) && (
        <h2 style={{ color: "red" }}>Error: {errorMessage}</h2>
        )}
      {loader 
        ? <div className="loader-box">
            <div className="loader-container">
              <span className="loader-circle"></span>
              <span className="loader-circle"></span>
              <span className="loader-circle"></span>
              <span className="loader-circle"></span>
            </div>
          </div> 
        : (userData 
        ? <div>
            <a href="/">Log-out</a>
          </div>
        : (creatingUser
          ? <div><a href="/">Home</a></div>
          : <div>
            <button onClick={handleSignIn}>Sign-up</button>
            <button onClick={handleLogIn}>Log-in</button>
          </div>))}
      
    </section>
  );
}

export default App;