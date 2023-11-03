import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { tokenExists } from "./actions/authAction";
import { Cookies } from 'react-cookie';
import Loading from "./pages/Loading";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
function App() {
  const user = useSelector(state => state.auth)
  const role = user.user.role
  const dispatch = useDispatch()
  const cookies = new Cookies();
  const token = cookies.get('token');
  if (!user.isAuthenticated) {
    dispatch(tokenExists(token))
  }
  if (token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route >
            {user.isAuthenticated ? <Route path="/chat/*" element={<Home />} /> : <Route path="/chat/*" element={<Loading />} />}
          </Route>,
          {role === "admin" && <Route path="/dashboard/*" element={<Dashboard />} />}
          <Route path="*" element={<Homepage />} />
          {role === "admin" && <Route path="/register/*" element={<Register />} />}
        </Routes>
      </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route >
            <Route path="/chat/*" element={<Login />} />
            <Route path="*" element={<Homepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }

}
export default App;