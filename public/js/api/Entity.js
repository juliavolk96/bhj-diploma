/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равное пустой строке.
 */
 class Entity {
  static URL = '';

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   */
  static list(data, callback) {
    const options = {
      url: this.URL,
      data: data,
      method: 'GET',
      callback: callback
    };
    createRequest(options);
  }

  /**
   * Создает счет или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   */
  static create(data, callback) {
    const options = {
      url: this.URL,
      data: data,
      method: 'PUT',
      callback: callback
    };
    createRequest(options);
  }

  /**
   * Удаляет информацию о счете или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   */
  static remove(data, callback) {
    const options = {
      url: this.URL,
      data: data,
      method: 'DELETE',
      callback: callback
    };
    createRequest(options);
  }
}
