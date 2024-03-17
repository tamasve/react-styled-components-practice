import styled from "styled-components";
import Cell from "./Cell";
import { useState } from "react";
import { Title } from "../Practices";


const Blocks = styled.main`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
`

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
// triplets: checking if the cell is part of a triplet of any kind of the 4
interface CellInfo {
    value: number,
    highlighted: boolean,
    triplets: {
        horizontal: boolean,
        vertical: boolean,
        crossdesc: boolean,
        crossasc: boolean
    }
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
                highlighted: false,
                triplets: {
                    horizontal: false,
                    vertical: false,
                    crossdesc: false,
                    crossasc: false
                }
            }
        ) )
    );

    const [count, setCount] = useState<number>(0);      // to count players action and to control whose turn

    const [points, setPoints] = useState<Points>({x: 0, o: 0});

    const [message, setMessage] = useState<string>("");

    console.log(matrix);    // check


    // ~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~ the EVALUATOR function ~~

    function evaluate(actMatrix: CellInfo[][], x: number, y: number): number {

        let startX: number;
        let startY: number;
        let endX: number;
        let endY: number;
        let posX: Pos;
        let posY: Pos;

        let points = 0;     // the return value

        const dim = actMatrix.length;   // dimension: x*x table

        // ~~ HORIZONTAL CHECK ~~

        startX = Math.max(0, x-2);  // the possible left-most position of a triplet that contains the modified cell  (position of the left-most cell of the triplet)
        endX = Math.min(dim-1, x+2)-2;  // the possible right-most position of a triplet that contains the modified cell  (position of the left-most cell of the triplet)
        console.log(startX, endX);
        
        for (let i = startX; i <= endX; i++) {

            const sum = actMatrix[y][i].value + actMatrix[y][i+1].value + actMatrix[y][i+2].value;
            const checked = actMatrix[y][i].triplets.horizontal || actMatrix[y][i+1].triplets.horizontal || actMatrix[y][i+2].triplets.horizontal;

            if ( !checked && (sum === 3 || sum === 30) ) {      // 3 equal signs found next to each other in still unchecked cells (not part of an earlier triplet)
                actMatrix[y][i].highlighted = true;
                actMatrix[y][i].triplets.horizontal = true;

                actMatrix[y][i+1].highlighted = true;
                actMatrix[y][i+1].triplets.horizontal = true;

                actMatrix[y][i+2].highlighted = true;
                actMatrix[y][i+2].triplets.horizontal = true;

                points++;   // the player receives a point for this triplet
            }
        }

        // ~~ VERTICAL CHECK ~~

        startY = Math.max(0, y-2);  // the possible top-most position of a triplet that contains the modified cell  (position of the top-most cell of the triplet)
        endY = Math.min(dim-1, y+2)-2;  // the possible bottom-most position of a triplet that contains the modified cell  (position of the top-most cell of the triplet)
        console.log(startY, endY);
        
        for (let j = startY; j <= endY; j++) {

            const sum = actMatrix[j][x].value + actMatrix[j+1][x].value + actMatrix[j+2][x].value;
            const checked = actMatrix[j][x].triplets.vertical || actMatrix[j+1][x].triplets.vertical || actMatrix[j+2][x].triplets.vertical;

            if ( !checked && (sum === 3 || sum === 30) ) {      // 3 equal signs found next to each other in still unchecked cells (not part of an earlier triplet)

                actMatrix[j][x].highlighted = true;
                actMatrix[j][x].triplets.vertical = true;

                actMatrix[j+1][x].highlighted = true;
                actMatrix[j+1][x].triplets.vertical = true;

                actMatrix[j+2][x].highlighted = true;
                actMatrix[j+2][x].triplets.vertical = true;

                points++;   // the player receives a point for this triplet
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

            const y1 = posY.start + posY.step * step;
            const x1 = posX.start + posX.step * step;

            const y2 = posY.start + posY.step * (step+1);
            const x2 = posX.start + posX.step * (step+1);

            const y3 = posY.start + posY.step * (step+2);
            const x3 = posX.start + posX.step * (step+2);

            const sum = actMatrix[y1][x1].value
                        + actMatrix[y2][x2].value
                        + actMatrix[y3][x3].value;

            const checked = actMatrix[y1][x1].triplets.crossdesc
                        || actMatrix[y2][x2].triplets.crossdesc
                        || actMatrix[y3][x3].triplets.crossdesc;
                        
            if ( !checked && (sum === 3 || sum === 30) ) {      // 3 equal signs found next to each other in cross, in still unchecked cells (not part of an earlier triplet)

                actMatrix[y1][x1].highlighted = true;
                actMatrix[y1][x1].triplets.crossdesc = true;

                actMatrix[y2][x2].highlighted = true;
                actMatrix[y2][x2].triplets.crossdesc = true;

                actMatrix[y3][x3].highlighted = true;
                actMatrix[y3][x3].triplets.crossdesc = true;

                points++;   // the player receives a point for this triplet
            }
        }

        // ~~ CROSS CHECK 2: ascending ~~

        startX = Math.max(0, x-2);  // the possible left-most position of a triplet that contains the modified cell  (position of the left-most cell of the triplet)
        endX = Math.min(dim-1, x+2)-2;  // the possible right-most position of a triplet that contains the modified cell  (position of the left-most cell of the triplet)
        endY = Math.max(0, y-2)+2;  // the possible top-most position of a triplet that contains the modified cell  (position of the top-most cell of the triplet)
        startY = Math.min(dim-1, y+2);  // the possible bottom-most position of a triplet that contains the modified cell  (position of the top-most cell of the triplet)

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

            const y1 = posY.start + posY.step * step;
            const x1 = posX.start + posX.step * step;

            const y2 = posY.start + posY.step * (step+1);
            const x2 = posX.start + posX.step * (step+1);

            const y3 = posY.start + posY.step * (step+2);
            const x3 = posX.start + posX.step * (step+2);

            const sum = actMatrix[y1][x1].value
                        + actMatrix[y2][x2].value
                        + actMatrix[y3][x3].value;

            const checked = actMatrix[y1][x1].triplets.crossasc
                        || actMatrix[y2][x2].triplets.crossasc
                        || actMatrix[y3][x3].triplets.crossasc;
                        
            if ( !checked && (sum === 3 || sum === 30) ) {      // 3 equal signs found next to each other in cross, in still unchecked cells (not part of an earlier triplet)

                actMatrix[y1][x1].highlighted = true;
                actMatrix[y1][x1].triplets.crossasc = true;

                actMatrix[y2][x2].highlighted = true;
                actMatrix[y2][x2].triplets.crossasc = true;

                actMatrix[y3][x3].highlighted = true;
                actMatrix[y3][x3].triplets.crossasc = true;

                points++;   // the player receives a point for this triplet
            }
        }

        return points;
    };

    // ~~~~~~~~~~~~~~~~~~~~~~~~


    // The value setter for the actual cell

    const setValue = (x: number, y: number) => {
        const newMatrix = JSON.parse(JSON.stringify(matrix));   // deep copy of matrix
        
        // write the sign of the actual player if it is a void cell
        if (newMatrix[y][x].value === 0)
        {
            newMatrix[y][x].value = count % 2 === 0 ? 1 : 10;
        }
        
        // evaluate(...) >> winning triplet found? (then point given) + highlights
        const scores = evaluate(newMatrix, x, y);
        if ( scores > 0 ) {
            if (count % 2 === 0) {
                setPoints({...points, x: points.x + scores});
                setMessage(`Congratulation, X! You created ${scores} triplet(s)! You received ${scores} point(s)!`);
            }
            else {
                setPoints({...points, o: points.o + scores});
                setMessage(`Congratulation, O! You created ${scores} triplet(s)! You received ${scores} point(s)!`);
            }
        } else {
            setMessage("");     // if no triplet, clear any previous message
        }

        setMatrix( newMatrix );
        setCount((count) => count + 1);     // next turn = next player
    }

    
    return (
        <>
            <Title $color="red">
                Tic Tac Toe
            </Title>
            <Blocks>
                <Title $color="red">
                    <p style={{fontSize: "1rem"}}>{message}</p>
                    <p>{`- Points -`}</p>
                    <p>{`X: ${points.x}`}</p>
                    <p>{`O: ${points.o}`}</p>
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
                <Title $color="red"></Title>
            </Blocks>
        </>
    )
}