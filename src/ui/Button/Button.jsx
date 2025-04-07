import './Button.css'

export default function Button({ type, label, onClick }) {
	return (
		<button type={type} className='button' onClick={onClick}>
			{label}
		</button>
	)
}
