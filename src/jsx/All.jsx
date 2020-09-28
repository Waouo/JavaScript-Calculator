import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formula: '',
            preVal: '0',
            answer: '',
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
        })
    }

    handleNumberAndDot(e) {
        let { preVal, formula, answer } = this.state

        if (preVal.length >= 21) {
            const preFormula = preVal.slice()

            this.setState({
                preVal: 'DIGIT LIMIT MET'
            })

            setTimeout(() => {
                this.setState({
                    preVal: preFormula
                })
            }, 1000)
            clearTimeout()

            return;
        }
        else if (preVal === 'DIGIT LIMIT MET') return; // Prevent function excutes a lot of times

        const btnValue = e.target.value
        let preValResult, formulaResult //Value to setState

        // The last clicked key is a operator
        if (/[\+\-\/\*]$/.test(preVal)) {
            preVal = '0'
        }
        // The last clicked key is equal
        else if (answer !== '') {
            preVal = ''
            formula = ''
        }

        switch (e.target.value) {
            case '0':
                if (/^0$/.test(preVal)) {
                    preValResult = '0'
                    formulaResult = formula === ('0' || '') ? btnValue
                        : /[\+\-\/\*]0$/.test(formula) ? formula
                            : formula + '0'
                }
                else {
                    preValResult = preVal + '0'
                    formulaResult = formula + '0'
                }
                break;

            case '.':
                if (/^0$/.test(preVal)) { //preValResult === 0
                    preValResult = '0.'
                    formulaResult = formula === ('') ? '0.'
                        : /[\+\-\/\*]$/.test(formula) === true ? formula + '0.'
                            : formula + '.'

                } else if (/\./.test(preVal)) { //preValResult has '.'
                    preValResult = preVal
                    formulaResult = formula
                } else {
                    preValResult = preVal + '.'
                    formulaResult = formula + '.'
                }
                break;
            
            // Define the action of key 1~9
            default:
                if (/^0$/.test(preVal)) {
                    preValResult = btnValue
                    formulaResult = formula === '0' ? btnValue : formula + btnValue
                } else {
                    preValResult = preVal + btnValue
                    formulaResult = formula + btnValue
                }
                break;
        }

        this.setState({
            preVal: preValResult,
            formula: formulaResult,
            answer: ''
        })

    }

    handleOperator(e) {
        if (this.state.preVal === 'DIGIT LIMIT MET') return;

        const operator = e.target.value
        const { preVal, formula, answer } = this.state
        let preValResult, formulaResult

        // Last clicked key is a equal
        if (answer !== '') {
            preValResult = operator
            formulaResult = answer + operator
        }
        // Last clicked key is a operatorL
        else if (/[\+\-\/\*]/.test(preVal)) { 
            preValResult = operator
            formulaResult = formula.slice(0, -1) + operator
        }
        // Last clicked key isn't a operator
        else {
            preValResult = operator
            formulaResult = formula + operator
        }

        this.setState({
            preVal: preValResult,
            formula: formulaResult,

        })
    }

    handleAnswer() {
        if (preVal === 'DIGIT LIMIT MET') return;

        const { formula, preVal } = this.state
        let answer

        try {
            answer = eval(formula)
        } catch (err) {
            console.log('Formula is not allowed');
            return;
        }

        this.setState({
            preVal: answer,
            formula: formula + ' = ' + answer,
            answer: answer
        })
    }

    onGetState() {
        console.log(this.state);
    }


    render() {

        return (
            <div id='app'>
                <main id='calculator' className="d-flex flex-wrap justify-content-center pt-0">
                    <h1 id='answer' className='text-right m-0'>{this.state.formula}</h1>
                    <h2 id='input' className='text-right m'>{this.state.preVal}</h2>

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
