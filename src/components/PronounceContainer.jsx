"use client";
import React, { useState } from "react";

export default function PronounceContainer({}) {
	const [inputText, setInputText] = useState("");

	const handleTextChange = (value) => {
		setInputText(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const msg = new SpeechSynthesisUtterance();

		const voices = window.speechSynthesis.getVoices();
		msg.voice = voices[158];
		msg.volume = 1; // From 0 to 1
		msg.rate = 1; // From 1 to 10
		msg.pitch = 1; // From 0 to 2
		msg.lang = "en";

		if ("speechSynthesis" in window) {
			if (inputText) {
				msg.text = inputText;
				speechSynthesis.speak(msg);
			}
		} else {
			alert("Sorry, your browser doesn't support text to speech!");
		}
	};

	return (
		<>
			<form className="w-[90%] sm:w-80 h-fit bg-white border-2 rounded-3xl p-7 flex flex-col justify-center items-center gap-5">
				<h1 className="text-xl sm:text-2xl font-semibold w-full text-center">
					Pronounciology
				</h1>

				<div className="flex flex-col justify-center items-center w-full relative gap-2">
					<input
						className="px-3 py-2 rounded-3xl outline-none border w-full text-center placeholder:text-center"
						placeholder="Pronounce any word"
						type="text"
						onChange={(e) => handleTextChange(e.target.value)}
						value={inputText}
					/>
				</div>

				<button className="btn w-full" onClick={handleSubmit}>
					Pronounce
				</button>
			</form>
		</>
	);
}
