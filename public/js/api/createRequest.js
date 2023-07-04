/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
 const createRequest = (options = {}) => {
  const { url, data, method, callback } = options;
  const xhr = new XMLHttpRequest();

  // Пункт 1: Инициализация объекта XMLHttpRequest
  xhr.open(method, url);

  // Пункт 2: Установка данных в запрос
  if (method === 'GET') {
    const params = new URLSearchParams(data).toString();
    xhr.open(method, `${url}?${params}`);
  } else {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    xhr.send(formData);
  }

  // Пункт 3: Установка формата ответа
  xhr.responseType = 'json';

  // Пункт 4: Обработка ответа
  xhr.onload = function () {
    if (xhr.status === 200) {
      callback(null, xhr.response);
    } else {
      callback(new Error(`Request failed with status ${xhr.status}`));
    }
  };

  // Обработка ошибок
  xhr.onerror = function () {
    callback(new Error('Request failed'));
  };

  // Отправка запроса
  xhr.send();
};