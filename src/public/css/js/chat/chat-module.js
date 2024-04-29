$(document).ready(function () {
    const ChatController = {
        socket: null,
        sender: sender,
        receiver: null,
        EventListener() {
            $('.person').click(function () {
                if ($('.sidebar').hasClass('open')) {
                    $('.sidebar').removeClass('open')
                }
                ChatController.SelectUserChat(this)
            })

            $('#content_form').submit(function (e) {
                e.preventDefault()
                const content = {
                    receiver: ChatController.receiver,
                    message: $('#content_message').val()
                }

                ChatController.socket.emit("chat:message", {content})
                $('#content_message').val('')
            })
        },
        SelectUserChat(_this) {
            ChatController.receiver = $(_this).data('user-id')
            $(`#has_mess_user_id_${ChatController.receiver}`).addClass('visually-hidden')
            ChatController.LoadChatData(ChatController.receiver, UpdateUI)


            function UpdateUI() {
                const user_avatar = $(_this).data('user-avatar')
                const full_name = $(_this).data('user-full-name')

                $('#chat_container').removeClass('visually-hidden')
                $('#bg_default_chat').addClass('visually-hidden')
                $('.person').removeClass('current-chat')
                $(_this).addClass('current-chat')

                $('#avatar_current_user').attr('src', `/my-assets/media/images/avatar/${user_avatar}`)
                $('#name_current_user').html(full_name)
            }

        },
        LoadChatData(receiver, callback) {
            $.ajax({
                url: `/chat/get-messages/receiver/${receiver}`,
                type: 'GET',
                beforeSend: Loading(true),
                success: function (response){
                    setTimeout(()=> {
                        if(response.code === 200){
                            callback()
                            if(response.chat){
                                ChatController.RenderMessageData(response.chat.messages)
                            }
                        } else {
                            Alert.Show('warning', 'Can not load the message')
                        }
                        Loading(false)
                    }, 1000)

                },
                error: function (error){
                    setTimeout(()=> {
                        Alert.Show('warning', 'Something went wrong!')
                        Loading(false)
                    }, 500)

                }
            })
        },
        RenderMessageData(messages){
            let total_message = ''
            messages.map(mess => {
                let time = new Date(mess.time)
                time = [String(time.getHours()).padStart(2, '0'), String(time.getMinutes()).padStart(2, '0')].join(':')
                let message_html =  `<li class="chat-left">
                                    <div class="chat-avatar">
                                        <img src="/my-assets/media/images/avatar/${mess.sender.avatar}"
                                             alt="avatar">
                                    </div>
                                    <div class="chat-text">
                                        ${mess.message}
                                    </div>
                                    <div class="chat-hour">${time}</div>
                                </li>`

                if (mess.sender._id === ChatController.sender) {
                    message_html = `<li class="chat-right">
                                <div class="chat-hour">${time}</div>
                                <div class="chat-text">${mess.message}</div>
                                <div class="chat-avatar">
                                <img src="/my-assets/media/images/avatar/${mess.sender.avatar}" alt="avatar">
                                </div>
                                </li>`
                }

                total_message += message_html
            })
            $('.chat-box').empty()
            $('.chat-box').append(total_message)
            $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
        },
        ConnectRealtimeServer() {
            ChatController.socket = io({
                transports: ['websocket'],
                upgrade: true,
                query: {token: this.GetTokenFromCookie('user_token')}
            })
        },
        RealtimeListener() {
            ChatController.EventListener()
            ChatController.socket.on("connect", function () {
                console.log('connected')
                ChatController.socket.on('chat:message', function (data) {
                    if(data.content.sender.id === ChatController.sender || data.content.sender.id === ChatController.receiver){
                        ChatController.RenderMessageRealtime(data.content)
                    }
                    if(data.content.sender.id !==  ChatController.receiver){
                        $(`#has_mess_user_id_${data.content.sender.id}`).removeClass('visually-hidden')
                    }
                })
            });

            ChatController.socket.on('connect_error', function (error) {
                ChatController.socket.removeAllListeners()
                if (error.message === 'unauthorized') {
                    console.log('unauthorized');
                }
            });

            ChatController.socket.on('reconnect', function (number) {
                console.log('number')
                console.log('reconnect')
            })

            ChatController.socket.on('disconnect', function (reason) {
                ChatController.socket.removeListener('chat:message')
                console.log(reason)
            })
        },
        RenderMessageRealtime(content) {
            console.log(content)
            let message_html = `<li class="chat-right">
                                <div class="chat-hour">${content.time}</div>
                                <div class="chat-text">${content.message}</div>
                                <div class="chat-avatar">
                                <img src="/my-assets/media/images/avatar/${content.sender.avatar}" alt="avatar">
                                </div>
                                </li>`

            if (content.sender.id === ChatController.receiver) {
                message_html = `<li class="chat-left">
                                    <div class="chat-avatar">
                                        <img src="/my-assets/media/images/avatar/${content.sender.avatar}"
                                             alt="avatar">
                                    </div>
                                    <div class="chat-text">
                                        ${content.message}
                                    </div>
                                    <div class="chat-hour">${content.time}</div>
                                </li>`
            }

            $('.chat-box').append(message_html)
            $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
        },
        GetTokenFromCookie(cname) {
            return $.cookie(cname)
        },
        Run() {
            ChatController.ConnectRealtimeServer()
            ChatController.RealtimeListener()
        }
    }

    ChatController.Run()
})