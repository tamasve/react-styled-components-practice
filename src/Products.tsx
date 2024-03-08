import styled, { css } from "styled-components";
import { Title } from "./Practices";
import { useState } from "react";

const Frame = styled.div`
    height: 70vh;
    width: 60vw;
    background-color: bisque;
    border-radius: 2em;
`

const Section = styled.div<{$grid?: boolean}>`
    height: auto;
    width: auto;
    background-color: transparent;
    margin: 1em 0;

    ${props => props.$grid && css`
        display: grid;
        grid-template-columns: 1fr 3fr;
        margin-left: 5em;
    `}
`

const TextInput = styled.input.attrs({type: "text"})`
    width: 20em;
    font-size: 1.5em;
    color: #885f08;
    line-height: 1.5em;
    padding: 0.3em 1em;
    background-color: #f8d485;
    border: 1px solid orange;
    border-radius: 0.5em;
`

const TextLabel = styled.label`
    width: auto;
    font-size: 1.5em;
    color: blue;
    line-height: 1.5em;
    padding: 0.3em 1em;
    margin-right: 1em;
    background-color: #98f885;
    border: 1px solid green;
    border-radius: 0.5em;
`

const Button = styled.button`
    width: auto;
    font-size: 1.5em;
    color: #98f885;
    line-height: 1.5em;
    padding: 0.3em 1em;
    margin-right: 1em;
    background-color: blue;
    border: 1px solid green;
    border-radius: 0.5em;

    &:hover {
        background-color: #08083b;
    }

    &:active {
        color: #e27676;
    }
`

interface ProductStruct {
    name: string,
    category: string,
    unit: string
}

export default function Products() {

    const [prod, setProd] = useState<ProductStruct>({
        name: "",
        category: "",
        unit: ""
    });

    const valueSetter = (key: string, value: string) => {
        let newProd: ProductStruct = {...prod, [key]: value};   // change the prop to the new value
        setProd(newProd);
        console.log(key, value);    // check
    }

    const saveValue = () => {
        console.log(prod);
    }

    return (
        <>
            <Frame>
                <Title>Products</Title>

                <Section $grid>
                    <TextLabel>Product name:</TextLabel>
                    <TextInput value={prod.name} onChange={(e) => valueSetter("name", e.target.value)} />
                </Section>
                <Section $grid>
                    <TextLabel>Category:</TextLabel>
                    <TextInput value={prod.category} onChange={(e) => valueSetter("category", e.target.value)} />
                </Section>
                <Section $grid>
                    <TextLabel>Unit:</TextLabel>
                    <TextInput value={prod.unit} onChange={(e) => valueSetter("unit", e.target.value)} />
                </Section>
                <Section>
                    <Button onClick={saveValue}>Save product data</Button>
                </Section>
            </Frame>
        </>
    )
}