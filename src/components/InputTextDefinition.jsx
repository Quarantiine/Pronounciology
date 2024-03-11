import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function InputTextDefinition({
	textDefinition,
	loadingDefinition,
}) {
	const [copied, setCopied] = useState(false);
	const [definition, setDefinition] = useState("");
	const timeoutRef = useRef();

	const handleCopyText = async (definition) => {
		clearTimeout(timeoutRef.current);

		setCopied(true);
		setDefinition(definition);

		timeoutRef.current = setTimeout(() => {
			setCopied(false);
			setDefinition("");
		}, 5000);
		await navigator.clipboard.writeText(definition);
	};

	return (
		<>
			<div className="definition-container-overflow w-full max-h-[200px] h-fit border-2 bg-white rounded-3xl p-5 flex flex-col justify-start items-start overflow-x-hidden overflow-y-scroll gap-2 relative">
				{copied &&
					createPortal(
						<>
							<div className="flex justify-between items-center gap-2 fixed top-5 left-1/2 -translate-x-1/2 w-[90%] sm:w-96 h-fit bg-white rounded-3xl border px-5 py-3 border-green-500 ">
								<div className="flex flex-col gap-1">
									<p className="text-sm font-bold">Copied Definition:</p>
									<p className="text-sm">{definition}</p>
								</div>
								<Image
									src={"/icons/copied.svg"}
									alt="info"
									width={25}
									height={25}
								/>
							</div>
						</>,
						document.body
					)}
				{loadingDefinition && (
					<div className="absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.9)] flex justify-center items-center">
						<div className="min-w-[32px] max-w-[32px] min-h-[32px] max-h-[32px] border-4 border-t-transparent animate-spin border-blue-500 rounded-full" />
					</div>
				)}

				<div className="flex justify-between items-center gap-2 w-full">
					<h1 className="text-xl font-semibold w-full">
						{textDefinition?.meanings?.length > 1
							? "Definitions"
							: "Definition"}{" "}
						of {`'${textDefinition.word}'` || "Word"}
					</h1>
				</div>

				<div
					className={`grid justify-center items-start gap-x-2 gap-y-4 ${
						textDefinition?.meanings?.length > 1
							? "grid-cols-1 sm:grid-cols-2"
							: "grid-cols-1"
					}`}
				>
					{textDefinition.meanings.map((meanings, index) => {
						return (
							<React.Fragment key={index}>
								{meanings.definitions.map((definition, index2) => (
									<div className="" key={index2}>
										<div className="flex justify-start items-center gap-2 w-full">
											<p className={`text-sm font-bold text-gray-400`}>
												{meanings.partOfSpeech}
											</p>
											<button
												onClick={() => handleCopyText(definition.definition)}
												title="Copy Definition"
												className={`text-sm text-gray-400`}
											>
												copy
											</button>
										</div>
										<p className="">{definition.definition}</p>
									</div>
								))}
							</React.Fragment>
						);
					})}
				</div>
			</div>
		</>
	);
}
