import styled from 'styled-components';


export const ShowWrapper = styled.div`
    width: 98%;
    margin: 1%;
    overflow: hidden;
	box-sizing: content-box;
	.show-data {
	    padding: 20px;
	    border: 1px solid #ccc;
	    border-radius: 2px;
	    clear: both;
	    p {
	        height: 32px;
	        line-height: 32px;
	        font-size: 14px;
	        span:nth-child(1) {
	            display: inline-block;
	            width: 150px;
	            font-weight: 700;
	            text-align: right;
	            margin-right: 10px;
	        }
	        span:nth-child(2) {
	            margin-left: 10px;
	        }
	    }
	}
	.show-action {
	    margin: 15px 200px;
	    button {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            margin-left: 15px;
            border-radius: 2px;
            border: 1px solid var(--theme);
            text-align: center;
            vertical-align:middle;
	    }
	    button:nth-child(1) {
	        width: 50px;
	        background: #fff;
            color: var(--theme);
	    }
	    button:nth-child(2) {
	        width: 80px;
	        background: var(--theme);
            color: #fff;
	    }
	}
`