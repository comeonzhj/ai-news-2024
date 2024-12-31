async function fetchTimelineData() {
    try {
        const response = await fetch('./AI_News_2024.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching timeline data:', error);
        return [];
    }
}

function createTimelineNode(monthData, index) {
    const isEven = index % 2 === 0;
    const node = document.createElement('div');
    node.className = `timeline-node relative mb-16 ${isEven ? 'mr-[50%] pr-8' : 'ml-[50%] pl-8'}`;
    
    // 垂直连接线
    const verticalLine = `absolute ${isEven ? 'right-0' : 'left-0'} top-0 w-0.5 h-full bg-gradient-to-b from-[#00a3ff]/20 to-[#00a3ff]/40`;
    
    // 节点圆点
    const dotClass = `absolute ${isEven ? '-right-3' : '-left-3'} top-1/2 w-6 h-6 bg-gradient-to-br from-[#00a3ff] to-[#0066cc] rounded-full z-10 shadow-lg shadow-[#00a3ff]/50 border-2 border-[#00a3ff]/30`;

    // 处理markdown链接
    const processLinks = (text) => {
        return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#00a3ff] hover:text-[#0066cc] underline" target="_blank">$1</a>');
    };
    
    const processedNews = monthData.big_news.map(news => processLinks(news));
    
    node.innerHTML = `
        <div class="tech-panel relative bg-[#000d1a]/80 rounded-lg p-6 border border-[#00a3ff]/30 hover:border-[#00a3ff] transition-all duration-300 backdrop-blur-sm shadow-xl hover:shadow-[#00a3ff]/20">
            <!-- 装饰性边角 -->
            <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00a3ff]"></div>
            <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00a3ff]"></div>
            <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00a3ff]"></div>
            <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00a3ff]"></div>
            
            <div class="default-content">
                <div class="flex items-center mb-4">
                    <div class="w-2 h-8 bg-[#00a3ff] mr-3"></div>
                    <h3 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00a3ff] to-[#0066cc]">${monthData.month}</h3>
                </div>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${monthData.keywords.map(keyword => 
                        `<span class="tech-tag px-3 py-1 bg-[#00a3ff]/10 backdrop-blur-sm rounded-sm text-[#00a3ff] border border-[#00a3ff]/20 hover:border-[#00a3ff]/40 transition-colors relative">
                            <span class="absolute top-0 left-0 w-1 h-1 bg-[#00a3ff]"></span>
                            <span class="absolute top-0 right-0 w-1 h-1 bg-[#00a3ff]"></span>
                            ${keyword}
                        </span>`
                    ).join('')}
                </div>
                <p class="text-[#a3e4ff]/80">${monthData.overview}</p>
            </div>
            <div class="hover-content">
                <div class="flex items-center mb-4">
                    <div class="w-2 h-8 bg-[#ef4444] mr-3"></div>
                    <h3 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ef4444] to-[#eab308]">${monthData.month} 大事件</h3>
                </div>
                <ul class="list-none space-y-2 text-[#a3e4ff]/80 mb-6">
                    ${processedNews.map(news => `
                        <li class="flex items-start">
                            <span class="inline-block w-1.5 h-1.5 mt-2 mr-2 bg-[#ef4444]"></span>
                            ${news}
                        </li>
                    `).join('')}
                </ul>
                ${monthData.awesome_AI_App ? `
                    <div class="flex items-center mb-3">
                        <div class="w-2 h-6 bg-[#22c55e] mr-3"></div>
                        <h4 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#22c55e] to-[#eab308]">本月值得一用的 AI-Native APP</h4>
                    </div>
                    <ul class="list-none space-y-2 text-[#a3e4ff]/80">
                        ${monthData.awesome_AI_App.map(app => `
                            <li class="flex items-start">
                                <span class="inline-block w-1.5 h-1.5 mt-2 mr-2 bg-[#22c55e]"></span>
                                ${processLinks(app)}
                            </li>
                        `).join('')}
                    </ul>
                ` : ''}
            </div>
        </div>
        <div class="${dotClass}"></div>
        <div class="${verticalLine}"></div>
    `;
    
    return node;
}

async function initTimeline() {
    const timelineContainer = document.getElementById('timeline');
    const data = await fetchTimelineData();
    
    data.forEach((monthData, index) => {
        const node = createTimelineNode(monthData, index);
        timelineContainer.appendChild(node);
    });
}

// Initialize the timeline when the page loads
document.addEventListener('DOMContentLoaded', initTimeline);
