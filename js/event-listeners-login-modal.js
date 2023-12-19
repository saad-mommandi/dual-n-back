const modal = document.getElementById('sign-in-modal');
const btn = document.getElementById('sign-in-button');
const content = document.getElementById('container');

function signin_modal_listener(){
    document.addEventListener("DOMContentLoaded", function() {
        btn.addEventListener("click", () => {
            modal.style.display = 'flex';
            modal.style.visibility = 'visible';
            setTimeout(() => {modal.style.opacity = '1';}, 10);
            content.classList.add('blurred');
        });
        
    });
}

function signin_modal_exit_listener(){
    document.addEventListener("DOMContentLoaded", function() {
        window.addEventListener("click", (event) => {
            if (event.target == modal) {
                modal.style.opacity = '0';
                setTimeout(() => {modal.style.display = 'none';
                                    modal.style.visibility = 'hidden';}, 300); // Delay matching the transition duration
                content.classList.remove('blurred');
                }
        });
        
    });
}


export {signin_modal_listener, signin_modal_exit_listener};