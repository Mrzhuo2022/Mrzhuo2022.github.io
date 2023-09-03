---
layout: Post
title: Calibre Web个人图书库
subtitle: 使用docker安装Calibre Web搭建私人电子图书馆
author: Evarle
date: 2023-09-02
useHeaderImage: true
headerImage: /img/in-post/2023-09-02/header.jpeg
headerMask: rgb(67, 65, 47, .2)
permalinkPattern: /post/:year/:month/:day/:slug/
tags:
  - docker
---

## Calibre Web项目

开源项目Calibre Web 是基于Calibre的数据库来建立的一个简洁直观界面的web应用程序。

> Calibre Web开源地址：https://github.com/janeczku/calibre-web

## 使用docker安装

使用docker-compose安装，使用镜像linuxserver/calibre-web，官方地址：https://hub.docker.com/r/linuxserver/calibre-web。

* 建立存放Calibre相关配置和数据的文件夹

```
cd ~/docker/
mkdir /calibre-web #创建项目文件夹
```

* 建立配置文件夹和书籍文件夹

```
mkdir calibre-web/config #创建配置文件夹
mkdir calibre-web/books #创建书籍文件夹
```

* 创建docker-compose.yml文件

```
---
version: "3.0"
services:
  calibre-web:
    image: lscr.io/linuxserver/calibre-web:latest
    container_name: calibre-web
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
      - DOCKER_MODS=linuxserver/mods:universal-calibre 
      - OAUTHLIB_RELAX_TOKEN_SCOPE=1
    volumes:
      - ~/docker/calibre-web/config:/config #修改为自己的config文件夹
      - ~/docker/calibre-web/books:/books #修改为自己的books文件夹
    ports:
      - 8083:8083 #映射到本地8083端口
    restart: unless-stopped
```

* 启动Calibre web服务

```
docker-compose up -d
```

浏览器访问http://localhost:8083进入web登录界面

* 进入/books文件夹下载图书数据库文件

```
cd docker/calibre-web/books
wget https://raw.githubusercontent.com/janeczku/calibre-web/master/library/metadata.db
```

## 在群晖NAS里安装并映射到公网访问

### 创建项目文件夹

在群晖File Station创建/calibre-web/config/和/calibre-web/books/文件夹用于存放容器的配置文件和书籍文件，并且给所有用户读取和写入权限.

在books文件夹里添加[metadata.db](https://raw.githubusercontent.com/janeczku/calibre-web/master/library/metadata.db)文件。

### 下载calibre-web镜像

首先确保群晖安装了**docker**，在docker的注册表里搜索calibre-web，选择第一个镜像下载。

![1](/img/in-post/2023-09-02/1.png)

### 配置并启动容器

* 新建一个容器，选择刚刚下载的镜像，设置容器名称，选择启用自动重新启动容器，然后点击高级设置，环境配置选择新增，添加PUID和PGID两个变量。	

![2](/img/in-post/2023-09-02/2.png)

* 端口设置选择你想映射的本地端口，这里我也填8083。

  ![3](/img/in-post/2023-09-02/3.png)

* 然后存储空间映射选择刚刚创建的两个文件夹，容器的/books映射到刚刚创建的/calibre-web/books文件夹，/config映射到/calibre-web/config文件夹。

![4](/img/in-post/2023-09-02/4.png)

* 点击下一步，然后点击完成启动容器。

浏览器访问群晖ip:8083进入calibre-web界面。

> 设置内网端口转发或者内网穿透，并且防火墙开放8083端口就能愉快的在外网访问了。

## 启动Calibre Web

使用默认账号密码登录

> Username: admin
>
> Password: admin123

登录后要求配置数据库，选择books文件夹里面的metadata.db，然后保存即可。

![5](/img/in-post/2023-09-02/5.png)

点击右上角admin，可以修改用户名和密码，选择语言中文然后保存。

支持多用户，管理权限里可以管理和添加新用户。

还可以开启匿名浏览，在编辑基本设置里面的功能配置里选择允许匿名浏览，这样访问的时候不用登录直接以Guest访问，在管理用户里面可以修改Guest用户的权限。

![6](/img/in-post/2023-09-02/6.png)

自动添加了Guest用户，可以修改游客访问的权限。

![6.5](/img/in-post/2023-09-02/6.5.png)

## 上传和管理书籍

Calibre Web没有管理书籍的功能，所以必须下载calibre桌面客户端，使用calibre的桌面客户端来管理图书数据库。

Calibre客户端下载: https://calibre-ebook.com/download

将VPS或者NAS的calibre-web项目文件夹挂载到本地，从而实现在本地客户端进行书库的读写。

安装完成后点击**连接/共享**，连接到文件夹，选择创建的calibre-web的项目文件夹，连接后点击书库，选择文件夹books书库，然后上传图书即可。

![7](/img/in-post/2023-09-02/7.png)

还能修改书籍的元数据。

![8](/img/in-post/2023-09-02/8.png)

上传成功后，刷新calibre web界面，即可看到添加的图书，支持网页下载和网页在线阅读。

![9](/img/in-post/2023-09-02/9.png)

![10](/img/in-post/2023-09-02/10.png)

支持PC和手机浏览器，阅读效果还不错。阅读页面可以设置背景颜色和字体大小调整。

![11](/img/in-post/2023-09-02/11.png)

![12](/img/in-post/2023-09-02/12.png)

## 不足之处

Calibre Web 暂时没有跨设备同步进度，同一账号登录，手机端和PC端阅读进度无法同步，只在同一设备才能记录上次阅读的位置，不过可以添加书签，到其他设备上点击书签就能到上次阅读的位置。而且在线阅读的设置无法固定，所以每次都得重新设置。不过总的来说Calibre Web还是非常好的，功能强大且界面简洁美观。

## 总结

搭建私人电子图书馆方便了我阅读和管理图书，只要有浏览器就能在任何地方阅读，能够收藏和整理我读过和想读的书，对于喜欢阅读的人非常有用，还能分享给家人朋友自己的书单。并且在NAS上部署和管理十分方便。