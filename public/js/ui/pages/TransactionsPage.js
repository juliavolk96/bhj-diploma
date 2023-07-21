/**
 * Класс TransactionsPage управляет страницей отображения доходов и расходов конкретного счёта.
 */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * @param {HTMLElement} element - HTML-элемент, соответствующий странице.
   * @throws {Error} Если переданный элемент не существует.
   */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не существует");
    }
    this.element = element; // Сохраняем переданный элемент в свойство element
    this.lastOptions = null; // Переменная для хранения последних опций (идентификатора счёта)
    this.registerEvents(); // Регистрируем обработчики событий

    // Отображение страницы с фиктивным account_id (замените на актуальный идентификатор счёта)
    this.render({
      account_id: element.querySelector(".content-title").textContent,
    });
  }

  /**
   * Вызывает метод render для отрисовки страницы
   */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   */
  registerEvents() {
    // Добавляем обработчик клика на элемент страницы (вешаем на всю страницу)
    this.element.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-account")) {
        // При клике на кнопку удаления счёта
        if (confirm("Вы действительно хотите удалить счет?")) {
          this.removeAccount(); // Вызываем метод removeAccount() для удаления счёта
        }
      } else if (event.target.classList.contains("transaction__remove")) {
        // При клике на кнопку удаления транзакции
        const transactionId = event.target.getAttribute("data-id");
        this.removeTransaction(transactionId); // Вызываем метод removeTransaction() для удаления транзакции
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   */
  removeAccount() {
    // if (!this.lastOptions) {
    //   return;
    // }
    Account.remove(this.lastOptions.account_id, (err, response) => {
      console.log(this.lastOptions);
      console.log(err);
      console.log(response);
      if (err) {
        console.error(err);
        return;
      }
      this.clear();
      App.updateWidgets();
      App.updateForms();
    });
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   */
  removeTransaction(id) {
    Transaction.remove(id, {}, (err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      this.update();
    });
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   */
  render(options) {
    // if (!options || !options.account_id) {
    //   return;
    // }

    this.lastOptions = options;

    Account.get(options.account_id, (err, response) => {
      if (err) {
        return;
      }
      const accountName =
        response.data && response.data.name
          ? response.data.name
          : "Название счёта не найдено";
      this.renderTitle(accountName);
    });

    Transaction.list(options.account_id, (err, response) => {
      console.log(response);
      if (err) {
        return;
      }
      this.renderTransactions(response.data);
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   */
  clear() {
    this.renderTransactions([]);
    this.renderTitle("Название счёта");
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   */
  renderTitle(name) {
    const titleElement = this.element.querySelector(".content-title");
    titleElement.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   */
  formatDate(date) {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
    };
    const formattedDate = new Date(date).toLocaleString("ru-RU", options);
    return formattedDate;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   */
  getTransactionHTML(item) {
    const formattedDate = this.formatDate(item.created_at);

    const transactionType =
      item.type === "expense" ? "transaction_expense" : "transaction_income";

    const transactionHTML = `
      <div class="transaction ${transactionType} row">
          <div class="col-md-7 transaction__details">
            <div class="transaction__icon">
                <span class="fa fa-money fa-2x"></span>
            </div>
            <div class="transaction__info">
                <h4 class="transaction__title">${item.name}</h4>
                <div class="transaction__date">${formattedDate}</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="transaction__summ">
                ${item.sum} <span class="currency">₽</span>
            </div>
          </div>
          <div class="col-md-2 transaction__controls">
              <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                  <i class="fa fa-trash"></i>  
              </button>
          </div>
      </div>
    `;

    return transactionHTML;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   */
  renderTransactions(data) {
    const contentElement = this.element.querySelector(".content");
    let transactionsHTML = "";

    data.forEach((item) => {
      const transactionHTML = this.getTransactionHTML(item);
      transactionsHTML += transactionHTML;
    });

    contentElement.innerHTML = transactionsHTML;

    const removeButtons = this.element.querySelectorAll(".transaction__remove");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const transactionId = button.dataset.id;
        this.removeTransaction(transactionId);
      });
    });
  }
}
