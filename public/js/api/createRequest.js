/**
 * Основная функция для совершения запросов
 * на сервер.
 */
 const createRequest = (options = {}) => {
  const { url, data, method, callback } = options;
  const xhr = new XMLHttpRequest();

  // Пункт 1: Инициализация объекта XMLHttpRequest
  xhr.open(method, url);

  // Пункт 2: Установка данных в запрос
  if (method !== 'GET') {
    // Если метод запроса не является GET, используем FormData
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    xhr.send(formData);
  } else {
    // Если метод запроса GET, преобразуем параметры в строку и добавляем их к URL
    const params = new URLSearchParams(data).toString();
    xhr.send(`${url}?${params}`);
  }

  // Пункт 3: Установка формата ответа
  xhr.responseType = 'json';

  // Пункт 4: Обработка ответа
  xhr.onload = function () {
    if (xhr.status === 200) {
      if (typeof callback === 'function') {
        // В случае успешного запроса вызываем обратный вызов с полученными данными
        callback(null, xhr.response);
      }
    } else {
      if (typeof callback === 'function') {
        // В случае ошибки вызываем обратный вызов с объектом ошибки
        callback(new Error(`Request failed with status ${xhr.status}`));
      }
    }
  };

  // Обработка ошибок
  xhr.onerror = function () {
    if (typeof callback === 'function') {
      // В случае ошибки вызываем обратный вызов с объектом ошибки
      callback(new Error('Request failed'));
    }
  };
};
