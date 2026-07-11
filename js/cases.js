/* ============================================
   玲辉门&家具厂 - 案例数据 & 筛选 & 灯箱
   ============================================ */

(function () {
  'use strict';

  // ========== 案例数据（在此添加真实案例） ==========
  var cases = [
    {
      id: 1,
      name: '晋江华泰小区',
      image: 'case-pkm-01.jpg',
      category: '平开门',
      icon: '🏠',
      description: '安装铝合金平开门 80 套，用于室内卫生间门和厨房门，白色烤漆，配磨砂玻璃。'
    },
    {
      id: 2,
      name: '石狮万科金域中央',
      image: 'case-tlm-01.jpg',
      category: '推拉门',
      icon: '🏢',
      description: '安装重型推拉门 120 套，用于阳台隔断，断桥铝合金，双层中空钢化玻璃，深灰色。'
    },
    {
      id: 3,
      name: '泉州宝珊花园别墅',
      image: 'case-jiaju-01.jpg',
      category: '铝合金家具',
      icon: '🏡',
      description: '定制全铝橱柜、衣柜、浴室柜共 3 套，白色门板搭配原木色柜体，零甲醛环保。'
    },
    {
      id: 4,
      name: '泉州东海湾豪庭',
      image: 'case-pkm-01.jpg',
      category: '平开门',
      icon: '🏘️',
      description: '安装窄边框平开门 60 套，黑色窄边框配长虹玻璃，极简风格装修。'
    },
    {
      id: 5,
      name: '晋江阳光城',
      image: 'case-tlm-02.jpg',
      category: '推拉门',
      icon: '🏗️',
      description: '安装铝合金推拉门 95 套，香槟金色，厨房和阳台隔断使用。'
    },
    {
      id: 6,
      name: '泉州中骏世界城商铺',
      image: 'case-tlm-03.jpg',
      category: '推拉门',
      icon: '🏬',
      description: '店面玻璃推拉门 20 套，重型轨道，通透大玻璃，氟碳喷涂黑色。'
    },
    {
      id: 7,
      name: '晋江英林镇自建房',
      image: 'case-jiaju-02.jpg',
      category: '铝合金家具',
      icon: '🏠',
      description: '定制全铝厨房橱柜 + 吊柜，不锈钢台面，白色门板，防水防潮防白蚁。'
    },
    {
      id: 8,
      name: '泉州师范学院宿舍楼',
      image: 'case-gc-01.jpg',
      category: '工程窗',
      icon: '🏫',
      description: '安装普通铝合金推拉窗 300 套，白色型材，5mm 钢化玻璃，批量工程。'
    },
    {
      id: 9,
      name: '晋江万达写字楼',
      image: 'case-gc-02.jpg',
      category: '工程窗',
      icon: '🏢',
      description: '安装断桥铝合金平开窗 200 套，灰色氟碳喷涂，双层中空玻璃，隔音隔热。'
    }
  ];

  // ========== 渲染案例画廊 ==========
  function renderCases(filter) {
    var grid = document.getElementById('casesGrid');
    if (!grid) return;

    filter = filter || '全部';
    var html = '';
    var count = 0;

    cases.forEach(function (item) {
      var match = (filter === '全部' || item.category === filter);
      var hiddenClass = match ? '' : ' hidden';
      if (match) count++;

      html +=
        '<div class="case-item' + hiddenClass + '" data-id="' + item.id + '" data-category="' + item.category + '">' +
          '<div class="case-img" style="background:' + getCaseBg(item.id) + '; position:relative; overflow:hidden;">' +
            (item.image ? '<img src="assets/images/' + item.image + '" alt="' + esc(item.name) + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" onerror="this.style.display=\'none\'">' : '') +
            '<span class="case-icon"' + (item.image ? ' style="position:relative;z-index:1;text-shadow:0 2px 8px rgba(0,0,0,0.5);"' : '') + '>' + item.icon + '</span>' +
          '</div>' +
          '<div class="case-overlay">' +
            '<div class="case-name">' + esc(item.name) + '</div>' +
            '<div class="case-cat">' + esc(item.category) + '</div>' +
          '</div>' +
        '</div>';
    });

    if (count === 0) {
      html =
        '<div class="empty-state" style="grid-column:1/-1;text-align:center;padding:4rem 0;color:#909399;">' +
          '<div class="empty-icon" style="font-size:3rem;margin-bottom:1rem;">📷</div>' +
          '<p style="font-size:1.125rem;margin-bottom:1rem;">暂无该分类案例</p>' +
          '<a href="inquiry.html" class="btn btn-primary">联系我们咨询</a>' +
        '</div>';
    }

    grid.innerHTML = html;

    // 绑定点击
    grid.querySelectorAll('.case-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var id = parseInt(item.getAttribute('data-id'));
        openLightbox(id, filter);
      });
    });
  }

  function getCaseBg(id) {
    var gradients = [
      'linear-gradient(135deg, #1B2A4A, #2C3E6B)',
      'linear-gradient(135deg, #2C3E6B, #1B3A5C)',
      'linear-gradient(135deg, #1B3A5C, #2C4A3E)',
      'linear-gradient(135deg, #3D528C, #1B2A4A)',
      'linear-gradient(135deg, #2C3E6B, #3D528C)',
      'linear-gradient(135deg, #1B2A4A, #3D528C)',
      'linear-gradient(135deg, #3D528C, #2C3E6B)',
      'linear-gradient(135deg, #2C4A3E, #1B3A5C)',
      'linear-gradient(135deg, #1B3A5C, #3D528C)'
    ];
    return gradients[(id - 1) % gradients.length];
  }

  function esc(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ========== 灯箱 ==========
  var currentIndex = -1;
  var filteredCases = [];

  function openLightbox(id, filter) {
    // 获取当前筛选下的案例列表
    filteredCases = cases.filter(function (c) {
      return filter === '全部' || c.category === filter;
    });

    currentIndex = filteredCases.findIndex(function (c) { return c.id === id; });
    if (currentIndex === -1) return;

    showLightboxItem();
    document.getElementById('lightboxOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function showLightboxItem() {
    var item = filteredCases[currentIndex];
    if (!item) return;

    var img = document.getElementById('lightboxImg');
    var name = document.getElementById('lightboxName');
    var desc = document.getElementById('lightboxDesc');

    // 显示真实图片或渐变色块
    if (item.image) {
      img.innerHTML = '<img src="assets/images/' + item.image + '" alt="' + esc(item.name) + '" style="width:100%;max-width:700px;aspect-ratio:16/10;border-radius:8px;object-fit:contain;background:' + getCaseBg(item.id) + ';">';
    } else {
      img.style.background = getCaseBg(item.id);
      img.style.width = '100%';
      img.style.maxWidth = '700px';
      img.style.aspectRatio = '16 / 10';
      img.style.borderRadius = '8px';
      img.style.display = 'flex';
      img.style.alignItems = 'center';
      img.style.justifyContent = 'center';
      img.style.fontSize = '4rem';
      img.textContent = item.icon;
    }

    name.textContent = item.name;
    desc.textContent = item.description;
  }

  function closeLightbox() {
    document.getElementById('lightboxOverlay').classList.remove('open');
    document.body.style.overflow = '';
    currentIndex = -1;
  }

  function prevItem() {
    if (filteredCases.length === 0) return;
    currentIndex = (currentIndex - 1 + filteredCases.length) % filteredCases.length;
    showLightboxItem();
  }

  function nextItem() {
    if (filteredCases.length === 0) return;
    currentIndex = (currentIndex + 1) % filteredCases.length;
    showLightboxItem();
  }

  // ========== 筛选 ==========
  function initFilter() {
    var pills = document.querySelectorAll('.filter-pill[data-filter]');
    if (!pills.length) return;

    var currentFilter = '全部';

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        currentFilter = pill.getAttribute('data-filter');
        renderCases(currentFilter);

        if (currentFilter === '全部') {
          history.replaceState(null, '', window.location.pathname);
        } else {
          history.replaceState(null, '', '#' + currentFilter);
        }
      });
    });

    // 初始 hash
    var hash = window.location.hash.replace('#', '');
    if (hash) {
      var targetPill = document.querySelector('.filter-pill[data-filter="' + hash + '"]');
      if (targetPill) {
        targetPill.click();
        return;
      }
    }

    renderCases('全部');
  }

  // ========== 灯箱事件绑定 ==========
  function initLightbox() {
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', prevItem);
    document.getElementById('lightboxNext').addEventListener('click', nextItem);

    var overlay = document.getElementById('lightboxOverlay');
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevItem();
      if (e.key === 'ArrowRight') nextItem();
    });

    // 触摸滑动
    var touchStartX = 0;
    overlay.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    });
    overlay.addEventListener('touchend', function (e) {
      var delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 50) {
        if (delta > 0) prevItem();
        else nextItem();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initFilter();
    initLightbox();
  });

})();
