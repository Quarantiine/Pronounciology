import PronounceContainer from "@/components/PronounceContainer";

export default function Home() {
	return (
		<>
			<p className="text-[10px] text-gray-400 mx-auto absolute top-3 left-1/2 -translate-x-1/2">
				By: Daniel Ward
			</p>

			<main
				className={`flex flex-col gap-4 justify-start items-center absolute top-1/2 -translate-y-1/2 left-0 w-full h-full sm:h-fit pb-5 pt-10 px-5 sm:px-10`}
			>
				<PronounceContainer />
			</main>
		</>
	);
}
