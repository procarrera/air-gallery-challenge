import { useEffect, useState } from "react";
import BoardCard from "./BoardCard";
import { SubBoardItem } from "./BoardCard";

interface BoardListProps {
    data: SubBoardItem[];
}

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
        <div className="mt-16 flex flex-col gap-8 items-start justify-start">
            <h2 className="text-md uppercase">Boards ({data.length})</h2>
            <ul className="flex gap-4">
                {data.map((board: SubBoardItem) => (
                    <BoardCard key={board.id} board={board} />
                ))}
            </ul>
        </div>
    );
}