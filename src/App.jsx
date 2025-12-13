import React from 'react'
import { Button, Card, Space, Typography } from 'antd'
import './App.css'

const { Title, Paragraph } = Typography

function App() {
  return (
    <div className="App">
      <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
        <Title level={1} style={{ textAlign: 'center', marginBottom: '40px' }}>
          React + Ant Design 测试页面
        </Title>

        <Card title="欢迎使用" style={{ marginBottom: '20px' }}>
          <Paragraph>
            这是一个使用 React、Vite 和 Ant Design 构建的简单测试页面。
          </Paragraph>
          <Paragraph>
            点击下面的按钮体验 Ant Design 的组件效果。
          </Paragraph>
        </Card>

        <Card title="组件演示" style={{ marginBottom: '20px' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Button type="primary">主要按钮</Button>
              <Button>默认按钮</Button>
              <Button type="dashed">虚线按钮</Button>
              <Button type="text">文本按钮</Button>
            </Space>

            <Space>
              <Button type="primary" danger>危险按钮</Button>
              <Button danger>危险默认</Button>
            </Space>
          </Space>
        </Card>

        <Card title="项目信息">
          <ul>
            <li>前端框架：React 18</li>
            <li>构建工具：Vite</li>
            <li>UI 框架：Ant Design</li>
            <li>构建输出：docs 文件夹</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

export default App
