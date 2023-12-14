import Draggable from 'react-draggable';

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
export default function BoardItem({ board }: BoardItemProps) {
    return (
        <Draggable>
            <li className="max-w-xs w-40 h-40 rounded overflow-hidden shadow-lg relative">
                <div className="h-full">
                    {board.thumbnails && (
                        <img className="w-full h-full object-cover" src={board.thumbnails[0]} alt="Sunset in the mountains" />
                    )}
                    {!board.thumbnails && (
                        <div className="w-full h-full bg-gray-300"></div>
                    )}
                </div>
                <h3 className="text-white absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-center">{board.title}</h3>
            </li>
        </Draggable>
    );
}