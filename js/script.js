// header
document.addEventListener('DOMContentLoaded', () => {
    const headerWrap = document.getElementById('header_wrap');
    const mainHero = document.getElementById('main_hero');

    // // 1. 페이지 접속 후 4초(3000ms) 뒤에 메인 히어로만 자동으로 사라짐
    setTimeout(() => {
        mainHero.classList.add('shrink');
    }, 3000);



    // 2. 스크롤을 내릴 때만 헤더가 나타나도록 설정
    window.addEventListener('scroll', () => {
        // 스크롤이 80px 이상 내려가면 헤더 노출
        if (window.scrollY > 80) {
            headerWrap.classList.add('visible');
        } else {
            // 맨 위로 돌아오면 다시 숨김
            headerWrap.classList.remove('visible');
        }
    });



    // 3. Swiper 설정
    const swiper = new Swiper('.mySwiper', {
        loop: true, // 루프 활성화 (권장)
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // 3-2. #product 섹션 스크롤 감지기
    const productSection = document.querySelector('#product');

    if (productSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    swiper.params.autoplay = {
                        delay: 4000, 
                        disableOnInteraction: false,
                        waitForTransition: true
                    };
                    swiper.autoplay.start();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2 
        });

        observer.observe(productSection);
    } 


    // 4. 스크롤 페이드인 효과 (Intersection Observer - 무한 반복 버전)
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 화면에 들어왔을 때 active 클래스 추가
                entry.target.classList.add('active');
            } else {
                // 화면에서 완전히 벗어났을 때 active 클래스 제거 (반복 효과의 핵심)
                // 다시 위로 올리거나 멀리 갔다가 돌아올 때 효과가 다시 나타납니다.
                entry.target.classList.remove('active');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,      // 브라우저 뷰포트 기준
        threshold: 0.15, // 요소의 15%가 보이면 실행
        rootMargin: '0px 0px -50px 0px' // 아래쪽 여백을 살짝 주어 부드럽게 초기화
    });

    // .reveal 클래스를 가진 모든 요소를 감시 대상으로 등록
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });




    // 5.튜토리얼 영상
   // 페이지 내의 모든 튜토리얼 박스를 가져옵니다.
const tutorialBoxes = document.querySelectorAll('.tutorials_box');

tutorialBoxes.forEach(box => {
    // 각 박스 내부의 비디오 요소를 찾습니다.
    const video = box.querySelector('.hover_video');

    // 1. 마우스를 박스에 올렸을 때
    box.addEventListener('mouseenter', () => {
        // 영상 재생
        video.play().catch(error => {
            console.log("자동 재생이 차단되었습니다:", error);
        });
        
        // 반짝이는 테두리 클래스 추가
        box.classList.add('active');
    });

    // 2. 마우스를 박스에서 뗐을 때
    box.addEventListener('mouseleave', () => {
        // 영상 일시정지
        video.pause();

        // 마우스를 뗐을 때 영상이 처음(0초)으로 되돌아가기
        video.currentTime = 0;
        
        // 반짝이는 테두리 클래스 제거
        box.classList.remove('active');
    });
});


// 6. 풋터 top 버튼
// TOP 버튼과 푸터 요소를 가져옵니다.
const topBtn = document.querySelector('#scrollToTopBtn');
const footer = document.querySelector('#footer'); // 태그명 'footer'로 안전하게 매칭

if (topBtn) {
    
    // 1. 📜 스크롤 이벤트: 스크롤이 800px 이상 내려왔을 때만 TOP 버튼 나타나기
window.addEventListener('scroll', () => {
    // 800px은 첫 화면(메인 배너)이 끝나는 대략적인 시점입니다. 
    // 본인 사이트에 맞춰 600이나 1000 등으로 자유롭게 조절하세요!
    if (window.scrollY > 800) {
        topBtn.classList.add('show');
    } else {
        topBtn.classList.remove('show');
    }
});


    // 2. 👆 클릭 이벤트: 버튼을 누르면 화면 맨 위로 부드럽게 스크롤
    topBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드럽게 스르륵 올라가는 핵심 옵션
        });
    });
}

 

}); //전체 감싸고있는 친구  (이 안으로 작성해야함)



