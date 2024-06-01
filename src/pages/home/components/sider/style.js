import styled, { css } from 'styled-components';


const ShowStyle = css`
	display: none !important;
`;

const HideStyle = css`
	display: none !important;
`;

const SiderContainerClosedStyle = css`
	width   : 44px;
    overflow: hidden;
`;

export const SiderContainer = styled.div`
	flex-shrink: 0;
    background : #00152a;
    width      : 200px;
    min-height : 100vh;
    position   : relative;
    z-index    : 3;
    ${props => props.fold && SiderContainerClosedStyle};
    ${props => !props.isDisplay && HideStyle};
`;

const SiderWrapperFixedStyle = css`
	position: fixed;
    left    : 0;
    top     : 0;
    width   : inherit;
    overflow: hidden;
`;

export const SiderWrapper = styled.div`
	height        : 100%;
    display       : flex;
    flex-direction: column;
    ${props => props.fixed && SiderWrapperFixedStyle};
`;



export const SiderHeader = styled.div`
	flex-shrink: 0;
`;


export const Logo = styled.a.attrs({
    alt: ''
})`
	display    : flex;
    align-items: center;
    padding    : 10px 16px 12px 12px;
    color      : white;
    img {
        width: 32px;
        margin-left: -2px;
    }
    h1 {
        font-weight: 600;
        margin-left: 12px;
        flex-shrink: 0;
    }
`;

export const SiderFooter = styled.div`
	flex-shrink: 0;
	i {
	    font-size: 18px;
        color    : white;
        display  : block;
        padding  : 15px;
        cursor   : pointer;
	}
`;
