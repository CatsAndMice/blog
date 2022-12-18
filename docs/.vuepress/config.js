module.exports = {
    title: "凌览的博客",
    keywords:
        "凌览，前端，分享前端知识点",
    description: "凌览，微信搜索「凌览社」关注我，长期交流学习。",
    themeConfig: {
        nav: [
            { text: '公众号：凌览社', link: '/images/wx.md' },
            { text: 'Github', link: 'https://github.com/CatsAndMice' },
            { text: '掘金', link: 'https://juejin.cn/user/3350967174565198/posts' },
            { text: 'CSDN', link: 'https://blog.csdn.net/qq_45472813?type=blog' },
            { text: "知乎", link: 'https://www.zhihu.com/people/25-32-14-8/posts' },
        ],
        sidebar: [
            {
                title: '年度总结',
                collapsable: true,
                children: [
                    { title: "学前必读", path: "/" }
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