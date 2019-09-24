<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    export default {
      name: 'editor',
      props: {
        value: ''
      },
      data () {
        return {
          editorContent: ''
        }
      },

      methods: {
        getContent: function() {
            return this.editorContent;
        },
      },
      mounted() {
        let editor = new E(this.$refs.editor);
        editor.customConfig.onchange = (html) => {
        this.editorContent = html;
        };
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo',  // 重复
        ];
        editor.customConfig.zIndex = 1;
        editor.customConfig.uploadImgServer = '/upload';
        editor.create();
        if(this.value) {
          editor.txt.html(this.value);
          this.editorContent = editor.txt.html();
        }
      }
    }
</script>

<style lang="less">
.w-e-toolbar {
    flex-wrap: wrap !important;
}
.w-e-text-container {
  height: 466px !important;
  .w-e-text {
    padding: 0 30px;
  }
}
</style>