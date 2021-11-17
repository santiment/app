import React, { useState, useCallback, useMemo } from 'react'
import Dialog from '@santiment-network/ui/Dialog'

import { store } from '../../../../../../redux';
import { useProjectID, useDeleteWatchlistItems, useAddWatchlistItems } from './hooks';
import { showNotification } from '../../../../../../actions/rootActions';
import { useDialogState } from '../../../../../../hooks/dialog'
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip'
import NotificationActions from '../../../../../../components/NotificationActions/NotificationActions';

// Styles
import tableStyles from '../../AssetsTable.module.scss'
import styles from './Actions.module.scss';

const Delete = ({selected, watchlist, refetchAssets}) => {
    // GraphQL functions
    const {getProjectIDs, projectIds, projectLoading} = useProjectID(selected);
    const {removeWatchlistItems, removeLoading} = useDeleteWatchlistItems();
    const {addWatchlistItems, addLoading} = useAddWatchlistItems();

    // UI variables
    const { closeDialog, isOpened, openDialog } = useDialogState();
    const [isHover, setIsHover] = useState(false);
    const selectedText = useMemo(() => {
        return `${selected.length} ${selected.length > 1 ? 'assets' : 'asset'}`;
    }, [selected]);
    const loading = projectLoading || removeLoading || addLoading;

    const deleteClickHandler = useCallback(async() => {
            try {
                await getProjectIDs();
                openDialog();
            } catch (err) {
                store.dispatch(showNotification({
                    variant: 'error',
                    title: err.message,
                    dismissAfter: 2000,
                }));  
            }
        },
        [getProjectIDs, openDialog, store]
    )

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

    const onDelete = useCallback(async() => {
        try {
            await removeWatchlistItems({
                variables: {
                    id: parseInt(watchlist.id),
                    listItems: projectIds
                }
            });
            closeDialog();
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
        store,
        showNotification,
        closeDialog,
        undoHandler,
        selectedText,
        projectIds,
        watchlist,
        removeWatchlistItems,
        refetchAssets
    ])

    return (
        <>
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
            <Dialog
                open={isOpened}
                onClose={closeDialog}
                onOpen={openDialog}
            >
                <Dialog.ScrollContent className={styles.deleteDialog}>
                    <svg width="148" height="80" viewBox="0 0 148 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M77 21.4997C84.1472 39.8144 96.7529 30.8294 101 45.4224C111.5 81.4998 40.7353 86.2425 47.9999 45.4223C52.8828 17.9854 69.8528 3.18505 77 21.4997Z" fill="#FFE6E6"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M106.161 64.7728L76.1482 12.7417C75.1932 11.0861 72.8068 11.0861 71.8518 12.7417L41.8386 64.7728C40.882 66.4311 42.0791 68.5 43.9868 68.5H104.013C105.921 68.5 107.118 66.4311 106.161 64.7728ZM77.4475 11.9922C75.9153 9.33592 72.0847 9.33592 70.5525 11.9922L40.5393 64.0233C39.007 66.6796 40.9223 70 43.9868 70H104.013C107.078 70 108.993 66.6796 107.461 64.0233L77.4475 11.9922Z" fill="#FFADAD"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M73.0001 28C71.8442 28 70.929 28.9769 71.0043 30.1303L72.3304 50.436C72.3878 51.3158 73.1182 52 73.9998 52C74.8815 52 75.6118 51.3158 75.6693 50.436L76.9953 30.1303C77.0706 28.9769 76.1554 28 74.9996 28H73.0001ZM73.9999 60C75.1045 60 75.9999 59.1046 75.9999 58C75.9999 56.8954 75.1045 56 73.9999 56C72.8954 56 71.9999 56.8954 71.9999 58C71.9999 59.1046 72.8954 60 73.9999 60Z" fill="#FF6363"/>
                    </svg>
                    <h4>Delete {selectedText} from the watchlist?</h4>
                    <h5>This action cannot be undone. Are you sure?</h5>
                </Dialog.ScrollContent>
                <Dialog.Actions className={styles.dialogActions}>
                    {projectIds.length > 0 &&
                        <Dialog.Approve
                            onClick={onDelete}
                            isLoading={loading}
                            disabled={loading}
                            className={styles.delete}
                        >
                            Delete
                        </Dialog.Approve>
                    }
                    <Dialog.Cancel
                        onClick={closeDialog}
                        className={styles.cancel}
                    >
                        Cancel
                    </Dialog.Cancel>
                </Dialog.Actions>
            </Dialog>
        </>
    )
}

export default Delete