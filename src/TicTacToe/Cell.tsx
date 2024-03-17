import styled, { css } from "styled-components";
import { useState } from "react";

const CellDiv = styled.div<{$highlighted?: boolean}>`
    height: 5vh;
    width: 3vw;
    text-align: center;
    border: 1px solid #6b6bf3;
    border-radius: 0.5em;
    font-size: 2rem;
    padding: 0.3em;
    margin: 0.2em 0;
    cursor: pointer;

    ${props => props.$highlighted && css`
        background-color: gray;
        color: yellow;
    `}
`

export default function Cell({highlighted, value, x, y, setValue}: {highlighted: boolean, value: string, x: number, y: number, setValue: (x: number, y: number) => void}) {

    return (
        <>
            <CellDiv $highlighted={highlighted} onClick={() => setValue(x,y)}>
                {value}
            </CellDiv>
        </>
    )
}