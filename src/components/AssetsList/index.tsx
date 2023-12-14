import { Draggable } from 'react-drag-reorder';
import { useEffect, useState } from "react";
import AssetCard from "./AssetCard";

import InfiniteScroll from 'react-infinite-scroll-component';

export default function BoardList() {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [nextCursor, setNextCursor] = useState<string>('')
    const [totalClips, setTotalClips] = useState<number>(0)

    const fetchData = async () => {
        console.log('fetching ASSETS data = ', hasMore , "Next Cursor: ", nextCursor)
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
                        limit: 20,
                        type: 'all',
                        withOpenDiscussionStatus: true,
                        cursor: nextCursor === '' ? null : nextCursor,
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
            setData((prevItems: any) => [...prevItems, ...responseData.data.clips]);
            setHasMore(responseData.pagination.hasMore)
            setNextCursor(responseData.pagination.cursor)
            setIsLoading(false);
            setTotalClips(responseData.data.total)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    function handleNewOrder(currentPos: number, newPos: number) {
        console.log(currentPos, newPos)
    }

    async function saveNewOrder() {

    }

    return (
        <div className="mt-16 flex flex-col gap-8 items-start justify-start">
            <h2 className="text-xs font-bold  text-gray-500 uppercase">Assets ({totalClips})</h2>
            <div className="flex flex-wrap gap-4 relative w-full">
                <InfiniteScroll
                className='flex flex-wrap gap-4 relative w-full'
                    dataLength={data}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <Draggable onPosChange={handleNewOrder}>
                        {data.map((asset: any) => (
                            <AssetCard key={asset.id} data={asset} />
                        ))}
                    </Draggable>
                </InfiniteScroll>
            </div>
        </div>
    );
}