import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {



        return (
            <div id='app'>
                <main id='calculator' className="d-flex flex-wrap justify-content-center">
                    <div id="display">12qweqwe3</div>
                    <button id='clear' className='jumbo' style={{ backgroundColor: 'rgb(172,57,57)' }}>AC</button>
                    <button id='divide'>/</button>
                    <button id='multiply'>x</button>
                    <button id='seven'>7</button>
                    <button id='eight'>8</button>
                    <button id='nine'>9</button>
                    <button id='suntract'>-</button>
                    <button id='four'>4</button>
                    <button id='five'>5</button>
                    <button id='six'>6</button>
                    <button id='add'>+</button>
                    <div className="d-flex flex-wrap justify-content-center" style={{ width: '240px' }}>
                        <button id='one'>1</button>
                        <button id='two'>2</button>
                        <button id='three'>3</button>
                        <button id='zero' style={{ width: '160px' }}> 0</button>
                        <button id='decimal'>.</button>
                    </div>
                    <button id='equal' style={{ backgroundColor: "rgb(0,68,102)", height: '130px' }}>=</button>
                </main>
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('react-root'))
