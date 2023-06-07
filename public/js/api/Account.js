/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    const options = {
      URL: `${Account.URL}/${id}`,
      method: 'GET',
      callback: callback
    };
    createRequest(options);
  }
}
