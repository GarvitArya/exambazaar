(function (root, factory) {
    'use strict';
    var isElectron = typeof module === 'object' && process && process.versions && process.versions.electron;
    if (!isElectron && typeof module === 'object') {
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory;
        });
    } else {
        root.MediumEditorRemoveFormats = factory(root);
    }
}(this, function () {

    'use strict';

    function RemoveButton(options) {
        this.options = options;
        this.button = document.createElement('button');
        this.button.className = 'medium-editor-action';
        this.button.innerHTML = options.label || 'CLR';

        this.button.onclick = function () {
            document.execCommand('formatBlock', false, 'p');
            document.execCommand('removeformat');

        };
    }
    RemoveButton.prototype.getButton = function () {
        return this.button;
    };

    RemoveButton.prototype.checkState = function (node) {
        this.button.classList.add('medium-editor-button-active');
    };

    return RemoveButton;
}));
