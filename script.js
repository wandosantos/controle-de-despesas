
const transactionUL = document.getElementById('transactions')
const totalDisplay = document.getElementById('balance')
const incomeDisplay = document.getElementById('money-plus')
const expenceDisplay = document.getElementById('money-minus')
const form = document.getElementById('form')
const inputTransactionName = document.getElementById('text')
const inputTransactionAmount = document.getElementById('amount')



const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null? localStorageTransaction : []

const removeTransaction = ID =>{
    transactions  = transactions 
        .filter(transaction => transaction.id !== ID )
        updateLocalStorage()
    init()
}

const addTransactionsInDOM = transaction =>{
    
    const operator = transaction.amount < 0 ? '-' : '+';
    const cssclass = transaction.amount < 0 ? 'minus' : 'plus'
    const li = document.createElement('li');
    const withoutTransactionOperato = Math.abs(transaction.amount);
    li.classList.add(cssclass);
    li.innerHTML = `
    ${transaction.name}<span>${operator} R$ ${withoutTransactionOperato}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
        x
    </button>        
    `
    transactionUL.append(li)

}


const updateBalanceValue = ()=>{
    const transactionAmount = transactions 
        .map(transaction => transaction.amount)
    const total = transactionAmount
        .reduce((acc,transaction) => acc+transaction,0)
    const income = transactionAmount
        .filter(value => value > 0)
        .reduce((acc,transaction) => acc + transaction,0)
    const expence = transactionAmount.filter(value => value < 0).reduce((acc,transaction) => acc + transaction,0)

    totalDisplay.innerHTML = `R$ ${total}`
    incomeDisplay.innerHTML = `R$ ${income}`
    expenceDisplay.innerHTML = `R$ ${expence}`

    
}

const init = ()=>{
    transactionUL.innerHTML = ''
    transactions .forEach(addTransactionsInDOM)
    updateBalanceValue()
}
init()

const updateLocalStorage = ()=>{
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generatorID = ()=> Math.round(Math.random() * 1000)


form.addEventListener('submit' , event =>{
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim() 
    const transactionAmount = inputTransactionAmount.value.trim()

    if(transactionName === '' || transactionAmount === ''){
        alert('Por vafor preencha o nome e  o valor')
        return
    }

    const transaction = {
        id : generatorID(),
        name:transactionName,
        amount: Number(transactionAmount)
    }
    transactions .push(transaction)
    init()
    updateLocalStorage()

    inputTransactionAmount.value = ''
    inputTransactionName.value = ''
})

/*

Salario <span>- R$ 400</span><button class="delete-btn">x</button>
*/

