/**
 * Created by pain.xie on 2018/3/16.
 * 深度合并
 */

export class DeepAssign {

  static isObj(x) {
    let type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
  }

  static toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    return Object(val);
  }

  static assignKey(to, from, key) {
    let val = from[key];
    if (val === undefined || val === null) {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(to, key)) {
      if (to[key] === undefined || to[key] === null) {
        throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
      }
    }
    if (!Object.prototype.hasOwnProperty.call(to, key) || !this.isObj(val)) {
      to[key] = val;
    } else {
      to[key] = this.assign(Object(to[key]), from[key]);
    }
  }

  static assign(to, from) {
    if (to === from) {
      return to;
    }
    from = Object(from);
    for (let key in from) {
      if (Object.prototype.hasOwnProperty.call(from, key)) {
        this.assignKey(to, from, key);
      }
    }
    if (Object.getOwnPropertySymbols) {
      let symbols = Object.getOwnPropertySymbols(from);

      for (let i = 0; i < symbols.length; i++) {
        if (Object.prototype.propertyIsEnumerable.call(from, symbols[i])) {
          this.assignKey(to, from, symbols[i]);
        }
      }
    }
    return to;
  }

  static deepAssign(target) {
    target = this.toObject(target);
    for (let s = 1; s < arguments.length; s++) {
      this.assign(target, arguments[s]);
    }
    return target;
  }

}