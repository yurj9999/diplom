import {
    resultBlock,
    preloaderBlock,
    errorBlock,
    emptyBlock,
    analyticLink,
    buttonMoreContainer,
    input,
    contentIndexResult
} from './Dom';

export class Utilities {
    destroyer() {
        localStorage.clear();
        while (contentIndexResult.firstChild) {
            contentIndexResult.firstChild.remove();
        }
    }
    starter() {
        this.blockVisible(resultBlock, 'block');
        this.blockVisible(analyticLink, 'none');
        this.blockVisible(errorBlock, 'none');
        this.blockVisible(emptyBlock, 'none');
        this.blockVisible(buttonMoreContainer, 'none');
        this.blockVisible(preloaderBlock, 'flex');
        input.setAttribute('disabled', true);
    }
    newsError() {
        this.blockVisible(preloaderBlock, 'none');
        this.blockVisible(analyticLink, 'none');
        this.blockVisible(buttonMoreContainer, 'none');
        this.blockVisible(errorBlock, 'flex');
        input.removeAttribute('disabled');
    }
    newsEmpty() {
        this.blockVisible(errorBlock, 'none');
        this.blockVisible(preloaderBlock, 'none');
        this.blockVisible(analyticLink, 'none');
        this.blockVisible(buttonMoreContainer, 'none');
        this.blockVisible(emptyBlock, 'flex');
        input.removeAttribute('disabled');
    }
    newsVisible() {
        this.blockVisible(preloaderBlock, 'none');
        this.blockVisible(errorBlock, 'none');
        this.blockVisible(emptyBlock, 'none');
        this.blockVisible(analyticLink, 'flex');
        input.removeAttribute('disabled');
    }
    blockVisible(block, style) {
        block.style.display = style;
    }
    checkLocalstorage() {
        for (let key in localStorage) {
            if (key.includes('answer')) {
                return true;
            }
        }
    }
}