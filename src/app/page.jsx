import PronounceContainer from "@/components/PronounceContainer";

export default function Home() {
	return (
		<>
			<main className="flex flex-col gap-4 justify-center items-center absolute top-0 left-0 w-full h-full px-5 sm:px-10">
				<PronounceContainer />

				<p className="text-[10px] text-gray-400">By: Daniel Ward</p>
			</main>
		</>
	);
}
