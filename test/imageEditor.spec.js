/**
 * @fileoverview Test env
 * @author NHN Ent. FE Development Lab <dl_javascript@nhn.com>
 */

import snippet from 'tui-code-snippet';
import Promise from 'core-js/library/es6/promise';
import ImageEditor from '../src/js/imageEditor';
import consts from '../src/js/consts';

describe('ImageEditor', () => {
    // hostnameSent module scope variable can not be reset.
    // maintain cases with xit as it always fail, if you want to test these cases, change xit to fit one by one
    describe('constructor', () => {
        let imageEditor, el;

        beforeEach(() => {
            el = document.createElement('div');
            spyOn(snippet, 'sendHostname');

            imageEditor = new ImageEditor(el, {
                usageStatistics: false
            });
        });

        afterEach(() => {
            imageEditor.destroy();
        });

        xit('should send hostname by default', () => {
            imageEditor = new ImageEditor(el);

            expect(snippet.sendHostname).toHaveBeenCalled();
        });

        xit('should not send hostname on usageStatistics option false', () => {
            imageEditor = new ImageEditor(el, {
                usageStatistics: false
            });

            expect(snippet.sendHostname).not.toHaveBeenCalled();
        });

        it('`preventDefault` of BACKSPACE key events should not be executed when object is selected state.', () => {
            const spyCallback = jasmine.createSpy();

            spyOn(imageEditor._graphics, 'getActiveObject').and.returnValue(null);

            imageEditor._onKeyDown({
                keyCode: consts.keyCodes.BACKSPACE,
                preventDefault: spyCallback
            });

            expect(spyCallback).not.toHaveBeenCalled();
        });
    });
});
