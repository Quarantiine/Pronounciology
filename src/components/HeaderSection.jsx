"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function HeaderSection() {
	const [closeWarning, setCloseWarning] = useState(false);

	const handleCloseWarning = () => {
		setCloseWarning(true);
	};

	return (
		<>
			<p className="text-[10px] text-gray-400">By: Daniel Ward</p>
			{!closeWarning && (
				<div className="px-3 py-1 rounded-md bg-yellow-500 text-white flex justify-center items-center gap-2 w-[90%] sm:w-fit">
					<p>Some languages are unresponsive to certain devices</p>
					<button className="text-btn" onClick={handleCloseWarning}>
						<Image
							className="min-w-[20px] min-h-[20px]"
							src="\icons\close.svg"
							alt="close"
							width={20}
							height={20}
						/>
					</button>
				</div>
			)}
		</>
	);
}
