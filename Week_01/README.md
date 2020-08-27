## css
1. display为inline-block的元素, 加上vertical-align:middle,可以让自己相对于父元素垂直居中(父元素需要设置height=line-height)

## js
2. Object.create
#### 关于tictactoe视频课程里面的，winter老师讲二维数组改为一维数组，然后使用Object.create创建对象，来达到节省内存的目的:
 我测试了下直接使用二维数组，发现对数组进行读写，都直接操作原型，而一维数组，写操作自己，读，自己没有才读原型
 我的疑问是，为什么二维数组和一维数组作为Object.create参数得到的新数组，在读写这个新数组时，表现不太一致呢？
 不同之处:二维数组读写都直接作用于原型，而一维数组不是
``` 
<script>
    let a = [
        [10, 20, 30],
        [40, 50, 60],
        [70, 80, 90],
    ]
    let b = Object.create(a)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            console.log(b[i][j])
        }
    }
    b[2][0] = "aaa"
    b[1][1] = 100
    console.log('b', b)
    console.log('a', a)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    let x = [
        10, 20, 30,
        40, 50, 60,
        70, 80, 90,
    ]
    let y = Object.create(x)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            console.log(y[i * 3 + j])
        }
    }
    y[4] = 1000
    console.log('y', y)
    console.log('x', x)
</script>
```
## 总结:
我想了下, js原型继承都是通过索引访问的, 这样才能节省内存, 所以才出现了上述二维数组和一维数组表现不一致的问题
上述代码中 当使用b[1][1] = 100, 需要先找到b[1], 而b本身没有这个属性, 自然找到原型a[1], 
再找a[1]的属性1(a[1][1]), 找到了变执行赋值 100
b[1][1] = 1000 是对b[1]进行操作

上述代码中 当使用y[4] = 1000, 直接给y添加一个属性4并赋值100
y[4] = 100 是对y进行操作

