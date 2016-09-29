  function request(url, data, method) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const data1 = JSON.stringify(data);
    xhr.send(data1);
    if (xhr.status !== 200) return 'fail';

    return xhr.responseText;
  }
