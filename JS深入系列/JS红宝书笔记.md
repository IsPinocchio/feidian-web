**基本上，所有JS数据类型都拥有valueOf和toString这两个方法，null除外。它们俩解决javascript值运算与显示的问题**

所有对象继承了两个转换方法：

**第一个是toString(),它的作用是返回一个反映这个对象的字符串**

**第二个是valueOf(),它的作用是返回它相应的原始值**

## 第五章 引用类型

引用类型的值（对象）是引用类型的一个实例。与`类`相似。

ECMAScript提供了很多原生引用类型（例如Object）

### 5.1 Object类型

对象在JS中被称为引用类型的值。object是一个基础类型，其他所有类型都从object继承了基本的行为。

#### 5.1.1 创建Object实例有两种方式

* var person = new Object()     //使用new操作符后跟Object构造函数
* var person = {}    // 使用对象字面量表示法，属性名加不加引号都可以。

在对象中，可以用`typeof obj.prop == 'string' | 'number'...`来判断有没有这个属性

#### 5.1.2 访问对象属性

* 点表示法（更推荐）：obj.name    
* 方括号法：obj["name"]
  * 方括号主要优点是可以用过变量来访问属性，例如：var a = "name"，obj[a] == obj["name"]。当属性名中包含会导致语法错误的字符时（比如字符间有空格）， 用方括号表示法会比较好。

### 5.2 Array类型

#### 5.2.1 创建Array类型的两种方式

* var arr = new Array(nums|...arr:Sring) //预先知道项目数量的话，可以添加nums参数设置。或者可以预先设置里面有的项。也可省略new  ：`var arr = Array()` 
* var arr = []

#### 5.2.2 数组的length属性

`arr.length` 既可以读也可以写，设置小于原本长度时会删掉后面的项，设置大于原本长度时，会往后添加项(undefined)

也可以直接在大于长度的后面直接设置值。arr[arr.length+n] = number，数组的长度会变为arr.length+n+1

#### 5.2.3 检测数组

Array.isArray(arr)

#### 5.2.4 数组的方法

**转换方法**

* arr.toSring()：返回以逗号分隔的字符串

* arr.valueof()：返回数组

* arr.toLocaleString()：返回以逗号分隔的字符串

* arr.join('')：返回以规定符号分隔的字符串

**栈方法**

* arr.push('','' ...)  返回修改后数组的长度
* arr.pop() 移除最后一项，返回移除的项

**队列方法**

* arr.shift()  移除第一项，返回移除的项
* arr.unshift 在前端添加一项，返回修改后数组的长度

**重排序**

* `arr.sort()`，sort()方法会调用每个数组项的toString()，然后进行比较，也就是比较的是ascaII码。

因此sort()可以接受一个比较函数作参数。当比较函数返回1时会调换顺序。

* `arr.reverse()`可直接反转函数，哪怕没有顺序。

**操作方法**

* var narr = arr.concat('',[])。该方法先创建当前数组的一个副本，后将接收到的参数添加至末尾。
* var narr = arr.slice(start, [end])  返回从索引start到end前一个形成的数组
* var narr = arr.splice(start,len,...[]) 返回从索引start算起长度为len的数组，原数组arr会被切割

**位置方法**

* arr.indexOf(item,[index]) ，从索引inedx起，往后找，找item，返回索引值
* arr.lastIndexOf(item,[index])  从索引index起，往前找，找item，返回索引值

**迭代方法**

* every() 若每一项返回true，则返回**true**
* filter()  返回true的项组成的**数组**
* forEach() 每一项运行一个函数，**无返回值**
* map() 返回每次项调用函数的结果组成的**数组**
* some() 若有一项返回true，则返回**true**

**缩小方法**

两者差异仅是左开始和从右开始

* reduce(func(prev,cur,index,array),initvalue) 迭代数组的所有项，返回最终迭代值。 
* reduceRight()

**查找方法**

* arr.find(item => item == **)  查找符合条件的元素，返回的是该元素或引用类型。

### 5.3 Date类型

Date类型使用自UTC 1970年1月1日零时开始经过的毫秒数来保存日期。

#### 5.3.1 创建Date的方式

`var now = new Date()`，其可以接受参数（毫秒数），返回特定的时间。

#### 5.3.2 Date的方法

* Date.parse() 接收一个表示日期的字符串参数，返回相应日期的毫秒数
* Date.UTC()  其有固定的参数形式表示日期，返回响应日期的毫秒数
* Date.now() 返回调用这个方法时的毫秒数  （与 `+new Date()`  相同 ）
* d.toLocaleString() 会按照浏览器设置的地区相应的格式返回日期和时间
* d.toSring() 会返回带有失去信息的日期和时间
* d.valueOf() 会返回毫秒数  （日期做比较的时候会自动调用valueOf)
* getFullYear() 取得4位数的年份
* getMonth() 取得月份（0是一月，11是12月）
* getDate() 返回几号
* getDay() 返回星期几 （0是周日，6是周六）
* getHours()
* getMinutes()
* getSeconds()

### 5.4 RegExp类型

#### 5.4.1 匹配模式

* `g` 全局模式，即 并非在发现第一个匹配项时就停止
* `i` 不区分大小写
* `m` 多行模式，即到达一行末尾会继续查找下一行

#### 5.4.2 字面量和构造函数创建的区别

```javascript
var re = null
for(var i = 0; i < 10; i++){
    re = /cat/g                    //注意使用字面量形式时不用加引号
    re.test('catastrophe')
}
for(var i = 0; i < 10; i++){
	re = new RegExp('cat',g)
    re.test('catastrophe')
}
```

正则表达式字面量始终会共享同一个RegExp实例，使用构造函数创建的新实例都是独立的。

所以第一个循环在第二次调用是从索引为3的字符开始的，因此找不到。

.

.

.

未完待续



### 5.5 Function类型

由于函数是对象，因此函数名实际上也是一个指向函数对象的**指针**

#### 5.5.1 定义函数的方式

* function sum () {}  ：函数声明，解析器会率先读取函数声明，并使其在执行任何代码之前可用
* var sum = function() {} ：函数表达式 ，只有等到解析器执行到它时，才会真正被解释执行
* var sum = new Function("","","")  使用Function构造函数。前面参数是函数的参数，最后一个参数是函数体（不推荐，会解析两次）

**没有函数重载，后面定义的函数会覆盖前面定义的函数。**

**要访问函数的指针而不执行函数的话，必须去掉函数名后面的那对圆括号**（把函数作为参数传递时）

#### 5.5.2 函数内部属性

在函数内部，有两个特殊的对象：arguments和this

* arguments是一个类数组对象，包含传入函数中所有的参数，其有一个名叫callee的属性，是一个指针，指向拥有这个arguments的函数
* this 引用的是函数据以执行的环境对象。this的指向在函数创建的时候是决定不了的，在调用的时候才能决定，谁调用的就指向谁
  * 如果一个函数中有this，但是它没有被上一级的对象所调用，那么this指向的就是window，这里需要说明的是在js的严格版中this指向的不是window，但是我们这里不探讨严格版的问题，你想了解可以自行上网查找。
  * 如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象。
  * 如果一个函数中有this，**这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象**
* caller 这个属性保存着调用当前函数的函数的引用，如果是全局作用域中调用当前函数，则它的值为null
* length 其返回的是函数希望接受的命名参数的个数
* apply()和call()以及bind()，都是在特定作用域中调用函数，实际上等于设置函数体内this对象的值



### 5.6 基本包装类型

实际上，每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象。

例如：`var s1 = "some text"` `var s2 = s1.substring(2)`

逻辑上，基本类型不是对象，不应该有方法，但却可以调用方法。实际上，在读取模式中，后台会自动完成以下处理：

* 创建String类型的一个实例    `new String("some text")`
* 在实例上调用指定的方法
* 销毁这个实例

使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。这以为这我们不能再运行时为基本类型添加属性和方法。



### 5.7 Boolean类型

布尔表达式中所有对象都会被转换为true。

```javascript
var falseobj = new Boolean(false)
var result = faluseobj&&true
alert(result)   //true
```



### 5.8 Number类型

* num.toString(x)   参数x表示化为x进制用字符串表示
* num.toFixed(x)    参数x表示按照指定的x小数位返回数值以字符串表示
* num.toExponential(x)  返回以指数表示法表示的字符串，x指定小数位数
* num.toPrecision(x)  x表示数值的所有数字的位数（不包括指数部分），然后返回以上合适的格式

### 5.9 String类型

* str.charAt(index) 返回给定位置的那个字符
* str.charCodeAt(index)  返回给定位置的那个字符的Ascii码
* str1.concat(str2,str3...)

**以下三个对原始字符串没有任何影响，会返回一个新的切割出来的子串**

* str.slice(start,[end])    //不包括end
* str.substr(start,[length])
* str.substring(start,[end])

**位置方法**

* str.indexOf(子串,[start])
* str.lastIndexOf(子串,[start])

.

.

.

还有很多方法



### 5.10 单体内置对象

内置对象指“由ECMAScript实现提供的、不依赖于宿主环境的对象，这些对象在ECMAScript程序执行之前就已经存在了，例如Object Array String ”，以及**两个单体内置对象**Global（全局）和Math（在所有代码执行之前，作用域中就存在了这两个对象）。

* **Global**：该对象的encodeURI()和encodeURIComponent()方法可以对URI（通用资源标识符）进行编码，以便发送给浏览器。

  * eval()方法中创建的任何变量或函数都不会被提升

* **Math**：

  * Math.max()
  * Math.min()
  * Math.ceil() | floor() | round()
  * Math.random()

  ....



## 第六章 面向对象的程序设计

ECMA-262把对象定义为：无序属性的集合，其属性可以包含基本值、对象或者函数

ECMA-262定义只有内部才用的**特性**时，，描述了**属性**的各种**特征**，这些特性是为了实现JS引擎用的

ECMAScript中有两种属性：数据属性和访问器属性

### 6.1 理解对象

#### 6.1.1 属性类型

1. **数据属性**：数据属性包含一个数据值的位置。可读取和写入。

* Configurable：能否通过delete删除属性而重新定义属性
* Enumerable：能否枚举的属性。能否通过for-in循环返回属性
* Writable：能否修改属性的值
* Value：包含这个属性的数据值

要修改属性默认的特性，就必须使用 `Object.defineProperty(属性所在对象,属性的名字,一个描述符对象)` 方法。描述符对象的属性必须是以上四个，设置其中一个或多个。

```javascript
var person = {}
Object.defineProperty(person,"name",{
    configurable:false,
    value:'Nicholas'
})
```

一旦把属性定义为不可配置的，就不能再把它变回可配置了。

2. **访问器属性**：访问器属性不包含数据值，而包含一对get和set函数。

   在读取访问器属性时，会调用get函数，这个函数负责返回有效的值

   在写入访问器属性时，会调用set函数并传入新值

```javascript
var book = {
  year:1000,      
  edition:1
}
Object.defineProperty(book,"year",{
  get:function(){
    return this._year    //前面的下划线是常用的记号，表示只能通过对象方法访问的属性。
  },
  set(newvalue){
    this._value = newvalue
  }
})
book.year = 1444
console.log(book.year);
```

这里如果get和set的year前没有下划线，那么会造成栈溢出错误，因为set中this.year会导致重复递归函数。

#### 6.1.2 定义多个属性

```javascript
var book = {}
Object.defineProperties(book,{
    _year:{
        value:1000
    },
    edition:{
        value:1
    },
    year:{
        get(){
            return this._year
        },
        set(newvalue){
			this._year = newvalue
        }
    }
})
```

该方法与上面定义的结果是一样的。唯一的区别是这里的属性都是在同一时间创建的。

#### 6.1.3 读取属性的特性

`var des = Object.getOwnPropertyDescriptor(obj,"prop")`，返回的是一个对象，可访问这个四个特性或get和set

### 6.2 创建对象

虽然Object构造函数或对象字面量可以用来创建单个对象，但使用同一个接口创建很多对象，会产生大量的重复代码。

#### 6.2.1 工厂模式

```javascript
function createPerson (name,age){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.getName = function() {
        console.log(this.name)
    }
    return o;
}
var person1 = createPerson("Pinocchio",14)
```

他虽然解决了创建很多相似对象的问题，但却没有解决对象识别问题，因为所有实例都指向一个原型。

#### 6.2.2 构造函数模式

```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
    this.getName = function(){console.log(this.name);}
}
var person1 = new Person("Pinocchio",14)
```

**优点：**每个实例可以识别为一个特定的类型。    **缺点**：每次创建实例时，每个方法都要被创建一次。

这种方式会经历以下四个步骤：

* 刻在堆内存中创建一个新的对象
* 将构造函数的作用域赋给新对象（因此this指向这个新对象）
* 执行构造函数中的代码（为这个新对象添加属性）
* 将新建的对象作为返回值

`alert(person1 instanceof Object); //true` 所有对象都是Object实例，同时person1也是Person的实例

#### 6.2.3 构造函数模式的优化

```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
    this.getName = getName
}
function getName(){
    console.log(this.name)
}
var person1 = new Person("Pinocchio",14)
```

**优点：**解决了每个方法都要被重新创建的问题。     **缺点：**这就没有封装的效果了。别的人也可以用getName函数。

#### 6.2.4 原型模式

每个函数都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象。

```javascript
function Person(){
    Person.prototype.name = "Pinocchio";
    Person.prototype.age = 14;
    Person.prototype.getName = function(){console.log(this.name);}
}
var person1 = new Person();
var person2 = new Person();
alert(person1.getName == person2.getName);   //true
```

**优点：**方法不会被重新创建 。    **缺点：**所有属性和方法都共享，无法初始化参数。比如原型中有一个引用类型，那么一个实例属性的改变会导致另一个实例属性也发生改变。

##### 6.2.4.1 理解原型对象

创建一个**新函数**时，就会以特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。

默认情况下，所有原型对象都会自动获得一个constructor(构造函数)属性，**这个属性包含**一个指向prototype属性所在函数的**指针**。

**注意：在找原型对象时，构造函数用的是prototype，对象实例用的是`__proto__`**

当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。

![prototype3](D:\大前端\JS深入系列\图\prototype3.png)

如果实例的原型里也没有找到。由于实例的原型也是对象，因此原型对象也有自己的原型对象。

![prototype5](D:\大前端\JS深入系列\图\prototype5.png)

当获取 person.constructor 时，其实 person 中并没有 constructor 属性,当不能读取到constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性，所以：

```
person.constructor === Person.prototype.constructor
```

* `Object.getPrototypeOf()` 可以方便得取得一个对象的原型。

```javascript
alert(Object.getPrototypeOf(person1) == Person.prototype);  //true
```

在实例中添加一个原型中有的属性或将其设为null，会屏蔽原型对象中保存的同名属性，且不会修改原型里的属性。除非用delete删除实例中的属性才可以继续访问原型中的属性。

* `person1.hasOwnProperty('name')` 如果实例中有该属性，则返回true，不会考虑原型中是否有。

* `"name" in person1` in操作符可以单独使用也可在for-in中使用。in会在通过对象能访问到给定属性时返回true，无论在实例还是原型里。

* `Object.keys(obj)` 会返回一个包含所有可枚举属性的字符串数组，不包含原型。
* `Object.getOwnPropertyNames()` 会返回所有实例属性，不管是否可枚举的字符串数组。

#### 6.2.5 组合模式：使用构造函数+原型模式

构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性。

```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
    this.friends = ['li','wang'];
}
Person.prototype = {
    constructor:Person;
    sayName(){
        alert(this.name)
    }
}
var person1 = new Person('dsa',23)
```

**优点：**该共享的共享，该私有的私有，使用最广泛的方式。

**缺点：**没有写在一起，即更好的封装性

#### 6.2.6 动态原型模式

```javascript
function Person(name,age){
	this.name = name;
    this.age = age;
    if(typeof this.sayName != "function"){
        Person.prototype.sayName = function(){
            alert(this.name)
        }
    }
}
var person1 = new Person('dsa',14)
```

**优点：**将组合模式更好的封装起来。

上面用if判断，是防止每次new Person()时都调用一次Person.prototype.sayName=function(){}。

加个if判断，就只有在第一次new Person()时，构建一次sayName函数。第二次再new Person()时，由于原型链上已经有sayName函数了，typeof this.sayName等于'function'，就不用再构建sayName函数了。

#### 6.2.7 寄生构造函数模式

寄生在构造函数的一种方法。

```javascript
function SpecialArray(){
    var values = new Array();
    values.push(...arguments);
    values.toPipedString = function(){
        return this.join('|')
    }
}
var colors = new SpecialArray('red','blue','green')
```

这样方法可以在特殊情况下使用。比如我们想创建一个**具有额外方法的特殊数组**但是又不想直接修改Array构造函数，我们可以这样写。

但是这种 `new` 出来的对象与构造函数或者与构造函数的原型属性之间没有关系。

#### 6.2.8 稳妥构造函数模式

```javascript
function person(name){
    var o = new Object();
    o.sayName = function(){
        console.log(name);
    };
    return o;
}
var person1 = person('kevin');
person1.sayName(); // kevin
person1.name = "daisy";
person1.sayName(); // kevin
console.log(person1.name); // daisy
```

所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。

### 6.3 继承的多种方式

#### 6.3.1 原型链继承

主要思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

让**一个原型对象**等于**另一个类型的实例**，那么此时原型对象将包含一个指向另一个原型的指针。

```javascript
function Parent(){
    this.name = 'lyk'
}
Parent.prototype.getName = function(){
	console.log(this.name)
}

function Child(){
}
Child.prototype = new Parent()
var child = new Child()
console.log(child.name)  //lyk
```

**缺点：**引用类型的属性被所有实例共享，例如

```javascript
function Parent(){
	this.names = ['lyk','whj','wy']
}
function Child(){}
Child.prototype = new Parent()
var c1 = new Child()
c1.names.push('aaa')
var c2 = new Child()
console.log(c2.names)  //['lyk','whj','wy','aaa']
```

#### 6.3.2 借用构造函数

```javascript
function Parent(){
	this.names = ['lyk','whj',,'wy']
}
function Child(){
	Parent.call(this)
}
var c1 = new Child()
c1.names.push('aaa')
var c2 = new Child()
console.log(c2.names)  //['lyk','whj','wy']
```

**优点：**避免了引用类型的属性被所有实例共享的问题，还可以在Child中向Parent传参

**缺点：**方法都在构造函数中定义，每次创建实例都会创建一遍方法

#### 6.3.3 组合继承

即原型链和借用构造函数组合到一起。

基本思想即：使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。

```javascript
function Person(name){
	this.name = name;
    this.colors = ['red','blue']
}
Person.prototype.getName = function(){
    console.log(this.name)
}
function Child(name,age){
	Person.call(this,name)
    this.age = age;
}
Child.prototype = new Person()

var c1 = new Child('wy',14)
```

**优点：**融合了原型链继承和借用构造函数继承，解决了方法每次重建的问题。**最常用的继承方式。**

#### 6.3.4 原型式继承

即：将一个对象传入createObj中，让**传入的对象**变成这个函数返回的**新对象的原型**。

```javascript
function createObj(o){
    function F(){}
    F.prototype = o;
    return new F();
}
var person = {
	name:'lyk',
    colors:['red','blue']
}
var person1 = createObj(person)
var person2 = createObj(person)
person1.name = "abc"
console.log(person2.name)  // lyk
person1.colors.push('green')
console.log(person2.color)  // ['red','blue','green']
```

**缺点：**引用类型的属性值会共享

**注意：**修改name值，person2未发生改变，并不是因为person1和person2有独立的name值，而是因为`person1.name ='abc'` 是给person1实例添加了name属性值，并非修改了原型上的name值

#### 6.3.5 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

```javascript
function createObj (o) {
    var clone = Object.create(o);   //Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```

**缺点：**跟借用构造函数模式一样，每次创建对象都会创建一遍方法

#### 6.3.6 寄生组合式继承

组合式继承最大的问题是，无论怎么样都会调用两次超类型构造函数，一次是创建子类型原型时，一次是子类型构造函数内部。

如果我们不使用 Child.prototype = new Parent() ，而是间接的让 Child.prototype 访问到 Parent.prototype 呢？

```javascript
function Parent (name) {
    this.name = name;
    this.colors = ['red','blue'];
}
Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child(name,age) {
    Parent.call(this, name);
    this.age = age;
}

function prototype(child,parent){
	var prototype = Object.create(parent.prototype);   //创建对象
    prototype.construtor = child;					   //增强对象
    child.prototype = prototype						   //制定对象
}
prototype(Child,Parent)

var child1 = new Child('lyk',14)
```

这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式，最大限度的节省了内存空间。

## 第七章

## 第八章 BOM

BOM的核心对象是window。既是通过 JavaScript 访问浏览器窗口的一个接口，又是 ECMAScript 规定的 Global 对象。与全局对象的区别在于window对象的属性可以delete

### 8.1 window对象

全局变量不能通过delete删除，而直接在window对象上定义的属性可以。

```javascript
var age = 10;
window.color = 'red';

delete window.age   //返回false
delete window.color //返回true
```

#### 8.1.2窗口关系及框架

<framestet>标签是框架集的意思。通过使用框架，你可以在同一个浏览器窗口中显示不止一个页面。每份HTML文档称为一个框架，并且每个框架都独立于其他的框架。

可以通过`window.frames`或者`frames`获得框架集，包含了每一个文档的window对象。

top对象始终指向最外层的框架。`top.frames`

parent对象始终指向当前框架的直接上层框架。`window.parent`也可能等于top

#### 8.1.3 窗口位置

* window.screenLeft：保存窗口相对于屏幕左边的位置
* window.screenTop：保存窗口相对于屏幕上边的位置
* window.scrollY：保存竖着的滑条的位置
* window.scrollX：保存横着的滑条的位置

#### 8.1.4 窗口大小

* window.innerWidth：页面视图区的大小
* window.innerHeight
* window.outerWidth：浏览器窗口本身的大小
* window.outerHeight

#### 8.1.5 导航和打开窗口

* window.open()可以导航到一个特定的URL，也可打开一个新的浏览器窗口。该方法接受4个参数：要加载的URL，窗口目标，一个特性字符串以及一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值。通常值传递第一个参数，最后一个参数只在不打开新窗口的情况下使用。**传递了第二个参数，而该参数是已有窗口或框架的名称，就会在该窗口或框架中加载指定URL，否则就会打开新窗口加载**。如果第二个参数不是已存在的窗口或框架，就会根据第三个参数（有特定的）创建一个新窗口或新标签页。
* window.close()可以关闭窗口。
* 检测弹出的窗口屏蔽

#### 8.1.6 间歇调用和超时调用

JavaScript是单线程语言，允许设置超时值和间歇时间来调用代码。前者是在指定时间过后执行代码，后者是每个指定的时间就执行一次代码。

**超时调用需调setTimeout()方法**。该方法第二个参数告诉JavaScript再过多长时间就把当前任务添加到队列中，如果队列是空的，那么添加的代码会立即执行，如果不是空的，就要等前面的代码执行完了以后再执行。

调用setTimeout()之后，该方法会返回一个数值ID，表示超时调用。这个ID是计划执行代码的唯一标识符，可以通过它来取消尚未执行的超时调用计划。

```javascript
var id = setTimeout(function(){},1000);
clearTimeout(id)    //取消超时调用计划
```

**间歇调用需要setInterval()方法**。只不过他会按照指定时间间隔重复执行代码，知道间歇调用被取消或页面被卸载。setInterval()同样会返回一个间歇调用ID，可以用其来取消间歇调用计划。

```javascript
var id = setInterval();
clearInterval(id)  //取消间歇调用计划
```

#### 8.1.7 系统对话框

通过这几个方法打开的对话框是同步和模态的。也就是说，显示这些对话框的时候代码会停止执行，关掉这些对话框后代码又会恢复执行。

* alert()：会显示指定的文本和 ‘确定’ 按钮
* confirm()：会显示指定文本和 ‘确定’ 按钮和 ‘取消’ 按钮，可以检查confirm()返回的布尔值。
* prompt()：在comfirm的基础上多了一个文本输入区域。点击OK会返回输入值，点击取消或者叉掉会返回null。

### 8.2 location对象

location对象提供了与当前窗口中加载的文档有关的信息，以及一些导航功能。他既是window对象的属性也是document对象的属性。window.location和document.location引用的是用一个对象。

`location`对象的属性

- `hash`
- `host`：返回服务器名称和端口号
- `hostname`：与`host`不同的是，不带端口号
- `href`：返回当前加载页面的完整url
- `pathname`: 返回URL中的目录和（或）文件名
- `port`
- `protocol`：返回页面使用的协议（http,https）
- `search`：返回URL的查询字符串，这个字符串以`?`开头

#### 8.2.1 查询字符串参数

由于search只能得到一个字符串，无法分解内容，所以可以自己解析。

* 去掉问号
* 根据`&`符号分隔字符串
* 根据`=`分隔子字符串
* 赋值到对象里

```javascript
function getQuery(){
    var q = (location.search.length > 0 ? location.search.substing(1):'');
    var res = {};
    var items = q.length?q.split('&'):[];
    for(let i = 0; i < items.length; i++){
		var item = items[i].split('=');
        var key = item[0];
        var value = item[1];
        if(item.length){
			res[key] = value;
        }
    }
    return res;
}
```

#### 8.2.2 位置操作

location.assign(url) 可以打开新的url并在浏览器的历史记录中生成一条记录。

location.href或window.location设为一个url值，会以该值调用assign方法。加载新的url页面。

每次修改lacation的属性（hash除外），页面都会以新的url重新加载，并生成新的一条历史记录，因此用户通过单击”后退“都会导航到前一个页面。

若要阻止“后退”操作，可以使用`location.replace(url)`方法，会导致浏览器位置改变，但不会在历史记录中生成新的记录。

* location.reload()会重新加载当前页面。如果页面自上次请求以来没有发生改变，则页面会从浏览器缓存中加载。如果要强制从服务器重新加载，则需要添加参数true。`location.reload(true)`

### 8.3 navigator对象

**该对象的属性通常用于检测显示网页的浏览器类型**

`appCodeName`: 浏览器的名称，通常都是Mozilla

`appMinorVersion`：此版本信息

`appName`: 完整的浏览器名称

`appVersion`：浏览器的版本

`buildID`：浏览器编译版本

`cookieEnabled`：表示`cookie`是否可用

`cpuClass`：客户端计算机中使用的CPU类型

`javaEnabled()`：表示当前浏览器中是否启用了java

`language`: 浏览器的主语言

`mimeTypes`：浏览器中注册的MIME类型数组

`onLine`：表示浏览器是都连接到因特网

`oscpu`：客户端计算机的操作系统或使用的CPU

`platform`：浏览器所在的系统平台

`plugins`：浏览器中安装的插件信息的数组

`preference()`：设置用户的首选项

`systemLanguage`：操作系统的语言

`userAgent`：浏览器的用户代理字符串

#### 8.3.1 检测插件

对于非IE浏览器，可使用plugins数组来达到这个目的。该数组每一项都包括下列属性：

* name：插件的名字
* description：插件的描述
* filename：插件的文件名
* length：插件所处理的MIME类型属性

#### 8.3.2 注册处理程序

* `navigation.registerContentHandler()`
* `navigation.registerProtocolHandler()`

这两个方法可以让一个站点指明它可以处理特定类型的信息。注册处理程序就为像使用桌面应用程序一样默认使用这些在线应用程序提供了一种方式、

### 8.4 screen对象

screen对象基本上只用来表明客户端的能力，其中包括浏览器窗口外部的显示器的信息，如像素宽度和高度等。

### 8.5 history对象

history对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。

由于history是window的属性，所以每个浏览器窗口、每个标签页乃至每个框架都有自己的history。

出于安全考虑，开发人员无法得知用户浏览过的url，但借用用户访问过得页面列表，同样可以在不知道实际url的星狂下实现后退和前进。

```javascript
//后退一页
history.go(-1);
//前进一页
history.go(1);
//前进两页
history.go(2);
//跳转到最近的 wrox.com 页面
history.go("wrox.com");
//跳转到最近的 nczonline.net 页面
history.go("nczonline.net");
//后退一页
history.back();
//前进一页
history.forward();
```

if (history.length == 0) {
//这应该是用户打开窗口后的第一个页面
}

history的length户型保存着历史记录的数量。