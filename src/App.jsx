import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import handleError from './assets/handleError'


function App() {
  let faceio;
  const [errorMessage, setErrorMessage] = useState()
  const [userData, setUserData] = useState(null)

  

  useEffect(() => {
    faceio = new faceIO("fioa32c5");
  }, []);

  const handleSignIn = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: "example@gmail.com",
          pin: "12345",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      setErrorMessage(handleError(error))
    }
  };

  const handleLogIn = async () => {
    try {
      let response = await faceio.authenticate({
        locale: "auto",
      });
      setUserData({ facialId: response.facialId, pin: response.payload.pin, name: response.payload.name })

      console.log(` Unique Facial ID: ${response.facialId}
          PayLoad: ${response.payload}
          `);
    } catch (error) {
      console.log(error);
      setErrorMessage(handleError(error))
    }
  };

  return (
    <section>
      <div>
        <h1 style={{ lineHeight: "0" }}>
          The <span style={{ color: "#646cff" }}>faciem</span> Project
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
      {errorMessage && (
        <h2 style={{ color: "red" }}>Error: {errorMessage}</h2>
      )}
      {userData ? <a href="/">Log-out</a> : (<div>
        <button onClick={handleSignIn}>Sign-up</button>
        <button onClick={handleLogIn}>Log-in</button>
      </div>)}
    </section>
  );
}

export default App;