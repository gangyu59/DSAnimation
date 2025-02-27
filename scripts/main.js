// 主 JavaScript 文件，协调各模块
document.getElementById('submitScene').addEventListener('click', async () => {
    const outline = document.getElementById('scriptOutline').value;
    const animationContainer = document.getElementById('animationContainer');

    if (!outline) {
        alert('请输入剧本的内容纲要！');
        return;
    }

    animationContainer.innerHTML = '正在生成剧本...';

    try {
        // 生成剧本
        const script = await DSService.generateScript(outline);
        const scenes = script.split('\n').filter(line => line.trim() !== '').slice(0, 10); // 限制最多 10 个场景

        // 清空容器
        animationContainer.innerHTML = '';

        // 展示每个场景
        for (let i = 0; i < scenes.length; i++) {
            const scene = scenes[i];
            const sceneElement = document.createElement('div');
            sceneElement.className = 'scene';

            const sceneTitle = document.createElement('h3');
            sceneTitle.textContent = `场景 ${i + 1}`;
            sceneElement.appendChild(sceneTitle);

            const sceneDescription = document.createElement('p');
            sceneDescription.textContent = scene;
            sceneElement.appendChild(sceneDescription);

            const animationUrl = await AnimationService.getAnimationForScene(scene);
            const animationElement = document.createElement('iframe');
            animationElement.src = animationUrl;
            sceneElement.appendChild(animationElement);

            animationContainer.appendChild(sceneElement);
        }
    } catch (error) {
        animationContainer.innerHTML = `出错：${error.message}`;
    }
});