import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../ui/Button/Button'
import Input from '../../ui/Input/Input'

export default function AdminLogin() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()

		if (username === 'admin' && password === '1234') {
			localStorage.setItem('isAdminAuthenticated', 'true')
			navigate('/userplus')
		} else {
			setError('Incorrect login information!')
		}
	}

	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			handleSubmit(e)
		}
	}

	return (
		<div className='flex justify-center items-center h-[750px] bg-white p-5'>
			<form
				onSubmit={handleSubmit}
				className='bg-[#ffffff1a] backdrop-blur-[12px] rounded-[12px] p-[2rem] w-full max-w-[350px] shadow-[0_6px_15px_rgba(0,0,0,0.3)] text-center animate-fadeIn relative flex flex-col items-center border border-[#1a1a1a] '
			>
				<h2 className='text-[#1a1a1a] mb-[1rem] font-bold '>
					Admin Panel Login
				</h2>
				<Input
					type='text'
					placeholder='Admin name'
					value={username}
					onChange={e => setUsername(e.target.value)}
					onKeyDown={handleKeyPress}
				/>
				<Input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					onKeyDown={handleKeyPress}
				/>
				<Button label='Login' />
				{error && (
					<p className='text-[#ff4d4d] mt-[10px] text-[14px] animate-shake'>
						{error}
					</p>
				)}
			</form>
		</div>
	)
}
