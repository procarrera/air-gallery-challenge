
export interface SubBoardItem {
    id: string
    creatorId: string
    workspaceId: string
    parentId: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
    isDemo: null | boolean
    hierarchyUpdatedAt: string
    hasCurrentUser: boolean
    pos: number
    ancestors: {
        id: string
        title: string
    }[]
    thumbnails: string[]
    permissions: {
        canViewClips: boolean
        canContribute: boolean
        canDownloadClips: boolean
        canContributeAnon: boolean
        canDiscuss: boolean
        canViewAssetVersions: boolean
        canEditCustomFields: boolean
        canEditFormAssets: boolean
    }
    customFields: any[]
}

interface BoardItemProps {
    board: SubBoardItem;
}

import { Wind  } from 'lucide-react';

export default function BoardItem({ board }: BoardItemProps) {
    return (
        <li className="w-full sm:w-60 h-60 rounded overflow-hidden shadow-lg relative hover:border">
            <div className="h-full">
                {board.thumbnails && (
                    <img className="w-full h-full object-cover" src={board.thumbnails[0]} alt="Sunset in the mountains" />
                )}
                {!board.thumbnails && (
                    <div className="w-full h-full bg-gray-50 flex content-center items-center justify-center">
                        <Wind  strokeWidth={1} size={64} color="#c6c6c6" />
                    </div>
                )}
            </div>
            <h3 className="text-white absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-center">{board.title}</h3>
        </li>
    );
}