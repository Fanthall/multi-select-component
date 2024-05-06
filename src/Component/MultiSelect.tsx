import React, { FunctionComponent, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
interface MultiSelectProps {
	value: string;
	onChange: (value: string) => void;
	name?: string;
	id?: string;
	containerStyle?: React.CSSProperties;
	listStyle?: React.CSSProperties;
	borderless?: boolean;
	withImage?: boolean;
	onSelectItemsChange: (values: Item[]) => void;
	selectedItems: Item[];
	pageCount?: number;
	totalPages?: number;
	width?: number;
	options: Item[];
	errorMessage?: string;
	emptyMessage?: string;
}
export interface Item {
	id: number;
	name: string;
	image: string;
	checked: boolean;
}
const MultiSelect: FunctionComponent<MultiSelectProps> = (props) => {
	const [selectedItems, setSelectedItems] = useState<Item[]>(
		props.selectedItems ?? []
	);
	const [resultItems, setResultItems] = useState<Item[]>(props.options ?? []);
	const [value, setValue] = useState<string>(props.value ?? "");
	const border = props.borderless ? {} : { border: "1px solid gray" };

	useEffect(() => {
		props.onChange(value);
	}, [props, value]);
	useEffect(() => {
		setResultItems(props.options);
	}, [props.options]);
	return (
		<div style={{ width: props.width }}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
					alignContent: "center",
					margin: 2,
					height: "fit-content",
					flexWrap: "wrap",
					minHeight: 35,
					width: "100%",
					borderRadius: 10,
					...border,
					...props.containerStyle,
				}}
			>
				{selectedItems.length > 0 && (
					<div
						style={{
							marginTop: 5,
							marginLeft: 5,
							marginRight: 5,
							display: "flex",
							flexDirection: "row",
							justifyContent: "start",
							alignContent: "center",
							width: "fit-content",
							flexWrap: "wrap",
						}}
					>
						{selectedItems.map((item, index) => {
							return (
								<div
									style={{
										backgroundColor: "rgba(125,125,125,0.5)",
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-around",
										alignItems: "center",
										borderRadius: 7,
										padding: 8,
										marginRight: 5,
										marginBottom: 5,
										width: "fit-content",
										lineHeight: ".7rem",
									}}
								>
									<span
										style={{
											fontSize: ".9rem",
											marginRight: 4,
										}}
									>
										{item.name}
									</span>
									<RxCross1
										size={16}
										onClick={() => {
											selectedItems.splice(index, 1);
											setSelectedItems([...selectedItems]);
											const newList = resultItems.map((i) => {
												if (i.id === item.id) {
													return { ...item, checked: false };
												} else return i;
											});
											setResultItems(newList);
										}}
										style={{
											backgroundColor: "rgba(125,125,125,0.8)",
											borderRadius: 5,
											width: "fit-content",
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "center",
											padding: 5,
											cursor: "pointer",
											fontSize: "1.2rem",
										}}
									/>
								</div>
							);
						})}
					</div>
				)}
				<input
					contentEditable
					name={props.name}
					value={value}
					id={props.id}
					onChange={(e) => {
						setValue(e.target.value);
					}}
					style={{
						flexGrow: 1,
						borderColor: "white",
						background: "transparent",
						border: "none",
						boxShadow: "none",
						outline: "none",
						margin: 10,
					}}
				></input>
			</div>
			<div
				style={{
					display: value.length > 0 ? "flex" : "none",
					flexDirection: "column",
					justifyContent: "start",
					alignContent: "start",
					margin: 2,
					overflow: "hidden",
					width: "100%",
					maxHeight: 200,
					borderRadius: 10,
					...border,
					...props.listStyle,
				}}
			>
				{resultItems.length > 0 ? (
					<div
						style={{
							width: "100%",
							height: "100%",
							overflowY: "scroll",
						}}
					>
						{resultItems.map((item, index) => {
							const pattern: RegExp = new RegExp(value, "gi");
							return (
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "flex-start",
										height: 40,
										borderBottom: "1px solid gray",
										paddingRight: 5,
										paddingLeft: 5,
									}}
									key={item.id}
									onClick={() => {
										if (item.checked) {
											const newSelected = selectedItems.filter(
												(i) => i.id !== item.id
											);
											setSelectedItems(newSelected);
										} else {
											setSelectedItems([
												...selectedItems,
												...[item],
											]);
										}
										resultItems[index].checked = !item.checked;
										setResultItems([...resultItems]);
									}}
								>
									<input
										style={{ width: 25, height: 25 }}
										type="checkbox"
										checked={item.checked}
									/>
									{props.withImage && (
										<img
											src={item.image}
											alt={item.name}
											style={{
												borderRadius: 5,
												width: 30,
												marginRight: 10,
												marginLeft: 10,
											}}
										/>
									)}
									<span
										dangerouslySetInnerHTML={{
											__html: item.name.replace(
												pattern,
												"<span style='font-weight: bold;'>$&</span>"
											),
										}}
									></span>
								</div>
							);
						})}
					</div>
				) : (
					<div
						style={{
							textAlign: "center",
							color: props.errorMessage
								? "rgba(255,0,0,0.5)"
								: "rgba(0,0,0,.6)",
							padding: 5,
						}}
					>
						{props.errorMessage
							? props.errorMessage
							: props.emptyMessage ?? "There is noting to list"}
					</div>
				)}
			</div>
		</div>
	);
};
export default MultiSelect;
