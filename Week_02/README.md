学习笔记
## 寻路
问题1:
寻路, 当地图的墙比较单薄, 只有一个格子时, 并且加入斜向时 会穿墙而过.
斜向(x+1, y+1)是可以穿透 只有一格的墙,
但是非斜向(x+1, y)按理也可以穿透只有一格厚度的墙, 但实际并没有穿透

理解: 寻找最佳路径,一开始被标为可达, 但是,这个时候前驱的点 并不一定是最好的前驱的点

寻路问题感觉比较抽象, 学习起来有点吃力, 需要重复学习 


## 抽象语法树
    抽象语法树(Abstract Syntax Tree，AST)，或简称语法树(Syntax tree)，
    是源代码语法结构的一种抽象表示。
    它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构.
## 使用LL构建AST抽象语法树
1. TokenNumber:
    1 2 3 4 5 6 7 8 9 0的组合
2. Operator: + - * / 之一
3. Whitespace: <SP>
4. LineTerminator: <LF> <CR>
5. <Expression> ::=
       <AdditiveExpression><EOF>
    
    <AdditiveExpression>::=
        <MultiplcativeExpress>
        <AdditiveExpression><+><MultiplcativeExpress>
        <AdditiveExpression><-><MultiplcativeExpress>
    
    <MultiplcativeExpress>::=
        <Number>
        <MultiplcativeExpress><*><Number>
        <MultiplcativeExpress></><Number>

