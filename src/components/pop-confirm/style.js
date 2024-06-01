import styled from 'styled-components';

export const PopWrapper = styled.div`
    width     : fit-content;
    span:nth-child(1) {
        display: block;
        font-size: 1rem;
        color: #111;
    }
    span:nth-child(2) {
        display: block;
        font-size: 0.8rem;
        color: #666;
    }
    
    div {
        display: flex;
        justify-content: space-around;
        button {
            font-size: 0.8rem;
            line-height: 1rem;
            padding: 0.1rem 0.2rem;
            border: 1px solid var(--theme);
            border-radius: 4px;
        }
        button:nth-child(1) {
            background: #fff;
            color: var(--theme);
        }
        button:nth-child(2) {
            background: var(--theme);
            color: #fff;
        }
    }
`