# JS中的错误处理以及如何使用Result类型数据优化我们的代码

## 常用错误处理方法

### 同步函数中的错误处理
#### 基于数据特点的分支逻辑
#### 使用try catch
1. throw语句
2. Error对象
3. try catch的作用域问题
4. try catch可以捕获来自不止一层的throw

### 异步函数中的错误处理
#### 回调函数
1. 无法使用try catch捕获异步代码中的throw
2. error-first callback

#### promise
1. then的fail参数
2. promise的catch方法
3. 对比fail参数和catch方法
4. 应该reject还是throw
5. reject本质上只是一个回调函数
6. promise中的异步函数内的throw依然无法捕获

#### await
1. try catch再次可用
2. 通过catch方法优化对promise的调用
3. 同步代码没有catch方法,造成不统一

## Result类型和Option类型

### Rust中的Result和Option的使用

#### Result类型的含义和使用
1. match
2. expect
3. unwrap
4. unwrap_err
5. unwrap_or
6. and_then

#### Option类型的含义和使用
(类似Result)

### 如何在typescript中模仿Result类型
1. if else
2. 强制错误处理
3. unwrap
4. match

### 好处总结
1. 同步异步函数处理方式相同
2. 更好的错误类型定义(不用等到运行的时候才知道某个函数会抛异常)
3. 用数据代替指令(消除exception的方式就是不使用exception)

## 用例子展示通过Result类型优化一段代码
1. 优化接口调用代码
2. 优化JSON.stringify

## 在移动端开发错误处理中的应用

### 移动端接口逻辑架构
1. app到服务端
2. webhost和h5-utils
4. app-utils和业务代码

### 存在的问题
1. 每一层都可能产生错误,有些需要业务层处理,有些不需要
2. 不处理的接口错误会导致业务代码报错
3. 简单的的接口状态码校验不能保证效果
3. 框架自带的处理逻辑和我们定义的上报逻辑之间的冲突（重复上报）

### 使用Result类型数据优化的目标
1. 链路错误业务不关心,用Option类型包装,只表示有或没有响应
2. 请求通的情况下业务逻辑应该有明确报错原因,用Result类型包装,可以用于错误处理，error情况可以约定详细的错误场景枚举
3. 接口响应JSON schema检验,用Result类型包装,因为接口响应格式是开发期间约定好的，因此可以做运行时校验
4. 上层业务代码根据响应做合理容错处理,通过Result类型保证不同的分支都有正确的复盖，避免缺少错误捕获导致的unhandledException