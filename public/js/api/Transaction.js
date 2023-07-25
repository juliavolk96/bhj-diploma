/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.(???)
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
  static URL = "/transaction";

  static list(data, callback) {
    const url = data ? `${this.URL}?account_id=${data}` : this.URL;
    const options = {
      url: url,
      data: data,
      method: "GET",
      callback: callback,
    };
    createRequest(options);
  }
}
