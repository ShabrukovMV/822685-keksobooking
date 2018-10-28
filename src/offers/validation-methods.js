'use strict';

class ValidationMethods {
  constructor(checkValue) {
    this._checkingValue = checkValue;
  }

  set setCheckingValue(newCheckValue) {
    this._checkingValue = newCheckValue;
  }

  checkTypesElements(type = `string`) {
    return this._checkingValue.every((item) => typeof item === type);
  }

  checkIncludedElements(etalonArray) {
    return this._checkingValue.every((item) => etalonArray.indexOf(item) >= 0);
  }

  checkDuplicateElements() {
    return (new Set(this._checkingValue)).size === this._checkingValue.length;
  }

  checkElement(checkArray) {
    return checkArray.includes(this._checkingValue);
  }

  checkValue(value) {
    if (typeof this._checkingValue === `object` && Array.isArray(this._checkingValue) && typeof value === `object` && Array.isArray(value)) {
      return JSON.stringify([...this._checkingValue].sort()) === JSON.stringify([...value].sort());
    }
    return this._checkingValue === value;
  }

  checkNotValue(value) {
    if (typeof this._checkingValue === `object` && Array.isArray(this._checkingValue) && typeof value === `object` && Array.isArray(value)) {
      return JSON.stringify([...this._checkingValue].sort()) !== JSON.stringify([...value].sort());
    }
    return this !== value;
  }

  checkLengthString(min, max) {
    return this._checkingValue.length >= min && this._checkingValue.length <= max;
  }

  checkInterval(min, max) {
    return this._checkingValue >= min && this._checkingValue <= max;
  }

  checkInteger() {
    return Math.floor(this._checkingValue) === this._checkingValue;
  }

  checkGreaterThen(value) {
    return this._checkingValue > value;
  }

  checkRegExp(regexp) {
    return this._checkingValue.search(regexp) > -1;
  }

}

module.exports = ValidationMethods;
