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
				}`
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
			// inputTextRef.current.value = "";
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
	// 	speechSynthesis.getVoices().map(function (voice, index) {
	// 		console.log(index, voice.name, voice.default ? voice.default : false);
	// 	});
	// });

	const handleSubmit = (e) => {
		e.preventDefault();

		const msg = new SpeechSynthesisUtterance();
		msg.text = inputText;

		const voices = window.speechSynthesis.getVoices();

		const voicesList = [
			{ title: "English", voice: voices[252], searchText: "English" },
			{ title: "Spanish", voice: voices[430], searchText: "Spanish" },
			{ title: "French", voice: voices[287], searchText: "French" },
			{ title: "German", voice: voices[306], searchText: "German" },
			{ title: "Italian", voice: voices[329], searchText: "Italian" },
			{ title: "Portuguese", voice: voices[374], searchText: "Portuguese" },
			{ title: "Japanese", voice: voices[331], searchText: "Japanese" },
			{ title: "Afrikaans", voice: voices[157], searchText: "Afrikaans" },
			{ title: "Albanian", voice: voices[159], searchText: "Albanian" },
			{ title: "Amharic", voice: voices[162], searchText: "Amharic" },
			{ title: "Arabic", voice: voices[163], searchText: "Arabic" },
			{ title: "Azerbaijani", voice: voices[196], searchText: "Azerbaijani" },
			{ title: "Bangla", voice: voices[197], searchText: "Bangla" },
			{ title: "Bengali", voice: voices[200], searchText: "Bengali" },
			{ title: "Bosnian", voice: voices[201], searchText: "Bosnian" },
			{ title: "Bulgarian", voice: voices[204], searchText: "Bulgarian" },
			{ title: "Burmese", voice: voices[206], searchText: "Burmese" },
			{ title: "Catalan", voice: voices[208], searchText: "Catalan" },
			{
				title: "Chinese (Cantonese Traditional)",
				voice: voices[209],
				searchText: "Chinese Cantonese Traditional",
			},
			{
				title: "Chinese (Hong Kong)",
				voice: voices[211],
				searchText: "Chinese Hong Kong",
			},
			{
				title: "Chinese (Mainland)",
				voice: voices[216],
				searchText: "Chinese Mainland",
			},
			{
				title: "Chinese (Northeastern Mandarin)",
				voice: voices[218],
				searchText: "Chinese Northeastern Mandarin",
			},
			{
				title: "Chinese (Taiwan)",
				voice: voices[220],
				searchText: "Chinese Taiwan",
			},
			{
				title: "Chinese (Taiwanese Mandarin)",
				voice: voices[221],
				searchText: "Chinese Taiwanese Mandarin",
			},
			{ title: "Croatian", voice: voices[223], searchText: "Croatian" },
			{ title: "Czech", voice: voices[226], searchText: "Czech" },
			{ title: "Danish", voice: voices[227], searchText: "Danish" },
			{ title: "Dutch", voice: voices[230], searchText: "Dutch" },
			{
				title: "English (India)",
				voice: voices[241],
				searchText: "English India",
			},
			{
				title: "English (Ireland)",
				voice: voices[244],
				searchText: "English Ireland",
			},
			{
				title: "English (Kenya)",
				voice: voices[245],
				searchText: "English Kenya",
			},
			{
				title: "English (New Zealand)",
				voice: voices[248],
				searchText: "English New Zealand",
			},
			{
				title: "English (Nigeria)",
				voice: voices[250],
				searchText: "English Nigeria",
			},
			{
				title: "English (Philippines)",
				voice: voices[256],
				searchText: "English Philippines",
			},
			{
				title: "English (Singapore)",
				voice: voices[257],
				searchText: "English Singapore",
			},
			{
				title: "English (South Africa)",
				voice: voices[259],
				searchText: "English South Africa",
			},
			{
				title: "English (Tanzania)",
				voice: voices[261],
				searchText: "English Tanzania",
			},
			{
				title: "English (United Kingdom)",
				voice: voices[266],
				searchText: "English United Kingdom",
			},
			{
				title: "Estonian (Estonia)",
				voice: voices[277],
				searchText: "Estonian Estonia",
			},
			{
				title: "Filipino (Philippines)",
				voice: voices[280],
				searchText: "Filipino Philippines",
			},
			{
				title: "Finnish (Finland)",
				voice: voices[282],
				searchText: "Finnish Finland",
			},
			{
				title: "French (Belgium)",
				voice: voices[283],
				searchText: "French Belgium",
			},
			{
				title: "French (Canada)",
				voice: voices[288],
				searchText: "French Canada",
			},
			{
				title: "French (France)",
				voice: voices[292],
				searchText: "French France",
			},
			{
				title: "French (Switzerland)",
				voice: voices[294],
				searchText: "French Switzerland",
			},
			{
				title: "Galician (Spain)",
				voice: voices[297],
				searchText: "Galician Spain",
			},
			{
				title: "Georgian (Georgia)",
				voice: voices[299],
				searchText: "Georgian Georgia",
			},
			{
				title: "German (Austria)",
				voice: voices[300],
				searchText: "German Austria",
			},
			{
				title: "German (Germany)",
				voice: voices[304],
				searchText: "German Germany",
			},
			{
				title: "German (Switzerland)",
				voice: voices[309],
				searchText: "German Switzerland",
			},
			{
				title: "Greek (Greece)",
				voice: voices[310],
				searchText: "Greek Greece",
			},
			{
				title: "Gujarati (India)",
				voice: voices[313],
				searchText: "Gujarati India",
			},
			{
				title: "Hebrew (Israel)",
				voice: voices[314],
				searchText: "Hebrew Israel",
			},
			{ title: "Hindi (India)", voice: voices[317], searchText: "Hindi India" },
			{
				title: "Hungarian (Hungary)",
				voice: voices[318],
				searchText: "Hungarian Hungary",
			},
			{
				title: "Icelandic (Iceland)",
				voice: voices[321],
				searchText: "Icelandic Iceland",
			},
			{
				title: "Indonesian (Indonesia)",
				voice: voices[322],
				searchText: "Indonesian Indonesia",
			},
			{
				title: "Italian (Italy)",
				voice: voices[329],
				searchText: "Italian Italy",
			},
			{
				title: "Javanese (Indonesia)",
				voice: voices[333],
				searchText: "Javanese Indonesia",
			},
			{
				title: "Kannada (India)",
				voice: voices[335],
				searchText: "Kannada India",
			},
			{
				title: "Kazakh (Kazakhstan)",
				voice: voices[336],
				searchText: "Kazakh Kazakhstan",
			},
			{
				title: "Khmer (Cambodia)",
				voice: voices[339],
				searchText: "Khmer Cambodia",
			},
			{
				title: "Korean (Korea)",
				voice: voices[342],
				searchText: "Korean Korea",
			},
			{ title: "Lao (Laos)", voice: voices[343], searchText: "Lao Laos" },
			{
				title: "Latvian (Latvia)",
				voice: voices[345],
				searchText: "Latvian Latvia",
			},
			{
				title: "Lithuanian (Lithuania)",
				voice: voices[348],
				searchText: "Lithuanian Lithuania",
			},
			{
				title: "Macedonian (Republic of North Macedonia)",
				voice: voices[350],
				searchText: "Macedonian Republic of North Macedonia",
			},
			{
				title: "Malay (Malaysia)",
				voice: voices[352],
				searchText: "Malay Malaysia",
			},
			{
				title: "Malayalam (India)",
				voice: voices[354],
				searchText: "Malayalam India",
			},
			{
				title: "Maltese (Malta)",
				voice: voices[355],
				searchText: "Maltese Malta",
			},
			{
				title: "Marathi (India)",
				voice: voices[357],
				searchText: "Marathi India",
			},
			{
				title: "Mongolian (Mongolia)",
				voice: voices[360],
				searchText: "Mongolian Mongolia",
			},
			{
				title: "Nepali (Nepal)",
				voice: voices[362],
				searchText: "Nepali Nepal",
			},
			{
				title: "Norwegian (Bokmål, Norway)",
				voice: voices[364],
				searchText: "Norwegian Bokmål, Norway",
			},
			{
				title: "Pashto (Afghanistan)",
				voice: voices[366],
				searchText: "Pashto Afghanistan",
			},
			{
				title: "Persian (Iran)",
				voice: voices[367],
				searchText: "Persian Iran",
			},
			{
				title: "Polish (Poland)",
				voice: voices[370],
				searchText: "Polish Poland",
			},
			{
				title: "Portuguese (Brazil)",
				voice: voices[371],
				searchText: "Portuguese Brazil",
			},
			{
				title: "Portuguese (Portugal)",
				voice: voices[375],
				searchText: "Portuguese Portugal",
			},
			{
				title: "Romanian (Romania)",
				voice: voices[376],
				searchText: "Romanian Romania",
			},
			{
				title: "Russian (Russia)",
				voice: voices[379],
				searchText: "Russian Russia",
			},
			{
				title: "Serbian (Serbia)",
				voice: voices[381],
				searchText: "Serbian Serbia",
			},
			{
				title: "Sinhala (Sri Lanka)",
				voice: voices[382],
				searchText: "Sinhala Sri Lanka",
			},
			{
				title: "Slovak (Slovakia)",
				voice: voices[385],
				searchText: "Slovak Slovakia",
			},
			{
				title: "Slovenian (Slovenia)",
				voice: voices[386],
				searchText: "Slovenian Slovenia",
			},
			{
				title: "Somali (Somalia)",
				voice: voices[388],
				searchText: "Somali Somalia",
			},
			{
				title: "Spanish (Argentina)",
				voice: voices[390],
				searchText: "Spanish Argentina",
			},
			{
				title: "Spanish (Bolivia)",
				voice: voices[393],
				searchText: "Spanish Bolivia",
			},
			{
				title: "Spanish (Chile)",
				voice: voices[394],
				searchText: "Spanish Chile",
			},
			{
				title: "Spanish (Colombia)",
				voice: voices[398],
				searchText: "Spanish Colombia",
			},
			{
				title: "Spanish (Costa Rica)",
				voice: voices[400],
				searchText: "Spanish Costa Rica",
			},
			{
				title: "Spanish (Cuba)",
				voice: voices[401],
				searchText: "Spanish Cuba",
			},
			{
				title: "Spanish (Dominican Republic)",
				voice: voices[404],
				searchText: "Spanish Dominican Republic",
			},
			{ title: "Spanish (Ecuador)", voice: voices[405], searchText: "Ecuador" },
			{
				title: "Spanish (El Salvador)",
				voice: voices[407],
				searchText: "El Salvador",
			},
			{
				title: "Spanish (Equatorial Guinea)",
				voice: voices[410],
				searchText: "Spanish Equatorial Guinea",
			},
			{
				title: "Spanish (Guatemala)",
				voice: voices[412],
				searchText: "Spanish Guatemala",
			},
			{
				title: "Spanish (Honduras)",
				voice: voices[414],
				searchText: "Spanish Honduras",
			},
			{
				title: "Spanish (Mexico)",
				voice: voices[415],
				searchText: "Spanish Mexico",
			},
			{
				title: "Spanish (Nicaragua)",
				voice: voices[418],
				searchText: "Spanish Nicaragua",
			},
			{
				title: "Spanish (Panama)",
				voice: voices[419],
				searchText: "Spanish Panama",
			},
			{
				title: "Spanish (Paraguay)",
				voice: voices[422],
				searchText: "Spanish Paraguay",
			},
			{
				title: "Spanish (Peru)",
				voice: voices[424],
				searchText: "Spanish Peru",
			},
			{
				title: "Spanish (Puerto Rico)",
				voice: voices[425],
				searchText: "Spanish Puerto Rico",
			},
			{
				title: "Spanish (Spain)",
				voice: voices[428],
				searchText: "Spanish Spain",
			},
			{
				title: "Spanish (United States)",
				voice: voices[430],
				searchText: "Spanish United States",
			},
			{
				title: "Spanish (Uruguay)",
				voice: voices[432],
				searchText: "Spanish Uruguay",
			},
			{
				title: "Spanish (Venezuela)",
				voice: voices[433],
				searchText: "Spanish Venezuela",
			},
			{
				title: "Sundanese (Indonesia)",
				voice: voices[436],
				searchText: "Sundanese Indonesia",
			},
			{
				title: "Swahili (Kenya)",
				voice: voices[438],
				searchText: "Swahili Kenya",
			},
			{
				title: "Swahili (Tanzania)",
				voice: voices[439],
				searchText: "Swahili Tanzania",
			},
			{
				title: "Swedish (Sweden)",
				voice: voices[442],
				searchText: "Swedish Sweden",
			},
			{ title: "Tamil (India)", voice: voices[444], searchText: "Tamil India" },
			{
				title: "Tamil (Malaysia)",
				voice: voices[446],
				searchText: "Tamil Malaysia",
			},
			{
				title: "Tamil (Singapore)",
				voice: voices[448],
				searchText: "Tamil Singapore",
			},
			{
				title: "Tamil (Sri Lanka)",
				voice: voices[450],
				searchText: "Tamil Sri Lanka",
			},
			{
				title: "Telugu (India)",
				voice: voices[452],
				searchText: "Telugu India",
			},
			{
				title: "Thai (Thailand)",
				voice: voices[454],
				searchText: "Thai Thailand",
			},
			{
				title: "Turkish (Turkey)",
				voice: voices[455],
				searchText: "Turkish Turkey",
			},
			{
				title: "Ukrainian (Ukraine)",
				voice: voices[458],
				searchText: "Ukrainian Ukraine",
			},
			{ title: "Urdu (India)", voice: voices[459], searchText: "Urdu India" },
			{
				title: "Urdu (Pakistan)",
				voice: voices[462],
				searchText: "Urdu Pakistan",
			},
			{
				title: "Uzbek (Uzbekistan)",
				voice: voices[463],
				searchText: "Uzbek Uzbekistan",
			},
			{
				title: "Vietnamese (Vietnam)",
				voice: voices[465],
				searchText: "Vietnamese Vietnam",
			},
			{
				title: "Welsh (United Kingdom)",
				voice: voices[468],
				searchText: "Welsh United Kingdom",
			},
			{
				title: "Zulu (South Africa)",
				voice: voices[470],
				searchText: "Zulu South Africa",
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
					setListOfInputText((prevItems) => [inputText, ...prevItems]);
				speechSynthesis.speak(msg);
				// console.log(pickVoice);
			}
		} else {
			alert("Sorry, your browser doesn't support text to speech!");
		}
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
					{inputDefinition && inputText && textDefinition !== undefined && (
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
											inputText ? "rounded-l-3xl" : "rounded-3xl"
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
											className="rounded-r-3xl cursor-pointer px-3 py-2 text-sm w-[70px] hover:opacity-80 transition-all border bg-red-500 text-white"
										>
											Clear
										</button>
									)}
								</div>

								{historyDropdown && (
									<div className="history-dropdown-container history-dropdown-overflow h-20 bg-white border border-t-transparent w-[90%] flex sm:hidden flex-col justify-start items-center overflow-x-hidden overflow-y-scroll px-4 py-2 rounded-b-md text-sm">
										<h1 className="text-xl font-semibold w-full text-center">
											Word History:
										</h1>

										{listOfInputText.length > 0 ? (
											listOfInputText.slice(0, 20).map((item) => {
												return (
													<React.Fragment key={item}>
														<button
															onClick={handleHistoryWordSystem}
															className="cursor-pointer w-full text-center hover:opacity-60 transition-all"
														>
															{item}
														</button>
													</React.Fragment>
												);
											})
										) : (
											<p className="text-gray-400">No History</p>
										)}
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
											inputDefinition ? "bg-[#eee]" : "bg-white"
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
						className={`history-dropdown-container history-dropdown-overflow w-full max-h-[180px] h-auto bg-white border-2 rounded-3xl flex sm:hidden flex-col justify-start items-start overflow-x-hidden overflow-y-scroll px-8 py-2`}
					>
						<h1 className="text-xl font-semibold w-full text-center">
							Word History
						</h1>

						<div className="flex flex-col justify-center items-center gap-1 w-full">
							{listOfInputText.length > 0 ? (
								listOfInputText.slice(0, 20).map((item, index) => {
									return (
										<div
											className="flex justify-center items-start gap-1"
											key={item}
										>
											<p className="text-gray-400">{`${index + 1}: `}</p>
											<button
												onClick={handleHistoryWordSystem}
												className="cursor-pointer w-full text-start hover:opacity-60 transition-all"
											>
												{item}
											</button>
										</div>
									);
								})
							) : (
								<p className="text-gray-400 w-full text-center">No History</p>
							)}
						</div>
					</div>

					<div className="flex flex-col justify-center items-center gap-2 w-full sm:w-[260px] h-fit mb-5 sm:mb-0">
						<div
							className={`w-full p-5 border-2 rounded-3xl flex justify-center items-center flex-col gap-5 relative overflow-x-hidden overflow-y-scroll ${
								openDropDown ? "h-[350px] sm:h-[300px]" : "h-auto"
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
											onChange={(e) => setSearchQuery(e.target.value)}
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
												const fullLangA = a.searchText.toLowerCase();
												const fullLangB = b.searchText.toLowerCase();

												if (fullLangA < fullLangB) {
													return -1; // a comes before b
												}
												if (fullLangA > fullLangB) {
													return 1; // a comes after b
												}
												return 0; // a and b are equal
											})
											.map((lang, index) => {
												if (
													lang.searchText
														.normalize("NFD")
														.replace(/\p{Diacritic}/gu, "")
														.toLowerCase()
														.includes(searchQuery.toLowerCase())
												) {
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
												}
											})}

									{msgLangs
										.filter((lang) =>
											lang.searchText
												.normalize("NFD")
												.replace(/\p{Diacritic}/gu, "")
												.toLowerCase()
												.includes(searchQuery.toLowerCase())
										)
										.map((lang) => lang.fullLang).length < 1 && (
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
							className={`history-dropdown-container history-dropdown-overflow w-full max-h-[180px] h-auto bg-white border-2 rounded-3xl hidden sm:flex flex-col justify-start items-start overflow-x-hidden overflow-y-scroll px-8 py-2 gap-3`}
						>
							<h1 className="text-xl font-semibold w-full text-center">
								Word History
							</h1>

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
													onClick={handleHistoryWordSystem}
													className="cursor-pointer w-full text-start hover:opacity-60 transition-all"
												>
													{item}
												</button>
											</div>
										);
									})
								) : (
									<p className="text-gray-400 w-full text-center">No History</p>
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
