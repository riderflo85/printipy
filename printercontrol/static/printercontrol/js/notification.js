function display_error(toAppendIn, message, autohide=false){
    var content = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide='${autohide}' data-delay=10000>
            <div class="toast-header notif-error-header">
                <i class="fas fa-exclamation-triangle mr-3"></i>
                <strong class="mr-auto">Erreur</strong>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body notif-error-body">
                ${message}
            </div>
        </div>
    `;
    if (toAppendIn.children().length > 0) {
        toAppendIn.children().remove();
    }
    $(content).appendTo(toAppendIn);
    $('.toast').toast('show');
}

function display_info(toAppendIn, message, autohide=false){
    let content = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide='${autohide}' data-delay=10000>
            <div class="toast-header notif-info-header">
                <i class="fas fa-exclamation-circle mr-3"></i>
                <strong class="mr-auto">Information</strong>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body notif-info-body">
                ${message}
            </div>
        </div>
    `;
    if (toAppendIn.children().length > 0) {
        toAppendIn.children().remove();
    }
    $(content).appendTo(toAppendIn);
    $('.toast').toast('show');
}