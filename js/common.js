/* ============================================
   玲辉门&家具厂 - 公共交互逻辑
   导航 / 底部栏 / 微信弹窗 / 返回顶部 / 滚动动画
   ============================================ */

(function () {
  'use strict';

  // === DOM 就绪后执行 ===
  document.addEventListener('DOMContentLoaded', function () {

    // ========== 移动端汉堡菜单 ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    let navOverlay = document.querySelector('.nav-overlay');

    // 动态创建遮罩
    if (!navOverlay) {
      navOverlay = document.createElement('div');
      navOverlay.className = 'nav-overlay';
      document.body.appendChild(navOverlay);
    }

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        const isOpen = navLinks.classList.contains('open');
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      navOverlay.addEventListener('click', closeMenu);

      // 点击导航链接后关闭菜单
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });
    }

    function openMenu() {
      hamburger.classList.add('open');
      navLinks.classList.add('open');
      navOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    // ========== 导航高亮当前页 ==========
    const currentPage = document.body.getAttribute('data-page');
    if (currentPage && navLinks) {
      navLinks.querySelectorAll('a').forEach(function (link) {
        if (link.getAttribute('data-page') === currentPage) {
          link.classList.add('active');
        }
      });
    }

    // ========== 导航栏滚动阴影 ==========
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
          navbar.classList.add('shadow');
        } else {
          navbar.classList.remove('shadow');
        }
      });
    }

    // ========== 微信二维码弹窗 ==========
    const wechatTriggers = document.querySelectorAll('.trigger-wechat');
    const wechatModal = document.querySelector('.wechat-modal-overlay');
    const wechatClose = document.querySelector('.qr-close');

    if (wechatTriggers.length && wechatModal) {
      wechatTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          wechatModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      });

      if (wechatClose) {
        wechatClose.addEventListener('click', closeWechatModal);
      }

      wechatModal.addEventListener('click', function (e) {
        if (e.target === wechatModal) {
          closeWechatModal();
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && wechatModal.classList.contains('open')) {
          closeWechatModal();
        }
      });
    }

    function closeWechatModal() {
      wechatModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    // ========== 返回顶部按钮 ==========
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      });

      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // ========== 滚动渐显动画 ==========
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
      });

      animatedElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // 不支持 IntersectionObserver 则直接显示
      animatedElements.forEach(function (el) {
        el.classList.add('animated');
      });
    }

    // ========== 微信浏览器检测：修改二维码提示文字 ==========
    var isWechat = /MicroMessenger/i.test(navigator.userAgent);
    var qrTip = document.getElementById('wechat-tip');
    if (isWechat && qrTip) {
      qrTip.textContent = '长按识别二维码添加微信';
    }

    // ========== 平滑滚动到锚点 ==========
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = navbar ? navbar.offsetHeight : 0;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });

  });

})();
