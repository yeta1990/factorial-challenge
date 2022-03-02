export default function RadioButton({ label, setSelected }) {
	return (
		<div>
			<input
				type="radio"
				className="btn-check"
				name="btnradio"
				id={label}
				autoComplete="off"
				defaultChecked={false}
				onClick={() => setSelected(label)}
			/>
			<label className="btn btn-outline-primary" htmlFor={label}>
				{label}
			</label>
		</div>
	);
}
