import './App.css'
import styled, { css } from 'styled-components';

/**
 * https://styled-components.com/docs
 * Next part: Adapting based on props
 */


function App() {
    

    const Title = styled.h1`
        font-family: Verdana;
        font-size: 1.5em;
        text-align: center;
        color: blue;
        margin-bottom: 2em;
    `

    const Wrapper = styled.section`
        padding: 4em;
        background: papayawhip;
    `

    const Button = styled.button<{ $primary?: boolean }>`
        background: transparent;
        border-radius: 3px;
        border: 2px solid #BF4F74;
        color: #BF4F74;
        margin: 0 1em;
        padding: 0.25em 1em;

        ${props => props.$primary && css`
            background: #BF4F74;
            color: white;
        `}
    `

    const TextInput = styled.textarea`
        background-color: lightgreen;
        border-radius: 1em;
        font-size: 2rem;
        padding: 0.5em;
    `
    const FlexMain = styled.main`
        display: flex;
        flex-direction: row;
        gap: 1em;
    `

    return (
        <>
            <Wrapper>
                <Title>
                    Hello Everyone! Here is styled-components!
                </Title>
            
                <FlexMain>
                    <div>
                        <TextInput />
                        <Button>Click!</Button>
                        <Button $primary >Primary Click!</Button>
                    </div>
                    <div>
                        <TextInput />
                        <Button>Click!</Button>
                    </div>
                </FlexMain>
            </Wrapper>
        </>
    )
}

export default App
