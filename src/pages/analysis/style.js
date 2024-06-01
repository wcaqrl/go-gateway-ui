import styled from 'styled-components';


export const AnalysisWrapper = styled.div`
    display: grid;
    height: 100%;
    #border: 1px solid red;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(3, 120px);
    gap: 30px;
    margin: 50px 25px;
    grid-template-areas:
    "a1 a1 a1 a2 a2 a2 a3 a3 a3 a4 a4 a4"
    "a5 a5 a5 a5 a5 a5 a5 a5 a6 a6 a6 a6"
    "a5 a5 a5 a5 a5 a5 a5 a5 a6 a6 a6 a6"
    "a5 a5 a5 a5 a5 a5 a5 a5 a6 a6 a6 a6"
    "a5 a5 a5 a5 a5 a5 a5 a5 a6 a6 a6 a6";
    
    .stat-card {
        #border: 1px solid green;
        padding: 15px;
        background: #fefefe;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .stat-card-small {
        overflow: hidden;
    }
    
    .stat-card {
        border-radius: 3px;
    }
    
    .stat-card-small > div:nth-of-type(1) i {
        font-size: 48px;
    }
    
    .stat-card-small:nth-of-type(1) > div:nth-of-type(1) {
        color: #14c2c3;
    }
    
    .stat-card-small:nth-of-type(2) > div:nth-of-type(1) {
        color: #f5212d;
    }
    
    .stat-card-small:nth-of-type(3) > div:nth-of-type(1) {
        color: #53c41a;
    }
    
    .stat-card-small:nth-of-type(4) > div:nth-of-type(1) {
        color: #188efc;
    }
    
    .stat-card-small > div:nth-of-type(2) > p:nth-of-type(1) {
        font-size: 16px;
        font-weight: 700;
        color: #777;
        margin-bottom: 12px;
    }
    
    .stat-card-small > div:nth-of-type(2) > p:nth-of-type(2) {
        font-size: 18px;
        font-weight: 700;
        color: #666;
    }
    
    .stat-card:nth-of-type(1) {
        grid-area: a1;
    }
    .stat-card:nth-of-type(2) {
        grid-area: a2;
    }
    .stat-card:nth-of-type(3) {
        grid-area: a3;
    }
    .stat-card:nth-of-type(4) {
        grid-area: a4;
    }
    .stat-card:nth-of-type(5) {
        grid-area: a5;
    }
    .stat-card:nth-of-type(6) {
        grid-area: a6;
    }
`