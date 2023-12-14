import { Search, SlidersHorizontal } from "lucide-react"
import { TextField } from "@radix-ui/themes";

export default function TopBar() {
    return (
        <div className="flex flex-row items-center justify-between gap-4 w-full mb-16">
            <div className="flex flex-row gap-2 w-full">
                <TextField.Root className="w-full max-w-[420px] pr-4 pl-4 pt-2 pb-2 rounded-md">
                    <TextField.Slot className="mr-2">
                        <Search />
                    </TextField.Slot>
                    <TextField.Input placeholder="Search the docs…" className="whitespace-nowrap min-w-[100px]" />
                </TextField.Root>
                <SlidersHorizontal />
            </div>
            <div className="flex flex-row gap-2 min-w-fit">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Save to...</button>
            </div>
        </div>
    )
}