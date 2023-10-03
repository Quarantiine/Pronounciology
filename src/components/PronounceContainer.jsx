"use client";
import React, { useEffect, useState } from "react";

export default function PronounceContainer() {
	const [textMode, setTextMode] = useState(false);
	const [inputText, setInputText] = useState("");

	const msg = new SpeechSynthesisUtterance();
	msg.text = inputText;

	const voices = window.speechSynthesis.getVoices();
	msg.voice = voices[158];
	msg.volume = 1; // From 0 to 1
	msg.rate = 1; // From 1 to 10
	msg.pitch = 1; // From 0 to 2
	msg.lang = "en";

	const handleTextMode = () => {
		setTextMode(!textMode);
	};

	const handleTextChange = (value) => {
		setInputText(value);
	};

	const handleSpeech = () => {
		if ("speechSynthesis" in window) {
			if (inputText) {
				speechSynthesis.speak(msg);
			}
		} else {
			alert("Sorry, your browser doesn't support text to speech!");
		}
	};

	// useEffect(() => {
	// 	speechSynthesis.getVoices().forEach(function (voice, index) {
	// 		console.log(index + 1, voice.name, voice.default ? voice.default : false);
	// 	});
	// });

	return (
		<>
			<div className="w-80 h-fit bg-white border-2 rounded-3xl p-10 flex flex-col justify-center items-center gap-5">
				<h1 className="text-2xl font-semibold">Pronounciology</h1>

				<div className="flex flex-col justify-center items-center w-full relative gap-2">
					<p className="text-sm text-gray-400">
						Your in{" "}
						<span className="text-[#0E51FF]">
							{!textMode ? "Paragraph Mode" : "Word Mode"}
						</span>
					</p>
					{textMode ? (
						<input
							className="px-3 py-2 rounded-3xl outline-none border w-full text-center placeholder:text-center"
							placeholder="Pronounce any word"
							type="text"
							onChange={(e) => handleTextChange(e.target.value)}
							value={inputText}
						/>
					) : (
						<textarea
							className="px-4 py-3 rounded-3xl outline-none border w-full text-center placeholder:text-center min-h-[50px] max-h-[250px]"
							placeholder="Pronounce any word"
							rows={1}
							type="text"
							onChange={(e) => handleTextChange(e.target.value)}
							value={inputText}
						/>
					)}
					<button
						onClick={handleTextMode}
						className="w-fit h-fit rounded-full text-sm px-3 text-center hover:opacity-50 transition-all"
					>
						{textMode ? "Paragraph Mode" : "Word Mode"}
					</button>
				</div>

				<button className="btn" onClick={handleSpeech}>
					Pronounce
				</button>
			</div>
		</>
	);
}
