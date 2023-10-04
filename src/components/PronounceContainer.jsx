"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function PronounceContainer({}) {
	const [inputText, setInputText] = useState("");
	const [msgLangAbbrText, setMsgLangAbbrText] = useState("en");
	const [msgLangText, setMsgLangText] = useState("English");
	const [inputTextLengthCheck, setInputTextLengthCheck] = useState(false);
	const [openDropDown, setOpenDropDown] = useState(false);
	const [slowSpeechRate, setSlowSpeechRate] = useState(false);
	const [copied, setCopied] = useState(false);
	const inputTextRef = useRef();

	const msgLangs = [
		{ abbrLang: "en", fullLang: "English" }, // English
		{ abbrLang: "es", fullLang: "Spanish" }, // Spanish
		{ abbrLang: "fr", fullLang: "French" }, // French
		{ abbrLang: "de", fullLang: "German" }, // German
		{ abbrLang: "it", fullLang: "Italian" }, // Italian
		{ abbrLang: "pt", fullLang: "Portuguese" }, // Portuguese
	];

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

	const handleOpenDropDown = () => {
		setOpenDropDown(!openDropDown);
	};

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

	const handleChangeLang = (abbrText, fullText) => {
		setMsgLangAbbrText(abbrText);
		setMsgLangText(fullText);
		setOpenDropDown(false);
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

		const voicesList = [
			{ title: "English", voice: voices[158] }, // English
			{ title: "Spanish", voice: voices[25] }, // Spanish
			{ title: "French", voice: voices[19] }, // French
			{ title: "German", voice: voices[21] }, // German
			{ title: "Italian", voice: voices[29] }, // Italian
			{ title: "Portuguese", voice: voices[30] }, // Portuguese
		];

		const pickVoice = voicesList
			?.filter((value) => value.title === msgLangText)
			?.map((v) => v.voice)[0];
		msg.voice = pickVoice;

		msg.volume = 1; // From 0 to 1
		msg.rate = slowSpeechRate ? 0.1 : 1; // From 1 to 10
		msg.pitch = 1; // From 0 to 2
		msg.lang = msgLangAbbrText;

		if ("speechSynthesis" in window) {
			if (inputText) {
				speechSynthesis.speak(msg);
				// console.log(pickVoice);
			}
		} else {
			alert("Sorry, your browser doesn't support text to speech!");
		}
	};

	// useEffect(() => {
	// 	speechSynthesis.getVoices().map(function (voice, index) {
	// 		console.log(index + 1, voice.name, voice.default ? voice.default : false);
	// 	});
	// });

	return (
		<div className="flex justify-center items-start gap-5">
			<form className="w-[90%] sm:w-80 h-[350px] sm:h-[300px] bg-white border-2 rounded-3xl p-7 flex flex-col justify-center items-center gap-5 relative">
				<h1 className="text-xl sm:text-2xl font-semibold w-full text-center">
					Pronounciology
				</h1>

				<div
					className={`flex flex-col justify-center items-center w-full relative gap-2`}
				>
					<button
						onClick={handleSpeechRate}
						className={`flex justify-center items-center gap-1 transition-all rounded-full px-3 ${
							slowSpeechRate ? "bg-[#0E51FF]" : null
						}`}
					>
						<p className={`text-sm ${slowSpeechRate ? "text-white" : null}`}>
							Slow
						</p>
						{slowSpeechRate ? (
							<Image
								src={"/icons/toggle_on_white.svg"}
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

					<div className="relative w-full">
						<input
							className={`px-3 py-2 outline-none border w-full text-center placeholder:text-center ${
								inputText ? "rounded-t-3xl" : "rounded-3xl"
							}`}
							placeholder="Pronounce any word"
							type="text"
							onChange={(e) => handleTextChange(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
							ref={inputTextRef}
						/>
						{inputTextLengthCheck && (
							<button
								onClick={handleInputTextRef}
								className="rounded-b-3xl cursor-pointer px-3 py-2 text-sm w-full hover:opacity-80 transition-all border bg-red-500 text-white"
							>
								Clear
							</button>
						)}
					</div>
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

				<button
					className="btn w-full bg-[#0E51FF] text-white"
					onClick={handleSubmit}
				>
					Pronounce
				</button>
			</form>

			<div
				className={`w-52 p-5 border-2 rounded-3xl flex justify-center items-center flex-col gap-5 relative overflow-x-hidden overflow-y-scroll ${
					openDropDown ? "h-[350px] sm:h-[300px]" : "h-auto"
				}`}
			>
				<div className="w-full flex justify-center items-center flex-col gap-2 h-full">
					<h1 htmlFor="languageChange">Change Language</h1>
					<div
						onClick={handleOpenDropDown}
						className="bg-gray-200 p-1 rounded-3xl outline-none text-center w-full btn"
					>
						{msgLangText}
					</div>

					<div
						className={`rounded-3xl w-full py-2 flex flex-col justify-start items-center overflow-x-hidden overflow-y-scroll ${
							openDropDown ? "100px border" : "hidden"
						}`}
					>
						{openDropDown &&
							msgLangs.map((lang, index) => {
								return (
									<React.Fragment key={index}>
										<button
											className="drop-down-btn"
											onClick={() =>
												handleChangeLang(lang.abbrLang, lang.fullLang)
											}
											name={lang.abbrLang}
										>
											{lang.fullLang}
										</button>
									</React.Fragment>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
}
