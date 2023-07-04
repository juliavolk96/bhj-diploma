/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * TransactionsWidget.registerEvents()
   * */
  constructor(element) {
    this.element = element;
    this.registerEvents();
  }

  /**
   * При нажатии на кнопку "Доход" отображает всплывающее окно "Новый доход" (#modal-new-income)
   * При нажатии на кнопку "Расход" отображает всплывающее окно "Новый расход" (#modal-new-expense)
   * */
  registerEvents() {
    const createIncomeBtn = this.element.querySelector('.create-income-button');
    createIncomeBtn.addEventListener('click', () => {
      App.getModal('newIncome').open();
    });

    const createExpenseBtn = this.element.querySelector('.create-expense-button');
    createExpenseBtn.addEventListener('click', () => {
      App.getModal('newExpense').open();
    });
  }
}
