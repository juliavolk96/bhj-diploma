/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountList = this.element.querySelector('.accounts-select');
    Account.list({}, (err, response) => {
      if(response.success) {
        accountList.innerHTML = response.data
        .map(account => `<option value="${account.id}">${account.name}</option>`)
        .join('');
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    TransactionsWidget.create(data, (err, response) => {
      if(response.success) {
        this.element.reset();
        const modal = this.element.closest('.modal');
        if(modal) {
          const modalId = modal.getAttribute('data-modal-id');
          App.getModal(modalId).close();
        }
        App.update();
      }
    })
  }
}