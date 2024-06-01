import styled from 'styled-components';

export const MaskWrapper = styled.div`
    width     : 100vw;
    height    : 100vh;
    background: rgba(0, 0, 0, 0.4);
    position  : fixed;
    left      : 0;
    top       : 0;
    z-index   : 3;
    display   : ${props => (props.open ? "block" : "none")};
`