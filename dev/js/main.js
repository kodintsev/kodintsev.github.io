$(document).ready(function(){  $('[data-fancybox]').fancybox({    margin: [35, 10, 10, 10],    baseClass: 'custom-style',    animationEffect : "zoom-in-out",    btnTpl: {      smallBtn: '<button data-fancybox-close class="fancybox-close-small my-fancybox-close" title="{{CLOSE}}"></button>'    },    lang : 'ru',    i18n : {      'ru' : {        CLOSE       : 'Закрыть',        NEXT        : 'След.',        PREV        : 'Пред.',        ERROR       : 'Запрошенный контент не может быть загружен. <br/> Повторите попытку позже.',        PLAY_START  : 'Начать слайд-шоу',        PLAY_STOP   : 'Пауза слайд-шоу',        FULL_SCREEN : 'Полноэкранный',        THUMBS      : 'Эскизы'      }    }  });});var yaBrowserUpdater = new ya.browserUpdater.init({"lang":"ru","browsers":{"yabrowser":"15.12","chrome":"20","ie":"9","opera":"20","safari":"5.1","fx":"20","amigo":"Infinity","iron":"35","flock":"Infinity","palemoon":"25","camino":"Infinity","maxthon":"4.5","seamonkey":"2.3"},"theme":"yellow"});