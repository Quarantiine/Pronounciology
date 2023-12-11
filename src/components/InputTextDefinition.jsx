import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function InputTextDefinition({ textDefinition }) {
	const msg = new SpeechSynthesisUtterance();

	const title = `Definition of ${textDefinition.word}`;
	const message = JSON.stringify(
		textDefinition.meanings
			.map((meanings) =>
				meanings.definitions.map((definition) => definition.definition)
			)
			.toString()
	);

	msg.text = title + ". " + message;
	const voices = window.speechSynthesis.getVoices();

	const handleSpeechSystem = () => {
		if (textDefinition.word) {
			msg.voice = voices[0];
			msg.volume = 1; // From 0 to 1
			msg.pitch = 1; // From 0 to 2
			msg.lang = "English";

			speechSynthesis.speak(msg);
		}
	};

	return (
		<>
			<div className="definition-container-overflow w-full max-h-[200px] h-fit border-2 bg-white rounded-3xl p-5 flex flex-col justify-start items-start overflow-x-hidden overflow-y-scroll gap-2">
				<div className="flex justify-between items-center gap-2 w-full">
					<h1 className="text-xl sm:text-2xl font-semibold w-full">
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
										<p className={`text-sm text-gray-400`}>
											{meanings.partOfSpeech}
										</p>
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
