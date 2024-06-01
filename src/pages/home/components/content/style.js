import styled, { css } from 'styled-components';

const MarginTopStyle = css`
    margin-top: 48px;
`

export const ContentWrapper = styled.div`
	flex-grow: 1;
	${props => props.headerShow && props.headerFixed && MarginTopStyle};
`;

export const ListWrapper = styled.div`
    border: none 0; 
    height: 100%; 
    width: 100%; 
    color: inherit; 
    overflow: visible;
	box-sizing: content-box;
`

export const AddButton = styled.button`
    float: right;
    clear: both;
    margin: 0px 1% 10px 0px;
    background: var(--theme);
    color: #fff;
    text-align: center;
    border: 1px solid var(--theme);
    border-radius: 2px;
    width: 50px;
    height: 30px;
    vertical-align:middle;
`