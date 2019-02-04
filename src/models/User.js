import Vue from 'vue';

export class User extends Vue {
    constructor() {
        super()
        this._admin = false
    }

    createRoom() {
        // eslint-disable-next-line
        console.log('createRoom...')
        this._admin = true
        const room = window.prompt('방 제목을 입력하세요.')
        if (!room) {
            window.alert("방명을 입력하세요.");
            return;
        }
        this.join(room)
    }

    join(room) {
        // eslint-disable-next-line
        console.log('join...', room)
        this._room = room
    }

    leave() {
        // eslint-disable-next-line
        console.log('leave...')
        this._room = null
    }

    chat(message) {
        // eslint-disable-next-line
        console.log('chat...', message)
    }

    whisper(target) {
        // eslint-disable-next-line
        console.log('whisper...', target)
    }

    kick(target) {
        if (this._admin) {
            // eslint-disable-next-line
            console.log('kick...', target)
        }
    }
}