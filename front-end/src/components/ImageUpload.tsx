import React, { useState } from "react";

const ImageUpload = ({
	url,
	setUrl,
	className,
}: {
	url: any;
	setUrl: any;
	className?: string;
}) => {
	const [loading, setLoading] = useState(false);

	const endPoint = `${process.env.REACT_APP_BASE_URL}/images`;
	const uploadImage = async (image: any) => {
		setLoading(true);
		const data = new FormData();
		data.append("file", image);

		try {
			const response = await fetch(endPoint, {
				method: "POST",
				body: data,
			});
			const res = await response.json();
			setUrl(res.filename);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const handleImageChange = (event: any) => {
		const file = event.target.files[0];
		uploadImage(file);
	};

	return (
		<div
			className={`${
				className ? className : ""
			} h-screen sm:px-8 md:px-16 sm:py-8`}
		>
			<div className="mx-auto max-w-screen-lg h-full">
				<header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
					<input
						id="hidden-input"
						type="file"
						className="hidden"
						onChange={handleImageChange}
						accept="image/*"
					/>
				</header>
				{loading && (
					<div className="flex items-center justify-center gap-2">
						<div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
						<span>Processing...</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageUpload;