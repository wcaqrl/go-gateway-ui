import styled from 'styled-components';

export const NotFoundWrapper = styled.div`
    width     : 100%;
    height    : 100%;
    display   : flex;
    justify-content: space-around;
    align-items: center;
    div {
        p {
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: #888;
            margin: 25px;
        }
        p:nth-child(1)>i {
            font-size: ${props => (props.iconSize ? props.iconSize : '25rem')};
        }
        p:nth-child(2) {
            font-size: ${props => (props.msgSize ? props.msgSize : '3rem')};
        }
    }
`