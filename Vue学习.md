## MVVM模式的实现者

- Model：模型层，这里代表JS对象。
- View：视图层，这里表示DOM(HTML操作的原型)
- ViewModel：连接视图和数据的中间件，vue.js就是MVVM中的ViewModel层的实现者。

在MVVM架构中，是不允许数据和视图直接通信的，只能通过ViewModel来通信，而ViewModel就是定义了一个Observer观察者。

- ViewModel能够观察到数据的变化，并对视图对应的内容进行更新。
- ViewModel能够监听视图的变化，并能够通知数据发送改变。

至此，我们就明白了，Vue.js就是一个MVVM的实现者，它的核心就是实现了DOM监听与数据绑定。

## 为什么要使用MVVM

MVVM模式和MVC模式一样，主要目的是分离视图(view)和模型(Model)，有几大好处

低耦合：视图(View)可以独立于Model变化和修改，一个ViewModel可以绑定到不同的view上。当view改变的时候model可以不变，当modle改变的时候view也可以不变。

可复用：你可以把一些视图逻辑放到一个ViewModel里面，让很多view重用这段视图逻辑。

独立开发：开发人员可以专注于业务逻辑和数据开发(ViewModel)，设计人员可以专注于页面设置。

可测试：界面素来是比较难于测试的，而现在测试可以针对ViewModel来写。

## View

​	view是视图层，也就是用户界面。前端主要由HTML和CSS来构建，为了更方便地展现ViewModel或者Model层的数据，已经产生了各种各样的前后端模块语言。比如FreeMarker，Thymeleaf等等，各大MVVM架构如Vue.js，AngularJS，EJS等也都有自己用来构建用户界面的内置模板语言。

## Model

​	Model是指的数据模型，泛指后端进行的各种业务逻辑处理和数据操控，主要围绕数据库系统展开。这里的难点主要在于需要和前端约定统一的接口规则。

## V-bind

```js
V-bind:title="message"
<div id="app">
    <span v-bind:title="message">
        鼠标悬停几秒
    </span>
</div>
var vm1 = new Vue({
    el: "#app",
    data: {
        message: "hello,vue!",
    },
});
```

## V-if  V-else if V-else

```js
<div id="app1">
    <h1 v-if="type==='A'">A</h1>
    <h1 v-else-if="type==='B'">B</h1>
    <h1 v-else="type==='C'">C</h1>
</div>
var vm2 = new Vue({
    el: "#app1",
    data: {
        type: "A",
    },
});
```

## V-for

```js
<div id="app">
    <li v-for="(item,index) in items">
        {{item}}--{{index}}
    </li>
</div>
var vm1 = new Vue({
    el: "#app",
    data: {
        items:[1,2,3]
    },
});
```

## V-model

你可以用v-model指令再表单input  texterea 及select元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但v-model本质上不过是语法糖。它负责监听用户的输入事件以及更新数据，并对一些极端场景进行一些特殊处理。

注意：v-model会忽略所有表单元素的value，checked，selected特性的初始值而总是将Vue实例的数据作为数据来源。你应该通过JS在组件的data选项中声明初始值。

```js
<div id="app">
    <input type="text"  v-model="message"> {{message}}
	<input type="radio" v-model="message" value="1">男
	<input type="radio" v-model="message" value="2">女
	{{message}}
</div>
var vm = new Vue({
    el: '#app',
    data: {
        message: ''
    },
});

<div  id="app1" >
    <select name="" v-model='checked'>
        <option disabled value="">--请选择--</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
    </select>
    <span>{{checked}}</span>
</div>
var vm1 = new Vue({
    el: '#app1',
    data: {
        checked: ''
    }
});
```

注意:如果v-model表达式的初始值未能匹配任何选项，<select>元素将被渲染为"未选中状态"。在ios中，这会使用户无法选择第一个选择。因为这样的情况下，ios不会触发change事件。因此，更推荐像上面这样提供一个值未空的禁用选项。

## 什么是计算属性(Computed)

她就是一个能够将计算结果缓存起来的属性(将行为转换成静态的属性),仅此而已;可以想象未缓存

methods： 调用方法使用currentTime()，需要带括号

computed：调用属性使用currentTime2，不需要带括号；this.message是为了能够让currentTime观察到数据变化而变化

​	如何在方法中的值发生了改变，则缓存就会刷新！可以控制台使用vm.message="qinjiang"，改变下数据的值，再次测试观察效果！

结论：

​	调用方法时，每次都需要进行计算，既然有计算过程则必定产生系统开销，按如果这个结果是不经常变化的呢？此时就可以考虑把这个结果缓存起来，采用计算属性可以很方便的做到这一点，计算属性的主要特征就是为了将不经常变得计算结果进行缓存，以节约我们的系统开销。

## 组件化开发

```js
  <div id="app">
       <button-counter></button-counter>
       <Hello-world></Hello-world>
  </div>

  <script type="text/javascript">
    /*
        组件注册注意事项
        如果使用驼峰命名组件，那么在使用组件的时候，只能在字符串中用驼峰的方式使用组件，
        但是在普通的标签模块中，必须使用短横线的方式使用组件
    */
    Vue.component("HelloWorld",{
        data:function(){
            return{
                msg:"HelloWorld"
            }
        },
        template:`<div>{{msg}}</div>`
    })
    Vue.component("button-counter",{
        data:function(){
            return{
                count:0
            }
        },
        template:`
            <div>
                <button @click="handle">点击了{{count}}次</button>
                <button>测试123</button>
                <HelloWorld></HelloWorld>
            </div>
        `,
        methods:{
            handle:function(){
                this.count+=2;
            }
        }
    })
    var vm = new Vue({
      el: '#app',
      data: {
        message: 'hello,vue!'
      }
    });
  </script>
```

