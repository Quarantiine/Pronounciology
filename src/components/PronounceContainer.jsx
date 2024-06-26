"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import InputTextDefinition from "./InputTextDefinition";
import msgLangs from "../data/msgLangs.json";

export default function PronounceContainer() {
	const [inputText, setInputText] = useState("");
	const [msgLangText, setMsgLangText] = useState("English");
	const [msgLangAbbrText, setMsgLangAbbrText] = useState("en");
	const [inputTextLengthCheck, setInputTextLengthCheck] = useState(false);
	const [openDropDown, setOpenDropDown] = useState(false);
	const [slowSpeechRate, setSlowSpeechRate] = useState(false);
	const [copied, setCopied] = useState(false);
	const [historyDropdown, _] = useState(false);
	const inputTextRef = useRef();
	const [listOfInputText, setListOfInputText] = useState([]);
	const [inputDefinition, setInputDefinition] = useState(false);
	const [textDefinition, setTextDefinition] = useState("");
	const [loadingDefinition, setLoadingDefinition] = useState(true);
	const [windowLoaded, setWindowLoaded] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const definitionSystem = async () => {
			await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/${"en"}/${
					inputText || "none"
				}`,
			)
				.then((response) => response.json())
				.then((result) => {
					setLoadingDefinition(false);
					setTextDefinition(result[0]);
				})
				.catch((err) => {
					setLoadingDefinition(false);
					setInputDefinition(err);
				});
		};

		definitionSystem();
	}, [inputDefinition]);

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
		setSearchQuery("");
	};

	const handleTextChange = (value) => {
		setInputText(value.trim());
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
		setSearchQuery("");
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

	const handleHistoryWordSystem = (e) => {
		e.preventDefault();
		setInputText(e.target.textContent);
		inputTextRef.current.value = e.target.textContent;
	};

	const handleOpenSpeechSystem = (e) => {
		e.preventDefault();
		setInputDefinition(!inputDefinition);
	};

	useEffect(() => {
		if (inputText.length < 1) {
			setInputDefinition("");
		}
	}, [inputText]);

	useEffect(() => {
		new Promise((resolve, reject) => {
			if (document.readyState === "complete") {
				resolve();
			} else {
				window.onload = resolve;
			}
		}).then(() => {
			setWindowLoaded(true);
		});
	}, []);

	// useEffect(() => {
	// 	console.log(speechSynthesis.getVoices().map((voice) => voice));
	// });

	const handleSubmit = (e) => {
		e.preventDefault();

		const msg = new SpeechSynthesisUtterance();
		msg.text = inputText;

		const voices = window.speechSynthesis.getVoices();

		const voicesList = [
			{
				title: "Arabic",
				voice: voices[13],
				searchText: "Arabic",
			},
			{
				title: "Chinese",
				voice: voices[59],
				searchText: "Chinese Hong Kong",
			},
			{
				title: "English",
				voice: voices[2],
				searchText: "English",
			},
			{
				title: "French",
				voice: voices[137],
				searchText: "French",
			},
			{
				title: "German",
				voice: voices[154],
				searchText: "German",
			},
			{
				title: "Hebrew",
				voice: voices[168],
				searchText: "Hebrew Israel",
			},
			{
				title: "Italian",
				voice: voices[180],
				searchText: "Italian",
			},
			{
				title: "Japanese",
				voice: voices[3],
				searchText: "Japanese",
			},
			{
				title: "Korean",
				voice: voices[194],
				searchText: "Korean Korea",
			},
			{
				title: "Portuguese",
				voice: voices[225],
				searchText: "Portuguese",
			},
			{
				title: "Russian",
				voice: voices[232],
				searchText: "Russian Russia",
			},
			{
				title: "Spanish",
				voice: voices[244],
				searchText: "Spanish",
			},
			{
				title: "Swedish",
				voice: voices[296],
				searchText: "Swedish Sweden",
			},
			{
				title: "Turkish",
				voice: voices[309],
				searchText: "Turkish Turkey",
			},
			{
				title: "Vietnamese",
				voice: voices[319],
				searchText: "Vietnamese Vietnam",
			},
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
				!listOfInputText.map((item) => item).includes(inputText) &&
					setListOfInputText((prevItems) => [
						inputText,
						...prevItems,
					]);
				speechSynthesis.speak(msg);
			}
		} else {
			alert("Sorry, your browser doesn't support text to speech!");
		}
	};

	const handleClearHistory = (e) => {
		e.preventDefault();
		setListOfInputText([]);
	};

	return (
		<>
			{windowLoaded ? (
				<div
					className={`main-container-overflow flex flex-wrap justify-start items-start gap-5 w-full sm:w-[600px] h-auto overflow-x-hidden overscroll-y-scroll ${
						inputDefinition && openDropDown && "sm:pt-20"
					}`}
				>
					{textDefinition === undefined && (
						<h1 className="w-full bg-red-500 rounded-3xl px-3 py-2 text-white text-center">
							This word does not have a definition
						</h1>
					)}
					{inputDefinition &&
						inputText &&
						textDefinition !== undefined && (
							<InputTextDefinition
								textDefinition={textDefinition}
								loadingDefinition={loadingDefinition}
								inputDefinition={inputDefinition}
							/>
						)}

					<form className="w-full sm:w-80 h-auto bg-white border-2 rounded-3xl p-7 flex flex-col justify-center items-center gap-5 relative">
						<div className="flex justify-center items-center gap-2 w-fit">
							<h1 className="text-xl font-semibold w-full text-center">
								Pronounciology
							</h1>
							<Image
								src={"/images/speech_logo.png"}
								alt="logo"
								width={25}
								height={25}
							/>
						</div>

						<div
							className={`flex flex-col justify-center items-center w-full relative gap-2`}
						>
							<button
								onClick={handleSpeechRate}
								className={`flex justify-center items-center gap-1 transition-all rounded-full px-3 ${
									slowSpeechRate ? "bg-[#0E51FF]" : null
								}`}
							>
								<p
									className={`text-sm ${slowSpeechRate ? "text-white" : null}`}
								>
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

							<div className="flex flex-col justify-center items-center w-full">
								<div className="relative w-full flex justify-center items-center">
									<input
										className={`pl-3 pr-8 sm:pr-2 py-2 outline-none border w-full text-center placeholder:text-center text-sm ${
											inputText
												? "rounded-l-3xl"
												: "rounded-3xl"
										}`}
										placeholder="Pronounce any word"
										type="text"
										onChange={(e) =>
											handleTextChange(e.target.value)
										}
										onKeyDown={(e) =>
											e.key === "Enter" && handleSubmit(e)
										}
										ref={inputTextRef}
									/>

									{inputTextLengthCheck && (
										<button
											onClick={handleInputTextRef}
											className="rounded-r-3xl cursor-pointer px-3 py-2 text-sm w-[70px] hover:opacity-80 transition-all border bg-red-500 text-white"
										>
											Clear
										</button>
									)}
								</div>

								{historyDropdown && (
									<div className="history-dropdown-container history-dropdown-overflow h-20 bg-white border border-t-transparent w-[90%] flex sm:hidden flex-col justify-start items-center overflow-x-hidden overflow-y-scroll px-4 py-2 rounded-b-md text-sm">
										<h1 className="text-xl font-semibold w-full text-center">
											Word History
										</h1>

										{listOfInputText.map((item) => item)
											.length > 0 && (
											<button
												onClick={handleClearHistory}
												className="btn !bg-red-500 text-white w-full"
											>
												Clear History
											</button>
										)}

										<div className="flex flex-col justify-start items-start gap-1 w-full">
											{listOfInputText.length > 0 ? (
												listOfInputText.map(
													(item, index) => {
														return (
															<div
																className="flex justify-center items-start gap-1"
																key={item}
															>
																<p className="text-gray-400">{`${index + 1}: `}</p>
																<button
																	onClick={
																		handleHistoryWordSystem
																	}
																	className="cursor-pointer w-full text-start hover:opacity-60 transition-all"
																>
																	{item}
																</button>
															</div>
														);
													},
												)
											) : (
												<p className="text-gray-400 w-full text-center">
													No History
												</p>
											)}
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="w-full h-auto flex flex-col gap-3">
							<div className="w-full h-auto flex justify-center items-center gap-2">
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

								{inputText && (
									<button
										className={`btn w-ful border text-black text-sm ${
											inputDefinition
												? "bg-[#eee]"
												: "bg-white"
										}`}
										onClick={handleOpenSpeechSystem}
									>
										See Definition
									</button>
								)}
							</div>
						</div>

						<button
							className="btn w-full bg-[#0E51FF] text-white"
							onClick={handleSubmit}
						>
							Pronounce
						</button>
					</form>

					<div
						className={`history-dropdown-container history-dropdown-overflow w-full max-h-[180px] h-auto bg-white border-2 rounded-3xl flex sm:hidden flex-col justify-start items-start overflow-x-hidden overflow-y-scroll px-8 py-2 gap-2`}
					>
						<h1 className="text-xl font-semibold w-full text-center">
							Word History
						</h1>

						{listOfInputText.map((item) => item).length > 0 && (
							<button
								onClick={handleClearHistory}
								className="btn !bg-red-500 text-white w-full"
							>
								Clear History
							</button>
						)}

						<div className="flex flex-col justify-start items-start gap-1 w-full">
							{listOfInputText.length > 0 ? (
								listOfInputText.map((item, index) => {
									return (
										<div
											className="flex justify-center items-start gap-1"
											key={item}
										>
											<p className="text-gray-400">{`${index + 1}: `}</p>
											<button
												onClick={
													handleHistoryWordSystem
												}
												className="cursor-pointer w-full text-start hover:opacity-60 transition-all"
											>
												{item}
											</button>
										</div>
									);
								})
							) : (
								<p className="text-gray-400 w-full text-center">
									No History
								</p>
							)}
						</div>
					</div>

					<div className="flex flex-col justify-center items-center gap-2 w-full sm:w-[260px] h-fit mb-5 sm:mb-0">
						<div
							className={`w-full p-5 border-2 rounded-3xl flex justify-center items-center flex-col gap-5 relative overflow-x-hidden overflow-y-scroll overflow-hide-thumb ${
								openDropDown
									? "h-[350px] sm:h-[300px]"
									: "h-auto"
							}`}
						>
							<div className="w-full flex justify-center items-center flex-col gap-2 h-full">
								<h1
									className="text-xl font-semibold w-full text-center"
									htmlFor="languageChange"
								>
									Change Language
								</h1>
								<div
									onClick={handleOpenDropDown}
									className="bg-gray-200 p-1 rounded-3xl outline-none text-center w-full btn"
								>
									{msgLangText}
								</div>

								{openDropDown && (
									<div className="w-full">
										<input
											className="w-full bg-gray-100 py-2 px-4 text-center text-sm rounded-full outline-none"
											type="text"
											placeholder="Search Language"
											onChange={(e) =>
												setSearchQuery(e.target.value)
											}
										/>
									</div>
								)}

								<div
									className={`rounded-3xl w-full py-2 flex flex-col justify-start items-center overflow-x-hidden overflow-y-scroll ${
										openDropDown ? "100px border" : "hidden"
									}`}
								>
									{openDropDown &&
										msgLangs
											.sort((a, b) => {
												const fullLangA =
													a.searchText.toLowerCase();
												const fullLangB =
													b.searchText.toLowerCase();

												if (fullLangA < fullLangB) {
													return -1;
												}
												if (fullLangA > fullLangB) {
													return 1;
												}
												return 0;
											})
											.map((lang, index) => {
												if (
													lang.searchText
														.normalize("NFD")
														.replace(
															/\p{Diacritic}/gu,
															"",
														)
														.toLowerCase()
														.includes(
															searchQuery.toLowerCase(),
														)
												) {
													return (
														<React.Fragment
															key={index}
														>
															<button
																className="drop-down-btn"
																onClick={() =>
																	handleChangeLang(
																		lang.abbrLang,
																		lang.fullLang,
																	)
																}
																name={
																	lang.abbrLang
																}
															>
																{lang.fullLang}
															</button>
														</React.Fragment>
													);
												}
											})}

									{msgLangs
										.filter((lang) =>
											lang.searchText
												.normalize("NFD")
												.replace(/\p{Diacritic}/gu, "")
												.toLowerCase()
												.includes(
													searchQuery.toLowerCase(),
												),
										)
										.map((lang) => lang.fullLang).length <
										1 && (
										<>
											<p className="text-sm text-gray-400 text-center">
												No Language
											</p>
										</>
									)}
								</div>
							</div>
						</div>

						<div
							className={`history-dropdown-container history-dropdown-overflow w-full max-h-[180px] h-auto bg-white border-2 rounded-3xl hidden sm:flex flex-col justify-start items-start overflow-x-hidden overflow-y-scroll px-5 py-2 gap-2`}
						>
							<h1 className="text-xl font-semibold w-full text-center">
								Word History
							</h1>

							{listOfInputText.map((item) => item).length > 0 && (
								<button
									onClick={handleClearHistory}
									className="btn !bg-red-500 text-white w-full"
								>
									Clear History
								</button>
							)}

							<div className="flex flex-col justify-start items-start gap-1 w-full">
								{listOfInputText.length > 0 ? (
									listOfInputText.map((item, index) => {
										return (
											<div
												className="flex justify-center items-start gap-1"
												key={item}
											>
												<p className="text-gray-400">{`${index + 1}: `}</p>
												<button
													onClick={
														handleHistoryWordSystem
													}
													className="cursor-pointer w-full text-start hover:opacity-60 transition-all"
												>
													{item}
												</button>
											</div>
										);
									})
								) : (
									<p className="text-gray-400 w-full text-center">
										No History
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				<>
					<div className="flex justify-center items-center gap-2">
						<h1 className="text-xl font-semibold w-full text-center">
							Loading
						</h1>
						<div className="min-w-[32px] max-w-[32px] min-h-[32px] max-h-[32px] border-4 border-t-transparent animate-spin border-blue-500 rounded-full" />
					</div>
				</>
			)}
		</>
	);
}
