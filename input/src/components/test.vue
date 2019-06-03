<template>
    <div>
      <label for="country-choice">Выберите название:</label>
      <input
          list="country"
          id="country-choice"
          name="country-choice"
          @input="input"
          @blur="blur"
          @focus="focus"
          :title="inputValue"
          v-model="inputValue"
          :placeholder="placeholder"
          class="input"/>
      <span class="cross" @click="cleanInput">x</span>

      <div v-if="dropdownList" class="wrap">
          <ul id="country" @mousedown="choice" class="dropdown-list">
              <li
                  v-for="item in countries"
                  :title="item"
                  :key="item">{{item}}
              </li>
          </ul>
      </div>
    </div>
</template>

<script>
    import {url} from '../api/urls'
    export default {
    name: "test",
    components: {},
    data() {
        return {
            countries: [],
            dropdownList: false,
            inputValue: '',
            placeholder: 'Поиск'
        }
    },
    watch: {
        'countries' : function() {
            if (this.countries.length > 0) {
                this.dropdownList = true;
            } else {
                this.hideDropdownList();
            }
        }
    },
    methods: {
        blur() {
            this.hideDropdownList();
            this.placeholder = 'Поиск';
        },
        choice(e) {
            this.inputValue = e.target.innerHTML;
            this.hideDropdownList();
        },
        cleanInput() {
            this.inputValue = '';
        },
        getSearch(value) {
            this.axios.get( url + value)
                .then((response) => {
                    let result = [];
                    let data = JSON.parse(response.data.substring(5, response.data.length - 1));
                    data.forEach(function(item) {
                        result.push(item.header);
                    });
                    this.countries = Array.from(new Set(result));
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        focus() {
            this.placeholder = '';
        },
        hideDropdownList() {
            this.dropdownList = false;
            this.countries.length = 0;
        },
        input(e) {
            if(!!e.target.value) {
                this.getSearch(e.target.value);
            } else {
                this.countries.length = 0;
                this.dropdownList = false;
            }
        }
    }
  }
</script>

<style scoped>
    .input {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 23px 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 278px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }
    .input:focus {
        outline: none;
        border-color: #409eff;
    }
    .input:hover ~ .cross {
        visibility: visible;
    }
    li {
        padding: 0 20px 0 0;
        margin: 0;
        line-height: 34px;
        cursor: pointer;
        color: #606266;
        font-size: 14px;
        list-style: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    li:hover {
        background-color: #f5f7fa;
    }
    ul {
        max-height: 320px;
        overflow-y: auto;
        overflow-x: auto;
    }
    .cross {
        position: relative;
        height: 100%;
        right: 22px;
        top: 0;
        text-align: center;
        color: #c0c4cc;
        transition: all .3s;
        cursor: pointer;
        visibility: hidden;
    }
    .cross:hover {
        visibility: visible;
    }
    .dropdown-list {
        margin: 5px 0;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border-radius: 4px;
        border: 1px solid #e4e7ed;
        box-sizing: border-box;
        background-color: #fff;
        cursor: pointer;
    }
    .wrap {
        width: 280px;
        position: relative;
        left: 156px;
        z-index: 5;
    }
</style>
