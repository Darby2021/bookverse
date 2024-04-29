const Utils = {
    PreviewImage({input_id, preview_id, path_image_default}, allow_mime_types) {
        const input = document.getElementById(input_id)
        const preview = document.getElementById(preview_id)
        const file = input.files[0];
        if (file) {
            if(!allow_mime_types.includes(file.type)){
                preview.src = path_image_default
                return false
            }
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            preview.src = path_image_default

        }
        return true
    },
    GetDate(format = 'MM-dd-yyyy') {
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear();
        if (format === 'dd-MM-yyyy') {
            return dd + '-' + mm + '-' + yyyy
        } else if (format === 'MM-dd-yyyy') {
            return mm + '-' + dd + '-' + yyyy
        } else if (format === 'yyyy-MM-dd') {
            return yyyy + '-' + mm + '-' + dd
        } else {
            throw new Error('Invalid date format')
        }
    },
    ConvertDate(date, format = 'MM-dd-yyyy') {
        date = new Date(date)
        const dd = String(date.getDate()).padStart(2, '0')
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const yyyy = date.getFullYear();
        if (format === 'dd-MM-yyyy') {
            return dd + '-' + mm + '-' + yyyy
        } else if (format === 'MM-dd-yyyy') {
            return mm + '-' + dd + '-' + yyyy
        } else if (format === 'yyyy-MM-dd') {
            return yyyy + '-' + mm + '-' + dd
        } else {
            throw new Error('Invalid date format')
        }
    }
}