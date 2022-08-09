import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import { handleError } from "./assets/handleError";
function App() {
  const [userData, setUserData] = useState(null)
  const [createUser, setCreateUser] = useState(false)
  const [name, setName] = useState("")
  const [errorCode, setErrorCode] = useState(null)

  let faceio
  useEffect(() => {
    faceio = new faceIO("fioa32c5")
  }, [])

  const handleSignIn = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto", payload: { name: name },
      });
      console.log("response:", response);
    } catch (error) {
      setErrorCode(handleError(error))
    }
  }

  const handleLogIn = async () => {
    console.log("logging in...");
    try {
      let response = await faceio.authenticate({
        locale: "auto",
      });
      console.log("response:", response);
      setUserData({ facialId: response.facialId, pin: response.payload.pin, name: response.payload.name })
    } catch (error) {
      setErrorCode(handleError(error))
    }
  }

  const handleCreateNewUser = () => {
    setCreateUser(true)
    setUserData(null)
  }

  return (
    <section>
      <div>
        <h1 style={{ lineHeight: "0" }}>
          The <span style={{ color: "#646cff" }}>faciem</span> Project
        </h1>
        <hr/>
        <h2 style={{ marginTop: "0" }}>Face Authentication</h2>
      </div>
      
      <div style={{ marginTop: "30px" }}>
        {createUser && (
          <>
            <h2>Create new user</h2>
            Name: <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} />
          </>
        )}
        {userData && (
          <>
            <h2 style={{ color: "green" }}>You are logged in!</h2>
            Name: {userData?.name}
            <br/>
            ID: {userData?.facialId}
            <br/>
          </>
        )}
      </div>
      {errorCode && (<h2 style={{ color: "red" }}>{errorCode}</h2>)}
      <div style={{ marginTop: "15px" }}>
        {createUser ? <button disabled={name===""} onClick={handleSignIn}>Sign-up</button> : <button onClick={handleCreateNewUser}>New user</button>}
        <button style={{ marginLeft: "10px" }} onClick={handleLogIn}>Log-in</button>
      </div>
    </section>
  );
}

export default App;
