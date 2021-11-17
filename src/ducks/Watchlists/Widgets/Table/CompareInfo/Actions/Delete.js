import React, { useState, useCallback, useMemo } from 'react'

import { store } from '../../../../../../redux';
import { useProjectID, useDeleteWatchlistItems, useAddWatchlistItems } from './hooks';
import { showNotification } from '../../../../../../actions/rootActions';
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip'
import NotificationActions from '../../../../../../components/NotificationActions/NotificationActions';

// Styles
import tableStyles from '../../AssetsTable.module.scss'

const Delete = ({selected, watchlist, refetchAssets}) => {
    // GraphQL functions
    const {projectIds} = useProjectID(selected);
    const {removeWatchlistItems} = useDeleteWatchlistItems();
    const {addWatchlistItems} = useAddWatchlistItems();

    // UI variables
    const [isHover, setIsHover] = useState(false);
    const selectedText = useMemo(() => {
        return `${selected.length} ${selected.length > 1 ? 'items' : 'item'}`;
    }, [selected]);

    console.log(projectIds);

    const deleteClickHandler = useCallback(async() => {
        try {
            await removeWatchlistItems({
                variables: {
                    id: parseInt(watchlist.id),
                    listItems: projectIds
                }
            });
            store.dispatch(showNotification({
                variant: 'info',
                title: `${selectedText} deleted successfully.`,
                description: (
                    <NotificationActions isOpenLink={false} onClick={undoHandler} />
                ),
                dismissAfter: 8000,
            }));
            refetchAssets();

        } catch (err) {
            store.dispatch(showNotification({
                variant: 'error',
                title: err.message,
                dismissAfter: 2000,
            }));  
        }
    }, [
        projectIds,
        removeWatchlistItems,
        watchlist,
        store,
        showNotification,
        refetchAssets
    ])

    const undoHandler = useCallback(async() => {
        try {
            await addWatchlistItems({
                variables: {
                    id: parseInt(watchlist.id),
                    listItems: projectIds
                }
            });
            refetchAssets();
        } catch (err) {
            store.dispatch(showNotification({
                variant: 'error',
                title: err.message,
                dismissAfter: 2000,
            })); 
        }
    }, [addWatchlistItems, projectIds, watchlist, refetchAssets, store]);

    return (
        <DarkTooltip
            align='center'
            position='top'
            on='hover'
            className={tableStyles.tooltipOneline}
            trigger={
                <div onClick={deleteClickHandler} onMouseEnter={() => setIsHover(true) } onMouseLeave={() => setIsHover(false)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.18675 0.5C4.18675 0.223858 4.4106 0 4.68675 0H11.3071C11.5832 0 11.8071 0.223858 11.8071 0.5V2.54534C11.8071 2.72129 11.7162 2.87601 11.5788 2.96512L15.4948 2.96512C15.7709 2.96512 15.9948 3.18898 15.9948 3.46512C15.9948 3.74126 15.7709 3.96512 15.4948 3.96512L0.499023 3.96512C0.222881 3.96512 -0.000976562 3.74126 -0.000976562 3.46512C-0.000976562 3.18898 0.222881 2.96512 0.499023 2.96512L4.415 2.96512C4.27762 2.87601 4.18675 2.72129 4.18675 2.54534V0.5ZM10.8071 2.54534C10.8071 2.72129 10.898 2.87601 11.0353 2.96512L4.95849 2.96512C5.09587 2.87601 5.18675 2.72129 5.18675 2.54534V1H10.8071V2.54534ZM2.81879 4.48625C2.81879 4.21011 2.59494 3.98625 2.31879 3.98625C2.04265 3.98625 1.81879 4.21011 1.81879 4.48625V14.4987C1.81879 15.3271 2.49037 15.9987 3.31879 15.9987H12.5827C13.4111 15.9987 14.0827 15.3271 14.0827 14.4987V4.48625C14.0827 4.21011 13.8588 3.98625 13.5827 3.98625C13.3065 3.98625 13.0827 4.21011 13.0827 4.48625V14.4987C13.0827 14.7748 12.8588 14.9987 12.5827 14.9987H3.31879C3.04265 14.9987 2.81879 14.7748 2.81879 14.4987V4.48625Z" fill={isHover ? '#FF6363' : '#7A859E'}/>
                    </svg>
                </div>
            }
        >
            Delete {selectedText} from the watchlist
        </DarkTooltip>
    )
}

export default Delete