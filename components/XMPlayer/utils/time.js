  //format: 'hh:mm:ss'、'hh:mm'
  function parse(str, format) {
    var format = format.replace(/[^hms]/ig, ' ');
    var str = str.replace(/[^\d]/ig, ' ');
    var formats = format.split(' ');
    var strs = str.split(' ');
    var hour = 0;
    var min = 0;
    var sec = 0;
    for (var i = 0, len = formats.length; i < len; i++) {
      var _format = formats[i];
      if (_format === 'h' || _format === 'hh') {
        hour = strs[i];
      }
      if (_format === 'm' || _format === 'mm') {
        min = strs[i];
      }
      if (_format === 's' || _format === 'ss') {
        sec = strs[i];
      }
    }
    return hour * 60 * 60 + min * 60 + sec * 1;
  }
  //format: 'hh:mm:ss'、'hh:mm'、'h:mm:ss'、'h:mm'
  function stringify(time, full, noHour) {
    var obj = this.toObject(time);
    var format = full;
    if (!obj.hour && noHour) {
      format = noHour;
    }
    format = format.replace(/h{1,2}/ig, function (key) {
      if (key.length === 1) {
        return obj.hour;
      } else {
        if (obj.hour < 10) {
          return "0" + obj.hour;
        } else {
          return obj.hour;
        }
      }
    });
    format = format.replace(/m{1,2}/ig, function (key) {
      if (key.length === 1) {
        return obj.min;
      } else {
        if (obj.min < 10) {
          return "0" + obj.min;
        } else {
          return obj.min;
        }
      }
    });
    format = format.replace(/s{1,2}/ig, function (key) {
      if (key.length === 1) {
        return obj.sec;
      } else {
        if (obj.sec < 10) {
          return "0" + obj.sec;
        } else {
          return obj.sec;
        }
      }
    });
    return format;
  }

  function toObject(time) {
    var nMin = Math.floor(time / 60) || 0;
    var hour = Math.floor(nMin / 60) || 0;
    var min = nMin - (hour * 60) || 0;
    var sec = parseInt(time - (nMin * 60)) || 0;
    return {
      hour: hour,
      min: min,
      sec: sec
    };
  }

  //传入北京时间，获取当前时区对应的时间
  function toLocal(str) {
    var beijingTime = this.parse(str, 'hh:mm:ss');   //北京时间
    var beijingTZ = -480; //北京时差
    var date = new Date();
    var localTZ = date.getTimezoneOffset(); //当地时差
    var offset = (beijingTZ - localTZ) * 60; //两地相差的毫秒数
    return beijingTime + offset; //当地时间
  }

let Time = {
  parse,
  stringify,
  toObject,
  toLocal
}

export default Time