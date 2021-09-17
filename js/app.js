////////////////////////classes///////////////////////////////
class Budget {
  constructor(budget) {
    this.budget = budget;
    this.totalbudget=this.budget;
  }

  subtraction(amount){
    return this.totalbudget-=amount;
  }
}




class HTML {
  showBudget(amount) {
    weekBudget.innerHTML = amount;
    remainBudget.innerHTML = amount;
  }

  printMessage(message,className){
      const div=document.createElement('div');
      div.innerHTML=message;
      div.classList.add('alert','text-center',className);
      const primary=document.querySelector('.primary');
      primary.insertBefore(div,formBudget);

      setTimeout(() => {
          document.querySelector('.alert').remove();
      }, 3000);

      formBudget.reset();
  }


  addExpensesToList(name,price){
      let ul=document.querySelector('#expenses ul');
      let li=document.createElement('li');
      li.innerHTML=`
      ${name}
      <span class="badge badge-primary">${price}</span> `;
      li.className='list-group-item d-flex justify-content-between align-items-center'
      ul.appendChild(li);
      formBudget.reset()
  }


  subtractRemain(amount){
      const remainAmount=budget.subtraction(amount);
      remainBudget.innerHTML=`${remainAmount}`;
 
    if ((budget.budget/4)>remainAmount) {
        remainBudget.parentElement.parentElement.classList.remove('alert-success','alert-warning');
        remainBudget.parentElement.parentElement.classList.add('alert-danger');
    } else if((budget.budget/2)>remainAmount) {
        remainBudget.parentElement.parentElement.classList.remove('allert-success');
        remainBudget.parentElement.parentElement.classList.add('alert-warning');
    }
  }
}

/////////////////////variables/////////////////////////////////
let userBudget;
let budget;
let weekBudget = document.querySelector("span#total");
let remainBudget = document.querySelector("span#left");
let formBudget = document.querySelector("#add-expense");


let html = new HTML();

////////////////////eventlisteners/////////////////////////////
eventlisteners();
function eventlisteners() {
  //onload make budget class and get the budget from client
  document.addEventListener("DOMContentLoaded", function () {
    userBudget = prompt("enter yor week budget");
    if (userBudget === null || userBudget === " " || userBudget === "0") {
      window.location.reload();
    } else {
      //make new object from budget class
       budget = new Budget(userBudget);
      //show the budget in week budget and remain box
      html.showBudget(userBudget);
    }
  });

  formBudget.addEventListener("submit", function (e) {
    e.preventDefault();
    let expenseFeild = document.querySelector("#expense").value;
    let amountFeild = document.querySelector("#amount").value;
    if (expenseFeild==='' || amountFeild==='') {
        html.printMessage('all the feilds must be full','alert-danger');
    } else {
        html.addExpensesToList(expenseFeild,amountFeild);
        html.subtractRemain(amountFeild)
    }
});
}
