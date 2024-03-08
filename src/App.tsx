import './App.css'
import styled from 'styled-components';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Practices, { ExtButton, Title } from './Practices'
import Products from './Products';


// small font color correction...
const ExtLink = styled(Link)`
    color: yellow;
`

// image settings included (these 2 are like inline styling)
const Image = styled.img`
    height: 70vh;
    width: auto;
    border-radius: 1em;
`

function App() {

    return (
        <>

            <Router>
                <ExtButton $size='1.5em'><Link to="/">Home</Link></ExtButton>
                <ExtButton $size='1.5em'><ExtLink to="/practices">Practices</ExtLink></ExtButton>
                <ExtButton $size='1.5em'><ExtLink to="/products">Products</ExtLink></ExtButton>
                <Title>~~ Styled Components ~~</Title>
                
                <Routes>
                    <Route path="/" element={<Image src="/autumn forest.jpg" alt="no image" />} />
                    <Route path="/practices" element={<Practices />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
