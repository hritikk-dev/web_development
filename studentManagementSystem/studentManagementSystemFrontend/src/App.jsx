import React from "react"
import Dashboard from "./component/Dashboard"
import AddStudent from "./component/AddStudent"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditStudent from "./component/EditStudent"
import AuthForm from "./component/LoginPage"

function App() {
  return (

    <Router>
      <Routes>
        {/* '/' path par sirf Dashboard dikhega */}
        <Route path="/" element={<Dashboard />} />

        {/* '/add' path par sirf AddStudent dikhega */}
        <Route path="/add" element={<AddStudent />} />
        {/* <Route path="/edit" element={<EditStudent />} /> */}
        <Route path="/student/:id" element={<EditStudent />} />
        <Route path="/login" element={<AuthForm />} />

      </Routes>
    </Router>
  )
}

export default App
