import './Dashboard.css'
import { useState, useEffect } from 'react'

export default function Dashboard() {
	const [data, setData] = useState([])
	const [search, setSearch] = useState('')
	const [deleteId, setDeleteId] = useState(null)
	const [imageModal, setImageModal] = useState(null)
	const [notifications, setNotifications] = useState([])
	const [menuOpen, setMenuOpen] = useState(false)

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('users')) || []
		setData(storedData)
		setNotifications(
			storedData.map(user => `${user.name} added by ${user.addedBy}`)
		)
	}, [])

	const toggleMenu = () => setMenuOpen(prev => !prev)
	const handleSearch = e => setSearch(e.target.value)
	const handleDeleteClick = id => setDeleteId(id)
	const handleImageClick = image => setImageModal(image)
	const handleConfirmDelete = () => {
		if (deleteId !== null) {
			const updatedData = data.filter(item => item.id !== deleteId)
			setData(updatedData)
			localStorage.setItem('users', JSON.stringify(updatedData))
			setDeleteId(null)
		}
	}
	const handleCancelDelete = () => setDeleteId(null)

	return (
		<div className='bg-[#ffffff] h-screen flex items-start'>
			<div className='flex items-center fixed top-[10px] left-[92%] w-auto gap-[10px] z-99'>
				<input
					type='text'
					value={search}
					onChange={handleSearch}
					className='py-[12px] px-[20px] border border-[#1a1a1a] rounded-[30px] text-[16px] fixed top-[10px] left-[31%] bg-[#fff] text-[#333] shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out w-[80%] max-w-[500px] focus:shadow-[0_0_5px_rgba(153,153,153,0.3)] focus:bg-[#fff] focus:scale-[1.05] hover:scale-[1.02]placeholder:text-[#666]'
					placeholder='Search...'
				/>
				<div className=' relative inline-block z-20'>
					<button
						className='bg-none cursor-pointer w-[40px] h-[40px] flex justify-center items-center rounded-[50%] transition-all duration-200 ease-in-out border-[1px] border-solid border-[#1a1a1a] hover:scale-[1.1] bg-[#ffffff1a]'
						onClick={toggleMenu}
					>
						<img
							className='w-[24px] h-[24px]'
							src='./notification.svg'
							alt='Notifications'
						/>
					</button>
					{menuOpen && (
						<div className=' absolute top-[50px] right-0 bg-[#fff] text-[#333] shadow-[0_4px_10px_rgba(0,0,0,0.1)] w-[250px] rounded-[10px] p-[10px] z-99 border border-[#1a1a1a]'>
							<ul className='list-none p-0 m-0 z-20'>
								{notifications.length > 0 ? (
									notifications.map((msg, index) => <li key={index}>{msg}</li>)
								) : (
									<li>No notifications yet.</li>
								)}
							</ul>
						</div>
					)}
				</div>
			</div>
			<table className='w-[90%] m-[30px] m-auto p-[20px] rounded-[10px] bg-[#ffffffe6] backdrop-blur-[8px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] animate-fadeIn table overflow-x-auto mt-[68px] border border-[#1a1a1a] '>
				<thead className='bg-[#e0e0e0] text-[#333]'>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
						<th className='w-[45px]'>Image</th>
						<th className='w-[45px]'>Delete</th>
					</tr>
				</thead>
				<tbody className='border-b border-b-[#eee]'>
					{data
						.filter(item =>
							item.name.toLowerCase().includes(search.toLowerCase())
						)
						.map(item => (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>{item.name}</td>
								<td>{item.description}</td>
								<td>
									<button
										className='bg-[#fff] border border-[#eee] py-[8px] px[12px] text-[16px] text-[#666] rounded-[6px] cursor-pointer transition-all duration-300 ease-in-out flex justify-center items-center w-[40px] h-40px hover:bg-[#f8f8f8] scale-[1.1]'
										onClick={() => handleImageClick(item.image)}
									>
										<img
											className='w-[20px] h-[20px] transition-all duration-200 invert-[0.5] hover:scale-[1.2] hover:opacity-[1]'
											src='./viewe.svg'
											alt='view'
										/>
									</button>
								</td>
								<td>
									<button
										className='bg-[#fff] border border-[#eee] py-[8px] px[12px] text-[16px] text-[#666] rounded-[6px] cursor-pointer transition-all duration-300 ease-in-out flex justify-center items-center w-[40px] h-40px hover:bg-[#f8f8f8] scale-[1.1]'
										onClick={() => handleDeleteClick(item.id)}
									>
										<img
											className='w-[20px] h-[20px] transition-all duration-200 invert-[0.5] hover:scale-[1.2] hover:opacity-[1]'
											src='./delet.svg'
											alt='delete'
										/>
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			{deleteId !== null && (
				<div className='fixed top-0 left-0 w-full h-full bg-[#ffffffe6] flex justify-center items-center z-100 animate-fadeIn'>
					<div className='bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] p-[30px] rounded-[10px] w-[350px] text-center animate-slideUp'>
						<p className='text-[16px] text-[#1a1a1a] mb-[20px]'>
							Are you sure you want to delete this person?
						</p>
						<button
							className='py-[12px] px-[20px] m-[10px] rounded-[6px] text-[16px] cursor-pointer transition-all duration-300 ease-in-out bg-[#e74c3c] text-white hover:bg-[#c0392b] hover:scale-[1.05]'
							onClick={handleConfirmDelete}
						>
							Yes
						</button>
						<button
							className='py-[12px] px-[20px] m-[10px] rounded-[6px] text-[16px] cursor-pointer transition-all duration-300 ease-in-out bg-[#95a5a6] text-white border-none hover:bg-[#c0392b] hover:scale-[1.05]'
							onClick={handleCancelDelete}
						>
							No
						</button>
					</div>
				</div>
			)}
			{imageModal && (
				<div
					className='fixed top-0 left-0 w-full h-full bg-[#ffffffe6] flex justify-center items-center z-100 animate-fadeIn'
					onClick={() => setImageModal(null)}
				>
					<div className='bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] p-[30px] rounded-[10px] w-[350px] text-center animate-slideUp'>
						<img
							src={imageModal}
							alt='Preview'
							className=' w-full rounded-[10px] object-contain shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out hover:scale-[1.05]'
						/>
					</div>
				</div>
			)}
		</div>
	)
}
