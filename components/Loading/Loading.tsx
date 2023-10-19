import { ConfigProvider, Space, Spin } from "antd";

const Loading = () => {
    return (
        <div className="logo-custom absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <ConfigProvider
                theme={{
                    token: {
                        // Seed Token
                        colorPrimary: '#22c55e',
                        // Alias Token
                        colorBgContainer: '#000',
                    }
                }}
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Spin className="text-gray-700" tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </Space>
            </ConfigProvider>
        </div>
    )
}

export default Loading