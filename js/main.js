import {add_start_stop_listener, add_audio_cue_listener, add_visual_cue_listener} from './event-listeners.js';
import { signin_modal_listener, signin_modal_exit_listener } from './event-listeners-login-modal.js';

add_start_stop_listener();
add_audio_cue_listener();
add_visual_cue_listener();

signin_modal_listener();
signin_modal_exit_listener();


