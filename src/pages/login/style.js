import styled from 'styled-components';

export const LoginContainer = styled.div`
	height: 100vh - 300px;
    display: flex;
    padding-top: calc(50vh - 200px);
    justify-content: center;
`

export const LoginBox = styled.div`
	width:  600px;
    height: 300px;
    display: flex;
    border-radius: 5px;
    box-shadow: 2px 2px 10px #CCC;
    overflow: hidden;
`

export const LoginLeft = styled.div`
	width: 38%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2% 0;
    gap: 15px;
    background: #BBB;
    i {
       font-size: 220px;
       color: #188efc;
       height: 70%; 
    }
    span {
        height: 20%;
        font-size: 24px;
        line-height: 40px;
        color: #00152a;
    }
`

export const LoginRight = styled.div`
    box-shadow: none;
    width: 62%;
    height: 100%;
    background: #FAFAFA;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
`

export const LoginForm = styled.form`
    width: 100%;
    height: 100%;
    padding: 0 30px;
`

export const LoginFormParagraph = styled.p`
    margin: 30px 0px;
    border: 1px solid #188efc;
    border-radius: 5px;
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    i {
        font-size: 24px;
        color: #188efc;
    }
`

export const LoginFormParagraphCaptcha = styled(LoginFormParagraph)`
    display: flex;
`

export const LoginFormCaptchaImg = styled.img`

`

export const LoginFormParagraphSubmit = styled(LoginFormParagraph)`
	background: #188efc;
    color: #FAFAFA;
    font-size: 20px;
    input {
        color: #FAFAFA;
        font-size: 20px; 
        background: #188efc;
    }
`

export const Input = styled.input`
	border:none;
	padding-left: 15px;
    width: 100%;
`

export const Button = styled.div`
	width: 220px;
	height: 30px;
	line-height: 30px;
	color: #fff;
	background: #3194d0;
	border-radius: 15px;
	margin: 10px auto;
	text-align: center;
`