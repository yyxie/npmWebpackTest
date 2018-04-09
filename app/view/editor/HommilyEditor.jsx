import React, { Component } from 'react';
import HommilyEditor from 'hommilyeditor';
class HommilyEditorCom extends Component {

    constructor(props, context) {
        super(props, context);
        this.click = this.click.bind(this);
    }
    click(){
        const editor = this.refs.editor;

        console.log(editor.getFirstBlockText()) //拿第一段文本
        console.log(editor.getPlainText()) //拿到纯文本
        console.log(editor.saveHandle()) //拿到编辑器html内容
        //const  html = ""; 这里必须是 editor.saveHandle() 的返回值
        //editor.editHandle(html) 从html内容恢复编辑器内容
        //editor.onFocus()  得到焦点
    }
    createObjectURL=(file)=> {
        if (window.URL) {
            return window.URL.createObjectURL(file)
        } else {
            return window.webkitURL.createObjectURL(file)
        }
    }
    uploadImg=(file,callback)=> {
        debugger;
        // file 是 inputfile对象 需要上传以后，拿到 图片的url 传给callback
        const fileUrl = this.createObjectURL(file);
        debugger;
        callback(fileUrl)
    }
    render() {
        return <div> <HommilyEditor ref="editor" documentId="app" uploadImg = {this.uploadImg} />
            <button onClick={this.click}>点我呀</button> </div>;
    }
}
export default HommilyEditorCom;
