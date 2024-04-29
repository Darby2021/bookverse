$(document).ready(function (){
    const CommentController = {
        EventListener() {
            $('#btn_open_send_feedback_modal').click(function (){
                $('#btn_open_comment_modal').click()
            })

            $('#comment_form').submit(function (e){
                e.preventDefault()
                CommentController.CreateComment()
                $('#btn_close_comment_modal').click()
            })
        },
        CreateComment(){
            const content = $('#comment_content').val()
            if(content.trim().length === 0){
                Alert.Show('warning', 'content is required')
                return
            }

            const article_id = $('#article_id').val()
            $.ajax({
                url: '/comment/create',
                type: "POST",
                data: {content, article_id},
                beforeSend: Loading(true),
                success: function (res) {
                    setTimeout(() => {
                        if (res.code === 201) {
                            CommentController.AddCommentToDOM(res.comment)
                            $('#comment_content').val('')
                        } else {
                            Alert.Show('warning', res.message)
                        }
                        Loading(false)
                    }, 1500)
                },
                error: function (error) {
                    setTimeout(() => {
                        Loading(false)
                        Alert.Show('danger', 'something went wrong')
                    }, 1000)
                }
            });
        },
        AddCommentToDOM(comment){
            const comment_html = `<div class="testimonial-box">
                                        <div class="box-top">
                                            <div class="profile">
                                                <div class="profile-img">
                                                    <img src="/my-assets/media/images/avatar/${comment.user.avatar}">
                                                </div>
                                                <div class="name-user">
                                                    <strong>${comment.user.full_name}</strong>
                                                    <span> ${comment.date_time} </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="client-comment">
                                            <p>${comment.content}</p>
                                        </div>
                                    </div>`

            $('#comment_container').prepend(comment_html)

        },
        Run() {
            CommentController.EventListener()
        }
    }

    CommentController.Run()
})