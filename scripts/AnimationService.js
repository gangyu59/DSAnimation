// 处理动画逻辑
const AnimationService = {
    getAnimationForScene: async function(scene) {
        // 提取更多关键词
        const keywords = this.extractKeywords(scene);
        const giphyApiKey = 'T3vZbjdoAvfrr0x86806OX2ZqypTA5RO'; // 替换为你的 Giphy API 密钥
        const giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(keywords)}&limit=5`;

        try {
            const response = await fetch(giphyUrl);
            if (!response.ok) {
                throw new Error(`Giphy 请求失败：${response.status}`);
            }

            const data = await response.json();
            if (data.data.length > 0) {
                // 返回第一个匹配的动画 URL
                return data.data[0].embed_url;
            } else {
                // 如果没有匹配的动画，尝试用更少的关键词重新搜索
                const fallbackKeywords = keywords.split(' ').slice(0, 2).join(' ');
                const fallbackUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(fallbackKeywords)}&limit=1`;
                const fallbackResponse = await fetch(fallbackUrl);
                const fallbackData = await fallbackResponse.json();

                if (fallbackData.data.length > 0) {
                    return fallbackData.data[0].embed_url;
                } else {
                    return 'https://i.gifer.com/7plD.gif'; // 返回默认动画
                }
            }
        } catch (error) {
            console.error('获取动画失败：', error);
            return 'https://i.gifer.com/7plD.gif'; // 如果出错，返回默认动画
        }
    },

    // 提取关键词
    extractKeywords: function(scene) {
        // 简单的关键词提取逻辑（可以根据需求进一步优化）
        const words = scene.split(' ');
        const importantWords = words.filter(word => word.length > 3); // 过滤掉短词
        return importantWords.join(' ');
    }
};