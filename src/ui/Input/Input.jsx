import './Input.css'

export default function Input({
	type = 'text',
	placeholder,
	value,
	onChange,
	onKeyDown,
}) {
	return (
		<input
			type={type}
			className='input'
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			onKeyDown={onKeyDown}
		/>
	)
}
