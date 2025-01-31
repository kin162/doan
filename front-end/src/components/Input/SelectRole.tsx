import React from "react";
import SelectOption from "../SelectOption";
import { OptionTypes } from "../../models/util.model";
import { useGetRoleListQuery } from "../../api/roleApi";

interface IProps {
	id: any;
	handleChange: any;
	isLabel?: boolean;
	placeholder?: string;
}

export default function SelectRole(props: IProps) {
	const { data, isFetching } = useGetRoleListQuery({
		page: 1,
		pageSize: 100,
	});

	let optionRole: OptionTypes[] = [];
	optionRole.push({ value: "", label: "Tất cả vai trò" });
	if (data) {
		data.data.forEach((item) => {
			optionRole.push({
				value: item._id,
				label: item.name,
			});
		});
	}

	const handleChangeRole = (id: any) => {
		props.handleChange(id);
	};

	return (
		<div>
			<SelectOption
				id={props.id ? props.id : ""}
				label="Vai trò"
				handleChange={handleChangeRole}
				optionData={optionRole}
				isLabel={props.isLabel}
				placeholder={props.placeholder}
			/>
		</div>
	);
}
