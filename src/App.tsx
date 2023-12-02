import './App.css'
import styled, { css } from 'styled-components';

/**
 * https://styled-components.com/docs
 * Next part: Adapting based on props
 * 
 * Going through this doc practicing with my ideas...
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

    // Using parameter (if it is a boolean, we can use it or leave it (? sign)...)
    // or using the || we can give default value in case we leave param
    const Button = styled.button<{ $primary?: boolean; $size?: string; }>`
        background: transparent;
        border-radius: 3px;
        border: 2px solid #BF4F74;
        color: #BF4F74;
        margin: 0 1em;
        padding: 0.25em 1em;
        font-size: ${props => props.$size || "1em"};

        ${props => props.$primary && css`
            background: #BF4F74;
            color: white;
        `}
    `

    // Using parameter version 2 - if it is a boolean, we can use it or leave it...
    const Button2 = styled.button<{$primary: boolean;}>`
        background: ${props => props.$primary ? "green" : "white"};
        color: ${props => props.$primary ? "white" : "green"};
        border-radius: 1em;
        border: 2px solid green;
        margin: 0 1em;
        padding: 0.25em 1em;
    `

    // Using a number parameter:
    const colors = ["white", "red", "green", "yellow", "blue", "black", "gray", "aquamarine", "magenta", "brown", "pink"];
    const count = colors.length;

    const MultiColoredButton = styled.button<{$color: number;}>`
        color: ${props => colors[props.$color % count]};
        background-color: ${props => colors[(props.$color + 3) % count]};
        border-radius: 1em;
        border: 2px solid ${props => colors[(props.$color + 6) % count]};
        margin: 0 1em;
        padding: 0.25em 1em;
    `

    // Extended style
    const ExtButton = styled(Button)`
        border-radius: 3em;
        color: red;
        border-color: red;
    `
    // This can work also for any non-styled-comp., but through the className handed over in props:
    // const Link = ({ className, children }) => (
    //     <a className={className}>
    //       {children}
    //     </a>
    //   );

    const ReversedButton = props => <Button {...props} children={props.children.split('').reverse()} />

    const ButtonWithSpaces = props => <Button {...props} children={props.children.split('').join(" .")} />


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

    const FlexSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1em;
`

    // Extended style 2: using a style of a comp. for another (or copy?): ExtButton, 2nd appearance
    return (
        <>
            <Wrapper>
                <Title>
                    Hello! Here come the styled-components!
                </Title>
            
                <FlexSection>
                    <FlexSection>
                        <TextInput />
                        <div>
                            <Button>Click!</Button>
                            <Button $primary >Primary Click!</Button>
                            <ExtButton>Extended Button style</ExtButton>
                            <br /><br />
                            <Button $size={"2em"}>Double size!</Button>
                        </div>
                    </FlexSection>
                    <FlexSection>
                        <TextInput />
                        <div>
                            <Button>Click!</Button>
                            <Button2>Button2 simple</Button2>
                            <Button2 $primary >Button2 Primary</Button2>
                            <br/><br/>
                            <ExtButton as="a" href="https://www.idokep.hu/idojaras/Budapest">
                            ExtButton-styled link to the weather report site
                            </ExtButton>
                            <br/><br/>
                            <ReversedButton>Nice to meet you, my dear Lady...</ReversedButton>
                            <ButtonWithSpaces>Nice to meet you, my dear Lady...</ButtonWithSpaces>
                        </div>
                    </FlexSection>
                    <FlexSection>
                        <h2>Awful parrot-style buttons :) demonstrate number parameter</h2>
                        <div>
                            {[1,3,8,7,10,2,4,6,9].map((key, value) =>
                                <MultiColoredButton key={key} $color={value}>button{value}</MultiColoredButton>
                            )}
                        </div>
                    </FlexSection>
                </FlexSection>
            </Wrapper>
        </>
    )
}

export default App
