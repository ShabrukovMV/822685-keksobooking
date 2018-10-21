'use strict';

class ValidationMethods {
  constructor(checkValue) {
    this.checkingValue = checkValue;
  }

  set setCheckingValue(newCheckValue) {
    this.checkingValue = newCheckValue;
  }

  checkTypesElements(type = `string`) {
    return this.checkingValue.every((item) => typeof item === type);
  }

  checkIncludedElements(etalonArray) {
    return this.checkingValue.every((item) => etalonArray.indexOf(item) >= 0);
  }

  checkDuplicateElements() {
    return (new Set(this.checkingValue)).size === this.checkingValue.length;
  }

  checkElement(checkArray) {
    return checkArray.includes(this.checkingValue);
  }

  checkValue(value) {
    if (typeof this.checkingValue === `object` && Array.isArray(this.checkingValue) && typeof value === `object` && Array.isArray(value)) {
      return JSON.stringify([...this.checkingValue].sort()) === JSON.stringify([...value].sort());
    }
    return this.checkingValue === value;
  }

  checkNotValue(value) {
    if (typeof this.checkingValue === `object` && Array.isArray(this.checkingValue) && typeof value === `object` && Array.isArray(value)) {
      return JSON.stringify([...this.checkingValue].sort()) !== JSON.stringify([...value].sort());
    }
    return this !== value;
  }

  checkInterval(min, max) {
    return this.checkingValue >= min && this.checkingValue <= max;
  }

  checkInteger() {
    return Math.floor(this.checkingValue) === this.checkingValue;
  }

  checkGreaterThen(value) {
    return this.checkingValue > value;
  }

  checkRegExp(regexp) {
    return this.checkingValue.search(regexp) > -1;
  }

}

module.exports = ValidationMethods;
