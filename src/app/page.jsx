export default function Home() {
	return (
		<>
			<main className="flex justify-center items-center absolute top-0 left-0 w-full h-full px-10">
				<div className="w-80 h-fit bg-white border-2 rounded-3xl p-10 flex flex-col justify-center items-center gap-5">
					<h1 className="text-2xl font-semibold">Pronounciology</h1>
					<input
						className="px-3 py-2 rounded-3xl outline-none border w-full text-center placeholder:text-center"
						placeholder="Pronounce any word"
						type="text"
						onChange={null}
					/>
					<button className="btn" onClick={null}>
						Pronounce
					</button>
				</div>
			</main>
		</>
	);
}
