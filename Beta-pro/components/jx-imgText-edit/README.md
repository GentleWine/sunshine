# jxImgTextEdit富文本编辑器插件使用说明

------

 1.引入插件所在的目录

    import jxImgTextEdit from '@/components/jx-imgText-edit/jx-imgText-edit.vue';
2.注册组件，可选择全局注册或者局部注册

    components:{
		jxImgTextEdit
	},
3.可以使用了

    <jxImgTextEdit ref="jxImgTextEdit" :editData="edits" @delImg="delImg"></jxImgTextEdit>
	
## 属性

| 名称             | 类型          | 默认值        | 描述                    |
| -----------------|--------------- | ------------- | ----------------     |
| maxlength        | Number         | -1            |文字输入最大字数        |
| placeText        | String         | 写点什么吧...  | 占位符                |
| editData         | Array          | []            | 显示的内容根据自己需求而定 |

    
> 该组件的一些参数
> *  editData属性 是很用必要传的，上传图片是在父组件中上传的，上传的图片储存在父组件数组中，然后传给jxImgTextEdit组件
  *  渲染页面，jxImgTextEdit组件接口 editData 属性的值 是一个数组，格式为{"type": "textarea","value": "文字"}，
  *  {"type": "img","value": "图片地址"}。editData 属性接受的数组中的元素为这两种。也可以根据自己的需求有所改动
> * 

