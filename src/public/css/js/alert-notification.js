// const Alert = {
//     CreateAlert(type, message) {
//         const alert = {}
//         if (type === 'success') {
//             alert.type = 'alert-success'
//             alert.title = 'Well done!'
//             alert.icon = 'fa-check-circle'
//             alert.close_btn = 'greencross'
//         } else if (type === 'warning') {
//             alert.type = 'alert-warning'
//             alert.title = 'Warning!'
//             alert.icon = 'fa-solid fa-triangle-exclamation'
//             alert.close_btn = 'warning'
//         } else if (type === 'danger') {
//             alert.type = 'alert-danger'
//             alert.title = 'Oh snap!'
//             alert.icon = 'fa-times-circle'
//             alert.close_btn = 'danger'
//         } else if (type === 'primary ') {
//             alert.type = 'alert-primary '
//             alert.title = 'Well done!'
//             alert.icon = 'fa-thumbs-up'
//             alert.close_btn = 'alertprimary'
//         }

//         alert.message = message

//         return `<div class="alert-custom alert fade alert-simple ${alert.type} alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
//                  <i class="start-icon far ${alert.icon} faa-tada animated"></i>
//                  <strong class="font__weight-semibold">${alert.title}</strong> ${alert.message}
//           </div>`
//     },
//     Show(type, message) {
//         const alert = Alert.CreateAlert(type, message)
//         $('body').append(alert)
//         $('.alert-custom').animate({opacity: '1', right: '3rem'}, 'fast');

//         const timeout_hide_alert = setTimeout(() => {
//             $('.alert-custom').animate({opacity: '0', right: '-26rem'}, "fast", () => {
//                 $('.alert-custom').remove()
//             });
//         }, 6000)

//         $('.alert-custom').click(function () {
//             clearTimeout(timeout_hide_alert);
//             $('.alert-custom').animate({opacity: '0', right: '-26rem'}, "fast", () => {
//                 $('.alert-custom').remove()
//             });
//         })
//     }
// }
