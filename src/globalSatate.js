import { observable, action } from 'mobx'
// import {useLocation} from "react-router-dom";

export const globalState = observable({
    "companies": [],
    "next_page": [''],
})

export const rowsPerPage = observable({value: 5});
export const page = observable({value: 0});
export const state = observable({value: ''});
export const key = 'OjgzZjAyNzFjYzk3OThhOGQ4MTZjMDBjNDZmZTZiMGVl';

export const getInforms = action((boolNextPage = true) => {
    const page = globalState.next_page;
    const companies_api = `https://api-v2.intrinio.com/companies?page_size=
    ${rowsPerPage.value}&next_page=${boolNextPage ? page[page.length - 1] : page[page.length - 2]}&api_key=${key}`
    // const lookup_api = `https://api-v2.intrinio.com/companies/${props.ticker}&api_key=${key}`

    return fetch(companies_api)
        .then(res => res.json())
        .then(({companies, next_page}) => {
            globalState.companies = companies;
            boolNextPage && globalState.next_page.push(next_page);
            // console.log(globalState.next_page);
        })
        .catch(err => console.log(err))
})
