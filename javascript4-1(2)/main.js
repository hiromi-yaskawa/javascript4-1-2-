var app = new Vue({
    el: '#app',
    data: {
        list: [],
        addText: '',
        keywords: ''
    },
    //watchでlistの変更を監視
    watch: {
        list: function() {
            //localStorageにデータを保存
            localStorage.setItem("list", JSON.stringify(this.list));
        }
    },

    //マウントされた時にlocalStorageからデータを取得
    mounted: function() {
        this.list = JSON.parse(localStorage.getItem("list")) || [];
    },

    methods: {
        addToDo: function() {
            if (this.addText !== '') {
                this.list.push({
                    text: this.addText,
                    isChecked: false,
                });
            }
            this.addText = '';
        },
        deleteBtn: function() {
            this.list = this.list.filter(function(todo) {
                return !todo.isChecked;
            });
        },
    },
    computed: {
        taskCount: function() {
            return this.list.filter((todo) => !todo.isChecked).length;
        },
        filterList: function() {
            var list = []
            for (var i in this.list) {
                var filterList = this.list[i]
                if (filterList.text.indexOf(this.keywords) !== -1) {
                    list.push(filterList)
                }
            }
            return list;
        }
    }
});