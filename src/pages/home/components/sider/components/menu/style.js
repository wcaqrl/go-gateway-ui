import styled, {css} from 'styled-components';

const scaleIconStyle = css`
    transform: scale(1.2);
`

const marginRightStyle = css`
    margin-right: 48px;
`

const subSelectedStyle = css`
    background: var(--theme);
    color     : #fff;
`

export const MenuWrapper = styled.ul`
	flex-grow: 1;
    overflow : hidden auto;
    
    ::-webkit-scrollbar {
        width : 6px;
        height: 6px;
    }
    
    ::-webkit-scrollbar-thumb {
        background   : #51606d;
        border-radius: 3px;
    }
    
    ::-webkit-scrollbar-track {
        background   : #263849;
        border-radius: 3px;
    }
`

export const MenuItem = styled.li`
    color : #8c959e;
    cursor: pointer;
`

export const MenuTitle = styled.div`
    height     : 44px;
    display    : flex;
    align-items: center;
    column-gap : 10px;
    padding    : 0 15px 0 18px;
    span {
        font-weight: 700;
        margin-right: auto;
    }
    i:first-child {
        ${props => props.fold && scaleIconStyle};
        ${props => props.fold && marginRightStyle};
    }
    color: ${props => (props.titleSelected ? '#fff' : 'inherit')};
`

export const MenuSub = styled.ul`
    li {
        height      : 40px;
        line-height : 40px;
        display: ${props => (props.fold ? 'none' : 'block')};
        ${props => props.subSelected && subSelectedStyle};
        a {
            display: block;
            padding-left: 45px;
            line-height : 40px;
            width: calc(100% - 45px);
            height: 100%;
            text-decoration: none;
            color: #fff;
        }
    }
`