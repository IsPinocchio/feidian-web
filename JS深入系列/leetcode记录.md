# 数组篇

### leetcode88：合并两个有序数组

方法有很多，可以直接将nums2插入nums1后面然后排序，也可以利用双指针，直接将nums2的元素插入到nums1中合适的位置。

双指针：

```javascript
//目的是将nums2的元素都插入到nums1中，所以循环判断以n为主
var merge = function(nums1, m, nums2, n) {
    let len = m + n -1;
    m--;n--;
    while(n>=0){
        nums1[len--] = nums1[m] > nums2[n] ? nums1[m--] : nums2[n--]
    }
};
//这里用到，如果nums1的数组先用完的话，那么nums[负数]会成为undefined，在做比较时会转换成NaN，任何比较都会返回false
```

```javascript
// 这个主要是为了用一下splice和扩展符，所以步骤有点冗余。
var merge = function(nums1, m, nums2, n) {
    let len = m + n -1;
    m--;n--;
    while(m>=0 && n>=0){
        if(nums1[m] > nums2[n]){
            nums1[len--] = nums1[m--];
        }else{
            nums1[len--] = nums2[n--];
        }
    }
    if(n>=0){
        nums1.splice(0,n+1,...nums2.splice(0,n+1))
    }
    return nums1
};
```



### leetcode349：两个数组的交集

**`Set`** 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。`Set`对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set中的元素只会**出现一次**，即 Set 中的元素是唯一的。

Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例

```javascript
var intersection = function(nums1, nums2) {
    var newn =  nums1.filter((item) => {
        return nums2.indexOf(item)!=-1
    })
    return Array.from(new Set(newn))
};
```



### 腾讯：数组扁平化、去重、排序

面试题：

> 已知如下数组：var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
>
> 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

**数组扁平化即将多层嵌套的数组转化为只有一层**

```javascript
let res = Array.from(new Set(arr.flat(Infinity))).sort((a,b) => a-b)
```

扁平化：

* 递归实现：

  * ```javascript
    function flatten(arr){
        let res = [];
        for(let i = 0; i < arr.length; i++){
            if(Array.isArray(arr[i])){
                res.push(...flatten(arr[i]));
            }else{
                res.push(arr[i])
            }
        }
        return res;
    }
    ```

* `reduce` 实现

  * ```javascript
    function flatten(arr) {
      return arr.reduce((res,cur) => {
        return res.concat(Array.isArray(cur)? flatten(cur) : cur)
      },[])
    }
    ```

* 使用`...`扩展运算符，`...`可展开一层嵌套，如：...[1,2,[3,4]]结果是[1,2,3,4]，但...[1,[2,[3,4]]]结果是[1,2,[3,4]]

  * ```javascript
    function(arr){
        while(arr.some(item => Array.isArray(item)){
        	arr = [].concat(...arr)      
        })
    }
    ```

* ES6的flat() ，arr.flat(depth)  :参数depth是指定要扁平的层数，默认是1，可设参数为Infinity一直扁平到一层为止。

  * ```javascript
    var arr = arr.flat(Infinity)
    ```



### leetcode15：三数之和（中等）

用双指针实现O(n^2)

```javascript
var threeSum = function(nums) {
  nums.sort((a,b) => a-b);
  const res = [];
  for(let i=0; i<nums.length-2; i++){
      let n1 = nums[i];
      if(nums[i] > 0 ) break;
      if(i-1>=0 && nums[i] == nums[i-1]) continue;
      let l = i+1;
      let r = nums.length-1;
      while(l<r){
          let n2 = nums[l],n3 = nums[r];
          if(nums[i]+nums[l]+nums[r]==0){
              res.push([n1,n2,n3])
              while(l<r && nums[l]==n2) l++;
              while(l<r && nums[r]==n3) r--;
          }else if(nums[i]+nums[l]+nums[r] < 0){
              l++;
          }else{
              r--;
          }
      }
  }
  return res;
};
```



# 字符串篇

**下标不存在时，str[index]和str.charAt(index)的区别：**

* str[index]会返回undefined

* str.charAt(index)会返回""(空字符串)

### leetcode14：最长公共前缀

注意存在空数组的情况。既然判断最长的公共前缀，那么在恰当的位置终止循环是必要的。这里用到了数组的every()方法，以判断数组元素是否存在公共的元素。

```javascript
var longestCommonPrefix = function(strs) {
    let res = '';
    if(!strs.length) return res;
    for(let i=0 ;i<strs[0].length;i++){
        let flag = strs.every(item => item[i]==strs[0][i]);
        if(flag){
            res+=strs[0][i];
        }else{
            break;
        }
    }
    
    return res;
};
```

### leetcode415：字符串相加

为了尽可能的去熟悉各种方法，写的长了些。

先判断字符串长短，以进行补零操作。再从后往前位数相加，控制好进位，拼接字符串，最后取反得到结果。

```javascript
var addStrings = function(num1, num2) {
    if(num1.length > num2.length){
        [num1,num2] = [num2,num1];     //用到js的解构来进行数值调换很方便。
    }
    let l1 = num1.length;
    let l2 = num2.length;
    let num = new Array(l2-l1).fill(0).join('');   //根据差的位数来补零
    num1 = num + num1; 
    let f = 0;
    let res = ""
    for(let i = l2-1;i>=0;i--){
        if(Number(num1[i])+Number(num2[i])+f>=10){
            res+=String(Number(num1[i])+f+Number(num2[i])-10);
            f=1;
        }else{
            res+=String(Number(num1[i])+Number(num2[i])+f);
            f=0;
        }
    }
    if(f==1){
        res+='1';
    }
    res = res.split('').reverse().join('');  //字符串取反的基操
    return res;
};
```

### 百度：实现一个函数，判断输入是不是回文字符串

“*回文串*”是一个正读和反读都一样的*字符串*

**使用API**

```javascript
function isPlalindrome(str) {
  return str.split('').reverse().join('') === str;
}
```

**不使用API**

```javascript
function isPlalindrome(str) {
  let l = 0;
  let r = str.length-1;
  while(l<r){
      if(str.charAt(l) !== str.charAt(r)) return false;
      l++;r--;
  }
    return true;
}
```

### leetcode3：无重复字符串的最长子串

**解法一：**

经典的一道**动态规划**。既然是动态规划就要把每个状态想清楚。dp数组记录的则是**包含当前第i个字符**之前最长的无重复子串长度。

1）如果当前字符第一次出现，那么dp[i] = dp[i-1] + 1;

2）若当前字符不是第一次出现，则分两种情况：

* 当前字符上一次出现的位置在dp[i-1]所包含的字符串之外。l = dp[i-1] + 1
* 当前字符上一次出现的位置在dp[i-1]所包含的字符串之内    l = i - s.lastIndexOf(s[i],i-1)

这两种情况只能取长度最小的一个。

```javascript
var lengthOfLongestSubstring = function(s) {
    if(!s.length) return 0;
    if(s.length == 1) return 1;
    let dp = new Array(s.length).fill(1);   //初始化所有dp为1
    let res = 0;
    for(let i=1; i<s.length;i++){
        if(s.indexOf(s[i]) == i){
            dp[i] = dp[i-1]+1;
        }else{
            dp[i] =Math.min(i - s.lastIndexOf(s[i],i-1),dp[i-1]+1);
        }
        res = Math.max(res,dp[i]);
    }
    return res
};
```

**解法二：**滑动窗口

通过判断当前字符在窗口里是否出现过，来判断窗口的起点用不用改变。

```javascript
var lengthOfLongestSubstring = function(s) {
    let res = [];
    let ans = 0,start = 0;
    for(let i=0; i<s.length; i++){
        let p = s.indexOf(s.charAt(i),start);
        if( p < i){
            start = p + 1;
        }
        ans = Math.max(i-start+1,ans);
    }
    return ans;
};
```

### leetcode151：翻转字符串里的单词

这里处理多个空格的时候，split(' ')会分给数组多个空串，就需要额外判断一下。

```javascript
var reverseWords = function(s) {
    return s.split(' ').reverse().reduce((pre,cur) => {
        if(cur.length){
            return pre+cur+' '
        }else{
            return pre
        }
    },'').trim();

};
```

提前处理多个空格

```javascript
let reverseWords = (s)=> {
  return s.trim().replace(/\s+/g, ' ').split(' ').reverse().join(' ')
}
```

```javascript
var reverseWords = function(s) {
    return s.split(/\s+/g).reverse().join(' ').trim()
};
```

# 栈

### leetcode155：最小栈

```javascript
var MinStack = function() {
    this.stack = []
    this.min_stack = [Number.MAX_VALUE]
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x)
    if(x > this.min_stack[this.min_stack.length-1]) {
        this.min_stack.push(this.min_stack[this.min_stack.length-1])
    }else {
        this.min_stack.push(x)
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop();
    this.min_stack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length-1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min_stack[this.min_stack.length-1]
};
```

### leetcode20：有效的括号

```javascript
var isValid = function(s) {
    var a = [];
    var b = {')':'(','}':'{',']':'['};
    for(let i = 0 ; i < s.length ; i++){
        if(s[i] == '(' || s[i] == '{' || s[i] == '['){
            a.push(s[i]);
        }else {
            if(b[s[i]] == a[a.length-1]){
                a.pop()
            }else{
                return false
            }
        }
    }
    if(a.length == 0) return true;
    else return false;
};
```

b属性也可以用ES6的新增数据结构：map

```javascript
const map = new Map([    //可初始化数据，两两一对，任意类型
    [1,2],
    ['2',3]
])

const obj = {p: 'Hello World'};

map.set(obj, 'OK')   //设置成员的key和value
map.get(obj) // "OK"	//获得属性的值
map.has(obj) // true	//判断成员是否存在
map.delete(obj) // true		//删除成员
map.clear(obj) // false		//清空所有	
```

### leetcode1047：删除字符串中的所有相邻重复项

```javascript
var removeDuplicates = function(S) {
    var a = '';
    for(let i = 0; i < S.length; i++) {
        if(S[i] != S[i+1]){
            a+=S[i];
        }else{
            i++;
        }
    }  
    if(a.length == S.length){
        return a
    }else{
        return removeDuplicates(a)
    }
};
```

一开始没想清用栈怎么写，感觉用栈的话只能删除一层相邻重复项，再合并的重复项没法删掉。但其实不然，用栈的话，可以一层一层的抵消。

```javascript
var removeDuplicates = function(S) {
    var stack = [];
    for(let i = 0; i < S.length; i++) {
        if(S[i] != stack[stack.length - 1]){
            stack.push(S[i]);
        }else{
            stack.pop();
        }
    }
    return stack.join('')
};
```

### leetcode1209：删除字符串中的所有相邻重复项（中等）

一开始想的是跟简单题一样，多一个for循环判断重复个数就可以了，但结果超时了。

```javascript
var removeDuplicates = function(s, k) {
    var stack = [];
    for(let i = 0; i < s.length; i++){
        if(s[i] == stack[stack.length-1]){
            var f = 0;
            for(let j = 0; j < k-1 ;j++){
                if(s[i] == stack[stack.length-1-j]){
                    f++;
                }
            }
            if(f == k-1){
                for(let j = 0; j < k-1; j++) {
                    stack.pop();
                }
            }else{
                stack.push(s[i])
            }
        }
        else{
            stack.push(s[i])
        }   
    }
    return stack.join('')
};
```

改良版：往栈里压入对象，保存重复个数，实现O(n)。

利用了字符串的`repeat(count)`方法。`  var a = str.repeat(count)  `实现将str复制count次给a

```javascript
var removeDuplicates = function(s, k) {
    var stack = [];
    for(let i = 0; i < s.length; i++) {
        if(stack.length && s[i] == stack[stack.length-1].val){
            stack[stack.length-1].count++;
            if(stack[stack.length-1].count == k){
                stack.pop();
            }
        }else{
            stack.push({val:s[i],count:1});
        }
    }
    return stack.reduce((pre,now) => {
        return pre + now.val.repeat(now.count);
    },'')
};
```

### 面试真题：删除字符串中出现次数 >= 2 次的相邻字符

这个题更进一步，不限制固定的重复次数

```javascript
var removeDuplicates = function(s) {
  var stack = [];
  for(let i = 0; i < s.length; i++) {
    if(stack.length && s[i] == stack[stack.length-1].val) {
      stack[stack.length-1].count++;
    }
    else{
        if(stack.length && stack[stack.length-1].count >= 2){
          stack.pop();
        }
        if(stack.length && s[i] == stack[stack.length-1].val){
          stack[stack.length-1].count++;
        }else{
          stack.push({val:s[i],count:1})
        }
      }
  }
  return stack.reduce((pre,now) => {
      return pre + now.val
  },'')
}
console.log(removeDuplicates('abbbacca'));
```

# 队列

### leetcode933：最近的请求次数

用count保存每次的请求，再对每次请求进行遍历。但没有做到真正的优化。

```javascript
var RecentCounter = function() {
    this.count = [];
};

RecentCounter.prototype.ping = function(t) {
    this.count.push(t);
    var l = this.count.length;
    var res = 0;
    for(let i = l-1; i >= 0; i--){
        if(this.count[i] >= t - 3000){
            res++;
        }
    }
    return res;
};
```

其实对于当前请求，三秒以前的请求就可以清除掉了，这便是队列。

```javascript
var RecentCounter = function() {
    this.count = [];
};

RecentCounter.prototype.ping = function(t) {
    this.count.push(t);
    while(this.count[0] < t - 3000){
        this.count.shift();
    }
    return this.count.length;
};

```

### leetcode239：滑动窗口最大值

用index保存索引，index[0]始终保存的是窗口里最大值的索引。

```javascript
var maxSlidingWindow = function(nums, k) {
    var index = [];
    var res = [];
    for(let i = 0; i < k; i++){
        while(index.length && nums[i] >= nums[index[index.length - 1]]){
            index.pop();
        }
        index.push(i);
    }
    res.push(nums[index[0]]);
    for(let i = k; i < nums.length; i++){
        while(index.length && nums[i] >= nums[index[index.length - 1]]){
            index.pop();
        }
        index.push(i);
        while(index[0] <= i - k){
            index.shift();
        }
        res.push(nums[index[0]]);
    }
    return res;
};
```

