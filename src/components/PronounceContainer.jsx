"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function PronounceContainer({}) {
	const [inputText, setInputText] = useState("");
	const [inputTextLengthCheck, setInputTextLengthCheck] = useState(false);
	const [slowSpeechRate, setSlowSpeechRate] = useState(false);
	const [copied, setCopied] = useState(false);
	const inputTextRef = useRef();

	useEffect(() => {
		const checkLength = () => {
			if (inputText) {
				setInputTextLengthCheck(true);
			} else {
				setInputTextLengthCheck(false);
			}
		};

		checkLength();
	}, [inputText]);

	const handleTextChange = (value) => {
		setInputText(value);
	};

	const handleInputTextRef = (e) => {
		e.preventDefault();
		inputTextRef.current.value = "";
		setInputText("");
	};

	const handleSpeechRate = (e) => {
		e.preventDefault();
		setSlowSpeechRate(!slowSpeechRate);
	};

	const handleCopyText = (e) => {
		e.preventDefault();

		if (inputText) {
			setCopied(true);

			navigator.clipboard
				.writeText(inputText)
				.then()
				.catch((err) => {
					console.log(err.message);
				});
		}
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setCopied(false);
		}, 2000);

		return () => clearTimeout(timeout);
	}, [copied]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const msg = new SpeechSynthesisUtterance();
		msg.text = inputText;

		const voices = window.speechSynthesis.getVoices();
		msg.voice = voices[158];
		msg.volume = 1; // From 0 to 1
		msg.rate = slowSpeechRate ? 0.1 : 1; // From 1 to 10
		msg.pitch = 1; // From 0 to 2
		msg.lang = "en";

		if ("speechSynthesis" in window) {
			if (inputText) {
				speechSynthesis.speak(msg);
			}
		} else {
			alert("Sorry, your browser doesn't support text to speech!");
		}
	};

	return (
		<>
			<form className="w-[90%] sm:w-80 h-fit bg-white border-2 rounded-3xl p-7 flex flex-col justify-center items-center gap-5 relative">
				<h1 className="text-xl sm:text-2xl font-semibold w-full text-center">
					Pronounciology
				</h1>

				<div className="flex flex-col justify-center items-center w-full relative gap-2">
					<button
						onClick={handleSpeechRate}
						className="flex justify-center items-center gap-1"
					>
						<p className="text-sm">Slow</p>
						{slowSpeechRate ? (
							<Image
								src={"/icons/toggle_on.svg"}
								alt="on"
								width={24}
								height={24}
							/>
						) : (
							<Image
								src={"/icons/toggle_off.svg"}
								alt="off"
								width={24}
								height={24}
							/>
						)}
					</button>
					<input
						className="px-3 py-2 rounded-3xl outline-none border w-full text-center placeholder:text-center"
						placeholder="Pronounce any word"
						type="text"
						onChange={(e) => handleTextChange(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
						ref={inputTextRef}
					/>
				</div>

				<div className="w-full h-auto flex gap-3">
					<button
						className="btn w-full bg-white border text-black"
						onClick={handleCopyText}
					>
						{copied ? (
							<div className="flex justify-center items-center gap-1">
								<Image
									src={"/icons/copied.svg"}
									alt="copied indicator"
									width={20}
									height={20}
								/>
								<p className="text-sm">Copied</p>
							</div>
						) : (
							"Copy"
						)}
					</button>

					<Link
						href={"https://google.com"}
						target="_blank"
						className="btn w-full bg-white border text-black text-center"
					>
						Search Word
					</Link>
				</div>

				{inputTextLengthCheck && (
					<button
						onClick={handleInputTextRef}
						className="btn border bg-red-500 w-full text-white"
					>
						Clear
					</button>
				)}

				<button
					className="btn w-full bg-[#0E51FF] text-white"
					onClick={handleSubmit}
				>
					Pronounce
				</button>
			</form>
		</>
	);
}
