module.exports = {
    title: "凌览的博客",
    keywords:
        "凌览，前端，分享前端知识点",
    description: "凌览，微信搜索「凌览社」关注我，长期交流学习。",
    base: '/blog/',
    theme: 'reco',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    configureWebpack: {
        node: {
            global: true,
            process: true
        },
    },
    themeConfig: {
        subSidebar: 'auto',
        lastUpdated: '上次更新',
        nav: [
            { text: '公众号：凌览社', link: '/images/wx.md' },
            { text: 'Github', link: 'https://github.com/CatsAndMice' },
            { text: '掘金', link: 'https://juejin.cn/user/3350967174565198/posts' },
            { text: 'CSDN', link: 'https://blog.csdn.net/qq_45472813?type=blog' },
            { text: "知乎", link: 'https://www.zhihu.com/people/25-32-14-8/posts' },
        ],
        sidebar: [
            {
                title: '历史文章',
                collapsable: true,
                children: [
                    { title: "ffmpeg视频压缩踩坑总结", path: "/history/ffmpeg视频压缩踩坑总结.md" },
                    { title: "有手就会系列——实现日地月公转", path: "/history/有手就会系列——实现日地月公转.md" },
                    { title: "实现懒加载的四种方式", path: "/history/实现懒加载的四种方式.md" },
                    { title: "重学Vue Components", path: "/history/重学Vue Components.md" },
                    { title: "多个Vue项目如何配置nginx", path: "/history/多个Vue项目如何配置nginx.md" },
                    { title: "marker伪元素让文字序号不再呆板", path: "/history/marker伪元素让文字序号不再呆板.md" },
                    { title: "深入剖析This机制", path: "/history/深入剖析This机制.md" },
                ]
            },
            {
                title: '年度总结',
                collapsable: true,
                children: [
                    { title: "平淡无奇，2022年终总结", path: "/annualSummary/平淡无奇，2022年终总结/平淡无奇，2022年终总结.md" }
                ]
            },
            {
                title: "关于我",
                path: '/about/',
                collapsable: false,
            }
        ]
    },
}