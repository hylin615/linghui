/* ============================================
   玲辉门&家具厂 - 询价表单逻辑
   表单验证 / localStorage / 剪贴板 / Toast
   ============================================ */

(function () {
  'use strict';

  // ========== 配置 ==========
  var CONFIG = {
    endpoint: '',                       // 设置后端 API 地址后可启用 POST 提交
    storageKey: 'linghui_inquiries',
    maxStorageEntries: 50,
    phoneRegex: /^1[3-9]\d{9}$/
  };

  // ========== Toast 通知 ==========
  function showToast(message, type) {
    var container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'success');
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
  }

  // ========== 表单验证 ==========
  function clearErrors() {
    document.querySelectorAll('.form-error-msg.show').forEach(function (el) {
      el.classList.remove('show');
    });
    document.querySelectorAll('.form-input.error, .form-select.error, .form-textarea.error').forEach(function (el) {
      el.classList.remove('error');
    });
  }

  function showError(id, message) {
    var input = document.getElementById(id);
    var errorEl = input.parentElement.querySelector('.form-error-msg');
    if (input) input.classList.add('error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    }
  }

  function validate() {
    clearErrors();
    var valid = true;

    var name = document.getElementById('inqName').value.trim();
    var phone = document.getElementById('inqPhone').value.trim();
    var productType = document.getElementById('inqProduct').value;

    if (!name || name.length < 2) {
      showError('inqName', '请输入您的姓名（至少2个字）');
      valid = false;
    }

    if (!phone) {
      showError('inqPhone', '请输入手机号码');
      valid = false;
    } else if (!CONFIG.phoneRegex.test(phone)) {
      showError('inqPhone', '请输入正确的手机号码');
      valid = false;
    }

    if (!productType) {
      showError('inqProduct', '请选择产品类型');
      valid = false;
    }

    return valid;
  }

  // ========== 保存询价记录 ==========
  function saveInquiry(data) {
    try {
      var inquiries = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
      inquiries.unshift({
        data: data,
        time: new Date().toISOString()
      });
      // 限制最多保留条数
      if (inquiries.length > CONFIG.maxStorageEntries) {
        inquiries = inquiries.slice(0, CONFIG.maxStorageEntries);
      }
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(inquiries));
    } catch (e) {
      // localStorage 可能满了
    }
  }

  // ========== 格式化复制到剪贴板 ==========
  function formatAndCopy(data) {
    var text =
      '【询价信息】\n' +
      '姓名：' + data.name + '\n' +
      '电话：' + data.phone + '\n' +
      '产品类型：' + data.productType + '\n' +
      (data.width && data.height ? '尺寸：' + data.width + '×' + data.height + 'mm\n' : '') +
      (data.quantity ? '数量：' + data.quantity + '\n' : '') +
      (data.message ? '留言：' + data.message + '\n' : '') +
      '---\n' +
      '来自：玲辉门&家具厂官网';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        // 静默成功
      }).catch(function () {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (e) {
      // 复制失败
    }
    document.body.removeChild(textarea);
  }

  // ========== POST 提交（可选） ==========
  function postInquiry(data) {
    if (!CONFIG.endpoint) return;

    fetch(CONFIG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(function () {
      // 静默失败，不影响用户体验
    });
  }

  // ========== 提交处理 ==========
  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    var btn = document.getElementById('submitBtn');
    var btnText = btn.textContent;
    btn.disabled = true;
    btn.innerHTML = '<span style="display:inline-block;animation:spin 0.8s linear infinite;">⏳</span> 提交中...';

    // 收集数据
    var data = {
      name: document.getElementById('inqName').value.trim(),
      phone: document.getElementById('inqPhone').value.trim(),
      productType: document.getElementById('inqProduct').value,
      width: document.getElementById('inqWidth').value,
      height: document.getElementById('inqHeight').value,
      quantity: document.getElementById('inqQty').value,
      message: document.getElementById('inqMsg').value.trim()
    };

    // 模拟提交（给用户感知）
    setTimeout(function () {
      saveInquiry(data);
      formatAndCopy(data);
      postInquiry(data);

      showToast('提交成功！我们将尽快与您联系。询价信息已复制到剪贴板。', 'success');

      // 重置表单
      document.getElementById('inquiryForm').reset();
      btn.disabled = false;
      btn.innerHTML = btnText;

      // 如果有预填产品，恢复 URL 参数
      updateUrlProduct();
    }, 800);
  }

  // ========== 从 URL 参数预填产品类型 ==========
  function updateUrlProduct() {
    var params = new URLSearchParams(window.location.search);
    var product = params.get('product');
    if (product) {
      var select = document.getElementById('inqProduct');
      // 尝试匹配选项
      var options = select.querySelectorAll('option');
      options.forEach(function (opt) {
        if (opt.textContent.indexOf(product) !== -1 || product.indexOf(opt.textContent) !== -1) {
          select.value = opt.value;
        }
      });
    }
  }

  // ========== 实时验证 ==========
  function initLiveValidation() {
    var phoneInput = document.getElementById('inqPhone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function () {
        var value = phoneInput.value.replace(/\s/g, '');
        var errorEl = phoneInput.parentElement.querySelector('.form-error-msg');
        if (value && !CONFIG.phoneRegex.test(value)) {
          phoneInput.classList.add('error');
          if (errorEl) {
            errorEl.textContent = '请输入正确的手机号码';
            errorEl.classList.add('show');
          }
        } else {
          phoneInput.classList.remove('error');
          if (errorEl) errorEl.classList.remove('show');
        }
      });
    }

    var nameInput = document.getElementById('inqName');
    if (nameInput) {
      nameInput.addEventListener('blur', function () {
        var value = nameInput.value.trim();
        var errorEl = nameInput.parentElement.querySelector('.form-error-msg');
        if (value && value.length < 2) {
          nameInput.classList.add('error');
          if (errorEl) {
            errorEl.textContent = '姓名至少2个字';
            errorEl.classList.add('show');
          }
        } else if (value) {
          nameInput.classList.remove('error');
          if (errorEl) errorEl.classList.remove('show');
        }
      });
    }
  }

  // ========== DOM 就绪 ==========
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('inquiryForm');
    if (form) {
      form.addEventListener('submit', handleSubmit);
    }

    updateUrlProduct();
    initLiveValidation();
  });

  // 旋转动画
  var style = document.createElement('style');
  style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(style);

})();
