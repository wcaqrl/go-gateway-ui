import styled from 'styled-components';

export const SettingWrapper = styled.div`
	width     : 300px;
    height    : 100vh;
    background: white;
    position  : fixed;
    right     : ${props => (props.open ? 0 : -300)}px;
    top       : 0;
    padding   : 0 15px;
    box-sizing: border-box;
    z-index   : 10;
    
`;

export const SettingBar = styled.div`
	width          : 36px;
    height         : 36px;
    background     : var(--theme);
    border-radius  : 1px;
    position       : absolute;
    left           : -36px;
    top            : calc(50% - 18px);
    color          : white;
    display        : flex;
    justify-content: center;
    align-items    : center;
    cursor         : pointer;
    i {
        font-size: 20px;
    }
`;

export const SettingItem = styled.div`
	margin: 50px 0;
`;

export const SettingItemTheme = styled.ul`
	display        : flex;
    justify-content: space-between;
    margin         : 30px 0;
`;

export const SettingItemThemeLi = styled.li`
	width        : 20px;
    height       : 20px;
    color        : white;
    border-radius: 2px;
    cursor       : pointer;
    line-height  : 20px;
    text-align   : center;
    background   : ${props => (props.background)};
`;

export const SettingItemToggle = styled.ul`
    li {
    	display        : flex;
        justify-content: space-between;
        margin         : 30px 0;
    }
`;

export const SwitchWrapper = styled.div`
    width        : 28px;
    height       : 16px;
    border-radius: 100px;
    background   : ${props => (props.close ? 'var(--theme)' : 'rgba(0, 0, 0, 0.25)')};
    cursor       : pointer;
`;

export const SwitchCircle = styled.div`
    width        : 12px;
    height       : 12px;
    background   : white;
    border-radius: 50%;
    position     : relative;
    left         : ${props => (props.close ? '14px' : '2px')};
    top          : 2px;
`;

export const Divider = styled.div`
	width     : 100%;
    height    : 1px;
    background: #f0f0f0;
    margin    : 25px 0;
`;