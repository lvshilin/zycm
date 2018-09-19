// pages/studyDetail/studyDetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    optionsType: '',
    typeTitle: '',
    typeText: '',
    studyList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var list = [];
    if (options.type == 1) {
      this.setData({
        typeTitle: "java简介"
      });
      var typeText = "Java，是由Sun Microsystems公司于1995年5月推出的Java程序设计语言和Java平台的总称。用Java实现的HotJava浏览器（支持Java applet）显示了Java的魅力：跨平台、动态的Web、Internet计算。从此，Java被广泛接受并推动了Web的迅速发展，常用的浏览器现在均支持Java applet。";
      this.setData({
        typeText: typeText
      });
      list.push("1.计算机基础知识（编程环境）");
      list.push("2.编程基础（变量，方法，数组等）");
      list.push("3.面向对象（思想，封装，继承等）");
      list.push("4.IO流（输入流，输出流等）");
      this.setData({
        studyList: list
      })
    } else if (options.type == 2) {
      this.setData({
        typeTitle: "web前端基础"
      });
      var typeText = "超文本标记语言，标准通用标记语言下的一个应用。 “超文本”就是指页面内可以包含图片、链接，甚至音乐、程序等非文字元素。";
      this.setData({
        typeText: typeText
      });
      list.push("1.html标签设计");
      list.push("2.css样式标签设计");
      list.push("3.javaScript编程");
      list.push("4.jquery");
      list.push("5.Bootstrap框架");
      this.setData({
        studyList: list
      })
    } else if (options.type == 3) {
      this.setData({
        typeTitle: "mysql数据库"
      });
      var typeText = "MySQL是一个关系型数据库管理系统，由瑞典MySQL AB 公司开发，目前属于 Oracle 旗下产品。MySQL 是最流行的关系型数据库管理系统之一，在 WEB 应用方面，MySQL是最好的 RDBMS (Relational Database Management System，关系数据库管理系统) 应用软件。";
      this.setData({
        typeText: typeText
      });
      list.push("1.MySQL应用范围");
      list.push("2.数据库设计基础");
      list.push("3.数据库SQL语句学习");
      list.push("4.SQL语句练习应用");
      list.push("5.MySQL优化");
      this.setData({
        studyList: list
      })
    } else if (options.type == 4) {
      this.setData({
        typeTitle: "java企业项目实战"
      });
      var typeText = "Java EE（Java Platform，Enterprise Edition）是sun公司（2009年4月20日甲骨文将其收购）推出的企业级应用程序版本。这个版本以前称为 J2EE。能够帮助我们开发和部署可移植、健壮、可伸缩且安全的服务器端 Java应用程序。Java EE 是在 Java SE 的基础上构建的，它提供Web 服务、组件模型、管理和通信 API，可以用来实现企业级的面向服务体系结构（service-oriented architecture，SOA）和 Web 3.0应用程序。";
      this.setData({
        typeText: typeText
      });
      list.push("1.maven项目管理工具");
      list.push("2.springmvc框架");
      list.push("3.mybatis框架");
      list.push("4.项目实战应用");

      this.setData({
        studyList: list
      })
    } else if (options.type == 5) {
      this.setData({
        typeTitle: "微信小程序实战"
      });
      var typeText = "一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或搜一下即可打开应用。";
      this.setData({
        typeText: typeText
      });
      list.push("1.小程序的页面设计");
      list.push("2.weui应用");
      list.push("3.小程序API使用");
      list.push("4.对接java接口，实战电商项目");
      this.setData({
        studyList: list
      })
    }
  },
})