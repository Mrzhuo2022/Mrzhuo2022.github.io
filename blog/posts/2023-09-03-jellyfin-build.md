---

layout: Post
title: Jellyfin私人影音库
subtitle: 使用docker安装jellyfin搭建私人家庭影音库
author: Evarle
date: 2023-09-03
useHeaderImage: true
headerImage: /img/in-post/2023-09-03/header.jpeg
headerMask: rgb(67, 65, 47, .2)
permalinkPattern: /post/:year/:month/:day/:slug/
tags:
  - docker
---

## 私人媒体库

对于每一个玩NAS的人，应该都会有搭建一个私人的家庭影音中心的想法，用于整理和观看自己喜欢的电影、电视剧和动漫等，而且NAS拥有容量大、易管理并且可以外网访问等优点，在NAS上搭建私人媒体库是很不错的。在NAS上可以搭建个人影音库的方案有很多，现在主流的影音管理方案有三种：Emby、Plex和Jellyfin。前两个需要付费才能解锁高级功能使用，而Jellyfin是完全开源免费的。

Jellyfin 官方开源地址：https://github.com/jellyfin/jellyfin

Jellyfin 官方文档：https://jellyfin.org/docs/，里面有部署教程和设置的相关信息。

## 什么是Jellyfin

Jellyfin是完全开源免费的影音媒体管理服务器，它是从Emby项目里面独立出来并且开源的，功能与emby接近。Jellyfin拥有大量的官方和第三方客户端，可在大多数流行的平台上使用，可以在网页、手机或者TV端访问。Jellyfin支持实时转码，能够流畅转码4K视频，并展示影片的详细信息、演员和分辨率等。如果设备不支持4K播放，Jellyfin会转换成低分辨率以保证流畅播放。

## 使用docker安装Jellyfin

### 下载jellyfin镜像文件

这里使用的docker镜像是：[nyanmisaka/jellyfin](https://hub.docker.com/r/nyanmisaka/jellyfin)

这是nyanmisaka大佬做的中国特供版镜像，主要优化了核显驱动，硬件加速等，详细的可以看https://post.smzdm.com/p/a3gw6g47/

在docker里下载nyanmisaka/jellyfin镜像。

![1](/img/in-post/2023-09-03/1.png)

### 配置docker容器

* 创建 /jellyfin/cache 文件夹用户用来存放缓存文件，创建 /jellyfin/config 文件夹用来存放配置文件。并且将文件夹权限都设置为所有用户都能读取和写入。

* 然后再创建用于存储媒体文件的文件夹，比如 /电影 、/电视剧 和 /动漫 等等。

* 设置存储文件夹映射，分别添加 /cache，/config和/media目录，nyanmisaka的配置目录与官网的jellyfin/jellyfin相同。

* 配置完成后运行docker容器

浏览器访问NAS ip:8096 进入jellyfin的web界面。

## 配置Jellyfin

进入Jellyfin界面后选择语言，然后登录。

添加媒体库，电影的话类型选择电影，选择你映射的文件夹/movie，然后选择语言和地区。

![2](/img/in-post/2023-09-03/2.png)

* 电影文件的命名格式最好清晰，这样方便刮削电影的信息。

最基础的就是 电影名称 + 电影年份 这种方式，中间用 . 分隔 

比如：

> Guardians.of.the.Galaxy.Vol.3.2023.2160p

![3](/img/in-post/2023-09-03/3.png)

电视剧和动漫番剧的话类型选择可以选择节目，这样有多集的电视剧就能整合在一起了。

![4](/img/in-post/2023-09-03/4.png)

* 节目的目录命名格式最好是这样

```
文件夹
├── A_title #表示剧名
│   ├── Season 1 #表示第一季
│   │   ├── A S01E01.mp4
│   │   ├── A S01E02.mp4
│   │   ├── A S01E03.mp4
│   │   └── A S01E04.mp4
│   └── Season 2
│       ├── A S02E01.mp4
│       ├── A S02E02.mp4
│       ├── A S02E03.mp4
│       └── A S02E04.mp4
├── B_title
│   └─── Season 1
```

![5](/img/in-post/2023-09-03/5.png)

语言选择中文，地区选择中国，jellyfin自带的刮削器就会匹配中文的元数据，不过刮削匹配的网站大部分都是国外网站，由于DNS污染，有时候可能无法正常地刮削影片的元数据，NAS网络最好是有全局代理，或者可以修改NAS的hosts文件。

刮削电影元数据需要用到的几个网址如下：

- api.themoviedb.org
- image.tmdb.org
- api.tmdb.org

在/etc/hosts/ 文件下添加：

> 13.224.161.90 [http://api.themoviedb.org](http://api.themoviedb.org/) 
>
> 104.16.61.155 [http://image.tmdb.org](http://image.tmdb.org/) 
>
> 54.192.151.79 [http://www.themoviedb.org](http://www.themoviedb.org/) 

如果ip失效了可以使用「Dns Checker」工具：https://dnschecker.org/，地区选择中国，选择延迟低的ip地址修改即可。

控制台里可以修改转码方式为硬件解码，这样可以降低系统占用，利用显卡来解码转码视频文件，加快解码速度，提高显示画面质量。

![6](/img/in-post/2023-09-03/6.png)

## 使用TinyMediaManager刮削器

下载安装TinyMediaManager，官网：https://www.tinymediamanager.org/

打开TMM，在设置里的媒体库目录里面添加存放媒体文件的目录，nas上的可以将磁盘先挂载到本地下，这样nas里的媒体文件就能手动刮削了。

![7](/img/in-post/2023-09-03/7.png)

## 通过客户端连接Jellyfin服务器

目前Jellyfin官方是有[客户端](https://jellyfin.org/downloads)的，支持安卓、ios和tv等，还能通过Kodi或者Infuse来访问Jellyfin服务器。

当前安卓版 Jellyfin 是支持外部播放器的，因此，首选使用MXPlayer，播放的时候选择外部播放器，然后会跳转到 MXPalyer，只需设置一次，之后就是默认调用 MXPalyer 了。 

安卓第三方客户端推荐Findorid，界面简洁好看，操作简单。软件的开源地址：https://github.com/jarnedemeulemeester/findroid/

![8](/img/in-post/2023-09-03/8.png)

## 使用qbittorrent下载媒体文件

对于一直在线的NAS服务器，使用qbittorrent在后台实现24小时静默下载文件就很有必要了。qbittorrent是一款功能强大且易于使用的BitTorrent客户端，支持多种操作系统和平台。

### 在NAS安装qbittorrent

#### 使用docker-compose安装

使用镜像linuxserver/qbittorrent，官方地址：https://hub.docker.com/r/linuxserver/qbittorrent。

* 建立存放qbittorrent相关配置和数据的文件夹

```
cd ~/docker/
mkdir /qbittorrent #创建项目文件夹
```

* 建立配置文件夹和书籍文件夹

```
mkdir qbittorrent/config #创建配置文件夹
mkdir qbittorrent/downloads #创建下载文件夹
```

* 创建docker-compose.yml文件

```
 ---
 version: "3.0"
 services:
   qbittorrent:
     image: lscr.io/linuxserver/qbittorrent:latest
     container_name: qbittorrent
     environment:
       - PUID=1000
       - PGID=1000
       - TZ=Etc/UTC
       - WEBUI_PORT=8080 # 你使用的 WEB 管理平台端口 
     volumes:
       - ~/docker/qbittorrent/config:/config #修改为自己的config文件夹
       - ~/docker/qbittorrent/downloads:/downloads #修改为自己的downloads文件夹
     ports:
       # 要使用的映射下载端口与内部下载端口，可保持默认，安装完成后在管理页面仍然可以改成其他端口。
       - 6881:6881 
       - 6881:6881/udp
       - 8080:8080 #映射到本地8080端口
     restart: unless-stopped
```

* 启动qibittorrent服务

```
docker-compose up -d
```

浏览器访问localhost:8080进入web页面。

#### 使用群晖NAS套件安装

在群晖套件中心，添加矿神套件源**https://spk7.imnks.com/** 

在社群中安装qbittorrent套件，直接打开跳转到web页面。

### 配置qbittorrent

使用默认账号admin，默认密码adminadmin登录。

进入qbittorrent，在设置-webUI中选择语言中文

#### 使用第三方主题UI

* 使用第三方web UI主题皮肤**VueTorrent**，好看美观并且完全适配手机UI，支持中文，开源地址：https://github.com/WDaan/VueTorrent

  下载并解压到文件夹，在设置-webUI里面使用自定义WEBUI填写皮肤路径，保存刷新即可。
  
  ![9](/img/in-post/2023-09-03/9.png)
  
  ![10](/img/in-post/2023-09-03/10.png)

#### RSS自动订阅番剧

在设置里面的RSS界面，启用获取RSS订阅，在订阅源里面添加RSS地址，然后在规则里面添加规则，使用正则表达式匹配所订阅的番剧，开启自动下载RSS。

#### 外网访问webUI

除了NAS端口转发，开启防火墙端口后，还需在qibittorrent设置-webUI里面的取消启用HOST头属性验证。

## 总结

私人的家庭影音中心部署NAS这种大磁盘空间存储服务器非常不错，Jellyfin画面整洁并且无广告，画面质量还高，非常适合喜欢看影视剧或者动漫的人，使用qbittorrent在静默下载和自动订阅，实现观影看番自由，也十分适合家庭局域网使用观看。

