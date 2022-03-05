export default function Selector({ options, setTimeFrame }) {
	function handleSelectOption(e) {
		setTimeFrame(e.target.value);
	}

	return (
		<div>
			<select className="form-select" onChange={handleSelectOption}>
				{options.map((o, i) => {
					return (
						<option value={o.value} key={i}>
							{o.label}
						</option>
					);
				})}
			</select>
		</div>
	);
}
