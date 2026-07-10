/* ============================================
   玲辉门&家具厂 - 产品数据 & 筛选逻辑
   ============================================ */

(function () {
  'use strict';

  // ========== 产品数据（在此修改产品信息） ==========
  var products = [

    // === 平开门 ===
    {
      id: 1,
      name: '铝合金平开门 LY-P01',
      category: '平开门',
      icon: '🚪',
      specs: ['铝合金', '钢化玻璃', '多色可选'],
      material: '6063 铝合金型材',
      glass: '5mm / 8mm 钢化玻璃',
      color: '白色 / 灰色 / 香槟金 / 木纹转印',
      widthRange: '600-1200mm',
      heightRange: '1800-2400mm',
      description: '经典款铝合金平开门，适合室内卫生间、厨房门，密封性好，防潮防腐蚀。'
    },
    {
      id: 2,
      name: '铝合金重型平开门 LY-P02',
      category: '平开门',
      icon: '🚪',
      specs: ['加厚型材', '双层钢化', '防盗'],
      material: '6063 加厚铝合金型材',
      glass: '双层 5mm 钢化中空玻璃',
      color: '灰色 / 深咖 / 黑色',
      widthRange: '800-1500mm',
      heightRange: '1800-2700mm',
      description: '重型平开门，适用于入户门、阳台门，强度高，隔音隔热效果出色。'
    },
    {
      id: 3,
      name: '窄边框平开门 LY-P03',
      category: '平开门',
      icon: '✨',
      specs: ['窄边框', '极简风格', '长虹玻璃'],
      material: '6063 铝合金窄边框型材',
      glass: '8mm 长虹玻璃 / 磨砂玻璃',
      color: '黑色 / 白色',
      widthRange: '600-1000mm',
      heightRange: '1800-2400mm',
      description: '极简窄边框设计，搭配长虹玻璃，简约时尚，适合现代风格装修。'
    },

    // === 推拉门 ===
    {
      id: 4,
      name: '铝合金推拉门 LY-T01',
      category: '推拉门',
      icon: '🪟',
      specs: ['静音滑轮', '钢化玻璃', '防尘轨道'],
      material: '6063 铝合金型材',
      glass: '5mm / 8mm 钢化玻璃',
      color: '白色 / 灰色 / 香槟金',
      widthRange: '1200-3000mm',
      heightRange: '1800-2400mm',
      description: '经典铝合金推拉门，静音滑轮设计，推拉顺畅，适合阳台、厨房隔断。'
    },
    {
      id: 5,
      name: '重型推拉门 LY-T02',
      category: '推拉门',
      icon: '🪟',
      specs: ['重型轨道', '双层中空', '断桥隔热'],
      material: '断桥铝合金型材',
      glass: '双层 5mm 钢化中空玻璃',
      color: '灰色 / 深咖 / 黑色 / 氟碳喷涂',
      widthRange: '1500-4000mm',
      heightRange: '2000-3000mm',
      description: '重型断桥推拉门，承重可达 300kg，防风防雨，适合大型阳台、店面门面。'
    },

    // === 铝合金家具 ===
    {
      id: 6,
      name: '铝合金橱柜 LY-F01',
      category: '铝合金家具',
      icon: '🍳',
      specs: ['防水防潮', '零甲醛', '可定制'],
      material: '铝合金框架 + 不锈钢台面',
      color: '白色 / 灰色 / 原木色门板',
      size: '根据厨房尺寸定制',
      description: '全铝橱柜，防水防潮防虫蛀，零甲醛环保，寿命远超木质橱柜，适合南方潮湿环境。'
    },
    {
      id: 7,
      name: '铝合金衣柜 LY-F02',
      category: '铝合金家具',
      icon: '👔',
      specs: ['全铝框架', '零甲醛', '可定制'],
      material: '铝合金框架 + 板材门板',
      color: '白色 / 原木色 / 灰色布纹',
      size: '根据卧室尺寸定制',
      description: '全铝衣柜，零甲醛无异味，即装即住，防潮防虫，经久耐用。可根据需求定制内部格局。'
    },
    {
      id: 8,
      name: '铝合金浴室柜 LY-F03',
      category: '铝合金家具',
      icon: '🪞',
      specs: ['全防水', '镜柜一体', '台下盆'],
      material: '铝合金柜体 + 石英石台面',
      color: '白色 / 灰色 / 黑色',
      size: '600-1200mm 宽',
      description: '专为潮湿环境设计，全铝柜体永不发霉变形，搭配石英石台面和陶瓷盆，实用美观。'
    },
    {
      id: 9,
      name: '铝合金置物架 LY-F04',
      category: '铝合金家具',
      icon: '📦',
      specs: ['承重强', '自由组合', '多场景'],
      material: '铝合金立柱 + 隔板',
      color: '银色 / 黑色 / 白色',
      size: '根据空间定制',
      description: '多功能铝合金置物架，可用于仓库、阳台、厨房收纳，承重强，防锈防腐。'
    },

    // === 工程窗 ===
    {
      id: 10,
      name: '断桥铝合金窗 LY-W01',
      category: '工程窗',
      icon: '🪟',
      specs: ['断桥隔热', '双层中空', '工程批量'],
      material: '断桥铝合金型材',
      glass: '双层 5mm 钢化中空玻璃',
      color: '白色 / 灰色 / 氟碳喷涂',
      size: '根据工程图纸定制',
      description: '断桥铝合金窗，隔热隔音性能优异，适合楼盘、写字楼等工程批量定制。'
    },
    {
      id: 11,
      name: '普通铝合金窗 LY-W02',
      category: '工程窗',
      icon: '🪟',
      specs: ['经济实惠', '推拉/平开', '工程批量'],
      material: '普通铝合金型材',
      glass: '5mm 钢化玻璃',
      color: '白色 / 银色',
      size: '根据工程图纸定制',
      description: '经济型铝合金窗，性价比高，适合厂房、学校、宿舍等大批量安装。'
    }
  ];

  // ========== 渲染产品列表 ==========
  function renderProducts(filter) {
    var grid = document.getElementById('productGrid');
    if (!grid) return;

    filter = filter || '全部';
    var html = '';
    var count = 0;

    products.forEach(function (product) {
      var match = (filter === '全部' || product.category === filter);
      var hiddenClass = match ? '' : ' hidden';

      if (match) count++;

      html +=
        '<div class="product-card' + hiddenClass + '" data-category="' + product.category + '" data-id="' + product.id + '">' +
          '<div class="card-image">' +
            '<div class="ph-img" style="background:' + getCardBg(product.id) + ';">' +
              '<span style="font-size:2.5rem;">' + product.icon + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="card-body">' +
            '<div class="card-name">' + product.name + '</div>' +
            '<div class="card-specs">' +
              product.specs.map(function (s) { return '<span>' + s + '</span>'; }).join('') +
            '</div>' +
          '</div>' +
          '<div class="product-detail" id="detail-' + product.id + '">' +
            '<dl>' +
              '<div class="detail-row"><dt>材质</dt><dd>' + esc(product.material) + '</dd></div>' +
              '<div class="detail-row"><dt>玻璃</dt><dd>' + esc(product.glass || '—') + '</dd></div>' +
              '<div class="detail-row"><dt>颜色</dt><dd>' + esc(product.color || '—') + '</dd></div>' +
              '<div class="detail-row"><dt>尺寸范围</dt><dd>' + esc(product.size || product.widthRange + ' × ' + product.heightRange) + '</dd></div>' +
            '</dl>' +
            '<p class="detail-desc">' + esc(product.description) + '</p>' +
            '<a href="inquiry.html?product=' + encodeURIComponent(product.name) + '" class="btn btn-primary btn-sm btn-inquiry">立即询价</a>' +
          '</div>' +
        '</div>';
    });

    // 空状态
    if (count === 0) {
      html =
        '<div class="empty-state">' +
          '<div class="empty-icon">📭</div>' +
          '<p>暂无该分类产品</p>' +
          '<a href="inquiry.html" class="btn btn-primary">联系我们咨询定制</a>' +
        '</div>';
    }

    grid.innerHTML = html;

    // 绑定点击展开详情
    grid.querySelectorAll('.product-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        // 如果点击的是按钮，不处理
        if (e.target.closest('.btn-inquiry')) return;
        var detail = card.querySelector('.product-detail');
        if (detail) {
          detail.classList.toggle('open');
        }
      });
    });
  }

  function getCardBg(id) {
    var colors = [
      'linear-gradient(135deg, #1B2A4A, #2C3E6B)',
      'linear-gradient(135deg, #2C3E6B, #1B3A5C)',
      'linear-gradient(135deg, #1B3A5C, #2C4A3E)',
      'linear-gradient(135deg, #3D528C, #1B2A4A)',
      'linear-gradient(135deg, #2C3E6B, #3D528C)',
      'linear-gradient(135deg, #1B2A4A, #3D528C)',
      'linear-gradient(135deg, #3D528C, #2C3E6B)',
      'linear-gradient(135deg, #2C4A3E, #1B3A5C)',
      'linear-gradient(135deg, #1B3A5C, #3D528C)',
      'linear-gradient(135deg, #2C3E6B, #1B2A4A)',
      'linear-gradient(135deg, #1B2A4A, #2C4A3E)'
    ];
    return colors[(id - 1) % colors.length];
  }

  function esc(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ========== 筛选逻辑 ==========
  function initFilter() {
    var pills = document.querySelectorAll('.filter-pill[data-filter]');
    if (!pills.length) return;

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        // 更新激活样式
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');

        var filter = pill.getAttribute('data-filter');
        renderProducts(filter);

        // 更新 URL hash
        if (filter === '全部') {
          history.replaceState(null, '', window.location.pathname);
        } else {
          history.replaceState(null, '', '#' + filter);
        }
      });
    });

    // 读取 URL hash 初始筛选
    var hash = window.location.hash.replace('#', '');
    if (hash) {
      var targetPill = document.querySelector('.filter-pill[data-filter="' + hash + '"]');
      if (targetPill) {
        targetPill.click();
        return;
      }
    }

    // 默认显示全部
    renderProducts('全部');
  }

  // DOM 就绪
  document.addEventListener('DOMContentLoaded', function () {
    initFilter();
  });

})();
