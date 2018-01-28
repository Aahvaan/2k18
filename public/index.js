$(document).ready(function(){

var images=Array.from(document.querySelectorAll('.img-elem'));

images.forEach((img)=> { 
  $(img).on('click',()=>{
    // console.log('add');
    document.querySelector('.cancel-btn-container').classList.add('overlay');
    document.querySelector('.cancel-btn').classList.add('btndis');
    img.classList.add('overlay');
    img.classList.add('remOpacity');
    img.children[0].classList.add('imgPos');
    img.children[0].style.width="50%";
      $('.cancel-btn').on('click',()=> {
        // console.log('remove');
        document.querySelector('.cancel-btn-container').classList.remove('overlay');
        document.querySelector('.cancel-btn').classList.remove('btndis');
        img.classList.remove('overlay');
        img.classList.remove('remOpacity');
        img.children[0].classList.remove('imgPos');
        img.children[0].style.width="100%";
      });
  });
});

$('#male').prop('checked', true);
var gender="male";
$('#male').on('change',function(){
    if($(this).is(':checked')){
      $('#female').prop('checked', false);
      gender="male";

    }else{
      $('#female').prop('checked', true);
      gender="female";
    }
     var players = Number($('#number').val());
  var sports_name = $("#sports_name").val();
  var max=0;
  var min=0;
  var amount = 0;
  if(gender=="male"){
    if(sports_name=="Athletics"){
      max=100;
      min=1;
      amount = players*100;
    }else if(sports_name=="Badminton"){
      max=6;
      min=4;
      amount = 900;
    }else if(sports_name=="Basketball"){
      max=12;
      min=5;
      amount = 1200;
    }else if(sports_name=="Chess"){
      max=5;
      min=4;
      amount = 1000;
    }else if(sports_name=="Cricket"){
      max=20;
      min=11;
      amount = 4000;
    }else if(sports_name=="Football"){
      max=16;
      min=11;
      amount = 1900;
    }else if(sports_name=="Handball"){
      max=10;
      min=7;
      amount = 1000;
    }else if(sports_name=="Kabaddi"){
      max=12;
      min=7;
      amount = 1000;
    }else if(sports_name=="Powerlifting"){
      max=100;
      min=1;
      amount = 100*players;
    }else if(sports_name=="TableTennis"){
      max=4;
      min=3;
      amount = 600;
    }else if(sports_name=="Tennis"){
      max=4;
      min=3;
      amount = 600;
    }else if(sports_name=="Volleyball"){
      max=10;
      min=6;
      amount = 1000;
    }else{
      max=0;
      min=0;
    }
  }else{
    if(sports_name=="Athletics"){
      max=100;
      min=1;
      amount = 100*players;
    }else if(sports_name=="Badminton"){
      max=4;
      min=3;
       amount = 600;
    }else if(sports_name=="Basketball"){
      max=12;
      min=5;
      amount = 1200;
    }else if(sports_name=="Chess"){
      max=5;
      min=4;
      amount = 1000;
    }else if(sports_name=="Football"){
      max=12;
      min=7;
      amount = 1000;
    }else if(sports_name=="TableTennis"){
      max=4;
      min=3;
      amount = 600;
    }else if(sports_name=="Tennis"){
      max=4;
      min=2;
      amount = 500;
    }else if(sports_name=="Volleyball"){
      max=10;
      min=6;
      amount = 1000;
    }else{
      max=0;
      min=0;
    }
  } 
     $("#number").attr({
       "max" : max, 
       "min" : min          
    });
  if(players>=min&&players<=max){
        if($('#accomodation').is(':checked')){
      amount = 1500*players;
      $('#amount_para').text(amount);
      $('#amount').val(amount);
    }else{
    $('#amount_para').text(amount);
     $('#amount').val(amount);
   }
 }
});

$('#female').on('change',function(){
    if($(this).is(':checked')){
      $('#male').prop('checked', false);
      gender="female";
    }else{
      $('#male').prop('checked', true);
      gender="male";
    }
     var players = Number($('#number').val());
  var sports_name = $("#sports_name").val();
  var max=0;
  var min=0;
  var amount = 0;
  if(gender=="male"){
    if(sports_name=="Athletics"){
      max=100;
      min=1;
      amount = players*100;
    }else if(sports_name=="Badminton"){
      max=6;
      min=4;
      amount = 900;
    }else if(sports_name=="Basketball"){
      max=12;
      min=5;
      amount = 1200;
    }else if(sports_name=="Chess"){
      max=5;
      min=4;
      amount = 1000;
    }else if(sports_name=="Cricket"){
      max=20;
      min=11;
      amount = 4000;
    }else if(sports_name=="Football"){
      max=16;
      min=11;
      amount = 1900;
    }else if(sports_name=="Handball"){
      max=10;
      min=7;
      amount = 1000;
    }else if(sports_name=="Kabaddi"){
      max=12;
      min=7;
      amount = 1000;
    }else if(sports_name=="Powerlifting"){
      max=100;
      min=1;
      amount = 100*players;
    }else if(sports_name=="TableTennis"){
      max=4;
      min=3;
      amount = 600;
    }else if(sports_name=="Tennis"){
      max=4;
      min=3;
      amount = 600;
    }else if(sports_name=="Volleyball"){
      max=10;
      min=6;
      amount = 1000;
    }else{
      max=0;
      min=0;
    }
  }else{
    if(sports_name=="Athletics"){
      max=100;
      min=1;
      amount = 100*players;
    }else if(sports_name=="Badminton"){
      max=4;
      min=3;
       amount = 600;
    }else if(sports_name=="Basketball"){
      max=12;
      min=5;
      amount = 1200;
    }else if(sports_name=="Chess"){
      max=5;
      min=4;
      amount = 1000;
    }else if(sports_name=="Football"){
      max=12;
      min=7;
      amount = 1000;
    }else if(sports_name=="TableTennis"){
      max=4;
      min=3;
      amount = 600;
    }else if(sports_name=="Tennis"){
      max=4;
      min=2;
      amount = 500;
    }else if(sports_name=="Volleyball"){
      max=10;
      min=6;
      amount = 1000;
    }else{
      max=0;
      min=0;
    }
  } 
     $("#number").attr({
       "max" : max, 
       "min" : min          
    });
  if(players>=min&&players<=max){
      if($('#accomodation').is(':checked')){
      amount = 1500*players;
      $('#amount_para').text(amount);
      $('#amount').val(amount);
    }else{
    $('#amount_para').text(amount);
     $('#amount').val(amount);
   }
 }
});


function changeHeading(newHeader) {
  var center=document.querySelector('.center span');
  center.innerText=newHeader.innerText;
}

$('#home').scroll(()=>{
  var center=document.querySelector('.center span');
  center.classList.add('fadeInOnLoad');
  // console.log($('#home').scrollTop());
  if($('#home').scrollTop()>140 && $('#home').scrollTop()<1000) {
    var landingText=document.querySelector('.landing-text h2');
    $(center).removeClass("fadeInOnLoad").addClass("fadeIn");
    changeHeading(landingText);
    // console.log(Math.round($('#home').scrollTop()));
    if($('#home').scrollTop()>=300) {
      
      var distance = $('.landing-text').offset().top;      
      if(distance<=90) {
        document.querySelector('.landing-text').classList.remove('animate-up');
        document.querySelector('.landing-text').classList.add('animate-disappear');
      }else{
         document.querySelector('.landing-text').classList.remove('animate-disappear');
         document.querySelector('.landing-text').classList.add('animate-up');
      }
     
    }
  }

  if($('#home').scrollTop()>1240 && $('#home').scrollTop()<1830) {
    $('.center span').removeClass("fadeIn").addClass("fadeIn1");
    // center.classList.remove('fadeIn');
    // center.classList.add('fadeIn');
    
    var events=document.querySelector(".events h2");
    changeHeading(events);
    if($('#home').scrollTop()>=1400) {
      var distance = $('.events').offset().top;      
      if(distance<=90) {
        document.querySelector('.events').classList.remove('animate-up');
        document.querySelector('.events').classList.add('animate-disappear');
      }else{
        document.querySelector('.events').classList.add('animate-up');
        document.querySelector('.events').classList.remove('animate-disappear');
      }
    }
  }

  if($('#home').scrollTop()>2100 && $('#home').scrollTop()<2800) {
    var campusAmbassador=document.querySelector(".campus-ambassador h2");
    changeHeading(campusAmbassador);
    if($('#home').scrollTop()>=2400 ) {
      var distance = $('.campus-ambassador').offset().top;      
      if(distance<=90) {
        document.querySelector('.campus-ambassador').classList.remove('animate-up');
        document.querySelector('.campus-ambassador').classList.add('animate-disappear');
      }else{
        document.querySelector('.campus-ambassador').classList.add('animate-up');
        document.querySelector('.campus-ambassador').classList.remove('animate-disappear');
      }
   
    }
  }

  if($('#home').scrollTop()>3140 && $('#home').scrollTop()<3700) {
    var theme=document.querySelector(".theme h2");
    changeHeading(theme);
    if($('#home').scrollTop()>=3300) {
      var distance = $('.theme').offset().top;      
      if(distance<=90) {
        document.querySelector('.theme').classList.remove('animate-up');
        document.querySelector('.theme').classList.add('animate-disappear');
      }else{
        document.querySelector('.theme').classList.add('animate-up');
        document.querySelector('.theme').classList.remove('animate-disappear');
      }
   
    }
  }

  if($('#home').scrollTop()>4000 && $('#home').scrollTop()<4700) {
    var lookbackText=document.querySelector(".lookback-text h2");
    changeHeading(lookbackText);
    if($('#home').scrollTop()>=4300) {
      var distance = $('.lookback-text').offset().top;      
      if(distance<=90) {
        document.querySelector('.lookback-text').classList.remove('animate-up');
        document.querySelector('.lookback-text').classList.add('animate-disappear');
      }else{
        document.querySelector('.lookback-text').classList.add('animate-up');
        document.querySelector('.lookback-text').classList.remove('animate-disappear');
      }
    }
  }

  if($('#home').scrollTop()<140 || $('#home').scrollTop()>4700) {
    center.innerText='AAHVAAN';
  }

});


$('#Events').on("click",function() {
  
  var events=document.querySelector(".events");
  events.scrollIntoView({
      behavior: "smooth", block: "center", inline: "nearest"
    }); 
});

$('#Theme').on("click",function() {
  var theme=document.querySelector(".theme");
  theme.scrollIntoView({
    behavior: "smooth", block: "center", inline: "nearest"
  });   
});

$('#CA').on("click",function() {
  var CA=document.querySelector(".campus-ambassador");
  CA.scrollIntoView({
      behavior: "smooth", block: "center", inline: "nearest"
    });   
});

$('#Lookback').on("click",function() {
  var lookback=document.querySelector(".lookback-text");
  lookback.scrollIntoView({
      behavior: "smooth", block: "center", inline: "nearest"
    });   
});


    $('html, body').hide();

        if (window.location.hash) {
            setTimeout(function() {
                $('html, body').scrollTop(0).show();
                $('html, body').animate({
                    scrollTop: $(window.location.hash).offset().top
                    }, 1000)
            }, 0);
        }
        else {
            $('html, body').show();
        }


  $('#name_logout').hover(function(){
    text = $(this).text();
    $(this).text("Logout");
  },function(){
    $(this).text(text);
  });


  $('.col').hover(function(){
    $('.col').not(this).toggleClass('scale-down');
    $(this).toggleClass('scale-up');
  });

$('#accomodation').on('change',function(){
   var players = Number($('#number').val());
  var sports_name = $("#sports_name").val();
  var max=0;
  var min=0;
  var amount = 0;
  if(gender=="male"){
    if(sports_name=="Athletics"){
      max=100;
      min=1;
      amount = players*100;
    }else if(sports_name=="Badminton"){
      max=6;
      min=4;
      amount = 900;
    }else if(sports_name=="Basketball"){
      max=12;
      min=5;
      amount = 1200;
    }else if(sports_name=="Chess"){
      max=5;
      min=4;
      amount = 1000;
    }else if(sports_name=="Cricket"){
      max=20;
      min=11;
      amount = 4000;
    }else if(sports_name=="Football"){
      max=16;
      min=11;
      amount = 1900;
    }else if(sports_name=="Handball"){
      max=10;
      min=7;
      amount = 1000;
    }else if(sports_name=="Kabaddi"){
      max=12;
      min=7;
      amount = 1000;
    }else if(sports_name=="Powerlifting"){
      max=100;
      min=1;
      amount = 100*players;
    }else if(sports_name=="TableTennis"){
      max=4;
      min=3;
      amount = 600;
    }else if(sports_name=="Tennis"){
      max=4;
      min=3;
      amount = 600;
    }else if(sports_name=="Volleyball"){
      max=10;
      min=6;
      amount = 1000;
    }else{
      max=0;
      min=0;
    }
  }else{
    if(sports_name=="Athletics"){
      max=100;
      min=1;
      amount = 100*players;
    }else if(sports_name=="Badminton"){
      max=4;
      min=3;
       amount = 600;
    }else if(sports_name=="Basketball"){
      max=12;
      min=5;
      amount = 1200;
    }else if(sports_name=="Chess"){
      max=5;
      min=4;
      amount = 1000;
    }else if(sports_name=="Football"){
      max=12;
      min=7;
      amount = 1000;
    }else if(sports_name=="TableTennis"){
      max=4;
      min=3;
      amount = 600;
    }else if(sports_name=="Tennis"){
      max=4;
      min=2;
      amount = 500;
    }else if(sports_name=="Volleyball"){
      max=10;
      min=6;
      amount = 1000;
    }else{
      max=0;
      min=0;
    }
  } 
     $("#number").attr({
       "max" : max, 
       "min" : min          
    });
  if(players>=min&&players<=max){
     if($('#accomodation').is(':checked')){
      amount = 1500*players;
     $('#amount_para').text(amount);
     $('#amount').val(amount);
    }else{
    $('#amount_para').text(amount);
    $('#amount').val(amount);
   }
 }
});

$('#number').on('input',function(){
  $('.team-players').empty();
  var players = Number($(this).val());
  var sports_name = $("#sports_name").val();
  var max=0;
  var min=0;
  var amount = 0;
  if(gender=="male"){
    if(sports_name=="Athletics"){
      max=100;
      min=1;
      amount = players*100;
    }else if(sports_name=="Badminton"){
      max=6;
      min=4;
      amount = 900;
    }else if(sports_name=="Basketball"){
      max=12;
      min=5;
      amount = 1200;
    }else if(sports_name=="Chess"){
      max=5;
      min=4;
      amount = 1000;
    }else if(sports_name=="Cricket"){
      max=20;
      min=11;
      amount = 4000;
    }else if(sports_name=="Football"){
      max=16;
      min=11;
      amount = 1900;
    }else if(sports_name=="Handball"){
      max=10;
      min=7;
      amount = 1000;
    }else if(sports_name=="Kabaddi"){
      max=12;
      min=7;
      amount = 1000;
    }else if(sports_name=="Powerlifting"){
      max=100;
      min=1;
      amount = 100*players;
    }else if(sports_name=="TableTennis"){
      max=4;
      min=3;
      amount = 600;
    }else if(sports_name=="Tennis"){
      max=4;
      min=3;
      amount = 600;
    }else if(sports_name=="Volleyball"){
      max=10;
      min=6;
      amount = 1000;
    }else{
      max=0;
      min=0;
    }
  }else{
    if(sports_name=="Athletics"){
      max=100;
      min=1;
      amount = 100*players;
    }else if(sports_name=="Badminton"){
      max=4;
      min=3;
       amount = 600;
    }else if(sports_name=="Basketball"){
      max=12;
      min=5;
      amount = 1200;
    }else if(sports_name=="Chess"){
      max=5;
      min=4;
      amount = 1000;
    }else if(sports_name=="Football"){
      max=12;
      min=7;
      amount = 1000;
    }else if(sports_name=="TableTennis"){
      max=4;
      min=3;
      amount = 600;
    }else if(sports_name=="Tennis"){
      max=4;
      min=2;
      amount = 500;
    }else if(sports_name=="Volleyball"){
      max=10;
      min=6;
      amount = 1000;
    }else{
      max=0;
      min=0;
    }
  } 
   if($('#accomodation').is(':checked')){
    amount = players*1500; 
  }
   $("#number").attr({
       "max" : max, 
       "min" : min          
    });
  if(players>=min&&players<=max){
    $('#amount_para').text(amount);
    $('#amount').val(amount);
  for(var i=0;i<players;i++){
    $('.team-players').append("<input type='text' class='form__input' id='player"+(i)+"' name='player_name"+(i)+"' placeholder='Enter Player "+(i+1)+" Name' required='true'><label for='number' class='form__label'>Enter Player "+(i+1)+" Name</label>");
}
}else{
  amount = 0;
  $('#amount_para').text(amount);
  $('#amount').val(amount);
}
});

$('#sort_gender').on('change',function(){
     var gender = $(this).val();
     var sports = $('#sort_sports').val();
     $('.card').hide();
     $('.'+gender+'.'+sports).show();
 });

$('#sort_sports').on('change',function(){
     var sports = $(this).val();
     var gender = $('#sort_gender').val();
     $('.card').hide();
     $('.'+gender+'.'+sports).show();
});

  $(".owl-carousel").owlCarousel({
    loop: true,
    responsiveClass: true,
    autoHeight: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoWidth: false,
    margin: 10,
    nav: true,
    navText: [
      "<i class='fa fa-caret-left'></i>",
      "<i class='fa fa-caret-right'></i>"
    ],
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: false
      },
      1000: {
        items: 1,
        nav: true,
        loop: false
      }
    }
  });

});

//sss
