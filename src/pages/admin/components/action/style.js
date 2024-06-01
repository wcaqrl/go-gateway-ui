import styled from 'styled-components';


export const ActionWrapper = styled.div`
    border: none 0; 
    height: 100%; 
    width: 100%; 
    color: inherit; 
    overflow: visible;
	box-sizing: content-box;
	display: flex;
	// justify-content: center;
    align-items: center; 
	form {
	    width: 100%;
	    height: 100%;
	    padding-top: 100px;
	    font-size: 14px;
	}
`

export const InputWrapper = styled.p`
    height: 36px;
    line-height: 36px;
    span {
        width: 85px;
        text-align: right;
        padding-right: 15px;
        display: inline-block;
        font-size: 14px;
    }
    input {
        width:  200px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 0 10px 0 10px;
        background: #fff;
    }
    input[type=number] {
        border: 1px solid #ccc;
        width:  210px;
        line-height: 30px;
        padding-right: 0;
        background: #fff;
    }
`

export const HintWrapper = styled.p`
    border: none 0;
    height: 36px;
    line-height: 36px;
    text-indent: 100px;
    width: 100%;
    color: inherit;
    overflow: hidden;
	box-sizing: content-box;
`

export const SpanWrapper = styled.span`
    font-size: 14px;
    color: red;
    display   : ${props => (props.isDisplay ? "inline" : "none")};
`

export const SubmitWrapper = styled.p`
    height: 36px;
    line-height: 36px;
    padding-left: 270px;
    input[type=submit] {
        width: 50px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        background: var(--theme);
        color: #fff;
        border-radius: 2px;
        border: 1px solid var(--theme);
        text-align: center;
        vertical-align:middle;
    }
`