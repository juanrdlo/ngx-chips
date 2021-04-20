import { __awaiter } from "tslib";
// angular
import { Component, forwardRef, HostBinding, Input, Output, EventEmitter, Renderer2, ViewChild, ViewChildren, ContentChildren, ContentChild, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, filter, map, first } from 'rxjs/operators';
// ng2-tag-input
import { TagInputAccessor } from '../../core/accessor';
import { listen } from '../../core/helpers/listen';
import * as constants from '../../core/constants';
import { DragProvider } from '../../core/providers/drag-provider';
import { TagInputForm } from '../tag-input-form/tag-input-form.component';
import { TagComponent } from '../tag/tag.component';
import { animations } from './animations';
import { defaults } from '../../defaults';
import { TagInputDropdown } from '../dropdown/tag-input-dropdown.component';
// angular universal hacks
/* tslint:disable-next-line */
const DragEvent = typeof window !== 'undefined' && window.DragEvent;
const CUSTOM_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
};
export class TagInputComponent extends TagInputAccessor {
    constructor(renderer, dragProvider) {
        super();
        this.renderer = renderer;
        this.dragProvider = dragProvider;
        /**
         * @name separatorKeys
         * @desc keyboard keys with which a user can separate items
         */
        this.separatorKeys = defaults.tagInput.separatorKeys;
        /**
         * @name separatorKeyCodes
         * @desc keyboard key codes with which a user can separate items
         */
        this.separatorKeyCodes = defaults.tagInput.separatorKeyCodes;
        /**
         * @name placeholder
         * @desc the placeholder of the input text
         */
        this.placeholder = defaults.tagInput.placeholder;
        /**
         * @name secondaryPlaceholder
         * @desc placeholder to appear when the input is empty
         */
        this.secondaryPlaceholder = defaults.tagInput.secondaryPlaceholder;
        /**
         * @name maxItems
         * @desc maximum number of items that can be added
         */
        this.maxItems = defaults.tagInput.maxItems;
        /**
         * @name validators
         * @desc array of Validators that are used to validate the tag before it gets appended to the list
         */
        this.validators = defaults.tagInput.validators;
        /**
         * @name asyncValidators
         * @desc array of AsyncValidator that are used to validate the tag before it gets appended to the list
         */
        this.asyncValidators = defaults.tagInput.asyncValidators;
        /**
        * - if set to true, it will only possible to add items from the autocomplete
        * @name onlyFromAutocomplete
        */
        this.onlyFromAutocomplete = defaults.tagInput.onlyFromAutocomplete;
        /**
         * @name errorMessages
         */
        this.errorMessages = defaults.tagInput.errorMessages;
        /**
         * @name theme
         */
        this.theme = defaults.tagInput.theme;
        /**
         * @name onTextChangeDebounce
         */
        this.onTextChangeDebounce = defaults.tagInput.onTextChangeDebounce;
        /**
         * - custom id assigned to the input
         * @name id
         */
        this.inputId = defaults.tagInput.inputId;
        /**
         * - custom class assigned to the input
         */
        this.inputClass = defaults.tagInput.inputClass;
        /**
         * - option to clear text input when the form is blurred
         * @name clearOnBlur
         */
        this.clearOnBlur = defaults.tagInput.clearOnBlur;
        /**
         * - hideForm
         * @name clearOnBlur
         */
        this.hideForm = defaults.tagInput.hideForm;
        /**
         * @name addOnBlur
         */
        this.addOnBlur = defaults.tagInput.addOnBlur;
        /**
         * @name addOnPaste
         */
        this.addOnPaste = defaults.tagInput.addOnPaste;
        /**
         * - pattern used with the native method split() to separate patterns in the string pasted
         * @name pasteSplitPattern
         */
        this.pasteSplitPattern = defaults.tagInput.pasteSplitPattern;
        /**
         * @name blinkIfDupe
         */
        this.blinkIfDupe = defaults.tagInput.blinkIfDupe;
        /**
         * @name removable
         */
        this.removable = defaults.tagInput.removable;
        /**
         * @name editable
         */
        this.editable = defaults.tagInput.editable;
        /**
         * @name allowDupes
         */
        this.allowDupes = defaults.tagInput.allowDupes;
        /**
         * @description if set to true, the newly added tags will be added as strings, and not objects
         * @name modelAsStrings
         */
        this.modelAsStrings = defaults.tagInput.modelAsStrings;
        /**
         * @name trimTags
         */
        this.trimTags = defaults.tagInput.trimTags;
        /**
         * @name ripple
         */
        this.ripple = defaults.tagInput.ripple;
        /**
         * @name tabindex
         * @desc pass through the specified tabindex to the input
         */
        this.tabindex = defaults.tagInput.tabIndex;
        /**
         * @name disable
         */
        this.disable = defaults.tagInput.disable;
        /**
         * @name dragZone
         */
        this.dragZone = defaults.tagInput.dragZone;
        /**
         * @name onRemoving
         */
        this.onRemoving = defaults.tagInput.onRemoving;
        /**
         * @name onAdding
         */
        this.onAdding = defaults.tagInput.onAdding;
        /**
         * @name animationDuration
         */
        this.animationDuration = defaults.tagInput.animationDuration;
        /**
         * @name onAdd
         * @desc event emitted when adding a new item
         */
        this.onAdd = new EventEmitter();
        /**
         * @name onRemove
         * @desc event emitted when removing an existing item
         */
        this.onRemove = new EventEmitter();
        /**
         * @name onSelect
         * @desc event emitted when selecting an item
         */
        this.onSelect = new EventEmitter();
        /**
         * @name onFocus
         * @desc event emitted when the input is focused
         */
        this.onFocus = new EventEmitter();
        /**
         * @name onFocus
         * @desc event emitted when the input is blurred
         */
        this.onBlur = new EventEmitter();
        /**
         * @name onTextChange
         * @desc event emitted when the input value changes
         */
        this.onTextChange = new EventEmitter();
        /**
         * - output triggered when text is pasted in the form
         * @name onPaste
         */
        this.onPaste = new EventEmitter();
        /**
         * - output triggered when tag entered is not valid
         * @name onValidationError
         */
        this.onValidationError = new EventEmitter();
        /**
         * - output triggered when tag is edited
         * @name onTagEdited
         */
        this.onTagEdited = new EventEmitter();
        /**
         * @name isLoading
         */
        this.isLoading = false;
        /**
         * @name listeners
         * @desc array of events that get fired using @fireEvents
         */
        this.listeners = {
            [constants.KEYDOWN]: [],
            [constants.KEYUP]: []
        };
        /**
         * @description emitter for the 2-way data binding inputText value
         * @name inputTextChange
         */
        this.inputTextChange = new EventEmitter();
        /**
         * @description private variable to bind get/set
         * @name inputTextValue
         */
        this.inputTextValue = '';
        this.errors = [];
        /**
         * @name appendTag
         * @param tag {TagModel}
         */
        this.appendTag = (tag, index = this.items.length) => {
            const items = this.items;
            const model = this.modelAsStrings ? tag[this.identifyBy] : tag;
            this.items = [
                ...items.slice(0, index),
                model,
                ...items.slice(index, items.length)
            ];
        };
        /**
         * @name createTag
         * @param model
         */
        this.createTag = (model) => {
            const trim = (val, key) => {
                return typeof val === 'string' ? val.trim() : val[key];
            };
            return Object.assign(Object.assign({}, typeof model !== 'string' ? model : {}), { [this.displayBy]: this.trimTags ? trim(model, this.displayBy) : model, [this.identifyBy]: this.trimTags ? trim(model, this.identifyBy) : model });
        };
        /**
         *
         * @param tag
         * @param isFromAutocomplete
         */
        this.isTagValid = (tag, fromAutocomplete = false) => {
            const selectedItem = this.dropdown ? this.dropdown.selectedItem : undefined;
            const value = this.getItemDisplay(tag).trim();
            if (selectedItem && !fromAutocomplete || !value) {
                return false;
            }
            const dupe = this.findDupe(tag, fromAutocomplete);
            // if so, give a visual cue and return false
            if (!this.allowDupes && dupe && this.blinkIfDupe) {
                const model = this.tags.find(item => {
                    return this.getItemValue(item.model) === this.getItemValue(dupe);
                });
                if (model) {
                    model.blink();
                }
            }
            const isFromAutocomplete = fromAutocomplete && this.onlyFromAutocomplete;
            const assertions = [
                // 1. there must be no dupe OR dupes are allowed
                !dupe || this.allowDupes,
                // 2. check max items has not been reached
                !this.maxItemsReached,
                // 3. check item comes from autocomplete or onlyFromAutocomplete is false
                ((isFromAutocomplete) || !this.onlyFromAutocomplete)
            ];
            return assertions.filter(Boolean).length === assertions.length;
        };
        /**
         * @name onPasteCallback
         * @param data
         */
        this.onPasteCallback = (data) => __awaiter(this, void 0, void 0, function* () {
            const getText = () => {
                const isIE = Boolean(window.clipboardData);
                const clipboardData = isIE ? (window.clipboardData) : data.clipboardData;
                const type = isIE ? 'Text' : 'text/plain';
                return clipboardData === null ? '' : clipboardData.getData(type) || '';
            };
            const text = getText();
            const requests = text
                .split(this.pasteSplitPattern)
                .map(item => {
                const tag = this.createTag(item);
                this.setInputValue(tag[this.displayBy]);
                return this.onAddingRequested(false, tag);
            });
            const resetInput = () => setTimeout(() => this.setInputValue(''), 50);
            Promise.all(requests).then(() => {
                this.onPaste.emit(text);
                resetInput();
            })
                .catch(resetInput);
        });
    }
    /**
     * @name inputText
     */
    get inputText() {
        return this.inputTextValue;
    }
    /**
     * @name inputText
     * @param text
     */
    set inputText(text) {
        this.inputTextValue = text;
        this.inputTextChange.emit(text);
    }
    /**
     * @desc removes the tab index if it is set - it will be passed through to the input
     * @name tabindexAttr
     */
    get tabindexAttr() {
        return this.tabindex !== '' ? '-1' : '';
    }
    /**
     * @name ngAfterViewInit
     */
    ngAfterViewInit() {
        // set up listeners
        this.setUpKeypressListeners();
        this.setupSeparatorKeysListener();
        this.setUpInputKeydownListeners();
        if (this.onTextChange.observers.length) {
            this.setUpTextChangeSubscriber();
        }
        // if clear on blur is set to true, subscribe to the event and clear the text's form
        if (this.clearOnBlur || this.addOnBlur) {
            this.setUpOnBlurSubscriber();
        }
        // if addOnPaste is set to true, register the handler and add items
        if (this.addOnPaste) {
            this.setUpOnPasteListener();
        }
        const statusChanges$ = this.inputForm.form.statusChanges;
        statusChanges$.pipe(filter((status) => status !== 'PENDING')).subscribe(() => {
            this.errors = this.inputForm.getErrorMessages(this.errorMessages);
        });
        this.isProgressBarVisible$ = statusChanges$.pipe(map((status) => {
            return status === 'PENDING' || this.isLoading;
        }));
        // if hideForm is set to true, remove the input
        if (this.hideForm) {
            this.inputForm.destroy();
        }
    }
    /**
     * @name ngOnInit
     */
    ngOnInit() {
        // if the number of items specified in the model is > of the value of maxItems
        // degrade gracefully and let the max number of items to be the number of items in the model
        // though, warn the user.
        const hasReachedMaxItems = this.maxItems !== undefined &&
            this.items &&
            this.items.length > this.maxItems;
        if (hasReachedMaxItems) {
            this.maxItems = this.items.length;
            console.warn(constants.MAX_ITEMS_WARNING);
        }
        // Setting editable to false to fix problem with tags in IE still being editable when
        // onlyFromAutocomplete is true
        this.editable = this.onlyFromAutocomplete ? false : this.editable;
        this.setAnimationMetadata();
    }
    /**
     * @name onRemoveRequested
     * @param tag
     * @param index
     */
    onRemoveRequested(tag, index) {
        return new Promise(resolve => {
            const subscribeFn = (model) => {
                this.removeItem(model, index);
                resolve(tag);
            };
            this.onRemoving ?
                this.onRemoving(tag)
                    .pipe(first())
                    .subscribe(subscribeFn) : subscribeFn(tag);
        });
    }
    /**
     * @name onAddingRequested
     * @param fromAutocomplete {boolean}
     * @param tag {TagModel}
     * @param index? {number}
     * @param giveupFocus? {boolean}
     */
    onAddingRequested(fromAutocomplete, tag, index, giveupFocus) {
        return new Promise((resolve, reject) => {
            const subscribeFn = (model) => {
                return this
                    .addItem(fromAutocomplete, model, index, giveupFocus)
                    .then(resolve)
                    .catch(reject);
            };
            return this.onAdding ?
                this.onAdding(tag)
                    .pipe(first())
                    .subscribe(subscribeFn, reject) : subscribeFn(tag);
        });
    }
    /**
     * @name selectItem
     * @desc selects item passed as parameter as the selected tag
     * @param item
     * @param emit
     */
    selectItem(item, emit = true) {
        const isReadonly = item && typeof item !== 'string' && item.readonly;
        if (isReadonly || this.selectedTag === item) {
            return;
        }
        this.selectedTag = item;
        if (emit) {
            this.onSelect.emit(item);
        }
    }
    /**
     * @name fireEvents
     * @desc goes through the list of the events for a given eventName, and fires each of them
     * @param eventName
     * @param $event
     */
    fireEvents(eventName, $event) {
        this.listeners[eventName].forEach(listener => listener.call(this, $event));
    }
    /**
     * @name handleKeydown
     * @desc handles action when the user hits a keyboard key
     * @param data
     */
    handleKeydown(data) {
        const event = data.event;
        const key = event.keyCode || event.which;
        const shiftKey = event.shiftKey || false;
        switch (constants.KEY_PRESS_ACTIONS[key]) {
            case constants.ACTIONS_KEYS.DELETE:
                if (this.selectedTag && this.removable) {
                    const index = this.items.indexOf(this.selectedTag);
                    this.onRemoveRequested(this.selectedTag, index);
                }
                break;
            case constants.ACTIONS_KEYS.SWITCH_PREV:
                this.moveToTag(data.model, constants.PREV);
                break;
            case constants.ACTIONS_KEYS.SWITCH_NEXT:
                this.moveToTag(data.model, constants.NEXT);
                break;
            case constants.ACTIONS_KEYS.TAB:
                if (shiftKey) {
                    if (this.isFirstTag(data.model)) {
                        return;
                    }
                    this.moveToTag(data.model, constants.PREV);
                }
                else {
                    if (this.isLastTag(data.model) && (this.disable || this.maxItemsReached)) {
                        return;
                    }
                    this.moveToTag(data.model, constants.NEXT);
                }
                break;
            default:
                return;
        }
        // prevent default behaviour
        event.preventDefault();
    }
    onFormSubmit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.onAddingRequested(false, this.formValue);
            }
            catch (_a) {
                return;
            }
        });
    }
    /**
     * @name setInputValue
     * @param value
     */
    setInputValue(value, emitEvent = true) {
        const control = this.getControl();
        // update form value with the transformed item
        control.setValue(value, { emitEvent });
    }
    /**
     * @name getControl
     */
    getControl() {
        return this.inputForm.value;
    }
    /**
     * @name focus
     * @param applyFocus
     * @param displayAutocomplete
     */
    focus(applyFocus = false, displayAutocomplete = false) {
        if (this.dragProvider.getState('dragging')) {
            return;
        }
        this.selectItem(undefined, false);
        if (applyFocus) {
            this.inputForm.focus();
            this.onFocus.emit(this.formValue);
        }
    }
    /**
     * @name blur
     */
    blur() {
        this.onTouched();
        this.onBlur.emit(this.formValue);
    }
    /**
     * @name hasErrors
     */
    hasErrors() {
        return !!this.inputForm && this.inputForm.hasErrors();
    }
    /**
     * @name isInputFocused
     */
    isInputFocused() {
        return !!this.inputForm && this.inputForm.isInputFocused();
    }
    /**
     * - this is the one way I found to tell if the template has been passed and it is not
     * the template for the menu item
     * @name hasCustomTemplate
     */
    hasCustomTemplate() {
        const template = this.templates ? this.templates.first : undefined;
        const menuTemplate = this.dropdown && this.dropdown.templates ?
            this.dropdown.templates.first : undefined;
        return Boolean(template && template !== menuTemplate);
    }
    /**
     * @name maxItemsReached
     */
    get maxItemsReached() {
        return this.maxItems !== undefined &&
            this.items.length >= this.maxItems;
    }
    /**
     * @name formValue
     */
    get formValue() {
        const form = this.inputForm.value;
        return form ? form.value : '';
    }
    /**3
     * @name onDragStarted
     * @param event
     * @param index
     */
    onDragStarted(event, tag, index) {
        event.stopPropagation();
        const item = { zone: this.dragZone, tag, index };
        this.dragProvider.setSender(this);
        this.dragProvider.setDraggedItem(event, item);
        this.dragProvider.setState({ dragging: true, index });
    }
    /**
     * @name onDragOver
     * @param event
     */
    onDragOver(event, index) {
        this.dragProvider.setState({ dropping: true });
        this.dragProvider.setReceiver(this);
        event.preventDefault();
    }
    /**
     * @name onTagDropped
     * @param event
     * @param index
     */
    onTagDropped(event, index) {
        const item = this.dragProvider.getDraggedItem(event);
        if (!item || item.zone !== this.dragZone) {
            return;
        }
        this.dragProvider.onTagDropped(item.tag, item.index, index);
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * @name isDropping
     */
    isDropping() {
        const isReceiver = this.dragProvider.receiver === this;
        const isDropping = this.dragProvider.getState('dropping');
        return Boolean(isReceiver && isDropping);
    }
    /**
     * @name onTagBlurred
     * @param changedElement {TagModel}
     * @param index {number}
     */
    onTagBlurred(changedElement, index) {
        this.items[index] = changedElement;
        this.blur();
    }
    /**
     * @name trackBy
     * @param items
     */
    trackBy(index, item) {
        return item[this.identifyBy];
    }
    /**
     * @name updateEditedTag
     * @param tag
     */
    updateEditedTag({ tag, index }) {
        this.onTagEdited.emit(tag);
    }
    /**
     * @name moveToTag
     * @param item
     * @param direction
     */
    moveToTag(item, direction) {
        const isLast = this.isLastTag(item);
        const isFirst = this.isFirstTag(item);
        const stopSwitch = (direction === constants.NEXT && isLast) ||
            (direction === constants.PREV && isFirst);
        if (stopSwitch) {
            this.focus(true);
            return;
        }
        const offset = direction === constants.NEXT ? 1 : -1;
        const index = this.getTagIndex(item) + offset;
        const tag = this.getTagAtIndex(index);
        return tag.select.call(tag);
    }
    /**
     * @name isFirstTag
     * @param item {TagModel}
     */
    isFirstTag(item) {
        return this.tags.first.model === item;
    }
    /**
     * @name isLastTag
     * @param item {TagModel}
     */
    isLastTag(item) {
        return this.tags.last.model === item;
    }
    /**
     * @name getTagIndex
     * @param item
     */
    getTagIndex(item) {
        const tags = this.tags.toArray();
        return tags.findIndex(tag => tag.model === item);
    }
    /**
     * @name getTagAtIndex
     * @param index
     */
    getTagAtIndex(index) {
        const tags = this.tags.toArray();
        return tags[index];
    }
    /**
     * @name removeItem
     * @desc removes an item from the array of the model
     * @param tag {TagModel}
     * @param index {number}
     */
    removeItem(tag, index) {
        this.items = this.getItemsWithout(index);
        // if the removed tag was selected, set it as undefined
        if (this.selectedTag === tag) {
            this.selectItem(undefined, false);
        }
        // focus input
        this.focus(true, false);
        // emit remove event
        this.onRemove.emit(tag);
    }
    /**
     * @name addItem
     * @desc adds the current text model to the items array
     * @param fromAutocomplete {boolean}
     * @param item {TagModel}
     * @param index? {number}
     * @param giveupFocus? {boolean}
     */
    addItem(fromAutocomplete = false, item, index, giveupFocus) {
        const display = this.getItemDisplay(item);
        const tag = this.createTag(item);
        if (fromAutocomplete) {
            this.setInputValue(this.getItemValue(item, true));
        }
        return new Promise((resolve, reject) => {
            /**
             * @name reset
             */
            const reset = () => {
                // reset control and focus input
                this.setInputValue('');
                if (giveupFocus) {
                    this.focus(false, false);
                }
                else {
                    // focus input
                    this.focus(true, false);
                }
                resolve(display);
            };
            const appendItem = () => {
                this.appendTag(tag, index);
                // emit event
                this.onAdd.emit(tag);
                if (!this.dropdown) {
                    return;
                }
                this.dropdown.hide();
                if (this.dropdown.showDropdownIfEmpty) {
                    this.dropdown.show();
                }
            };
            const status = this.inputForm.form.status;
            const isTagValid = this.isTagValid(tag, fromAutocomplete);
            const onValidationError = () => {
                this.onValidationError.emit(tag);
                return reject();
            };
            if (status === 'VALID' && isTagValid) {
                appendItem();
                return reset();
            }
            if (status === 'INVALID' || !isTagValid) {
                reset();
                return onValidationError();
            }
            if (status === 'PENDING') {
                const statusUpdate$ = this.inputForm.form.statusChanges;
                return statusUpdate$
                    .pipe(filter(statusUpdate => statusUpdate !== 'PENDING'), first())
                    .subscribe((statusUpdate) => {
                    if (statusUpdate === 'VALID' && isTagValid) {
                        appendItem();
                        return reset();
                    }
                    else {
                        reset();
                        return onValidationError();
                    }
                });
            }
        });
    }
    /**
     * @name setupSeparatorKeysListener
     */
    setupSeparatorKeysListener() {
        const useSeparatorKeys = this.separatorKeyCodes.length > 0 || this.separatorKeys.length > 0;
        const listener = ($event) => {
            const hasKeyCode = this.separatorKeyCodes.indexOf($event.keyCode) >= 0;
            const hasKey = this.separatorKeys.indexOf($event.key) >= 0;
            // the keyCode of keydown event is 229 when IME is processing the key event.
            const isIMEProcessing = $event.keyCode === 229;
            if (hasKeyCode || (hasKey && !isIMEProcessing)) {
                $event.preventDefault();
                this.onAddingRequested(false, this.formValue)
                    .catch(() => { });
            }
        };
        listen.call(this, constants.KEYDOWN, listener, useSeparatorKeys);
    }
    /**
     * @name setUpKeypressListeners
     */
    setUpKeypressListeners() {
        const listener = ($event) => {
            const isCorrectKey = $event.keyCode === 37 || $event.keyCode === 8;
            if (isCorrectKey &&
                !this.formValue &&
                this.items.length) {
                this.tags.last.select.call(this.tags.last);
            }
        };
        // setting up the keypress listeners
        listen.call(this, constants.KEYDOWN, listener);
    }
    /**
     * @name setUpKeydownListeners
     */
    setUpInputKeydownListeners() {
        this.inputForm.onKeydown.subscribe(event => {
            if (event.key === 'Backspace' && this.formValue.trim() === '') {
                event.preventDefault();
            }
        });
    }
    /**
     * @name setUpOnPasteListener
     */
    setUpOnPasteListener() {
        const input = this.inputForm.input.nativeElement;
        // attach listener to input
        this.renderer.listen(input, 'paste', (event) => {
            this.onPasteCallback(event);
            event.preventDefault();
            return true;
        });
    }
    /**
     * @name setUpTextChangeSubscriber
     */
    setUpTextChangeSubscriber() {
        this.inputForm.form
            .valueChanges
            .pipe(debounceTime(this.onTextChangeDebounce))
            .subscribe((value) => {
            this.onTextChange.emit(value.item);
        });
    }
    /**
     * @name setUpOnBlurSubscriber
     */
    setUpOnBlurSubscriber() {
        const filterFn = () => {
            const isVisible = this.dropdown && this.dropdown.isVisible;
            return !isVisible && !!this.formValue;
        };
        this.inputForm
            .onBlur
            .pipe(debounceTime(100), filter(filterFn))
            .subscribe(() => {
            const reset = () => this.setInputValue('');
            if (this.addOnBlur) {
                return this
                    .onAddingRequested(false, this.formValue, undefined, true)
                    .then(reset)
                    .catch(reset);
            }
            reset();
        });
    }
    /**
     * @name findDupe
     * @param tag
     * @param isFromAutocomplete
     */
    findDupe(tag, isFromAutocomplete) {
        const identifyBy = isFromAutocomplete ? this.dropdown.identifyBy : this.identifyBy;
        const id = tag[identifyBy];
        return this.items.find(item => this.getItemValue(item) === id);
    }
    /**
     * @name setAnimationMetadata
     */
    setAnimationMetadata() {
        this.animationMetadata = {
            value: 'in',
            params: Object.assign({}, this.animationDuration)
        };
    }
}
TagInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'tag-input',
                providers: [CUSTOM_ACCESSOR],
                template: "<div\r\n    [ngClass]=\"theme\"\r\n    class=\"ng2-tag-input\"\r\n    (click)=\"focus(true, false)\"\r\n    [attr.tabindex]=\"-1\"\r\n    (drop)=\"dragZone ? onTagDropped($event, undefined) : undefined\"\r\n    (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragover)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragend)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n    [class.ng2-tag-input--dropping]=\"isDropping()\"\r\n    [class.ng2-tag-input--disabled]=\"disable\"\r\n    [class.ng2-tag-input--loading]=\"isLoading\"\r\n    [class.ng2-tag-input--invalid]=\"hasErrors()\"\r\n    [class.ng2-tag-input--focused]=\"isInputFocused()\"\r\n>\r\n\r\n    <!-- TAGS -->\r\n    <div class=\"ng2-tags-container\">\r\n        <tag\r\n            *ngFor=\"let item of items; let i = index; trackBy: trackBy\"\r\n            (onSelect)=\"selectItem(item)\"\r\n            (onRemove)=\"onRemoveRequested(item, i)\"\r\n            (onKeyDown)=\"handleKeydown($event)\"\r\n            (onTagEdited)=\"updateEditedTag($event)\"\r\n            (onBlur)=\"onTagBlurred($event, i)\"\r\n            draggable=\"{{ editable }}\"\r\n            (dragstart)=\"dragZone ? onDragStarted($event, item, i) : undefined\"\r\n            (drop)=\"dragZone ? onTagDropped($event, i) : undefined\"\r\n            (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n            (dragover)=\"dragZone ? onDragOver($event, i) : undefined\"\r\n            (dragleave)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n            [canAddTag]=\"isTagValid\"\r\n            [attr.tabindex]=\"0\"\r\n            [disabled]=\"disable\"\r\n            [@animation]=\"animationMetadata\"\r\n            [hasRipple]=\"ripple\"\r\n            [index]=\"i\"\r\n            [removable]=\"removable\"\r\n            [editable]=\"editable\"\r\n            [displayBy]=\"displayBy\"\r\n            [identifyBy]=\"identifyBy\"\r\n            [template]=\"!!hasCustomTemplate() ? templates.first : undefined\"\r\n            [draggable]=\"dragZone\"\r\n            [model]=\"item\"\r\n        >\r\n        </tag>\r\n\r\n        <tag-input-form\r\n            (onSubmit)=\"onFormSubmit()\"\r\n            (onBlur)=\"blur()\"\r\n            (click)=\"dropdown ? dropdown.show() : undefined\"\r\n            (onKeydown)=\"fireEvents('keydown', $event)\"\r\n            (onKeyup)=\"fireEvents('keyup', $event)\"\r\n            [inputText]=\"inputText\"\r\n            [disabled]=\"disable\"\r\n            [validators]=\"validators\"\r\n            [asyncValidators]=\"asyncValidators\"\r\n            [hidden]=\"maxItemsReached\"\r\n            [maxLength]=\"maxlength\"\r\n            [placeholder]=\"items.length ? placeholder : secondaryPlaceholder\"\r\n            [inputClass]=\"inputClass\"\r\n            [inputId]=\"inputId\"\r\n            [tabindex]=\"tabindex\"\r\n        >\r\n        </tag-input-form>\r\n    </div>\r\n\r\n    <div\r\n        class=\"progress-bar\"\r\n        *ngIf=\"isProgressBarVisible$ | async\"\r\n    ></div>\r\n</div>\r\n\r\n<!-- ERRORS -->\r\n<div\r\n    *ngIf=\"hasErrors()\"\r\n    [ngClass]=\"theme\"\r\n    class=\"error-messages\"\r\n>\r\n    <p\r\n        *ngFor=\"let error of errors\"\r\n        class=\"error-message\"\r\n    >\r\n        <span>{{ error }}</span>\r\n    </p>\r\n</div>\r\n<ng-content></ng-content>\r\n",
                animations,
                styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;color:#555;display:inline-block;height:42px;line-height:44px;max-width:100%;vertical-align:middle}.ng2-tag-input.bootstrap3-info input{background-color:transparent;border:none;box-shadow:none;margin:0;max-width:inherit;outline:none;padding:0 6px;width:auto}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{border:1px solid #ccc;box-shadow:inset 0 1px 1px rgba(0,0,0,.4)}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f}.ng2-tag-input{border-bottom:2px solid #efefef;cursor:text;display:block;flex-direction:row;flex-wrap:wrap;min-height:32px;padding:.25rem 0;position:relative;transition:all .25s}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196f3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{cursor:not-allowed;opacity:.5}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{display:flex;flex-wrap:wrap}.minimal.ng2-tag-input{border-bottom:1px solid transparent;cursor:text;display:block;flex-direction:row;flex-wrap:wrap;position:relative}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{cursor:not-allowed;opacity:.5}.minimal.ng2-tag-input .ng2-tags-container{display:flex;flex-wrap:wrap}.dark.ng2-tag-input{border-bottom:2px solid #444;cursor:text;display:block;flex-direction:row;flex-wrap:wrap;position:relative}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{cursor:not-allowed;opacity:.5}.dark.ng2-tag-input .ng2-tags-container{display:flex;flex-wrap:wrap}.bootstrap.ng2-tag-input{border-bottom:2px solid #efefef;cursor:text;display:block;flex-direction:row;flex-wrap:wrap;position:relative}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{cursor:not-allowed;opacity:.5}.bootstrap.ng2-tag-input .ng2-tags-container{display:flex;flex-wrap:wrap}.bootstrap3-info.ng2-tag-input{border-radius:4px;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);cursor:text;display:block;flex-direction:row;flex-wrap:wrap;padding:4px;position:relative}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{cursor:not-allowed;opacity:.5}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{display:flex;flex-wrap:wrap}.error-message{color:#f44336;font-size:.8em;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.progress-bar,.progress-bar:before{height:2px;margin:0;width:100%}.progress-bar{background-color:#2196f3;bottom:0;display:flex;position:absolute}.progress-bar:before{-webkit-animation:running-progress 2s cubic-bezier(.4,0,.2,1) infinite;animation:running-progress 2s cubic-bezier(.4,0,.2,1) infinite;background-color:#82c4f8;content:\"\"}@-webkit-keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}to{margin-left:100%;margin-right:0}}@keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}to{margin-left:100%;margin-right:0}}tag{-moz-user-select:none;-webkit-user-select:none;background:#efefef;border-radius:16px;color:#444;cursor:pointer;display:flex;flex-direction:row;flex-wrap:wrap;font-family:Roboto,Helvetica Neue,sans-serif;font-size:1em;font-weight:400;height:32px;letter-spacing:.05rem;line-height:34px;margin:.1rem .3rem .1rem 0;outline:0;overflow:hidden;padding:.08rem .45rem;position:relative;transition:all .3s;user-select:none}tag:not(.readonly):not(.tag--editing):focus{background:#2196f3;box-shadow:0 2px 3px 1px #d4d1d1;color:#fff}tag:not(.readonly):not(.tag--editing):active{background:#0d8aee;box-shadow:0 2px 3px 1px #d4d1d1;color:#fff}tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#e2e2e2;box-shadow:0 2px 3px 1px #d4d1d1;color:initial}tag.readonly{cursor:default}tag.readonly:focus,tag:focus{outline:0}tag.tag--editing{background-color:#fff;border:1px solid #ccc;cursor:text}.minimal tag{-moz-user-select:none;-webkit-user-select:none;background:#f9f9f9;border-radius:0;cursor:pointer;display:flex;flex-direction:row;flex-wrap:wrap;outline:0;overflow:hidden;position:relative;user-select:none}.minimal tag:not(.readonly):not(.tag--editing):active,.minimal tag:not(.readonly):not(.tag--editing):focus{background:#d0d0d0;color:initial}.minimal tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#ececec}.minimal tag.readonly{cursor:default}.minimal tag.readonly:focus,.minimal tag:focus{outline:0}.minimal tag.tag--editing{cursor:text}.dark tag{-moz-user-select:none;-webkit-user-select:none;background:#444;border-radius:3px;color:#f9f9f9;cursor:pointer;display:flex;flex-direction:row;flex-wrap:wrap;outline:0;overflow:hidden;position:relative;user-select:none}.dark tag:not(.readonly):not(.tag--editing):focus{background:#efefef;color:#444}.dark tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#2b2b2b;color:#f9f9f9}.dark tag.readonly{cursor:default}.dark tag.readonly:focus,.dark tag:focus{outline:0}.dark tag.tag--editing{cursor:text}.bootstrap tag{-moz-user-select:none;-webkit-user-select:none;background:#0275d8;border-radius:.25rem;color:#f9f9f9;cursor:pointer;display:flex;flex-direction:row;flex-wrap:wrap;outline:0;overflow:hidden;position:relative;user-select:none}.bootstrap tag:not(.readonly):not(.tag--editing):active,.bootstrap tag:not(.readonly):not(.tag--editing):focus{background:#025aa5}.bootstrap tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#0267bf;color:#f9f9f9}.bootstrap tag.readonly{cursor:default}.bootstrap tag.readonly:focus,.bootstrap tag:focus{outline:0}.bootstrap tag.tag--editing{cursor:text}.bootstrap3-info tag{-moz-user-select:none;-webkit-user-select:none;background:#5bc0de;border-radius:.25em;color:#fff;cursor:pointer;display:flex;flex-direction:row;flex-wrap:wrap;font-family:inherit;font-size:95%;font-weight:400;outline:0;overflow:hidden;padding:.25em .6em;position:relative;text-align:center;user-select:none;white-space:nowrap}.bootstrap3-info tag:not(.readonly):not(.tag--editing):active,.bootstrap3-info tag:not(.readonly):not(.tag--editing):focus{background:#28a1c5}.bootstrap3-info tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#46b8da;color:#fff}.bootstrap3-info tag.readonly{cursor:default}.bootstrap3-info tag.readonly:focus,.bootstrap3-info tag:focus{outline:0}.bootstrap3-info tag.tag--editing{cursor:text}:host{display:block}"]
            },] }
];
TagInputComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: DragProvider }
];
TagInputComponent.propDecorators = {
    separatorKeys: [{ type: Input }],
    separatorKeyCodes: [{ type: Input }],
    placeholder: [{ type: Input }],
    secondaryPlaceholder: [{ type: Input }],
    maxItems: [{ type: Input }],
    maxlength: [{ type: Input }],
    validators: [{ type: Input }],
    asyncValidators: [{ type: Input }],
    onlyFromAutocomplete: [{ type: Input }],
    errorMessages: [{ type: Input }],
    theme: [{ type: Input }],
    onTextChangeDebounce: [{ type: Input }],
    inputId: [{ type: Input }],
    inputClass: [{ type: Input }],
    clearOnBlur: [{ type: Input }],
    hideForm: [{ type: Input }],
    addOnBlur: [{ type: Input }],
    addOnPaste: [{ type: Input }],
    pasteSplitPattern: [{ type: Input }],
    blinkIfDupe: [{ type: Input }],
    removable: [{ type: Input }],
    editable: [{ type: Input }],
    allowDupes: [{ type: Input }],
    modelAsStrings: [{ type: Input }],
    trimTags: [{ type: Input }],
    inputText: [{ type: Input }],
    ripple: [{ type: Input }],
    tabindex: [{ type: Input }],
    disable: [{ type: Input }],
    dragZone: [{ type: Input }],
    onRemoving: [{ type: Input }],
    onAdding: [{ type: Input }],
    animationDuration: [{ type: Input }],
    onAdd: [{ type: Output }],
    onRemove: [{ type: Output }],
    onSelect: [{ type: Output }],
    onFocus: [{ type: Output }],
    onBlur: [{ type: Output }],
    onTextChange: [{ type: Output }],
    onPaste: [{ type: Output }],
    onValidationError: [{ type: Output }],
    onTagEdited: [{ type: Output }],
    dropdown: [{ type: ContentChild, args: [TagInputDropdown,] }],
    templates: [{ type: ContentChildren, args: [TemplateRef, { descendants: false },] }],
    inputForm: [{ type: ViewChild, args: [TagInputForm,] }],
    tags: [{ type: ViewChildren, args: [TagComponent,] }],
    inputTextChange: [{ type: Output }],
    tabindexAttr: [{ type: HostBinding, args: ['attr.tabindex',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL0p1YW4gUiBEZSBMZW9uL0RvY3VtZW50cy9Qcm95ZWN0b3Mvbmd4LWNoaXBzL21vZHVsZXMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhZy1pbnB1dC90YWctaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7QUFDVixPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFlBQVksRUFFWixXQUFXLEVBR2QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUdILGlCQUFpQixFQUVwQixNQUFNLGdCQUFnQixDQUFDO0FBSXhCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxnQkFBZ0I7QUFDaEIsT0FBTyxFQUFFLGdCQUFnQixFQUFZLE1BQU0scUJBQXFCLENBQUM7QUFDakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ25ELE9BQU8sS0FBSyxTQUFTLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFFLFlBQVksRUFBYyxNQUFNLG9DQUFvQyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFFNUUsMEJBQTBCO0FBQzFCLDhCQUE4QjtBQUM5QixNQUFNLFNB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ZXpCLE1BQU07MkJBWU4sV0FBVyxTQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhbmd1bGFyXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBmb3J3YXJkUmVmLFxyXG4gICAgSG9zdEJpbmRpbmcsXHJcbiAgICBJbnB1dCxcclxuICAgIE91dHB1dCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIFJlbmRlcmVyMixcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIFZpZXdDaGlsZHJlbixcclxuICAgIENvbnRlbnRDaGlsZHJlbixcclxuICAgIENvbnRlbnRDaGlsZCxcclxuICAgIE9uSW5pdCxcclxuICAgIFRlbXBsYXRlUmVmLFxyXG4gICAgUXVlcnlMaXN0LFxyXG4gICAgQWZ0ZXJWaWV3SW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIEFzeW5jVmFsaWRhdG9yRm4sXHJcbiAgICBGb3JtQ29udHJvbCxcclxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgVmFsaWRhdG9yRm5cclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG4vLyByeFxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyLCBtYXAsIGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuLy8gbmcyLXRhZy1pbnB1dFxyXG5pbXBvcnQgeyBUYWdJbnB1dEFjY2Vzc29yLCBUYWdNb2RlbCB9IGZyb20gJy4uLy4uL2NvcmUvYWNjZXNzb3InO1xyXG5pbXBvcnQgeyBsaXN0ZW4gfSBmcm9tICcuLi8uLi9jb3JlL2hlbHBlcnMvbGlzdGVuJztcclxuaW1wb3J0ICogYXMgY29uc3RhbnRzIGZyb20gJy4uLy4uL2NvcmUvY29uc3RhbnRzJztcclxuXHJcbmltcG9ydCB7IERyYWdQcm92aWRlciwgRHJhZ2dlZFRhZyB9IGZyb20gJy4uLy4uL2NvcmUvcHJvdmlkZXJzL2RyYWctcHJvdmlkZXInO1xyXG5cclxuaW1wb3J0IHsgVGFnSW5wdXRGb3JtIH0gZnJvbSAnLi4vdGFnLWlucHV0LWZvcm0vdGFnLWlucHV0LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGFnQ29tcG9uZW50IH0gZnJvbSAnLi4vdGFnL3RhZy5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgYW5pbWF0aW9ucyB9IGZyb20gJy4vYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IGRlZmF1bHRzIH0gZnJvbSAnLi4vLi4vZGVmYXVsdHMnO1xyXG5pbXBvcnQgeyBUYWdJbnB1dERyb3Bkb3duIH0gZnJvbSAnLi4vZHJvcGRvd24vdGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudCc7XHJcblxyXG4vLyBhbmd1bGFyIHVuaXZlcnNhbCBoYWNrc1xyXG4vKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cclxuY29uc3QgRHJhZ0V2ZW50ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgKHdpbmRvdyBhcyBhbnkpLkRyYWdFdmVudDtcclxuXHJcbmNvbnN0IENVU1RPTV9BQ0NFU1NPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGFnSW5wdXRDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RhZy1pbnB1dCcsXHJcbiAgICBwcm92aWRlcnM6IFtDVVNUT01fQUNDRVNTT1JdLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFnLWlucHV0LnN0eWxlLnNjc3MnXSxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWctaW5wdXQudGVtcGxhdGUuaHRtbCcsXHJcbiAgICBhbmltYXRpb25zXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dENvbXBvbmVudCBleHRlbmRzIFRhZ0lucHV0QWNjZXNzb3IgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXBhcmF0b3JLZXlzXHJcbiAgICAgKiBAZGVzYyBrZXlib2FyZCBrZXlzIHdpdGggd2hpY2ggYSB1c2VyIGNhbiBzZXBhcmF0ZSBpdGVtc1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2VwYXJhdG9yS2V5czogc3RyaW5nW10gPSBkZWZhdWx0cy50YWdJbnB1dC5zZXBhcmF0b3JLZXlzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2VwYXJhdG9yS2V5Q29kZXNcclxuICAgICAqIEBkZXNjIGtleWJvYXJkIGtleSBjb2RlcyB3aXRoIHdoaWNoIGEgdXNlciBjYW4gc2VwYXJhdGUgaXRlbXNcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHNlcGFyYXRvcktleUNvZGVzOiBudW1iZXJbXSA9IGRlZmF1bHRzLnRhZ0lucHV0LnNlcGFyYXRvcktleUNvZGVzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcGxhY2Vob2xkZXJcclxuICAgICAqIEBkZXNjIHRoZSBwbGFjZWhvbGRlciBvZiB0aGUgaW5wdXQgdGV4dFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0LnBsYWNlaG9sZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2Vjb25kYXJ5UGxhY2Vob2xkZXJcclxuICAgICAqIEBkZXNjIHBsYWNlaG9sZGVyIHRvIGFwcGVhciB3aGVuIHRoZSBpbnB1dCBpcyBlbXB0eVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2Vjb25kYXJ5UGxhY2Vob2xkZXI6IHN0cmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0LnNlY29uZGFyeVBsYWNlaG9sZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgbWF4SXRlbXNcclxuICAgICAqIEBkZXNjIG1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIHRoYXQgY2FuIGJlIGFkZGVkXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBtYXhJdGVtczogbnVtYmVyID0gZGVmYXVsdHMudGFnSW5wdXQubWF4SXRlbXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBtYXhJdGVtc1xyXG4gICAgICogQGRlc2MgbWF4aW11bSBudW1iZXIgb2YgaXRlbXMgdGhhdCBjYW4gYmUgYWRkZWRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIG1heGxlbmd0aDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgdmFsaWRhdG9yc1xyXG4gICAgICogQGRlc2MgYXJyYXkgb2YgVmFsaWRhdG9ycyB0aGF0IGFyZSB1c2VkIHRvIHZhbGlkYXRlIHRoZSB0YWcgYmVmb3JlIGl0IGdldHMgYXBwZW5kZWQgdG8gdGhlIGxpc3RcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10gPSBkZWZhdWx0cy50YWdJbnB1dC52YWxpZGF0b3JzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgYXN5bmNWYWxpZGF0b3JzXHJcbiAgICAgKiBAZGVzYyBhcnJheSBvZiBBc3luY1ZhbGlkYXRvciB0aGF0IGFyZSB1c2VkIHRvIHZhbGlkYXRlIHRoZSB0YWcgYmVmb3JlIGl0IGdldHMgYXBwZW5kZWQgdG8gdGhlIGxpc3RcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGFzeW5jVmFsaWRhdG9yczogQXN5bmNWYWxpZGF0b3JGbltdID0gZGVmYXVsdHMudGFnSW5wdXQuYXN5bmNWYWxpZGF0b3JzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiAtIGlmIHNldCB0byB0cnVlLCBpdCB3aWxsIG9ubHkgcG9zc2libGUgdG8gYWRkIGl0ZW1zIGZyb20gdGhlIGF1dG9jb21wbGV0ZVxyXG4gICAgKiBAbmFtZSBvbmx5RnJvbUF1dG9jb21wbGV0ZVxyXG4gICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvbmx5RnJvbUF1dG9jb21wbGV0ZSA9IGRlZmF1bHRzLnRhZ0lucHV0Lm9ubHlGcm9tQXV0b2NvbXBsZXRlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZXJyb3JNZXNzYWdlc1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZXJyb3JNZXNzYWdlczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IGRlZmF1bHRzLnRhZ0lucHV0LmVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0aGVtZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgdGhlbWU6IHN0cmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0LnRoZW1lO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25UZXh0Q2hhbmdlRGVib3VuY2VcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIG9uVGV4dENoYW5nZURlYm91bmNlID0gZGVmYXVsdHMudGFnSW5wdXQub25UZXh0Q2hhbmdlRGVib3VuY2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAtIGN1c3RvbSBpZCBhc3NpZ25lZCB0byB0aGUgaW5wdXRcclxuICAgICAqIEBuYW1lIGlkXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBpbnB1dElkID0gZGVmYXVsdHMudGFnSW5wdXQuaW5wdXRJZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gY3VzdG9tIGNsYXNzIGFzc2lnbmVkIHRvIHRoZSBpbnB1dFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgaW5wdXRDbGFzczogc3RyaW5nID0gZGVmYXVsdHMudGFnSW5wdXQuaW5wdXRDbGFzcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gb3B0aW9uIHRvIGNsZWFyIHRleHQgaW5wdXQgd2hlbiB0aGUgZm9ybSBpcyBibHVycmVkXHJcbiAgICAgKiBAbmFtZSBjbGVhck9uQmx1clxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgY2xlYXJPbkJsdXI6IGJvb2xlYW4gPSBkZWZhdWx0cy50YWdJbnB1dC5jbGVhck9uQmx1cjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gaGlkZUZvcm1cclxuICAgICAqIEBuYW1lIGNsZWFyT25CbHVyXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBoaWRlRm9ybTogYm9vbGVhbiA9IGRlZmF1bHRzLnRhZ0lucHV0LmhpZGVGb3JtO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgYWRkT25CbHVyXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBhZGRPbkJsdXI6IGJvb2xlYW4gPSBkZWZhdWx0cy50YWdJbnB1dC5hZGRPbkJsdXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhZGRPblBhc3RlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBhZGRPblBhc3RlOiBib29sZWFuID0gZGVmYXVsdHMudGFnSW5wdXQuYWRkT25QYXN0ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gcGF0dGVybiB1c2VkIHdpdGggdGhlIG5hdGl2ZSBtZXRob2Qgc3BsaXQoKSB0byBzZXBhcmF0ZSBwYXR0ZXJucyBpbiB0aGUgc3RyaW5nIHBhc3RlZFxyXG4gICAgICogQG5hbWUgcGFzdGVTcGxpdFBhdHRlcm5cclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHBhc3RlU3BsaXRQYXR0ZXJuID0gZGVmYXVsdHMudGFnSW5wdXQucGFzdGVTcGxpdFBhdHRlcm47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBibGlua0lmRHVwZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYmxpbmtJZkR1cGUgPSBkZWZhdWx0cy50YWdJbnB1dC5ibGlua0lmRHVwZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHJlbW92YWJsZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVtb3ZhYmxlID0gZGVmYXVsdHMudGFnSW5wdXQucmVtb3ZhYmxlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZWRpdGFibGVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGVkaXRhYmxlOiBib29sZWFuID0gZGVmYXVsdHMudGFnSW5wdXQuZWRpdGFibGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhbGxvd0R1cGVzXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBhbGxvd0R1cGVzID0gZGVmYXVsdHMudGFnSW5wdXQuYWxsb3dEdXBlcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBpZiBzZXQgdG8gdHJ1ZSwgdGhlIG5ld2x5IGFkZGVkIHRhZ3Mgd2lsbCBiZSBhZGRlZCBhcyBzdHJpbmdzLCBhbmQgbm90IG9iamVjdHNcclxuICAgICAqIEBuYW1lIG1vZGVsQXNTdHJpbmdzXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBtb2RlbEFzU3RyaW5ncyA9IGRlZmF1bHRzLnRhZ0lucHV0Lm1vZGVsQXNTdHJpbmdzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgdHJpbVRhZ3NcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHRyaW1UYWdzID0gZGVmYXVsdHMudGFnSW5wdXQudHJpbVRhZ3M7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpbnB1dFRleHRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGdldCBpbnB1dFRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dFRleHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHJpcHBsZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgcmlwcGxlOiBib29sZWFuID0gZGVmYXVsdHMudGFnSW5wdXQucmlwcGxlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgdGFiaW5kZXhcclxuICAgICAqIEBkZXNjIHBhc3MgdGhyb3VnaCB0aGUgc3BlY2lmaWVkIHRhYmluZGV4IHRvIHRoZSBpbnB1dFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgdGFiaW5kZXg6IHN0cmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0LnRhYkluZGV4O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZGlzYWJsZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZTogYm9vbGVhbiA9IGRlZmF1bHRzLnRhZ0lucHV0LmRpc2FibGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkcmFnWm9uZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZHJhZ1pvbmU6IHN0cmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0LmRyYWdab25lO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25SZW1vdmluZ1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgb25SZW1vdmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0Lm9uUmVtb3Zpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbkFkZGluZ1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgb25BZGRpbmcgPSBkZWZhdWx0cy50YWdJbnB1dC5vbkFkZGluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGFuaW1hdGlvbkR1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBhbmltYXRpb25EdXJhdGlvbiA9IGRlZmF1bHRzLnRhZ0lucHV0LmFuaW1hdGlvbkR1cmF0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25BZGRcclxuICAgICAqIEBkZXNjIGV2ZW50IGVtaXR0ZWQgd2hlbiBhZGRpbmcgYSBuZXcgaXRlbVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uQWRkID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uUmVtb3ZlXHJcbiAgICAgKiBAZGVzYyBldmVudCBlbWl0dGVkIHdoZW4gcmVtb3ZpbmcgYW4gZXhpc3RpbmcgaXRlbVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uU2VsZWN0XHJcbiAgICAgKiBAZGVzYyBldmVudCBlbWl0dGVkIHdoZW4gc2VsZWN0aW5nIGFuIGl0ZW1cclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbkZvY3VzXHJcbiAgICAgKiBAZGVzYyBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGlucHV0IGlzIGZvY3VzZWRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbkZvY3VzXHJcbiAgICAgKiBAZGVzYyBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGlucHV0IGlzIGJsdXJyZWRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uVGV4dENoYW5nZVxyXG4gICAgICogQGRlc2MgZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBpbnB1dCB2YWx1ZSBjaGFuZ2VzXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25UZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gb3V0cHV0IHRyaWdnZXJlZCB3aGVuIHRleHQgaXMgcGFzdGVkIGluIHRoZSBmb3JtXHJcbiAgICAgKiBAbmFtZSBvblBhc3RlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25QYXN0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSBvdXRwdXQgdHJpZ2dlcmVkIHdoZW4gdGFnIGVudGVyZWQgaXMgbm90IHZhbGlkXHJcbiAgICAgKiBAbmFtZSBvblZhbGlkYXRpb25FcnJvclxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uVmFsaWRhdGlvbkVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gb3V0cHV0IHRyaWdnZXJlZCB3aGVuIHRhZyBpcyBlZGl0ZWRcclxuICAgICAqIEBuYW1lIG9uVGFnRWRpdGVkXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25UYWdFZGl0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZHJvcGRvd25cclxuICAgICAqL1xyXG4gICAgLy8gQENvbnRlbnRDaGlsZChmb3J3YXJkUmVmKCgpID0+IFRhZ0lucHV0RHJvcGRvd24pLCB7c3RhdGljOiB0cnVlfSkgZHJvcGRvd246IFRhZ0lucHV0RHJvcGRvd247XHJcbiAgICBAQ29udGVudENoaWxkKFRhZ0lucHV0RHJvcGRvd24pIHB1YmxpYyBkcm9wZG93bjogVGFnSW5wdXREcm9wZG93bjtcclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgdGVtcGxhdGVcclxuICAgICAqIEBkZXNjIHJlZmVyZW5jZSB0byB0aGUgdGVtcGxhdGUgaWYgcHJvdmlkZWQgYnkgdGhlIHVzZXJcclxuICAgICAqL1xyXG4gICAgQENvbnRlbnRDaGlsZHJlbihUZW1wbGF0ZVJlZiwgeyBkZXNjZW5kYW50czogZmFsc2UgfSkgcHVibGljIHRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaW5wdXRGb3JtXHJcbiAgICAgKi9cclxuICAgIEBWaWV3Q2hpbGQoVGFnSW5wdXRGb3JtKSBwdWJsaWMgaW5wdXRGb3JtOiBUYWdJbnB1dEZvcm07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZWxlY3RlZFRhZ1xyXG4gICAgICogQGRlc2MgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHNlbGVjdGVkIHRhZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRUYWc6IFRhZ01vZGVsIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaXNMb2FkaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc0xvYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0VGV4dFxyXG4gICAgICogQHBhcmFtIHRleHRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBpbnB1dFRleHQodGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dFRleHRWYWx1ZSA9IHRleHQ7XHJcbiAgICAgICAgdGhpcy5pbnB1dFRleHRDaGFuZ2UuZW1pdCh0ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHRhZ3NcclxuICAgICAqIEBkZXNjIGxpc3Qgb2YgRWxlbWVudCBpdGVtc1xyXG4gICAgICovXHJcbiAgICBAVmlld0NoaWxkcmVuKFRhZ0NvbXBvbmVudCkgcHVibGljIHRhZ3M6IFF1ZXJ5TGlzdDxUYWdDb21wb25lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgbGlzdGVuZXJzXHJcbiAgICAgKiBAZGVzYyBhcnJheSBvZiBldmVudHMgdGhhdCBnZXQgZmlyZWQgdXNpbmcgQGZpcmVFdmVudHNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnMgPSB7XHJcbiAgICAgICAgW2NvbnN0YW50cy5LRVlET1dOXTogPHsgKGZ1bik6IGFueSB9W10+W10sXHJcbiAgICAgICAgW2NvbnN0YW50cy5LRVlVUF06IDx7IChmdW4pOiBhbnkgfVtdPltdXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIGVtaXR0ZXIgZm9yIHRoZSAyLXdheSBkYXRhIGJpbmRpbmcgaW5wdXRUZXh0IHZhbHVlXHJcbiAgICAgKiBAbmFtZSBpbnB1dFRleHRDaGFuZ2VcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBpbnB1dFRleHRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIHByaXZhdGUgdmFyaWFibGUgdG8gYmluZCBnZXQvc2V0XHJcbiAgICAgKiBAbmFtZSBpbnB1dFRleHRWYWx1ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5wdXRUZXh0VmFsdWUgPSAnJztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIHJlbW92ZXMgdGhlIHRhYiBpbmRleCBpZiBpdCBpcyBzZXQgLSBpdCB3aWxsIGJlIHBhc3NlZCB0aHJvdWdoIHRvIHRoZSBpbnB1dFxyXG4gICAgICogQG5hbWUgdGFiaW5kZXhBdHRyXHJcbiAgICAgKi9cclxuICAgIEBIb3N0QmluZGluZygnYXR0ci50YWJpbmRleCcpXHJcbiAgICBwdWJsaWMgZ2V0IHRhYmluZGV4QXR0cigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhYmluZGV4ICE9PSAnJyA/ICctMScgOiAnJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGFuaW1hdGlvbk1ldGFkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhbmltYXRpb25NZXRhZGF0YTogeyB2YWx1ZTogc3RyaW5nLCBwYXJhbXM6IG9iamVjdCB9O1xyXG5cclxuICAgIHB1YmxpYyBlcnJvcnM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgcHVibGljIGlzUHJvZ3Jlc3NCYXJWaXNpYmxlJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGRyYWdQcm92aWRlcjogRHJhZ1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG5nQWZ0ZXJWaWV3SW5pdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHNldCB1cCBsaXN0ZW5lcnNcclxuXHJcbiAgICAgICAgdGhpcy5zZXRVcEtleXByZXNzTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgdGhpcy5zZXR1cFNlcGFyYXRvcktleXNMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuc2V0VXBJbnB1dEtleWRvd25MaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25UZXh0Q2hhbmdlLm9ic2VydmVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRVcFRleHRDaGFuZ2VTdWJzY3JpYmVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiBjbGVhciBvbiBibHVyIGlzIHNldCB0byB0cnVlLCBzdWJzY3JpYmUgdG8gdGhlIGV2ZW50IGFuZCBjbGVhciB0aGUgdGV4dCdzIGZvcm1cclxuICAgICAgICBpZiAodGhpcy5jbGVhck9uQmx1ciB8fCB0aGlzLmFkZE9uQmx1cikge1xyXG4gICAgICAgICAgICB0aGlzLnNldFVwT25CbHVyU3Vic2NyaWJlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgYWRkT25QYXN0ZSBpcyBzZXQgdG8gdHJ1ZSwgcmVnaXN0ZXIgdGhlIGhhbmRsZXIgYW5kIGFkZCBpdGVtc1xyXG4gICAgICAgIGlmICh0aGlzLmFkZE9uUGFzdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRVcE9uUGFzdGVMaXN0ZW5lcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3RhdHVzQ2hhbmdlcyQgPSB0aGlzLmlucHV0Rm9ybS5mb3JtLnN0YXR1c0NoYW5nZXM7XHJcblxyXG4gICAgICAgIHN0YXR1c0NoYW5nZXMkLnBpcGUoXHJcbiAgICAgICAgICAgIGZpbHRlcigoc3RhdHVzOiBzdHJpbmcpID0+IHN0YXR1cyAhPT0gJ1BFTkRJTkcnKVxyXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcnMgPSB0aGlzLmlucHV0Rm9ybS5nZXRFcnJvck1lc3NhZ2VzKHRoaXMuZXJyb3JNZXNzYWdlcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNQcm9ncmVzc0JhclZpc2libGUkID0gc3RhdHVzQ2hhbmdlcyQucGlwZShcclxuICAgICAgICAgICAgbWFwKChzdGF0dXM6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1cyA9PT0gJ1BFTkRJTkcnIHx8IHRoaXMuaXNMb2FkaW5nO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGlmIGhpZGVGb3JtIGlzIHNldCB0byB0cnVlLCByZW1vdmUgdGhlIGlucHV0XHJcbiAgICAgICAgaWYgKHRoaXMuaGlkZUZvcm0pIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEZvcm0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG5nT25Jbml0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvLyBpZiB0aGUgbnVtYmVyIG9mIGl0ZW1zIHNwZWNpZmllZCBpbiB0aGUgbW9kZWwgaXMgPiBvZiB0aGUgdmFsdWUgb2YgbWF4SXRlbXNcclxuICAgICAgICAvLyBkZWdyYWRlIGdyYWNlZnVsbHkgYW5kIGxldCB0aGUgbWF4IG51bWJlciBvZiBpdGVtcyB0byBiZSB0aGUgbnVtYmVyIG9mIGl0ZW1zIGluIHRoZSBtb2RlbFxyXG4gICAgICAgIC8vIHRob3VnaCwgd2FybiB0aGUgdXNlci5cclxuICAgICAgICBjb25zdCBoYXNSZWFjaGVkTWF4SXRlbXMgPSB0aGlzLm1heEl0ZW1zICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtcyAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLmxlbmd0aCA+IHRoaXMubWF4SXRlbXM7XHJcblxyXG4gICAgICAgIGlmIChoYXNSZWFjaGVkTWF4SXRlbXMpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXhJdGVtcyA9IHRoaXMuaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oY29uc3RhbnRzLk1BWF9JVEVNU19XQVJOSU5HKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldHRpbmcgZWRpdGFibGUgdG8gZmFsc2UgdG8gZml4IHByb2JsZW0gd2l0aCB0YWdzIGluIElFIHN0aWxsIGJlaW5nIGVkaXRhYmxlIHdoZW5cclxuICAgICAgICAvLyBvbmx5RnJvbUF1dG9jb21wbGV0ZSBpcyB0cnVlXHJcbiAgICAgICAgdGhpcy5lZGl0YWJsZSA9IHRoaXMub25seUZyb21BdXRvY29tcGxldGUgPyBmYWxzZSA6IHRoaXMuZWRpdGFibGU7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uTWV0YWRhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uUmVtb3ZlUmVxdWVzdGVkXHJcbiAgICAgKiBAcGFyYW0gdGFnXHJcbiAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uUmVtb3ZlUmVxdWVzdGVkKHRhZzogVGFnTW9kZWwsIGluZGV4OiBudW1iZXIpOiBQcm9taXNlPFRhZ01vZGVsPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdWJzY3JpYmVGbiA9IChtb2RlbDogVGFnTW9kZWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlSXRlbShtb2RlbCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0YWcpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vblJlbW92aW5nID9cclxuICAgICAgICAgICAgICAgIHRoaXMub25SZW1vdmluZyh0YWcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoZmlyc3QoKSlcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHN1YnNjcmliZUZuKSA6IHN1YnNjcmliZUZuKHRhZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbkFkZGluZ1JlcXVlc3RlZFxyXG4gICAgICogQHBhcmFtIGZyb21BdXRvY29tcGxldGUge2Jvb2xlYW59XHJcbiAgICAgKiBAcGFyYW0gdGFnIHtUYWdNb2RlbH1cclxuICAgICAqIEBwYXJhbSBpbmRleD8ge251bWJlcn1cclxuICAgICAqIEBwYXJhbSBnaXZldXBGb2N1cz8ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkFkZGluZ1JlcXVlc3RlZChmcm9tQXV0b2NvbXBsZXRlOiBib29sZWFuLCB0YWc6IFRhZ01vZGVsLFxyXG4gICAgICAgIGluZGV4PzogbnVtYmVyLCBnaXZldXBGb2N1cz86IGJvb2xlYW4pOiBQcm9taXNlPFRhZ01vZGVsPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3Vic2NyaWJlRm4gPSAobW9kZWw6IFRhZ01vZGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRJdGVtKGZyb21BdXRvY29tcGxldGUsIG1vZGVsLCBpbmRleCwgZ2l2ZXVwRm9jdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzb2x2ZSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9uQWRkaW5nID9cclxuICAgICAgICAgICAgICAgIHRoaXMub25BZGRpbmcodGFnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKGZpcnN0KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShzdWJzY3JpYmVGbiwgcmVqZWN0KSA6IHN1YnNjcmliZUZuKHRhZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhcHBlbmRUYWdcclxuICAgICAqIEBwYXJhbSB0YWcge1RhZ01vZGVsfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXBwZW5kVGFnID0gKHRhZzogVGFnTW9kZWwsIGluZGV4ID0gdGhpcy5pdGVtcy5sZW5ndGgpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXM7XHJcbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsQXNTdHJpbmdzID8gdGFnW3RoaXMuaWRlbnRpZnlCeV0gOiB0YWc7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXHJcbiAgICAgICAgICAgIC4uLml0ZW1zLnNsaWNlKDAsIGluZGV4KSxcclxuICAgICAgICAgICAgbW9kZWwsXHJcbiAgICAgICAgICAgIC4uLml0ZW1zLnNsaWNlKGluZGV4LCBpdGVtcy5sZW5ndGgpXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGNyZWF0ZVRhZ1xyXG4gICAgICogQHBhcmFtIG1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVUYWcgPSAobW9kZWw6IFRhZ01vZGVsKTogVGFnTW9kZWwgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRyaW0gPSAodmFsOiBUYWdNb2RlbCwga2V5OiBzdHJpbmcpOiBUYWdNb2RlbCA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/IHZhbC50cmltKCkgOiB2YWxba2V5XTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi50eXBlb2YgbW9kZWwgIT09ICdzdHJpbmcnID8gbW9kZWwgOiB7fSxcclxuICAgICAgICAgICAgW3RoaXMuZGlzcGxheUJ5XTogdGhpcy50cmltVGFncyA/IHRyaW0obW9kZWwsIHRoaXMuZGlzcGxheUJ5KSA6IG1vZGVsLFxyXG4gICAgICAgICAgICBbdGhpcy5pZGVudGlmeUJ5XTogdGhpcy50cmltVGFncyA/IHRyaW0obW9kZWwsIHRoaXMuaWRlbnRpZnlCeSkgOiBtb2RlbFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZWxlY3RJdGVtXHJcbiAgICAgKiBAZGVzYyBzZWxlY3RzIGl0ZW0gcGFzc2VkIGFzIHBhcmFtZXRlciBhcyB0aGUgc2VsZWN0ZWQgdGFnXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICogQHBhcmFtIGVtaXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdEl0ZW0oaXRlbTogVGFnTW9kZWwgfCB1bmRlZmluZWQsIGVtaXQgPSB0cnVlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXNSZWFkb25seSA9IGl0ZW0gJiYgdHlwZW9mIGl0ZW0gIT09ICdzdHJpbmcnICYmIGl0ZW0ucmVhZG9ubHk7XHJcblxyXG4gICAgICAgIGlmIChpc1JlYWRvbmx5IHx8IHRoaXMuc2VsZWN0ZWRUYWcgPT09IGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhZyA9IGl0ZW07XHJcblxyXG4gICAgICAgIGlmIChlbWl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBmaXJlRXZlbnRzXHJcbiAgICAgKiBAZGVzYyBnb2VzIHRocm91Z2ggdGhlIGxpc3Qgb2YgdGhlIGV2ZW50cyBmb3IgYSBnaXZlbiBldmVudE5hbWUsIGFuZCBmaXJlcyBlYWNoIG9mIHRoZW1cclxuICAgICAqIEBwYXJhbSBldmVudE5hbWVcclxuICAgICAqIEBwYXJhbSAkZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpcmVFdmVudHMoZXZlbnROYW1lOiBzdHJpbmcsICRldmVudD8pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIuY2FsbCh0aGlzLCAkZXZlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGhhbmRsZUtleWRvd25cclxuICAgICAqIEBkZXNjIGhhbmRsZXMgYWN0aW9uIHdoZW4gdGhlIHVzZXIgaGl0cyBhIGtleWJvYXJkIGtleVxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhbmRsZUtleWRvd24oZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBkYXRhLmV2ZW50O1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2g7XHJcbiAgICAgICAgY29uc3Qgc2hpZnRLZXkgPSBldmVudC5zaGlmdEtleSB8fCBmYWxzZTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChjb25zdGFudHMuS0VZX1BSRVNTX0FDVElPTlNba2V5XSkge1xyXG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5BQ1RJT05TX0tFWVMuREVMRVRFOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWcgJiYgdGhpcy5yZW1vdmFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaXRlbXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUmVtb3ZlUmVxdWVzdGVkKHRoaXMuc2VsZWN0ZWRUYWcsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuQUNUSU9OU19LRVlTLlNXSVRDSF9QUkVWOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9UYWcoZGF0YS5tb2RlbCwgY29uc3RhbnRzLlBSRVYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5BQ1RJT05TX0tFWVMuU1dJVENIX05FWFQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1RhZyhkYXRhLm1vZGVsLCBjb25zdGFudHMuTkVYVCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLkFDVElPTlNfS0VZUy5UQUI6XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ZpcnN0VGFnKGRhdGEubW9kZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvVGFnKGRhdGEubW9kZWwsIGNvbnN0YW50cy5QUkVWKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNMYXN0VGFnKGRhdGEubW9kZWwpICYmICh0aGlzLmRpc2FibGUgfHwgdGhpcy5tYXhJdGVtc1JlYWNoZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvVGFnKGRhdGEubW9kZWwsIGNvbnN0YW50cy5ORVhUKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHByZXZlbnQgZGVmYXVsdCBiZWhhdmlvdXJcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBvbkZvcm1TdWJtaXQoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5vbkFkZGluZ1JlcXVlc3RlZChmYWxzZSwgdGhpcy5mb3JtVmFsdWUpO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2V0SW5wdXRWYWx1ZVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRJbnB1dFZhbHVlKHZhbHVlOiBzdHJpbmcsIGVtaXRFdmVudCA9IHRydWUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKCk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBmb3JtIHZhbHVlIHdpdGggdGhlIHRyYW5zZm9ybWVkIGl0ZW1cclxuICAgICAgICBjb250cm9sLnNldFZhbHVlKHZhbHVlLCB7IGVtaXRFdmVudCB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldENvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDb250cm9sKCk6IEZvcm1Db250cm9sIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dEZvcm0udmFsdWUgYXMgRm9ybUNvbnRyb2w7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBmb2N1c1xyXG4gICAgICogQHBhcmFtIGFwcGx5Rm9jdXNcclxuICAgICAqIEBwYXJhbSBkaXNwbGF5QXV0b2NvbXBsZXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmb2N1cyhhcHBseUZvY3VzID0gZmFsc2UsIGRpc3BsYXlBdXRvY29tcGxldGUgPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmRyYWdQcm92aWRlci5nZXRTdGF0ZSgnZHJhZ2dpbmcnKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdEl0ZW0odW5kZWZpbmVkLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmIChhcHBseUZvY3VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGb3JtLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KHRoaXMuZm9ybVZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBibHVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBibHVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQodGhpcy5mb3JtVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaGFzRXJyb3JzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXNFcnJvcnMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5pbnB1dEZvcm0gJiYgdGhpcy5pbnB1dEZvcm0uaGFzRXJyb3JzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpc0lucHV0Rm9jdXNlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNJbnB1dEZvY3VzZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5pbnB1dEZvcm0gJiYgdGhpcy5pbnB1dEZvcm0uaXNJbnB1dEZvY3VzZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gdGhpcyBpcyB0aGUgb25lIHdheSBJIGZvdW5kIHRvIHRlbGwgaWYgdGhlIHRlbXBsYXRlIGhhcyBiZWVuIHBhc3NlZCBhbmQgaXQgaXMgbm90XHJcbiAgICAgKiB0aGUgdGVtcGxhdGUgZm9yIHRoZSBtZW51IGl0ZW1cclxuICAgICAqIEBuYW1lIGhhc0N1c3RvbVRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXNDdXN0b21UZW1wbGF0ZSgpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVzID8gdGhpcy50ZW1wbGF0ZXMuZmlyc3QgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgY29uc3QgbWVudVRlbXBsYXRlID0gdGhpcy5kcm9wZG93biAmJiB0aGlzLmRyb3Bkb3duLnRlbXBsYXRlcyA/XHJcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24udGVtcGxhdGVzLmZpcnN0IDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICByZXR1cm4gQm9vbGVhbih0ZW1wbGF0ZSAmJiB0ZW1wbGF0ZSAhPT0gbWVudVRlbXBsYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG1heEl0ZW1zUmVhY2hlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG1heEl0ZW1zUmVhY2hlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXhJdGVtcyAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMubGVuZ3RoID49IHRoaXMubWF4SXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBmb3JtVmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBmb3JtVmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBmb3JtID0gdGhpcy5pbnB1dEZvcm0udmFsdWU7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtID8gZm9ybS52YWx1ZSA6ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKjNcclxuICAgICAqIEBuYW1lIG9uRHJhZ1N0YXJ0ZWRcclxuICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkRyYWdTdGFydGVkKGV2ZW50OiBEcmFnRXZlbnQsIHRhZzogVGFnTW9kZWwsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHsgem9uZTogdGhpcy5kcmFnWm9uZSwgdGFnLCBpbmRleCB9IGFzIERyYWdnZWRUYWc7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZ1Byb3ZpZGVyLnNldFNlbmRlcih0aGlzKTtcclxuICAgICAgICB0aGlzLmRyYWdQcm92aWRlci5zZXREcmFnZ2VkSXRlbShldmVudCwgaXRlbSk7XHJcbiAgICAgICAgdGhpcy5kcmFnUHJvdmlkZXIuc2V0U3RhdGUoeyBkcmFnZ2luZzogdHJ1ZSwgaW5kZXggfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbkRyYWdPdmVyXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCwgaW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRyYWdQcm92aWRlci5zZXRTdGF0ZSh7IGRyb3BwaW5nOiB0cnVlIH0pO1xyXG4gICAgICAgIHRoaXMuZHJhZ1Byb3ZpZGVyLnNldFJlY2VpdmVyKHRoaXMpO1xyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25UYWdEcm9wcGVkXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25UYWdEcm9wcGVkKGV2ZW50OiBEcmFnRXZlbnQsIGluZGV4PzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZHJhZ1Byb3ZpZGVyLmdldERyYWdnZWRJdGVtKGV2ZW50KTtcclxuXHJcbiAgICAgICAgaWYgKCFpdGVtIHx8IGl0ZW0uem9uZSAhPT0gdGhpcy5kcmFnWm9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRyYWdQcm92aWRlci5vblRhZ0Ryb3BwZWQoaXRlbS50YWcsIGl0ZW0uaW5kZXgsIGluZGV4KTtcclxuXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlzRHJvcHBpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzRHJvcHBpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgaXNSZWNlaXZlciA9IHRoaXMuZHJhZ1Byb3ZpZGVyLnJlY2VpdmVyID09PSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGlzRHJvcHBpbmcgPSB0aGlzLmRyYWdQcm92aWRlci5nZXRTdGF0ZSgnZHJvcHBpbmcnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oaXNSZWNlaXZlciAmJiBpc0Ryb3BwaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uVGFnQmx1cnJlZFxyXG4gICAgICogQHBhcmFtIGNoYW5nZWRFbGVtZW50IHtUYWdNb2RlbH1cclxuICAgICAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25UYWdCbHVycmVkKGNoYW5nZWRFbGVtZW50OiBUYWdNb2RlbCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdID0gY2hhbmdlZEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5ibHVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0cmFja0J5XHJcbiAgICAgKiBAcGFyYW0gaXRlbXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRyYWNrQnkoaW5kZXg6IG51bWJlciwgaXRlbTogVGFnTW9kZWwpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBpdGVtW3RoaXMuaWRlbnRpZnlCeV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB1cGRhdGVFZGl0ZWRUYWdcclxuICAgICAqIEBwYXJhbSB0YWdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZUVkaXRlZFRhZyh7IHRhZywgaW5kZXggfTogeyB0YWc6IFRhZ01vZGVsLCBpbmRleDogbnVtYmVyIH0pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uVGFnRWRpdGVkLmVtaXQodGFnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdGFnXHJcbiAgICAgKiBAcGFyYW0gaXNGcm9tQXV0b2NvbXBsZXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1RhZ1ZhbGlkID0gKHRhZzogVGFnTW9kZWwsIGZyb21BdXRvY29tcGxldGUgPSBmYWxzZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHRoaXMuZHJvcGRvd24gPyB0aGlzLmRyb3Bkb3duLnNlbGVjdGVkSXRlbSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0SXRlbURpc3BsYXkodGFnKS50cmltKCk7XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW0gJiYgIWZyb21BdXRvY29tcGxldGUgfHwgIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGR1cGUgPSB0aGlzLmZpbmREdXBlKHRhZywgZnJvbUF1dG9jb21wbGV0ZSk7XHJcblxyXG4gICAgICAgIC8vIGlmIHNvLCBnaXZlIGEgdmlzdWFsIGN1ZSBhbmQgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgaWYgKCF0aGlzLmFsbG93RHVwZXMgJiYgZHVwZSAmJiB0aGlzLmJsaW5rSWZEdXBlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy50YWdzLmZpbmQoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtVmFsdWUoaXRlbS5tb2RlbCkgPT09IHRoaXMuZ2V0SXRlbVZhbHVlKGR1cGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgbW9kZWwuYmxpbmsoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXNGcm9tQXV0b2NvbXBsZXRlID0gZnJvbUF1dG9jb21wbGV0ZSAmJiB0aGlzLm9ubHlGcm9tQXV0b2NvbXBsZXRlO1xyXG5cclxuICAgICAgICBjb25zdCBhc3NlcnRpb25zID0gW1xyXG4gICAgICAgICAgICAvLyAxLiB0aGVyZSBtdXN0IGJlIG5vIGR1cGUgT1IgZHVwZXMgYXJlIGFsbG93ZWRcclxuICAgICAgICAgICAgIWR1cGUgfHwgdGhpcy5hbGxvd0R1cGVzLFxyXG5cclxuICAgICAgICAgICAgLy8gMi4gY2hlY2sgbWF4IGl0ZW1zIGhhcyBub3QgYmVlbiByZWFjaGVkXHJcbiAgICAgICAgICAgICF0aGlzLm1heEl0ZW1zUmVhY2hlZCxcclxuXHJcbiAgICAgICAgICAgIC8vIDMuIGNoZWNrIGl0ZW0gY29tZXMgZnJvbSBhdXRvY29tcGxldGUgb3Igb25seUZyb21BdXRvY29tcGxldGUgaXMgZmFsc2VcclxuICAgICAgICAgICAgKChpc0Zyb21BdXRvY29tcGxldGUpIHx8ICF0aGlzLm9ubHlGcm9tQXV0b2NvbXBsZXRlKVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHJldHVybiBhc3NlcnRpb25zLmZpbHRlcihCb29sZWFuKS5sZW5ndGggPT09IGFzc2VydGlvbnMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgbW92ZVRvVGFnXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdmVUb1RhZyhpdGVtOiBUYWdNb2RlbCwgZGlyZWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpc0xhc3QgPSB0aGlzLmlzTGFzdFRhZyhpdGVtKTtcclxuICAgICAgICBjb25zdCBpc0ZpcnN0ID0gdGhpcy5pc0ZpcnN0VGFnKGl0ZW0pO1xyXG4gICAgICAgIGNvbnN0IHN0b3BTd2l0Y2ggPSAoZGlyZWN0aW9uID09PSBjb25zdGFudHMuTkVYVCAmJiBpc0xhc3QpIHx8XHJcbiAgICAgICAgICAgIChkaXJlY3Rpb24gPT09IGNvbnN0YW50cy5QUkVWICYmIGlzRmlyc3QpO1xyXG5cclxuICAgICAgICBpZiAoc3RvcFN3aXRjaCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvZmZzZXQgPSBkaXJlY3Rpb24gPT09IGNvbnN0YW50cy5ORVhUID8gMSA6IC0xO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRUYWdJbmRleChpdGVtKSArIG9mZnNldDtcclxuICAgICAgICBjb25zdCB0YWcgPSB0aGlzLmdldFRhZ0F0SW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGFnLnNlbGVjdC5jYWxsKHRhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpc0ZpcnN0VGFnXHJcbiAgICAgKiBAcGFyYW0gaXRlbSB7VGFnTW9kZWx9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNGaXJzdFRhZyhpdGVtOiBUYWdNb2RlbCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhZ3MuZmlyc3QubW9kZWwgPT09IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpc0xhc3RUYWdcclxuICAgICAqIEBwYXJhbSBpdGVtIHtUYWdNb2RlbH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0xhc3RUYWcoaXRlbTogVGFnTW9kZWwpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWdzLmxhc3QubW9kZWwgPT09IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRUYWdJbmRleFxyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUYWdJbmRleChpdGVtOiBUYWdNb2RlbCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgdGFncyA9IHRoaXMudGFncy50b0FycmF5KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0YWdzLmZpbmRJbmRleCh0YWcgPT4gdGFnLm1vZGVsID09PSBpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldFRhZ0F0SW5kZXhcclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRhZ0F0SW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHRhZ3MgPSB0aGlzLnRhZ3MudG9BcnJheSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGFnc1tpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSByZW1vdmVJdGVtXHJcbiAgICAgKiBAZGVzYyByZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgYXJyYXkgb2YgdGhlIG1vZGVsXHJcbiAgICAgKiBAcGFyYW0gdGFnIHtUYWdNb2RlbH1cclxuICAgICAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlSXRlbSh0YWc6IFRhZ01vZGVsLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuZ2V0SXRlbXNXaXRob3V0KGluZGV4KTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIHJlbW92ZWQgdGFnIHdhcyBzZWxlY3RlZCwgc2V0IGl0IGFzIHVuZGVmaW5lZFxyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFnID09PSB0YWcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKHVuZGVmaW5lZCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZm9jdXMgaW5wdXRcclxuICAgICAgICB0aGlzLmZvY3VzKHRydWUsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gZW1pdCByZW1vdmUgZXZlbnRcclxuICAgICAgICB0aGlzLm9uUmVtb3ZlLmVtaXQodGFnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGFkZEl0ZW1cclxuICAgICAqIEBkZXNjIGFkZHMgdGhlIGN1cnJlbnQgdGV4dCBtb2RlbCB0byB0aGUgaXRlbXMgYXJyYXlcclxuICAgICAqIEBwYXJhbSBmcm9tQXV0b2NvbXBsZXRlIHtib29sZWFufVxyXG4gICAgICogQHBhcmFtIGl0ZW0ge1RhZ01vZGVsfVxyXG4gICAgICogQHBhcmFtIGluZGV4PyB7bnVtYmVyfVxyXG4gICAgICogQHBhcmFtIGdpdmV1cEZvY3VzPyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRJdGVtKGZyb21BdXRvY29tcGxldGUgPSBmYWxzZSwgaXRlbTogVGFnTW9kZWwsIGluZGV4PzogbnVtYmVyLCBnaXZldXBGb2N1cz86IGJvb2xlYW4pOlxyXG4gICAgICAgIFByb21pc2U8VGFnTW9kZWw+IHtcclxuICAgICAgICBjb25zdCBkaXNwbGF5ID0gdGhpcy5nZXRJdGVtRGlzcGxheShpdGVtKTtcclxuICAgICAgICBjb25zdCB0YWcgPSB0aGlzLmNyZWF0ZVRhZyhpdGVtKTtcclxuXHJcbiAgICAgICAgaWYgKGZyb21BdXRvY29tcGxldGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMuZ2V0SXRlbVZhbHVlKGl0ZW0sIHRydWUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAbmFtZSByZXNldFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY29uc3QgcmVzZXQgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyByZXNldCBjb250cm9sIGFuZCBmb2N1cyBpbnB1dFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKCcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2l2ZXVwRm9jdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvY3VzIGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1cyh0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkaXNwbGF5KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFwcGVuZEl0ZW0gPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFRhZyh0YWcsIGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBlbWl0IGV2ZW50XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQWRkLmVtaXQodGFnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJvcGRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJvcGRvd24uc2hvd0Ryb3Bkb3duSWZFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gdGhpcy5pbnB1dEZvcm0uZm9ybS5zdGF0dXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzVGFnVmFsaWQgPSB0aGlzLmlzVGFnVmFsaWQodGFnLCBmcm9tQXV0b2NvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9uVmFsaWRhdGlvbkVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblZhbGlkYXRpb25FcnJvci5lbWl0KHRhZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnVkFMSUQnICYmIGlzVGFnVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIGFwcGVuZEl0ZW0oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNldCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnSU5WQUxJRCcgfHwgIWlzVGFnVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb25WYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ1BFTkRJTkcnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNVcGRhdGUkID0gdGhpcy5pbnB1dEZvcm0uZm9ybS5zdGF0dXNDaGFuZ2VzO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0dXNVcGRhdGUkXHJcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcihzdGF0dXNVcGRhdGUgPT4gc3RhdHVzVXBkYXRlICE9PSAnUEVORElORycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHN0YXR1c1VwZGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzVXBkYXRlID09PSAnVkFMSUQnICYmIGlzVGFnVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZEl0ZW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvblZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldHVwU2VwYXJhdG9yS2V5c0xpc3RlbmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0dXBTZXBhcmF0b3JLZXlzTGlzdGVuZXIoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdXNlU2VwYXJhdG9yS2V5cyA9IHRoaXMuc2VwYXJhdG9yS2V5Q29kZXMubGVuZ3RoID4gMCB8fCB0aGlzLnNlcGFyYXRvcktleXMubGVuZ3RoID4gMDtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lciA9ICgkZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGFzS2V5Q29kZSA9IHRoaXMuc2VwYXJhdG9yS2V5Q29kZXMuaW5kZXhPZigkZXZlbnQua2V5Q29kZSkgPj0gMDtcclxuICAgICAgICAgICAgY29uc3QgaGFzS2V5ID0gdGhpcy5zZXBhcmF0b3JLZXlzLmluZGV4T2YoJGV2ZW50LmtleSkgPj0gMDtcclxuICAgICAgICAgICAgLy8gdGhlIGtleUNvZGUgb2Yga2V5ZG93biBldmVudCBpcyAyMjkgd2hlbiBJTUUgaXMgcHJvY2Vzc2luZyB0aGUga2V5IGV2ZW50LlxyXG4gICAgICAgICAgICBjb25zdCBpc0lNRVByb2Nlc3NpbmcgPSAkZXZlbnQua2V5Q29kZSA9PT0gMjI5O1xyXG5cclxuICAgICAgICAgICAgaWYgKGhhc0tleUNvZGUgfHwgKGhhc0tleSAmJiAhaXNJTUVQcm9jZXNzaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQWRkaW5nUmVxdWVzdGVkKGZhbHNlLCB0aGlzLmZvcm1WYWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4geyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpc3Rlbi5jYWxsKHRoaXMsIGNvbnN0YW50cy5LRVlET1dOLCBsaXN0ZW5lciwgdXNlU2VwYXJhdG9yS2V5cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXRVcEtleXByZXNzTGlzdGVuZXJzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0VXBLZXlwcmVzc0xpc3RlbmVycygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lciA9ICgkZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNDb3JyZWN0S2V5ID0gJGV2ZW50LmtleUNvZGUgPT09IDM3IHx8ICRldmVudC5rZXlDb2RlID09PSA4O1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzQ29ycmVjdEtleSAmJlxyXG4gICAgICAgICAgICAgICAgIXRoaXMuZm9ybVZhbHVlICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdzLmxhc3Quc2VsZWN0LmNhbGwodGhpcy50YWdzLmxhc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gc2V0dGluZyB1cCB0aGUga2V5cHJlc3MgbGlzdGVuZXJzXHJcbiAgICAgICAgbGlzdGVuLmNhbGwodGhpcywgY29uc3RhbnRzLktFWURPV04sIGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldFVwS2V5ZG93bkxpc3RlbmVyc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFVwSW5wdXRLZXlkb3duTGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5wdXRGb3JtLm9uS2V5ZG93bi5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnQmFja3NwYWNlJyAmJiB0aGlzLmZvcm1WYWx1ZS50cmltKCkgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXRVcE9uUGFzdGVMaXN0ZW5lclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFVwT25QYXN0ZUxpc3RlbmVyKCkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5pbnB1dEZvcm0uaW5wdXQubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gYXR0YWNoIGxpc3RlbmVyIHRvIGlucHV0XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oaW5wdXQsICdwYXN0ZScsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uUGFzdGVDYWxsYmFjayhldmVudCk7XHJcblxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldFVwVGV4dENoYW5nZVN1YnNjcmliZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRVcFRleHRDaGFuZ2VTdWJzY3JpYmVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5wdXRGb3JtLmZvcm1cclxuICAgICAgICAgICAgLnZhbHVlQ2hhbmdlc1xyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIGRlYm91bmNlVGltZSh0aGlzLm9uVGV4dENoYW5nZURlYm91bmNlKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiB7IGl0ZW06IHN0cmluZyB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGV4dENoYW5nZS5lbWl0KHZhbHVlLml0ZW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldFVwT25CbHVyU3Vic2NyaWJlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFVwT25CbHVyU3Vic2NyaWJlcigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmaWx0ZXJGbiA9ICgpOiBib29sZWFuID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNWaXNpYmxlID0gdGhpcy5kcm9wZG93biAmJiB0aGlzLmRyb3Bkb3duLmlzVmlzaWJsZTtcclxuICAgICAgICAgICAgcmV0dXJuICFpc1Zpc2libGUgJiYgISF0aGlzLmZvcm1WYWx1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0Rm9ybVxyXG4gICAgICAgICAgICAub25CbHVyXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDEwMCksXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIoZmlsdGVyRm4pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNldCA9ICgpID0+IHRoaXMuc2V0SW5wdXRWYWx1ZSgnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRkT25CbHVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uQWRkaW5nUmVxdWVzdGVkKGZhbHNlLCB0aGlzLmZvcm1WYWx1ZSwgdW5kZWZpbmVkLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlc2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXNldCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGZpbmREdXBlXHJcbiAgICAgKiBAcGFyYW0gdGFnXHJcbiAgICAgKiBAcGFyYW0gaXNGcm9tQXV0b2NvbXBsZXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZER1cGUodGFnOiBUYWdNb2RlbCwgaXNGcm9tQXV0b2NvbXBsZXRlOiBib29sZWFuKTogVGFnTW9kZWwgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGNvbnN0IGlkZW50aWZ5QnkgPSBpc0Zyb21BdXRvY29tcGxldGUgPyB0aGlzLmRyb3Bkb3duLmlkZW50aWZ5QnkgOiB0aGlzLmlkZW50aWZ5Qnk7XHJcbiAgICAgICAgY29uc3QgaWQgPSB0YWdbaWRlbnRpZnlCeV07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbmQoaXRlbSA9PiB0aGlzLmdldEl0ZW1WYWx1ZShpdGVtKSA9PT0gaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25QYXN0ZUNhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uUGFzdGVDYWxsYmFjayA9IGFzeW5jIChkYXRhOiBDbGlwYm9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgIGludGVyZmFjZSBJRVdpbmRvdyBleHRlbmRzIFdpbmRvdyB7XHJcbiAgICAgICAgICAgIGNsaXBib2FyZERhdGE6IERhdGFUcmFuc2ZlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGdldFRleHQgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNJRSA9IEJvb2xlYW4oKHdpbmRvdyBhcyBJRVdpbmRvdyAmIHR5cGVvZiBnbG9iYWxUaGlzKS5jbGlwYm9hcmREYXRhKTtcclxuICAgICAgICAgICAgY29uc3QgY2xpcGJvYXJkRGF0YSA9IGlzSUUgPyAoXHJcbiAgICAgICAgICAgICAgICAod2luZG93IGFzIElFV2luZG93ICYgdHlwZW9mIGdsb2JhbFRoaXMpLmNsaXBib2FyZERhdGFcclxuICAgICAgICAgICAgKSA6IGRhdGEuY2xpcGJvYXJkRGF0YTtcclxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IGlzSUUgPyAnVGV4dCcgOiAndGV4dC9wbGFpbic7XHJcbiAgICAgICAgICAgIHJldHVybiBjbGlwYm9hcmREYXRhID09PSBudWxsID8gJycgOiBjbGlwYm9hcmREYXRhLmdldERhdGEodHlwZSkgfHwgJyc7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgdGV4dCA9IGdldFRleHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVxdWVzdHMgPSB0ZXh0XHJcbiAgICAgICAgICAgIC5zcGxpdCh0aGlzLnBhc3RlU3BsaXRQYXR0ZXJuKVxyXG4gICAgICAgICAgICAubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFnID0gdGhpcy5jcmVhdGVUYWcoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUodGFnW3RoaXMuZGlzcGxheUJ5XSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vbkFkZGluZ1JlcXVlc3RlZChmYWxzZSwgdGFnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc2V0SW5wdXQgPSAoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2V0SW5wdXRWYWx1ZSgnJyksIDUwKTtcclxuXHJcbiAgICAgICAgUHJvbWlzZS5hbGwocmVxdWVzdHMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uUGFzdGUuZW1pdCh0ZXh0KTtcclxuICAgICAgICAgICAgcmVzZXRJbnB1dCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChyZXNldElucHV0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldEFuaW1hdGlvbk1ldGFkYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0QW5pbWF0aW9uTWV0YWRhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25NZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6ICdpbicsXHJcbiAgICAgICAgICAgIHBhcmFtczogeyAuLi50aGlzLmFuaW1hdGlvbkR1cmF0aW9uIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==