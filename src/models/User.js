import Vue from 'vue';

export class User extends Vue {
    static instance;
    _admin;
    _name;
    _createdAt;
    _room;
    constructor() {
        super()
        if (this.instance) return this.instance;
        this._name = window.prompt('이름을 입력하세요.');
        if (!this._name) {
            window.alert("이름을 입력하지 않으셨습니다!");
            return null;
        }
        this._createdAt = new Date();
        this._admin = false
        this.instance = this
    }

    get name() {
        return this._name
    }

    createRoom() {
        // eslint-disable-next-line
        console.log('createRoom...')
        this._admin = true
        this._room = window.prompt('방 제목을 입력하세요.')
        if (!this._room) {
            window.alert("방명을 입력하세요.");
            return false;
        }
        this.join()
        return true
    }

    join(room) {
        if (!this._room) {
            this._room = room
        }
        // eslint-disable-next-line
        console.log('join...', this._room)
        this.$socket.emit("join", {
            name: this._name,
            room: `test/${this._room}`
        });
    }

    leave() {
        // eslint-disable-next-line
        console.log('leave...')
        this.$socket.emit("leave", {
            name: this._name,
            room: `test/${this._room}`
        });
        this._room = null
        this._admin = false
    }

    chat(message) {
        // eslint-disable-next-line
        console.log('chat...', message)
        this.$socket.emit("chatMessage", {
            name: this._name,
            userid: this._name,
            msg: message,
            room: this._room
        });
    }

    whisper(target, message) {
        // eslint-disable-next-line
        console.log('whisper...', target)
        this.$socket.emit("whisper", {
            room: this.room,
            to: target,
            from: this._name,
            msg: message
        });
    }

    kick(target) {
        if (this._admin) {
            // eslint-disable-next-line
            console.log('kick...', target)
            this.$socket.emit("kick", {
              room: this._room,
              socketId: target
            });
        }
    }
}