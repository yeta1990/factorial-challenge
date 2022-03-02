import RadioButton from "./RadioButton";
import { useEffect, useState } from "react";

export default function RadioButtonGroup({ labels, setSelected }) {
	let allRadioButtons = labels.map((label, i) => {
		return (
			<div key={i}>
				<RadioButton label={label} setSelected={setSelected} />
			</div>
		);
	});

	return (
		<div>
			<div
				className="btn-group"
				role="group"
				aria-label="Basic radio toggle button group"
			>
				{allRadioButtons}
			</div>
		</div>
	);
}
