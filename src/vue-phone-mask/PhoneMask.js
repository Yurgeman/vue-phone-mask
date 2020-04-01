export default class PhoneMask {
  constructor(el, mask) {
    this.el = el;
    this.mask = mask;
    this._mask = Array.from(mask);
    this._replaceableChars = [];
    this._mask.forEach((char, index) => {
      if (char === '_') {
        this._replaceableChars.push(index);
      }
    });

    // change mask
    this._changeFunction = {
      insertText: {
        one: this._insertOneSymbol,
        many: this._insertOneSymbolInsteadMany
      },
      insertFromPaste: {
        one: this._insertFromPaste,
        many: this._insertInsteadManySymbolsFromPaste
      },
      deleteContentBackward: {
        one: this._deleteOneSymbolBackward,
        many: this._deleteManySymbols
      },
      deleteContentForward: {
        one: this._deleteOneSymbolForward,
        many: this._deleteManySymbols
      },
      deleteWordBackward: {
        one: this._deleteOneWordBackward,
        many: this._deleteManySymbols
      },
      deleteWordForward: {
        one: this._deleteOneWordForward,
        many: this._deleteManySymbols
      },
      deleteByCut: {
        // solo mode does not exist
        many: this._deleteManySymbols
      }
    };

    this._showPlaceholder = this._showPlaceholder.bind(this);
    this._putCursor = this._putCursor.bind(this);
    this._masking = this._masking.bind(this);
  }

  _showPlaceholder() {
    this.el.placeholder = this.mask;
    // if not used in vue
    // this.el.removeEventListener('focus', this._showPlaceholder);
    // to show once
  }

  _putCursor() {
    for (let replaceableChar of this._replaceableChars) {
      if (this._mask[replaceableChar] === '_') {
        // zero timeout for correct change selection
        setTimeout(() => {
          this.el.selectionStart = replaceableChar;
          this.el.selectionEnd = replaceableChar;
        });
        break;
      }
    }
  }

  _masking(event) {
    /*
    // historyUndo never appears
    if (event.inputType !== 'historyUndo') {
      event.preventDefault();
    } else {
      return;
    }
    */
    event.preventDefault();
    // select non changed range
    if (this.el.value && (this.el.selectionEnd < this._replaceableChars[0] ||
        this.el.selectionStart > this._replaceableChars[
          this._replaceableChars.length - 1] + 1)) {
      // it cannot be changed
      return;
    }

    // instead one or many symbols
    let selectOneSymbol = this.el.selectionStart === this.el.selectionEnd;
    let args = [
      // instead this param, you can simply use this.el.selection* in functions
      selectOneSymbol ? this.el.selectionEnd :
        { start: this.el.selectionStart, end: this.el.selectionEnd }
    ];
    if (event.data) {
      if (this.el.selectionStart === this._mask.length) {
        // nowhere to enter
        return;
      }

      let inputNumber = this._removeNaN(event.data);
      if (inputNumber) {
        args.push(inputNumber);
      } else {
        // "empty" (without number) input, nothing to change
        return;
      }
    }

    // change mask and return new selection
    let selection = selectOneSymbol ?
      this._changeFunction[event.inputType]['one'].apply(this, args) :
      this._changeFunction[event.inputType]['many'].apply(this, args);

    this.el.value = this._mask.join('');
    this.el.selectionStart = selection;
    this.el.selectionEnd = selection;
    this.el.dispatchEvent(new Event('input'));
  }

  _insertOneSymbol(selectionPosition, inputNumber) {
    let position = this._findMaskPosition(selectionPosition);
    // char already exist
    if (this._mask[this._replaceableChars[position]] !== '_') {
      // move the rest
      this._moveMaskToEnd(position);
    }
    this._mask[this._replaceableChars[position]] = inputNumber;
    return this._replaceableChars[position] + 1;
  }

  _insertOneSymbolInsteadMany(selection, inputNumber) {
    let position = this._findMaskPosition(selection.start);
    this._mask[this._replaceableChars[position]] = inputNumber;
    // delete symbols besides first
    return this._deleteManySymbols({
      start: this._replaceableChars[position + 1],
      end: selection.end
    });

  }

  _insertFromPaste(selectionPosition, inputNumber) {
    let position = this._findMaskPosition(selectionPosition);
    let lengthInsert = Math.min(inputNumber.length,
      this._replaceableChars.length - position);
    // char already exist
    if (this._mask[this._replaceableChars[position]] !== '_') {
      // move the rest
      this._moveMaskToEnd(position, lengthInsert);
    }
    // insert
    this._fillMask(inputNumber, position, lengthInsert);
    position += lengthInsert;
    // position === length ?
    return this._replaceableChars[position] ||
      this._replaceableChars[position - 1] + 1;
  }

  _insertInsteadManySymbolsFromPaste(selection, inputNumber) {
    let start = this._findMaskPosition(selection.start);
    let end = this._findMaskPosition(selection.end);
    let differencePlace = (end - start) - inputNumber.length;
    // availablePlace (end - start) > inputNumber ?
    if (differencePlace > 0) {
      this._moveMaskToStart(end - differencePlace, differencePlace);
    } else if (differencePlace < 0) {
      this._moveMaskToEnd(end, -differencePlace);
    }
    return this._fillMask(inputNumber, start);
  }

  _deleteOneSymbolBackward(selectionPosition) {
    selectionPosition--;
    if (selectionPosition < this._replaceableChars[0]) {
      return this._replaceableChars[0];
    }
    if (!this._replaceableChars.includes(selectionPosition)) {
      return this._replaceableChars[
        this._findMaskPosition(selectionPosition) - 1] + 1;
    }

    let position = this._findMaskPosition(selectionPosition);
    this._moveMaskToStart(position);
    // if selection not before immutable character
    if (this._replaceableChars.includes(selectionPosition - 1)) {
      return selectionPosition;
    } else {
      // throw over the immutable, but only if there is where
      return (position > 0) ? (this._replaceableChars[position - 1] + 1) :
        (this._replaceableChars[0]);
    }
  }

  _deleteManySymbols(selection) {
    let start = this._findMaskPosition(selection.start);
    let end = this._findMaskPosition(selection.end);
    this._moveMaskToStart(start, end - start);
    return this._replaceableChars[start];
  }
  
  _deleteOneSymbolForward(selectionPosition) {
    // only replaceable can be removed
    if (this._replaceableChars.includes(selectionPosition)) {
      this._moveMaskToStart(this._findMaskPosition(selectionPosition));
    }
    return selectionPosition;
  }
  
  _deleteOneWordBackward(selectionPosition) {
    selectionPosition--;
    if (selectionPosition < this._replaceableChars[0]) {
      return this._replaceableChars[0];
    }
    if (!this._replaceableChars.includes(selectionPosition)) {
      return this._replaceableChars[
        this._findMaskPosition(selectionPosition) - 1] + 1;
    }

    let position = this._findMaskPosition(selectionPosition);
    let lastDeleted = this._findIrreplaceableCharLeft(position);
    this._moveMaskToStart(lastDeleted, position - lastDeleted + 1);
    return this._replaceableChars[lastDeleted];
  }
  
  _deleteOneWordForward(selectionPosition) {
    // only replaceable can be removed
    if (this._replaceableChars.includes(selectionPosition)) {
      let position = this._findMaskPosition(selectionPosition);
      let lastDeleted = this._findIrreplaceableCharRight(position);
      this._moveMaskToStart(position, lastDeleted - position + 1);
    }
    return selectionPosition;
  }

  _moveMaskToStart(startIndex, on = 1) {
    for (let i = startIndex; i < this._replaceableChars.length; i++) {
      this._mask[this._replaceableChars[i]] =
        this._mask[this._replaceableChars[i + on]] || '_';
    }
  }

  _moveMaskToEnd(startIndex, on = 1) {
    for (let j = this._replaceableChars.length - 1; j >= startIndex; j--) {
      this._mask[this._replaceableChars[j]] =
        this._mask[this._replaceableChars[j - on]];
    }
  }

  _fillMask(filler, start = 0, end =
      this._calculateAvailableFilling(filler, start)) {
    for (let i = 0, mi = start; i < end; i++, mi++) {
      this._mask[this._replaceableChars[mi]] = filler[i];
    }
    return end;
  }

  _findMaskPosition(selection) {
    for (let i = 0; i < this._replaceableChars.length; i++) {
      // find place for input
      if (selection <= this._replaceableChars[i]) {
        return i;
      }
    }
    return this._replaceableChars[this._replaceableChars.length - 1] + 1;
  }

  _calculateAvailableFilling(filler, start = 0) {
    return Math.min(filler.length, this._replaceableChars.length - start);
  }

  _findIrreplaceableCharLeft(position) {
    for (let i = position; i >= 0; i--) {
      // at undefined char (when i = 0) return 0
      if (this._replaceableChars[i] - 1 !== this._replaceableChars[i - 1]) {
        return i;
      }
    }
  }

  _findIrreplaceableCharRight(position) {
    for (let i = position; i < this._replaceableChars.length - 1; i++) {
      if (this._replaceableChars[i] + 1 !== this._replaceableChars[i + 1]) {
        return i;
      }
    }
  }

  _removeNaN(string) {
    return string.replace(/\D+/g, '');
  }

  hangMask() {
    this.el.addEventListener('focus', this._showPlaceholder);
    this.el.addEventListener('focus', this._putCursor);
    this.el.addEventListener('beforeinput', this._masking);
  }

  static takeOffMask(el) {
    el.removeEventListener('focus', this._showPlaceholder);
    el.removeEventListener('focus', this._putCursor);
    el.removeEventListener('beforeinput', this._masking);
  }

  enter(string) {
    let inputNumber = this._removeNaN(string);
    this._fillMask(inputNumber);
    this.el.value = this._mask.join('');
    this.el.dispatchEvent(new Event('input'));
  }
}
