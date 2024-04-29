$(document).ready(function () {
    const ArticleDetailController = {
        filename_delete: '',
        dropzone: null,
        article_id: $('#article_id').val(),
        EventListener() {
            $('#btn_delete_article').click(function (){
                $('#btn_open_confirm_delete_article_modal').click()
            })

            $('#btn_ok_confirm_delete_article').click(function (){
                $('#btn_close_confirm_delete_article_modal').click()
                ArticleDetailController.DeleteArticle()
            })

            $('#article_form').submit(function (e) {
                e.preventDefault()
                ArticleDetailController.UpdateBasicInfo(this)
            })

            $('#btn_choose_thumb').click(function () {
                $('#input_thumb').click()
            })

            $('#input_thumb').change(function () {
                const options = {
                    input_id: 'input_thumb',
                    preview_id: 'thumb_preview',
                    path_image_default: `/my-assets/media/article/${thumbnail_article}`
                }
                const allow_mime_types = ['image/png', 'image/jpeg', 'image/jpg']
                const result = Utils.PreviewImage(options, allow_mime_types)
                if (!result) {
                    Alert.Show('warning', 'Only accept file type: png, jpp, jpeg')
                }
            })

            $('.btn-delete-article-file').click(function () {
                ArticleDetailController.filename_delete = $(this).data('file-name')
                $('#btn_open_confirm_modal').click()
            })

            $('#btn_ok_confirm').click(function () {
                ArticleDetailController.DeleteArticleFile()
                $('#btn_close_confirm_modal').click()
            })

            $('#article_files_form').submit(function (e) {
                e.preventDefault()
                ArticleDetailController.AddFilesToArticle(this)
            })

            $('#btn_add_article_file').click(function () {
                $('#btn_open_article_files_modal').click()
            })
        },
        UpdateBasicInfo(article_form) {
            const thumbnail = $('#input_thumb')[0].files[0]
            if (thumbnail) {
                const allow_type = ['image/png', 'image/jpeg', 'image/jpg']
                if (!allow_type.includes(thumbnail.type)) {
                    Alert.Show('warning', 'Thumbnail only accept png, jpeg, jpg type')
                    return
                }
            }
            const article_data = new FormData(article_form)
            $.ajax({
                url: '/student/article/basic-information/update',
                type: "PUT",
                data: article_data,
                contentType: false,
                processData: false,
                beforeSend: Loading(true),
                success: function (res) {
                    setTimeout(() => {
                        if (res.code === 202) {
                            location.reload()
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
        DeleteArticleFile() {
            const filename = ArticleDetailController.filename_delete
            const article_id = ArticleDetailController.article_id

            $.ajax({
                url: '/student/article/file/delete',
                type: "DELETE",
                data: {filename, article_id},
                beforeSend: Loading(true),
                success: function (res) {
                    setTimeout(() => {
                        if (res.code === 203) {
                            location.reload()
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
        AddFilesToArticle(files_form) {
            if(!ArticleDetailController.ValidateArticleFiles()){
                return
            }
            const article_files_data = new FormData(files_form)
            article_files_data.append('article_id', ArticleDetailController.article_id)
            ArticleDetailController.dropzone.files.forEach(function (file) {
                article_files_data.append("file", file);
            });

            $.ajax({
                url: '/student/article/files/update',
                type: "PUT",
                data: article_files_data,
                processData: false,
                contentType: false,
                beforeSend: Loading(true),
                success: function (res) {
                    setTimeout(() => {
                        if (res.code === 202) {
                            location.reload()
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
            })
        },
        ValidateArticleFiles(){
            if (ArticleDetailController.dropzone.files.length === 0) {
                Alert.Show('warning', 'Article file is required')
                return false
            }
            let error_article_file = false
            ArticleDetailController.dropzone.files.forEach(function (file) {
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
        DeleteArticle(){
            const article_id = ArticleDetailController.article_id

            $.ajax({
                url: '/student/article/delete',
                type: "DELETE",
                data: {article_id},
                beforeSend: Loading(true),
                success: function (res) {
                    setTimeout(() => {
                        if (res.code === 203) {
                            location.reload()
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
        Run() {
            this.EventListener()
        }
    }
    Dropzone.options.myDropzone = {
        autoQueue: false,
        addRemoveLinks: true,
        acceptedFiles: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };

    ArticleDetailController.dropzone = new Dropzone("#my-dropzone", {url: 'upload'});
    ArticleDetailController.Run()
})