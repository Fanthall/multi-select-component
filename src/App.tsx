import React, { useEffect, useState } from "react";
import "./App.css";
import MultiSelect, { Item } from "./Component/MultiSelect";
import { getRichAndMorty } from "./Service/rickandmortyapi";

function App() {
	const [value, setValue] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [options, setOptions] = useState<Item[]>([]);
	const [selectedItems, setSelectedItems] = useState<Item[]>([]);
	useEffect(() => {
		if (value.length > 0) {
			getRichAndMorty(value)
				.then((res) => {
					setOptions(
						res.data.results.map((item: any) => {
							return {
								id: item.id,
								name: item.name,
								image: item.image,
								checked: selectedItems.find((i) => i.id === item.id)
									? true
									: false,
							};
						})
					);
				})
				.catch((err) => {
					setOptions([]);
					setErrorMessage(err.response.data.error);
				});
		} else {
			setOptions([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<div className="App">
			<MultiSelect
				withImage
				width={425}
				value={value}
				onChange={(value: string) => {
					setValue(value);
				}}
				options={options}
				selectedItems={selectedItems}
				onSelectItemsChange={(values: Item[]) => {
					setSelectedItems(values);
				}}
				errorMessage={errorMessage}
			/>
		</div>
	);
}

export default App;
