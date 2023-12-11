import React, { useState } from "react";

export default function InputTextDefinition({
	textDefinition,
	loadingDefinition,
	inputDefinition,
}) {
	const handleCopyText = async (definition) => {
		await navigator.clipboard.writeText(definition);
	};

	return (
		<>
			<div className="definition-container-overflow w-full max-h-[200px] h-fit border-2 bg-white rounded-3xl p-5 flex flex-col justify-start items-start overflow-x-hidden overflow-y-scroll gap-2 relative">
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
