import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../ui/Button/Button'
import Input from '../../ui/Input/Input'

export default function UserPlusPage({ onAdd }) {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState(null)
	const [modalMessage, setModalMessage] = useState('')
	const [showModal, setShowModal] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const isAdmin = localStorage.getItem('isAdminAuthenticated')
		if (isAdmin !== 'true') {
			navigate('/adminlogin')
		}
	}, [navigate])

	const handleSubmit = () => {
		const adminName = localStorage.getItem('adminName') || 'Unknown Admin'

		if (!name.trim() || !description.trim()) {
			setModalMessage('⚠️ Please fill in all fields!')
			setShowModal(true)
			return
		}

		const newUser = {
			id: Date.now(),
			name,
			description,
			image,
			addedBy: adminName,
		}

		const storedUsers = JSON.parse(localStorage.getItem('users')) || []
		const updatedUsers = [...storedUsers, newUser]
		localStorage.setItem('users', JSON.stringify(updatedUsers))

		if (onAdd) {
			onAdd(newUser)
		}

		setModalMessage('✅ User added successfully!')
		setShowModal(true)

		setTimeout(() => {
			navigate('/userplus')
		}, 1500)
	}

	const handleImageChange = e => {
		const file = e.target.files[0]

		if (file) {
			const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']
			if (!validImageTypes.includes(file.type)) {
				setModalMessage(
					'⚠️ Invalid image format! Please upload JPG, PNG, or GIF.'
				)
				setShowModal(true)
				return
			}

			const reader = new FileReader()
			reader.onloadend = () => setImage(reader.result)
			reader.readAsDataURL(file)
		}
	}

	const closeModal = () => setShowModal(false)

	return (
		<div className='flex justify-center items-center h-[750px] bg-white p-5'>
			<div className='bg-[#ffffff1a] backdrop-blur-[12px] rounded-[12px] p-[2rem] w-full max-w-[350px] shadow-[0_6px_15px_rgba(0,0,0,0.3)] text-center animate-fadeIn relative flex flex-col items-center border border-[#1a1a1a] '>
				<h2 className='text-[#1a1a1a] mb-[1rem] font-bold '>
					Add a New Person
				</h2>
				<Input
					className='userplus-input'
					type='text'
					placeholder='Name'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<Input
					className='userplus-input'
					type='text'
					placeholder='Description'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<label
					htmlFor='image-upload'
					className='block p-[12px] rounded-[8px] cursor-pointer text-[16px] mt-[20px] bg-[#ffffff26] text-[#1a1a1a] transition-all duration-300 ease-in-out w-[50%] text-center border border-[#1a1a1a] hover:bg-[#ffffff40] hover:scale-[1.02]'
				>
					Select Image
				</label>
				<input
					id='image-upload'
					type='file'
					accept='image/*'
					style={{ display: 'none' }}
					onChange={handleImageChange}
				/>

				{image && (
					<img
						src={image}
						alt='Selected'
						className='w-full max-h-[350px] object-cover mt-[10px] rounded-[6px] block shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-transform duration-300 ease-in-out border border-[#1a1a1a] hover:scale-[1.02]'
					/>
				)}

				<Button onClick={handleSubmit} label='Add' />
			</div>

			{showModal && (
				<div className='fixed top-0 left-0 w-full h-full bg-[#00000099] flex justify-center items-center z-99 backdrop-blur-[5px] p-[15px]'>
					<div
						className='bg-[#ffffff] p-[20px] mr-[30px] rounded-[8px] text-center w-[300px] max-w-[90%] animate-fadeIn wrap-break-word
					border border-[#1a1a1a]'
					>
						<p
							className={`modal-message ${
								modalMessage.includes('✅')
									? 'text-[#76e000] font-medium'
									: 'text-[#ff4d4d] font-medium animate-shake'
							}`}
						>
							{modalMessage}
						</p>
						<Button onClick={closeModal} label='OK' />
					</div>
				</div>
			)}
		</div>
	)
}
