var CropWorks = (function () {
    var URL = window.URL || window.webkitURL;
    var uploadedImageURL; //当前input选取的图片临时路径
    var upImgW, upImgH;
    var $uploadImgInput = $('#cropperInput');//选择文件的input
    var $uploadFileImg = $('#cropperInputImg');//input选择图片之后图片存放img标签
    //cropper组件配置
    var options = {
        //viewMode:1,
        cropBoxResizable: true,
        autoCropArea: 1,
        //aspectRatio: 1,
        preview: '.img-preview',//预览图对象
        dragMode: 'move',
        minCropBoxWidth: 285,//裁剪框最小宽度
        toggleDragModeOnDblclick: false
    };

    $uploadImgInput.on('change',function () {
        var imgData = $(this)[0].files[0];
        readImg(imgData);
    });
    //input选择图片之后加载图片
    function readImg(fileObj) {
        if (fileObj) {
            //读取图片数据
            var f = fileObj;
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = e.target.result;
                //加载图片获取图片真实宽度和高度
                var image = new Image();
                image.onload = function() {
                    upImgW = image.width;
                    upImgH = image.height;
                    console.log(upImgW + '======' + upImgH + "=====" + f.size);

                    requestImg();
                };
                image.src = data;
            };
            reader.readAsDataURL(f);
        } else {
            var image = new Image();
            image.onload = function() {
                upImgW = image.width;
                upImgH = image.height;
                var fileSize = image.fileSize;
                console.log(upImgW + '======' + upImgH + "=====" + fileSize);

                requestImg();
            };
            image.src = input.value;
        }
    }
    //input加载图片之后获取图片到裁剪组件
    function requestImg() {
        var size = $uploadImgInput[0].files[0].size / (1024 * 1024);

        if (size > 5) {
            //pageToastFail('图片大小不能超过5M');
            $uploadImgInput.val('');
            console.log('图片大小不能超过5M')
        } else {
            var files = $uploadImgInput[0].files;
            var file;

            /*if (!$image.data('cropper')) {
             return;
             }*/

            if (files && files.length) {
                file = files[0];

                if (/^image\/\w+$/.test(file.type)) {
                    if (uploadedImageURL) {
                        URL.revokeObjectURL(uploadedImageURL);
                    }

                    uploadedImageURL = URL.createObjectURL(file);
                    $uploadFileImg.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
                    $uploadImgInput.val('');
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        }
    }

    //获取裁剪后的图片
    this.getCroppedImgData = function () {
        $uploadFileImg.cropper('getCroppedCanvas').toBlob(function (blob) {
            var url = URL.createObjectURL(blob);
            $('#croppedImg').attr('src',url);
        });
    };
    //旋转
    this.rotateAction = function () {
        $uploadFileImg.cropper('rotate',90);
    };
    //放大
    this.zoomInAction = function () {
        $uploadFileImg.cropper('zoom',0.1);
    };
    //缩小
    this.zoomOutAction = function () {
        $uploadFileImg.cropper('zoom',-0.1);
    };

    return this;
})();
