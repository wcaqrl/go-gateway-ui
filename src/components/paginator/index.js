import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './paginator.css';
import {assembleQuery} from "../../utils/query";

function Paginator(props) {

    const {page, perpage, total, showPages, isEllipsis, setPage, href} = props;
    const pages = Math.ceil(total / perpage);

    const [pageArr, setPageArr] = useState([])
    const [first, setFirst] = useState(false)
    const [prev, setPrev] = useState(false)
    const [leftEllipsis, setLeftEllipsis] = useState(false)
    const [rightEllipsis, setRightEllipsis] = useState(false)
    const [next, setNext] = useState(false)
    const [last, setLast] = useState(false)

    useEffect(() => {
        if (pages > 1) {
            let offset = Math.floor((showPages - 1) / 2);
            let start = 1;
            let end = pages;

            // console.log('useEffect offset: ', offset);
            // 如果当前页大于1，则显示首页和上一页
            setFirst(page > 1);
            setPrev(page > 1);

            // 如果总页数大于显示页数
            if (pages > showPages) {
                // console.log('useEffect pages > showPages');
                // 如果当前页大于偏移量加1，就显示左侧省略号
                if (isEllipsis) {
                    setLeftEllipsis(page > offset + 1);
                }
                // 计算显示的第一个页码和最后一个页码
                // 如果当前页大于偏移量
                if (page > offset) {
                    start = page - offset;
                    end = pages > page + offset ? page + offset : pages;
                } else {
                    start = 1;
                    end = pages > showPages ? showPages : pages;
                }

                if (page + offset > pages) {
                    start = start - (page + offset - end);
                }
            }

            // 循环追加数组
            let tmpPageArr = [];
            for (let i = start; i <= end; i++) { tmpPageArr.push(i); }
            setPageArr(tmpPageArr)

            // 如果总页数大于显示页数，并且总页数大于当前页加偏移量，就显示右侧省略号
            if (isEllipsis) {
                setRightEllipsis(pages > showPages && pages > page + offset);
            }

            // 如果当前页码小于总页数，则显示下一页和尾页
            setNext(page < pages);
            setLast(page < pages);
        }
    }, [page, perpage, total, showPages, isEllipsis, setPage])


    function onPage(n: number) {
        // console.log('onPage');
        return page === n ? false : setPage(n);
    }

    function onFirst(){
        // console.log('onFirst');
        return page === 1 ? false : setPage(1);
    }

    function onLast() {
        // console.log('onLast');
        return page === pages ? false : setPage(pages);
    }

    function onPrev() {
        // console.log('onPrev');
        return page === 1 ? false : setPage(page - 1);
    }

    function onNext() {
        // console.log('onNext');
        return page === pages ? false : setPage(page + 1);
    }

    // console.log('I am render');
    // console.log(props);
    // console.log('pageArr: ', pageArr);
    // console.log('first: ', first);
    // console.log('prev: ', prev);
    // console.log('leftEllipsis: ', leftEllipsis);
    // console.log('rightEllipsis: ', rightEllipsis);
    // console.log('next: ', next);
    // console.log('last: ', last);
    return (
        (pages > 1) ?
            <ul className='pagination'>
            {first && <li><a href={assembleQuery({page: 1, perpage: perpage}, href)} onClick={(e) => {e.preventDefault(); onFirst();}}>首页</a></li>}
            {prev && <li><a href={assembleQuery({page: page - 1, perpage: perpage}, href)} onClick={(e) => {e.preventDefault(); onPrev();}}>上一页</a></li>}
            {isEllipsis && leftEllipsis && <li><span>...</span></li>}
            {pageArr.map((item) => {
                if (item !== page) {
                    return <li key={item}><a href={assembleQuery({page: item, perpage: perpage}, href)} onClick={(e) => {e.preventDefault(); onPage(item);}}>{item}</a></li>
                } else {
                    return <li key={item}><a href={assembleQuery({page: item, perpage: perpage}, href)} onClick={(e) => e.preventDefault()} className='active' >{item}</a></li>
                }
            })}
            {isEllipsis && rightEllipsis && <li><span>...</span></li>}
            {next && <li><a href={assembleQuery({page: page + 1, perpage: perpage}, href)} onClick={(e) => {e.preventDefault(); onNext();}}>下一页</a></li>}
            {last && <li><a href={assembleQuery({page: pages, perpage: perpage}, href)} onClick={(e) => {e.preventDefault(); onLast();}}>尾页</a></li>}
            <li><span>共 {pages} 页</span></li>
            </ul>
        : <></>)
}


Paginator.propTypes = {
    page: (props, propName) => {
        return (
            (typeof props[propName] !== 'number') ?
                new Error(propName + ' must be a integer') :
                (props[propName] <= 0) ?
                    new Error(propName + ' must greater than 0') :
                    null
        )
    },
    perpage: (props, propName) => {
        return (
            (typeof props[propName] !== 'number') ?
                new Error(propName + ' must be a integer') :
                (props[propName] <= 0) ?
                    new Error(propName + ' must greater than 0') :
                    null
        )
    },
    total: PropTypes.number.isRequired,
    showPages: PropTypes.number.isRequired,
    isEllipsis: PropTypes.bool,
    query: PropTypes.string,
    setPage: PropTypes.func.isRequired,
}

Paginator.defaultProps = {
    page: 1,
    perpage: 15,
    total: 0,
    showPages: 5,
    isEllipsis: true,
    query: '',
}

export default Paginator;