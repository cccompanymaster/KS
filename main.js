// ============================================
// 로딩 스크린 제어
// ============================================
(function () {
  document.body.classList.add('loading');
  const MIN_DISPLAY_MS = 1800;
  const startedAt = Date.now();

  function hidePreloader() {
    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
    setTimeout(() => {
      const pre = document.getElementById('preloader');
      if (pre) pre.classList.add('hidden');
      document.body.classList.remove('loading');
      setTimeout(() => { if (pre) pre.remove(); }, 1000);
    }, remaining);
  }

  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
    // 안전장치: 폰트/이미지 로드가 너무 오래 걸리면 강제로 닫음
    setTimeout(hidePreloader, 5000);
  }
})();

// ============================================
// 견적 폼 제출 처리
// ============================================
function submitQuote(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const name = data.get('name');
  const phone = data.get('phone');
  const type = data.get('type');
  const date = data.get('date');
  const from = data.get('from');
  const to = data.get('to');
  const memo = data.get('memo');

  const msg =
    `[KS금성익스프레스 견적 신청]\n` +
    `▪ 이름: ${name}\n` +
    `▪ 연락처: ${phone}\n` +
    `▪ 이사 종류: ${type}\n` +
    (date ? `▪ 희망 이사일: ${date}\n` : '') +
    (from ? `▪ 출발지: ${from}\n` : '') +
    (to ? `▪ 도착지: ${to}\n` : '') +
    (memo ? `▪ 요청 사항: ${memo}\n` : '');

  alert(
    '견적 신청이 접수되었습니다!\n\n' +
    '담당자가 빠른 시간 내에 연락드리겠습니다.\n' +
    '급한 문의는 010-8362-0024로 전화 주세요.\n\n' +
    '— 신청 내역 —\n' + msg
  );

  form.reset();
}

// ============================================
// 인터랙션
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // 앵커 클릭 시 모바일 메뉴 닫기
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
    });
  });

  // 스크롤 시 헤더 상태
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 12) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 섹션 진입 애니메이션
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.about-card, .service-card, .strength-card, .target-card, .area-item, .process-step, .faq-item, .packing-table-wrap'
  ).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 6) * 0.06}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 6) * 0.06}s`;
    observer.observe(el);
  });
});
