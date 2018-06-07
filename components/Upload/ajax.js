function getError(action, option, xhr) {
  let msg
  if (xhr.response) {
    msg = `${xhr.status} ${xhr.response.error || xhr.response}`
  } else if (xhr.responseText) {
    msg = `${xhr.status} ${xhr.responseText}`
  } else {
    msg = `fail to post ${action} ${xhr.status}`
  }

  const err = new Error(msg)
  err.status = xhr.status
  err.method = 'post'
  err.url = action

  return err
}

function getBody(xhr) {
  let text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export default function upload(option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return null
  }

  const xhr = new XMLHttpRequest()
  const action = option.action

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100
      }
      option.onProgress(e)
    }
  }

  const formdata = new FormData()

  if (option.data) {
    Object.keys(option.data, key => {
      formdata.append(key, option.data[key])
    })
  }
  formdata.append(option.filename, option.file)

  xhr.onerror = function error(e) {
    option.onError(e)
  }

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status > 300) {
      return option.onError(getError(action, option, xhr))
    }

    option.onSuccess(getBody(xhr))
  }

  xhr.open('post', action, true)
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  const headers = option.headers || {}

  for (let key in headers) {
    if (headers.hasOwnProperty(key) && headers[key] !== null) {
      xhr.setRequestHeader(key, headers[key])
    }
  }

  xhr.send(formdata)
  return xhr
}