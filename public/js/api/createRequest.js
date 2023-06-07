/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();//экз. XMLHttpRequest

  xhr.responseType = 'json';//тип ответа
  
  //будет вызываться при изменении состояния запроса
  xhr.addEventListener("readystatechange", () => {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      if(xhr.status >= 200 && xhr.status < 400) {
        options.callback(null, xhr.response);
      } else {
        options.callback(new Error(xhr.statusText), null);
      }
    }
  });

  let url = options.url;
  let data = null;

  if(options.method === "GET" && options.data) {
    const params = new URLSearchParams(options.data);
    url += "?" + params.toString();
  } else if(options.method !== "GET" && options.data) {
    data = new FormData();
    for(let key in options.data) {
      data.append(key, options.data[key]);
    }
  }

  xhr.open(options.method, url);
  xhr.send(data);//отправление запроса
};
