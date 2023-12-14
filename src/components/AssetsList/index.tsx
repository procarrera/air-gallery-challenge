import { Draggable } from 'react-drag-reorder';
import { useEffect, useState } from "react";
import AssetCard from "./AssetCard";

export default function BoardList() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.air.inc/shorturl/bDkBvnzpB/clips/search`,
                    {
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            'accept-language': 'en-US,en;q=0.9',
                            authorization: '',
                            'content-type': 'application/json',
                            origin: 'https://app.air.inc',
                            referer: 'https://app.air.inc/',
                        },
                        body: JSON.stringify({
                            limit: 72,
                            type: 'all',
                            withOpenDiscussionStatus: true,
                            filters: {
                                board: {
                                    is: 'c74bbbc8-602b-4c88-be71-9e21b36b0514',
                                },
                            },
                            boardId: 'c74bbbc8-602b-4c88-be71-9e21b36b0514',
                            sortField: {
                                direction: 'desc',
                                name: 'dateModified',
                            },
                            descendantBoardId: 'c74bbbc8-602b-4c88-be71-9e21b36b0514',
                        }),
                    }
                );
                const responseData = await response.json();
                console.log(responseData);
                setData(responseData.data.clips);
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
            <h2 className="text-md uppercase">Assets ({data.length})</h2>
            <div className="flex flex-wrap gap-4 relative" style={{ maxWidth: '100%' }}>
                <Draggable>
                    {data.map((asset: any) => (
                        <AssetCard key={asset.id} data={asset} />
                    ))}
                </Draggable>
            </div>
        </div>
    );
}