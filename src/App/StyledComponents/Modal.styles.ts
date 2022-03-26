import styled from "styled-components";

type TStyledView = {
    isVisible: boolean;
}

export const StyledModal = styled.div<TStyledView>`
    display: ${({ isVisible }) => (isVisible ? "block" : "none")};
    position: absolute;
    top: 4rem;
    left: 50%;
    transform: translateX(-50%);
    height: 31rem;
    width: 26rem;
    background-color: #183363;
    padding: 2rem;
    z-index: 10;
    padding-top: 3rem;
    box-shadow: 2px 5px 10px #19264179;
    
    p, h2, h1, h4{
        color: #fff;
        padding: 0.5rem 0;
        font-size: 1.1rem;
    }

    h4{
        font-size: 1.3rem;
    }

    .mt-5{
        margin-top: 2rem;
    }

    .btn{
        display: block;
        width: 100%;
        text-align: center;
        margin-top: 8rem;
    }

    .flex{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .close-btn{
        position: absolute;
        top: 0.5rem;
        right: 2rem;
        font-size: 1.3rem;
        cursor: pointer;
    }

    @media(max-width: 1000px){
        transform: translateX(-50%);
    }
    @media(max-width: 750px){
        transform: translateX(-50%);
    }

`