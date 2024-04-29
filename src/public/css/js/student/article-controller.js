$(document).ready(function () {


    const ArticleController = {
        dropzone: null,
        EventListener() {
            //detail article
            $('.contribute-row').click(function (){
                const article_id = $(this).data('contribute-id')
                location.href = `/student/article/detail/${article_id}`
            })

            //thumbnail
            $('#btn_choose_thumb').click(function () {
                $('#input_thumb').click()
            })

            $('#input_thumb').change(function () {
                const options = {
                    input_id: 'input_thumb',
                    preview_id: 'thumb_preview',
                    path_image_default: '/my-assets/media/decoration/thumbnail-article.png'
                }
                const allow_mime_types = ['image/png', 'image/jpeg', 'image/jpg']
                const result = Utils.PreviewImage(options, allow_mime_types)
                if (!result) {
                    Alert.Show('warning', 'Only accept file type: png, jpp, jpeg')
                }
            })

            //open modal
            $('#btn_contribute_article').click(function () {
                $('#btn_open_article_modal').click()
            })

            $('#article_form').submit(function (e) {
                e.preventDefault()
                ArticleController.CreateArticle(this)
            })
        },
        CreateArticle(article_form) {
            if (!ArticleController.ValidateArticleFormForCreate()) {
                return
            }

            const article_data = new FormData(article_form);
            ArticleController.dropzone.files.forEach(function (file) {
                article_data.append("file", file);
            });

            $.ajax({
                url: '/student/article/new',
                type: "POST",
                data: article_data,
                contentType: false,
                processData: false,
                beforeSend: Loading(true),
                success: function (res) {
                    setTimeout(() => {
                        if (res.code === 201) {
                            location.reload();
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
        ValidateArticleFormForCreate() {
            const thumbnail = $('#input_thumb')[0].files[0]
            if ($('#input_thumb')[0].files.length === 0) {
                Alert.Show('warning', 'Thumbnail is required')
                return false
            }
            const allow_type = ['image/png', 'image/jpeg', 'image/jpg']
            if (!allow_type.includes(thumbnail.type)) {
                Alert.Show('warning', 'Thumbnail only accept png, jpeg, jpg type')
                return false
            }

            if (ArticleController.dropzone.files.length === 0) {
                Alert.Show('warning', 'Article file is required')
                return false
            }
            let error_article_file = false
            ArticleController.dropzone.files.forEach(function (file) {
                if (!file.accepted) {
                    error_article_file = true
                }
            });
            if (error_article_file) {
                Alert.Show('warning', 'Article file only accept DOC/DOCX type')
                return false
            }

            return true
        },
        Run() {
            this.EventListener()
        }
    }
    Dropzone.options.myDropzone = {
        autoQueue: false,
        addRemoveLinks: true,
        acceptedFiles: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };

    ArticleController.dropzone = new Dropzone("#my-dropzone", {url: 'upload'});
    ArticleController.Run()

})