# 前端监控SDK使用文档

## createBlankScreenMonitor

监听白屏时间(为0无白屏)

使用方法

```
// 导入createBlankScreenMonitor方法
const BlankScreenMonitor = createBlankScreenMonitor();
BlankScreenMonitor.start(url);//url是可选参数，可以不传递，不传递可选参数，默认监听当前路由下的页面(比如http://example.com/page，会监听打印/page,建议传递具体信息，如组件名称之类的string类型参数)

```

## createResourceErrorMonitor

监听静态资源错误

```
// 导入createResourceErrorMonitor
createResourceErrorMonitor.start(url);//url是可选参数，可以不传递，不传递可选参数，默认监听当前路由下的页面(比如http://example.com/page，会监听打印/page,建议传递具体信息，如组件名称之类的string类型参数)

```

## createPerfMonitor

监听页面的性能指标

```
// 导入createPerfMonitor
createPerfMonitor.start(url);//url是可选参数，可以不传递，不传递可选参数，默认监听当前路由下的页面(比如http://example.com/page，会监听打印/page,建议传递具体信息，如组件名称之类的string类型参数)

```

## createJsErrorMonitor

监听页面的js错误

```
// 导入createJsErrorMonitor
createJsErrorMonitor.start(url);//url是可选参数，可以不传递，不传递可选参数，默认监听当前路由下的页面(比如http://example.com/page，会监听打印/page,建议传递具体信息，如组件名称之类的string类型参数)

```

## createXhrMonitor

监听页面的接口传递的错误

```
// 导入createXhrMonitor
createXhrMonitor.start(url);//url是可选参数，可以不传递，不传递可选参数，默认监听当前路由下的页面(比如http://example.com/page，会监听打印/page,建议传递具体信息，如组件名称之类的string类型参数)

```

## createPromiseErrorMonitor

监听promise场景下的错误

```

// 导入createPromiseErrorMonitor
createPromiseErrorMonitor().start(url);//url是可选参数，可以不传递，不传递可选参数，默认监听当前路由下的页面(比如http://example.com/page，会监听打印/page,建议传递具体信息，如组件名称之类的string类型参数)

```

## createAllMonitor

启用所有监控的函数

```

// createAllMonitor
createAllMonitor().start(url);//url是可选参数，可以不传递，不传递可选参数，默认监听当前路由下的页面(比如http://example.com/page，会监听打印/page,建议传递具体信息，如组件名称之类的string类型参数)

```
