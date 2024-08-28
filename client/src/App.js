import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import Signup from "./components/Signup";
import ProfilePage from "./components/ProfilePage";
// import { useEffect, useState } from "react";

function App() {

  // const [user,setUser] = useState(null);

  // useEffect(()=>{
  //   const getUser = async ()=>{
  //     try {
  //       const res = await fetch("http://localhost:5000/api/profile", {
  //         method: "GET",
  //         headers: {
  //            Accept: 'application/json',
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //       });
  //       const data = await res.json();
  //       if(res.status !== 201){
  //         setUser(null);
  //       }
  //       else{
  //         setUser(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   // getUser();
  // },[]);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<Signup />} />
        {<Route path="/profile" element={<ProfilePage />} />}
      </Routes>
    </Router>
  );
}

export default App;
