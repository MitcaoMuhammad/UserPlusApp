import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import LoginForm from './companint/LoginForm/LoginForm'
import AdminLogin from './companint/LoginForm/AdminLogin'
import Dashboard from './companint/Dashboard/Dashboard'
import UserPlusPage from './companint/UserPlusPage/UserPlusPage'

function App() {
	const [data, setData] = useState([])

	const handleAddUser = newUser => {
		setData(prevData => [...prevData, newUser])
	}

	return (
		<Router>
			<Routes>
				<Route path='/isloxAdmin' element={<LoginForm />} />
				<Route path='/' element={<AdminLogin />} />
				<Route
					path='/dashboard'
					element={<Dashboard data={data} setData={setData} />}
				/>
				<Route
					path='/userplus'
					element={<UserPlusPage onAdd={handleAddUser} />}
				/>
			</Routes>
		</Router>
	)
}

export default App
