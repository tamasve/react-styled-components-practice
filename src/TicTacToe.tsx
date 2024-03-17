import styled from "styled-components";
import Cell from "./Cell";
import { useState } from "react";
import { Title } from "./Practices";


const Table = styled.main<{$dim: number}>`
    background-color: #2c2a2a;
    color: whitesmoke;
    padding: 2em;
    margin: auto auto;
    border-radius: 2em;
    display: grid;
    grid-template-columns: ${props => "1fr ".repeat(props.$dim).trim()};
    gap: 0 0;
    justify-content: space-around;
    width: ${props => `${props.$dim * 5}vw`}
    `

// The table is a 2dim array: y, x indexes, (0,0) is the top-left cell
// cell values -- 0: void  1: X  10: O >> to be able to easily sum up the winning situations (sum of 3 cell values should be 3 or 30)
// highlight: for highlighting winning triplets
interface CellInfo {
    value: number,
    highlighted: boolean
}

// the relative step positions data for the checking of winning triplets
interface Pos {
    start: number,
    end: number,
    step: number
}

// points
interface Points {
    x: number,
    o: number
}



export default function TicTacToe({dim} : {dim: number}) {

    const [matrix, setMatrix] = useState<CellInfo[][]>(
        Array(dim).fill( Array(dim).fill(
            {
                value: 0,
                highlighted: false
            }
        ) )
    );

    const [count, setCount] = useState<number>(0);      // to count players action and to control whose turn

    const [points, setPoints] = useState<Points>({x: 0, o: 0});

    console.log(matrix);    // check


    // ~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~ EVALUATOR function ~~

    function evaluate(actMatrix: CellInfo[][], x: number, y: number): boolean {

        let startX: number;
        let startY: number;
        let endX: number;
        let endY: number;
        let posX: Pos;
        let posY: Pos;

        const dim = actMatrix.length;   // dimension: x*x table

        // ~~ HORIZONTAL CHECK ~~

        startX = Math.max(0, x-2);  // the possible left-most position of a triplet that contains the modified cell  (position of the left-most cell of the triplet)
        endX = Math.min(dim-1, x+2)-2;  // the possible right-most position of a triplet that contains the modified cell  (position of the left-most cell of the triplet)
        console.log(startX, endX);
        
        for (let i = startX; i <= endX; i++) {
            /* console.log("i: ", i); */
            const sum = actMatrix[y][i].value + actMatrix[y][i+1].value + actMatrix[y][i+2].value;
            if (sum === 3 || sum === 30) {      // 3 equal signs found next to each other
                console.log("if - i: ", i);
                actMatrix[y][i].highlighted = true;
                actMatrix[y][i+1].highlighted = true;
                actMatrix[y][i+2].highlighted = true;
                return true;
            }
        }

        // ~~ VERTICAL CHECK ~~

        startY = Math.max(0, y-2);  // the possible top-most position of a triplet that contains the modified cell  (position of the top-most cell of the triplet)
        endY = Math.min(dim-1, y+2)-2;  // the possible bottom-most position of a triplet that contains the modified cell  (position of the top-most cell of the triplet)
        console.log(startY, endY);
        
        for (let j = startY; j <= endY; j++) {
            /* console.log("i: ", i); */
            const sum = actMatrix[j][x].value + actMatrix[j+1][x].value + actMatrix[j+2][x].value;
            if (sum === 3 || sum === 30) {      // 3 equal signs found next to each other
                console.log("if - j: ", j);
                actMatrix[j][x].highlighted = true;
                actMatrix[j+1][x].highlighted = true;
                actMatrix[j+2][x].highlighted = true;
                return true;
            }
        }

        // ~~ CROSS CHECK 1: descending ~~

        startX = Math.max(0, x-2);  // the possible left-most position of a triplet that contains the modified cell  (position of the left-most cell of the triplet)
        endX = Math.min(dim-1, x+2)-2;  // the possible right-most position of a triplet that contains the modified cell  (position of the left-most cell of the triplet)
        startY = Math.max(0, y-2);  // the possible top-most position of a triplet that contains the modified cell  (position of the top-most cell of the triplet)
        endY = Math.min(dim-1, y+2)-2;  // the possible bottom-most position of a triplet that contains the modified cell  (position of the top-most cell of the triplet)

        // the number of steps is determined by the narrower space (x or y), both at x and y, as well as forward and backward
        posX = {
            start: x - Math.min( x - startX, y - startY ),
            end: x + Math.min( endX - x, endY - y ),
            step: 1
        }

        posY = {
            start: y - Math.min( x - startX, y - startY ),
            end: y + Math.min( endX - x, endY - y ),
            step: 1
        }
        
        // step: relative step values
        for (let step = 0; step <= posX.end - posX.start; step++) {
            const sum = actMatrix[posY.start + posY.step * step][posX.start + posX.step * step].value
                        + actMatrix[posY.start + posY.step * (step+1)][posX.start + posX.step * (step+1)].value
                        + actMatrix[posY.start + posY.step * (step+2)][posX.start + posX.step * (step+2)].value;
            if (sum === 3 || sum === 30) {      // 3 equal signs found next to each other
                actMatrix[posY.start + posY.step * step][posX.start + posX.step * step].highlighted = true;
                actMatrix[posY.start + posY.step * (step+1)][posX.start + posX.step * (step+1)].highlighted = true;
                actMatrix[posY.start + posY.step * (step+2)][posX.start + posX.step * (step+2)].highlighted = true;
                return true;
            }
        }

        // ~~ CROSS CHECK 2: ascending ~~

        startX = Math.max(0, x-2);  // the possible left-most position of a triplet that contains the modified cell  (position of the left-most cell of the triplet)
        endX = Math.min(dim-1, x+2)-2;  // the possible right-most position of a triplet that contains the modified cell  (position of the left-most cell of the triplet)
        endY = Math.max(0, y-2)+2;  // the possible top-most position of a triplet that contains the modified cell  (position of the top-most cell of the triplet)
        startY = Math.min(dim-1, y+2);  // the possible bottom-most position of a triplet that contains the modified cell  (position of the top-most cell of the triplet)

        console.log("Y end start", endY, startY);

        // the number of steps is determined by the narrower space (x or y), both at x and y, as well as forward and backward
        posX = {
            start: x - Math.min( x - startX, startY - y ),
            end: x + Math.min( endX - x, y - endY ),
            step: 1
        }

        posY = {
            start: y + Math.min( x - startX , startY - y ),
            end: y - Math.min( endX - x, y - endY ),
            step: -1
        }
        
        // step: relative step values
        for (let step = 0; step <= posX.end - posX.start; step++) {
            const sum = actMatrix[posY.start + posY.step * step][posX.start + posX.step * step].value
                        + actMatrix[posY.start + posY.step * (step+1)][posX.start + posX.step * (step+1)].value
                        + actMatrix[posY.start + posY.step * (step+2)][posX.start + posX.step * (step+2)].value;
            if (sum === 3 || sum === 30) {      // 3 equal signs found next to each other
                actMatrix[posY.start + posY.step * step][posX.start + posX.step * step].highlighted = true;
                actMatrix[posY.start + posY.step * (step+1)][posX.start + posX.step * (step+1)].highlighted = true;
                actMatrix[posY.start + posY.step * (step+2)][posX.start + posX.step * (step+2)].highlighted = true;
                return true;
            }
        }

        return false;
    };

    // ~~~~~~~~~~~~~~~~~~~~~~~~


    const setValue = (x: number, y: number) => {
        const newMatrix = JSON.parse(JSON.stringify(matrix));   // deep copy of matrix
        
        // write the sign of the actual player if it is a void cell
        if (newMatrix[y][x].value === 0)
        {
            newMatrix[y][x].value = count % 2 === 0 ? 1 : 10;
        }
        
        // evaluate(...) >> winning triplet found? (then point given) + highlights
        if (evaluate(newMatrix, x, y)) {
            if (count % 2 === 0)  setPoints({...points, x: points.x + 1});
            else  setPoints({...points, o: points.o + 1});
        };

        setMatrix( newMatrix );
        setCount((count) => count + 1);     // next turn = next player
    }

    
    return (
        <>
            <Title $color="red">
                Tic Tac Toe
            </Title>
            <Table $dim={dim}>
                {matrix.map((array, y) => 
                    (array.map((obj, x) => 
                        <Cell key={x}
                                highlighted={obj.highlighted} 
                                value={obj.value === 0 ? "" : obj.value === 1 ? "X" : "O"}
                                x={x}
                                y={y}
                                setValue={setValue}
                        />)
                    )
                )}
            </Table>
            <Title $color="red">
                {`Points ~~ X: ${points.x} ~~ O: ${points.o}`}
            </Title>
        </>
    )
}