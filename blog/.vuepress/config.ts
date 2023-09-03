import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { gungnirTheme } from "vuepress-theme-gungnir";

const isProd = process.env.NODE_ENV === "production";

export default defineUserConfig({
  title: "Evarle zhuo",
  description: "A student who likes coding. ",

  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `/img/logo/favicon-16x16.png`
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: `/img/logo/favicon-32x32.png`
      }
    ],
    ["meta", { name: "application-name", content: "Evarle" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "Evarle" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: `/img/logo/apple-touch-icon.png` }
    ],
    ["meta", { name: "theme-color", content: "#377bb5" }],
    ["meta", { name: "msapplication-TileColor", content: "#377bb5" }]
  ],

  bundler: viteBundler(),

  theme: gungnirTheme({
    navbarTitle: "Evarle blog",
    repo: "Mrzhuo2022/Mrzhuo2022.github.io",
    docsDir: "blog",
    docsBranch: "main",

    hitokoto: "https://v1.hitokoto.cn?c=i&c=d", // enable hitokoto (一言) or not?

    // personal information
    personalInfo: {
      name: "Evarle",
      avatar: "/img/avatar.jpg",
      description: "Evarle's blog",
      sns: {
        github: "Mrzhuo2022",
        twitter: "zhuo1022",
        email: "https://gmail.com",
        // customized sns
        plog: {
          icon: "hi-solid-photograph",
          link: "https://plog.evarle.one/"
        },
        rss: "/rss.xml"
      }
    },

    // header images on home page
    homeHeaderImages: [
      {
        path: "/img/home-bg/1.jpg",
        mask: "rgba(40, 57, 101, .4)"
      },
      {
        path: "/img/home-bg/2.jpg",
        mask: "rgba(196, 176, 131, .1)"
      },
      {
        path: "/img/home-bg/3.jpg",
        mask: "rgba(196, 176, 131, .2)"
      },
      {
        path: "/img/home-bg/4.jpg",
        mask: "rgba(19, 75, 50, .2)"
      },
      {
        path: "/img/home-bg/5.jpg",
        mask: "rgba(19, 75, 50, .1)"
      }
    ],

    // other pages
    pages: {
      tags: {
        subtitle: "时光清浅处 一步一安然",
        bgImage: {
          path: "/img/pages/tags.jpg",
          mask: "rgba(211, 136, 37, .5)"
        }
      },
      links: {
        subtitle:
          "半师半友半知己，半慕半尊半倾心",
        bgImage: {
          path: "/img/pages/links.jpg",
          mask: "rgba(64, 118, 190, 0.5)"
        }
      }
    },

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      katex: true,
      giscus: {
        repo: "Mrzhuo2022/blog-comments",
        repoId: "R_kgDOKOtffg",
        category: "Announcements",
        categoryId: "DIC_kwDOKOtffs4CZC_r",
        darkTheme: "https://blog.zxh.io/styles/giscus-dark.css"
      },
      mdPlus: {
        all: true
      },
      //ga: "",
      //ba: "",
      rss: {
        siteURL: "https://evarle.one",
        copyright: "Evarle 2023"
      }
    },

    navbar: [
      {
        text: "Home",
        link: "/",
        icon: "io-home"
      },
      {
        text: "Tags",
        link: "/tags/",
        icon: "fa-tag"
      },
      {
        text: "Links",
        link: "/links/",
        icon: "fa-link"
      },
      {
        text: "About",
        link: "https://about.evarle.one",
        icon: "fa-user-alt"
      }
    ],

    footer: `
      &copy;2023 <a href="#" target="_blank">Evarle</a>
      <br>
      Powered by <a href="https://v2.vuepress.vuejs.org" target="_blank">VuePress</a> &
      <a href="https://github.com/Renovamen/vuepress-theme-gungnir" target="_blank">Gungnir</a>
    `
  }),

  markdown: {
    headers: {
      level: [2, 3, 4, 5]
    },
    code: {
      lineNumbers: false
    }
  }
});
