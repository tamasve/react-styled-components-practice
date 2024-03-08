import './App.css'
import styled from 'styled-components';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Practices, { ExtButton, Title } from './Practices'
import Questionnaire from './Questionnaire';


// small font color correction...
const ExtLink = styled(Link)`
    color: yellow;
`

function App() {

    return (
        <>

            <Router>
                <ExtButton $size='1.5em'><Link to="/">Home</Link></ExtButton>
                <ExtButton $size='1.5em'><ExtLink to="/practices">Practices</ExtLink></ExtButton>
                <ExtButton $size='1.5em'><ExtLink to="/questionnaire">Questionnaire</ExtLink></ExtButton>
                <Title>~~ Styled Components ~~</Title>
                
                <Routes>
                    <Route path="/" element={<h1>Void</h1>} />
                    <Route path="/practices" element={<Practices />} />
                    <Route path="/questionnaire" element={<Questionnaire />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
