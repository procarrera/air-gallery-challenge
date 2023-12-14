import { useEffect, useState } from "react";
import BoardCard from "./BoardCard";
import { SubBoardItem } from "./BoardCard";

import * as Accordion from '@radix-ui/react-accordion';
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";

export default function BoardList() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.air.inc/shorturl/bDkBvnzpB/boards/c74bbbc8-602b-4c88-be71-9e21b36b0514`,
                    {
                        cache: 'no-store', // SSG - do not cache
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            'accept-language': 'en-US,en;q=0.9',
                            authorization: '',
                            'content-type': 'application/json',
                            origin: 'https://app.air.inc',
                            referer: 'https://app.air.inc/',
                        },
                    }
                );
                const responseData = await response.json();
                console.log(responseData)
                setData(responseData.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-8 flex flex-col gap-8 items-start justify-start w-full">
            <Accordion.Root className="AccordionRoot w-full" type="single" defaultValue="item-1" collapsible>
                <Accordion.Item className="AccordionItem text-left" value="item-1">
                    <AccordionTrigger className="pb-4 pt-4">
                        <h2 className="text-xs font-bold  text-gray-500 uppercase">Boards ({data.length})</h2>
                        </AccordionTrigger>
                    <AccordionContent>
                        <ul className="flex gap-4 flex-row flex-wrap w-full">
                            {data.map((board: SubBoardItem) => (
                                <BoardCard key={board.id} board={board} />
                            ))}
                        </ul>
                    </AccordionContent>
                </Accordion.Item>
            </Accordion.Root>
        </div>
    );
}