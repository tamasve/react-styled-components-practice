import styled, { css, keyframes } from 'styled-components';

/**
 * A bunch of all the stuff here together...
 * 
 * Practices based upon the web documentations:
 * 
 * https://styled-components.com/docs
 * 
 * Going through this doc practicing with my ideas...
 * 1-2 Dec 2023
 * Next part: Overriding .attrs
 * 
 * https://www.freecodecamp.org/news/styled-components-in-react/
 * Next part: Props in Styled Components
 * 
 * Basic syntax:
 * = style.<html element>` `
 */


export const Title = styled.h1`
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 3em;
    text-align: center;
    color: blue;
    font-style: oblique;
    margin-bottom: 1em;
    padding-top: 0.5em;
`

const Wrapper = styled.section`
    padding: 0 2em;
    background: papayawhip;
    border-radius: 2em;
`

// Using parameter (if it is a boolean, we can use it or leave it (? sign for optional)...)
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

    &:hover {
        background: lightblue;
    }
    &:active {
        border: 4px solid red;
    }
    & + & {
        background: linear-gradient(magenta,green);
    }
`
// REFERING TO STYLE DEF: &
// &: all instances of the component
// & + &: directly next to
// & ~ &: sibling, but maybe not directly next to
// &.classname: if it also has 'classname' class
// .classname &: inside an element that has 'classname' class
// &&: 1 instance only


// Using parameter version 2 - if it is a boolean, we can use it or leave it...
const Button2 = styled.button<{$primary?: boolean;}>`
    background: ${props => props.$primary ? "green" : "white"};
    color: ${props => props.$primary ? "white" : "green"};
    border-radius: 1em;
    border: 2px solid green;
    margin: 0 1em;
    padding: 0.25em 1em;
`

// Using a NUMBER parameter (as an index): for setting font color, bg and border
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

// EXTENDED STYLE:  plus props, overriden props - styled(Comp name)` ` - this works for every component! (also for React components)
export const ExtButton = styled(Button)<{$blackFont: boolean;}>`
    border-radius: 3em;
    color: ${props => props.$blackFont ? "black": "yellow" };
    border-color: red;
`
// This can also work for any html tag, but it is necessary to hand over the className in the props, that makes it a bit different:
const Link = ({ className, children }: { className: string, children: React.ReactNode }) => (
    <a className={className}>
      {children}
    </a>
  );

// here children = simple text...
const ReversedButton = props => <Button {...props} children={props.children.split('').reverse()} />

const ButtonWithSpaces = props => <Button {...props} $primary children={props.children.split('').join(" .")} />


const TextInput = styled.textarea`
    background-color: lightgreen;
    border-radius: 1em;
    font-size: 2rem;
    padding: 0.5em;
`

// INNER CLASSES: any child can use them
// A general section element with unique style (flex) for all children divs
// + inner classes for making yellow background, thick green border, bigger font size
// (any children can have them!)
const FlexSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1em;

    .yellowBackgr {
        background-color: yellow;
    }

    .greenBorder {
        border: 3px solid green;
    }

    .bigger {
        font-size: 4em;
    }
`

// Styled checkbox... attrs: constructor with attributes - this is a simple checkbox
const CheckBox = styled.input.attrs({ type: "checkbox" })``;
// Using switch...case structure
// ... with Label text styled using switch command and checking-dependent style
// using &&: 1 instance:
// ${CheckBox}:checked + && {...} = when the relevant checkbox gets checked this instance gets the following css...
const LabelText = styled.label<{$mode: string;}>`
    padding: 0.3em;
    ${props => {
        switch (props.$mode) {
            case "dark":
                return css`
                    background-color: black;
                    color: white;
                    ${CheckBox}:checked + && {
                        background-color: blue;
                    }
                `
            case "light":
                return css`
                    background-color: transparent;
                    color: black;
                    ${CheckBox}:checked + && {
                        color: red;
                        font-weight: 600;
                        font-size: 2em;
                    }
                `
        }
    }}
`

// Property defined inside: $num - to make an index and a multiplier from the font size
const DynSizedLabel = styled.label.attrs<{ $size?: string; }>(
    props => ({
        $size: props.$size || "1em",
        $num: +(props.$size || "1em").charAt(0) * 1 - 1
    })
)`
    font-size: ${props => props.$size};
    padding: ${props => (props.$num / 3 + 1) + "em"} 0;
    background-color: ${props => ["pink", "lightgreen", "aqua"][props.$num]}
`

// Animation: with the 'keyframes' function of styled-components
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

const RotateSlow = styled.div`
    display: inline-block;
    animation: ${rotate} 3s linear infinite;
    padding: 2rem 1rem;
    font-size: 1.5rem;
`

const RotateRapid = styled.div`
    display: inline-block;
    animation: ${rotate} 1s linear infinite;
    padding: 2rem 1rem;
    font-size: 1.2rem;
`


export default function Practices() {

    // Extended style 2: using a style of a comp. for another (or copy?): ExtButton, 2nd appearance
    return (
        <>
            <Wrapper>
                <Title>
                    Styled-components practices...
                </Title>
            
                <FlexSection>

                    <FlexSection>
                        <TextInput />
                        <div>
                            <Button>Click!</Button>
                            <Button $primary >Primary Click!</Button>
                            <ExtButton>Extended Button style</ExtButton>
                            <p>a paragraph in order for the next button to be alone...</p>
                            <Button $primary >Primary Click!</Button>
                            <br /><br />
                            <Button $size={"2em"} style={{background: "pink"}}>Double size with prop - Pink bg with inline styling</Button>
                        </div>
                    </FlexSection>

                    <FlexSection>
                        <TextInput />
                        <div>
                            <Button>Click!</Button>
                            <Button2>Button2 simple</Button2>
                            <Button2 $primary >Button2 Primary</Button2>
                            <br/><br/>
                            <ExtButton $blackFont as="a" href="https://www.idokep.hu/idojaras/Budapest">
                            ExtButton = styled link to the weather report site
                            </ExtButton>
                            <br/><br/>
                            <ReversedButton> Nice to meet you, my dear Lady... </ReversedButton>
                            <ButtonWithSpaces> Nice to meet you, my dear Lady... </ButtonWithSpaces>
                        </div>
                    </FlexSection>

                    <FlexSection>
                        <h2>Awful parrot-style buttons :) demonstrate number parameter usage</h2>
                        <div>
                            {[1,3,8,7,10,2,4,6,9,5,11].map((key, value) =>
                                <MultiColoredButton key={key} $color={value}> button{value} </MultiColoredButton>
                            )}
                        </div>
                    </FlexSection>

                    <FlexSection>
                        <h2>Checkboxes with changes in label when checked...</h2>
                        <div>
                            <CheckBox />
                            <LabelText $mode="dark">Dark</LabelText>
                        </div>
                        <div>
                            <CheckBox />
                            <LabelText $mode="light">Light</LabelText>
                        </div>
                        <h2>The elements with yellow background or thick green border (inner classes of FlexSection div)</h2>
                        <Button className='yellowBackgr'>Yellow</Button>
                        <TextInput className='yellowBackgr greenBorder' />
                    </FlexSection>

                    <DynSizedLabel $size="4em"> Label with parametrized size and color </DynSizedLabel>
                    <DynSizedLabel $size="3em"> Label with parametrized size and color </DynSizedLabel>
                    <DynSizedLabel $size="2em"> Label with parametrized size and color </DynSizedLabel>
                    <DynSizedLabel > Label with parametrized size and color </DynSizedLabel>

                    <RotateSlow>😎 What do you see? 😎</RotateSlow>
                    <RotateRapid className='bigger'>🏈</RotateRapid>

                </FlexSection>
            </Wrapper>
        </>
    )
}
