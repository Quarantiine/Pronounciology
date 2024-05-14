import HeaderSection from "@/components/HeaderSection";
import PronounceContainer from "@/components/PronounceContainer";

export default function Home() {
	return (
		<>
			<div className="flex flex-col justify-center items-center gap-3 pt-2">
				<HeaderSection />
			</div>

			<main
				className={`flex flex-col gap-4 justify-start items-center relative sm:absolute top-1/2 sm:-translate-y-1/2 left-0 w-[90%] sm:w-full h-full sm:h-fit pb-5 sm:pt-10 px-5 sm:px-10 mx-auto mt-10 sm:mt-0`}
			>
				<PronounceContainer />
			</main>
		</>
	);
}
