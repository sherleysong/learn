require('./index.scss');


class box {

    constructor(option) {
        const buttonsDefault = {
            '1': {
                'txt': 'ok',
            }
        };
        this.id = option.id || 'box';
        this.width = option.width || '300px';
        this.text = option.text || '';
        this.title = option.title || '';
        this.buttons = option.buttons || buttonsDefault;
    }

    open() {
        if (document.getElementById(this.id)) return

        const outDOM = document.createElement('div');
        outDOM.id = this.id;
        outDOM.className = "box";
        outDOM.style.width = this.width;
        outDOM.style.height = this.height;

        let _html = "<header>" + this.title + "</header>"
        _html += "<section>" + this.text + "</section>";
        if (this.buttons) {
            _html += "<footer>"
            for (let button in this.buttons) {
                _html += "<button "
                if (this.buttons[button].func)
                    _html += "onclick=" + this.buttons[button].func
                else {
                    // _html += "onclick=" + "$('#"+this.id+"').remove()"
                    const nodeName = "document.getElementById('"+this.id+"')"
                    _html += "onclick=" + nodeName +".parentNode.removeChild("+nodeName+")"
                }
                _html += ">" + this.buttons[button].txt + "</button>"
            }
            _html += "</footer>"
        }
        outDOM.innerHTML = _html
        document.body.appendChild(outDOM);
    }
}

export default box