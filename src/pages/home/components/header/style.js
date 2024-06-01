import styled, {css} from 'styled-components';


const HideStyle = css`
	display: none !important;
`;

const MarginLeftStyle = css`
	margin-left: 152px;
`;

const HeaderWrapperFixedStyle = css`
	position: fixed;
    left    : 0;
    right   : 0;
    z-index : 2;
`;

export const HeaderWrapper = styled.div`
	height         : 48px;
    background     : #FFF;
    flex-shrink    : 0;
    display        : flex;
    justify-content: space-between;
    // align-items    : center;
    flex-wrap: wrap;
    align-content: center;
    box-shadow     : 0 1px 4px #ccc;
    column-gap     : 20px;
    padding        : 0 20px;
    span {
        margin-left: -15px;
    }
    ${props => props.fixed && HeaderWrapperFixedStyle};
    ${props => !props.isDisplay && HideStyle};
`;

export const Logo = styled.div`
    align-items : center;
    margin-left: -8px;
    // margin-right: 20px;
    gap: 20px;
    img {
        width: 32px;
    }
    // i {
    //    color: inherit; 
    // }
    display: ${props => (props.fixed ? 'flex' : 'none')};
`

export const LeftWrapper = styled.div`
    display: flex;
    justify-content: left;
    align-items : center;
    margin-right: auto;
    li {
        margin-left: 15px;
        list-style-type: none;
        cursor: pointer;
        span {
           font-size: 16px;
           color: inherit; 
        }
    }
    ${props => props.fixed && props.siderShow && !props.siderFold && MarginLeftStyle};
`

export const RightWrapper = styled.div`
    display        : flex;
    justify-content: flex-end;
    column-gap     : 20px;
    align-items : center;
    i {
       font-size: 16px;
       color: inherit;
       cursor: pointer;
    }
    button {
        border: none;
        background: none;
    }
`