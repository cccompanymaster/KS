// 견적 폼 제출 처리
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

  // SMS 본문 구성 후 전화번호로 안내 (실제 백엔드 연동 전 임시)
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

// 모바일 네비게이션
document.addEventListener('DOMContentLoaded', () => {
  // 앵커 클릭 시 모바일 메뉴 닫기
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
    });
  });

  // 스크롤 시 헤더 그림자
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  // 섹션 진입 애니메이션
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.about-card, .service-card, .strength-card, .target-card, .area-item, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
