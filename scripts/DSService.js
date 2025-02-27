// DeepSeek 连接模块
const DSService = {
    generateScript: async function(outline) {
        const apiKey = 'sk-93fd99b22a6f4a03980eee3385bd5f17'; // 替换为你的 DeepSeek API 密钥
        const apiUrl = 'https://api.deepseek.com/v1/chat/completions';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: `生成一个不超过 10 个场景的短剧本，内容纲要如下：${outline}` }]
            })
        });

        if (!response.ok) {
            throw new Error(`请求失败：${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }
};