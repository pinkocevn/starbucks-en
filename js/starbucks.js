$(function(){
   // 메뉴팝업 
   // 메뉴버튼의 클래스 이름이 sp-menu / sp-close 중 하나로 바뀌게 한다. 
   // .gnb .gnb-popup에 open클래스가 붙거나 제거되게 한다.
   $('.gnb button').click(function () { 
      $(this).toggleClass('sp-menu sp-close');
      $('.gnb .gnb-popup').toggleClass('open');
   });   

   // 메인 슬라이드 
   var mainOption = {
      navigation:{
         nextEl:'.sp-next',
         prevEl:'.sp-prev',
      },
      pagination:{
         el:'.swiper-pagination',
         type:'progressbar'
      },
      effect:'fade',
      loop:true,
      simulateTouch:false,
      on:{
         'slideChange':function(){
            // loop의 상황에서 현재 슬라이드 인덱스에 +1을 하면 페이지 번호가 된다.
            var index = mainSlide.realIndex+1;
            console.log('slideChange!', index);
            $('.pagination .page').text('0'+index);
            $('.slide img').attr('src', slideImgs[index-1]);
         }
      }
   }

   // 최초 한 번 메인슬라이드 객체 생성하기 
   // 한 페이지에 슬라이드가 여러 개일 경우 상위 요소를 먼저 선택 후 컨테이너를 잡는다.
   var mainSlide=new Swiper('.slide .swiper-container',mainOption);
   var slideImgs=['img/slide-coffee1.png', 'img/slide-coffee2.png', 'img/slide-coffee3.png']
   var slideText=[
      'Meet our new<br> Summer Caramel Frappuccino',
      '50% discount<br> Coffee Frappuccino',
      'Delicious<br> Java Chip Frappuccino'
   ]
   // 화살표에 마우스를 올리면 controls안의 내용 변경 
   $('.arrow button').on({
      mouseenter:function(){
         if($(this).hasClass('sp-prev')){
            $('.direction').text('Prev Slide');
            slidePrev();
         }else{
            $('.direction').text('Next Slide');
            slideNext();            
         }
      }
   })

   function slidePrev(){
      var index=mainSlide.realIndex+1;
      var prevIndex=index-1;//이전 슬라이드 번호 
      if(prevIndex<1){//최소값보다 작아지면 최대값으로 변경
         prevIndex=3;
      }
      $('.info .page').text('0'+prevIndex);//01, 02, 03
      $('.info b').html(slideTexts[prevIndex-1]);//0, 1, 2
   }

   function slideNext(){
      var index=mainSlide.realIndex+1;
      var nextIndex=index+1;//다음 슬라이드 번호 
      if(index>2){//최대값보다 커지면 최소값으로 변경 
         nextIndex=1;
      }
      $('.info .page').text('0'+nextIndex);//01, 02, 03
      $('.info b').html(slideTexts[nextIndex-1]);//0, 1, 2
   }

   $(window).resize(function(){
      var windowW=$(this).width();
      if(mainSlide!=undefined){//객체 생성이 되어 있을 경우 
         mainSlide.destroy();
      }

      if(windowW<768){//모바일
         mainOption.simulateTouch=true;
      }else{//모바일 이상
         mainOption.simulateTouch=false;
      }

      mainSlide=new Swiper('.slide .swiper-container',mainOption);
      mainSlide.on('slidePrevTransitionStart',function(){
         slidePrev();
      })
      mainSlide.on('slideNextTransitionStart',function(){
         slideNext();
      })

   }).resize();

   // 메인 슬라이드 end ======================================================

   // 매장검색시 나오는 리스트 목록 클릭시 활성화상태 변경 
   $('#store-list').on('click','a',function(e){
      // href의 기능 사용하지 않기
      e.preventDefault();
      $('#store-list li').removeClass();
      $(this).parent().addClass('active');
   })

   // 매장 검색리스트 스크롤바 처리 
   $('.scrollbar-inner').scrollbar();


   
})