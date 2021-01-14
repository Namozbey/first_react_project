import React from 'react';
import {action} from "mobx";
import {observer} from "mobx-react";
import {useStyles} from "../style";
import {getInforms} from "../globalSatate";
import TablePagination from '@material-ui/core/TablePagination';
import {rowsPerPage, globalState, page} from "../globalSatate";

export const Pagination = observer(() => {
    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        globalState.companies = [];
        if(newPage > page.value) {
            getInforms(true);
        } else {
            globalState.next_page.pop();
            getInforms(false);
        }
        page.value = newPage;
    };

    const handleChangeRowsPerPage = action((event) => {
        rowsPerPage.value = parseInt(event.target.value, 10);
        page.value = 0;
        globalState.companies = [];
        globalState.next_page = [''];
        getInforms(true);
    });

    return (
        <div>
            <TablePagination
                className={classes.list}
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={29}
                rowsPerPage={rowsPerPage.value}
                page={page.value}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
});
