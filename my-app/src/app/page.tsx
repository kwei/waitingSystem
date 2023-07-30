import {Main} from "@/app/(site)/Main";
import {WaitingContextProvider} from "@/context/WaitingContextProvider";

export default function Home() {
  return (
    <main className="flex w-full h-full flex-col items-center justify-center p-24">
        <WaitingContextProvider data={null}>
            <Main />
        </WaitingContextProvider>
    </main>
  )
}
