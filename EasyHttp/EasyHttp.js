class EasyHttp {

  httpGetOnUrl(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(result => result.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
      
  }

  httpPostOnUrl(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(result => result.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
}