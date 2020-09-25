import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formula: '',
            preVal: '0',
            answer: '',
            currentSign: 'pos',
            lastClicked: '',
        }
        this.onClear = this.onClear.bind(this)
        this.handleNumberAndDot = this.handleNumberAndDot.bind(this)
        this.handleOperator = this.handleOperator.bind(this)
        this.handleAnswer = this.handleAnswer.bind(this)
        this.onGetState = this.onGetState.bind(this)     /** TEST */

    }
    onClear() {
        this.setState({
            formula: '',
            preVal: '0',
            answer: '',
            currentSign: 'pos',
            lastClicked: '',
        })
    }

    handleNumberAndDot(e) {
        const btnValue = e.target.value
        let preVal, formula //Value to setState

        switch (e.target.value) {
            case '0':
                if (/^0$/.test(this.state.preVal)) {
                    preVal = btnValue
                    formula = btnValue
                } else {
                    preVal = this.state.preVal + btnValue
                    formula = this.state.formula + btnValue
                }
                break;

            case '.':
                if (/^0$/.test(this.state.preVal)) { //preval === 0
                    preVal = '0.'
                    formula = '0.'
                } else if (/\./.test(this.state.preVal)){ //preval has '.'
                    preVal = this.state.preVal 
                    formula = this.state.formula
                } else {
                    preVal = this.state.preVal + btnValue
                    formula = this.state.formula + btnValue
                }
                break;


            default:
                if (/^0$/.test(this.state.preVal)) {
                    preVal = btnValue
                    formula = btnValue
                } else {
                    preVal = this.state.preVal + btnValue
                    formula = this.state.formula + btnValue
                }
                break;
        }

        this.setState({
            preVal: preVal,
            formula: formula,
        })

    }

    handleOperator(e) {
        const operator = e.target.value
        
        switch (operator) {
            
        }
        

    }

    handleAnswer() {
        
    }

    onGetState() {
        console.log(this.state);
    }


    render() {



        return (
            <div id='app'>
                <main id='calculator' className="d-flex flex-wrap justify-content-center pt-0">
                    <div id="display">
                        <h1 id='ansert' className='text-right m-0'>{this.state.formula}</h1>
                        <h2 id='input' className='text-right m-0'>{this.state.preVal}</h2>
                    </div>
                    <button id='clear' className='jumbo' onClick={this.onClear} style={{ backgroundColor: 'rgb(172,57,57)' }}>AC</button>
                    <button id='divide' value='/' onClick={this.handleOperator}>/</button>
                    <button id='multiply' value='*' onClick={this.handleOperator}>x</button>
                    <button id='seven' value='7' onClick={this.handleNumberAndDot}>7</button>
                    <button id='eight' value='8' onClick={this.handleNumberAndDot} >8</button>
                    <button id='nine' value='9' onClick={this.handleNumberAndDot} >9</button>
                    <button id='suntract' value='-' onClick={this.handleOperator}>-</button>
                    <button id='four' value='4' onClick={this.handleNumberAndDot} >4</button>
                    <button id='five' value='5' onClick={this.handleNumberAndDot} >5</button>
                    <button id='six' value='6' onClick={this.handleNumberAndDot} >6</button>
                    <button id='add' value='+' onClick={this.handleOperator}>+</button>
                    <div className="d-flex flex-wrap justify-content-center" style={{ width: '240px' }}>
                        <button id='one' value='1' onClick={this.handleNumberAndDot} >1</button>
                        <button id='two' value='2' onClick={this.handleNumberAndDot} >2</button>
                        <button id='three' value='3' onClick={this.handleNumberAndDot} >3</button>
                        <button id='zero' value='0' onClick={this.handleNumberAndDot} style={{ width: '160px' }}> 0</button>
                        <button id='decimal' value='.' onClick={this.handleNumberAndDot}>.</button>
                    </div>
                    <button id='equal' onClick={this.handleAnswer} style={{ backgroundColor: "rgb(0,68,102)", height: '130px' }}>=</button>
                </main>
                <button onClick={this.onGetState}>GetState</button>
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('react-root'))
