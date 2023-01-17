import React from "react";
import s from './Paginator.module.css'

const Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {pages.map(p => {
                return <button className={props.currentPage === (p && s.selectedPage) || ''}
                               onClick={(e) => {
                                   props.onPageChenged(p)
                               }}>{p}</button>
            })}
        </div>
    );
};

export default Paginator;