<template>
    <div class="container">
        <div class="preview">
            <div class="exhibit">
                <div
                    class="html-box"
                    :class="[customBackground, customFont]"
                    ref="htmlBoxRef"
                >
                    <div
                        class="content-exhibit"
                        :style="customStyle"
                    >
                        <p :style="{ color: customStyle.color }">{{ textContent }}</p>
                        <div
                            class="content-exhibit-footer"
                            v-if="urlText && isUrl(urlText)"
                        >
                            <img
                                class="urlQR"
                                :src="urlQR"
                                alt=""
                            />
                        </div>
                    </div>
                    <p class="watermark">memocard.net</p>
                </div>

                <transition
                    enter-active-class="enter-simple-options-active"
                    leave-active-class="leave-simple-options-active"
                >
                    <simple-options
                        v-if="!showMoreOptions"
                        :htmlBoxRef="htmlBoxRef"
                        :cardTheme="cardTheme"
                        @showMore="handleShowMore"
                    ></simple-options>
                </transition>
            </div>

            <!-- <div class="mobile-options">
                <simple-options
                    v-if="isMobile"
                    :htmlBoxRef="htmlBoxRef"
                    :cardTheme="cardTheme"
                    @showMore="showMobileOptions = !showMobileOptions"
                ></simple-options>
            </div> -->

            <div class="content">
                <div class="flex-between padding-b10">
                    <p class="label">{{ $t('preview.tishi') }}:</p>
                    <div class="clean-btn">   
                        <font-awesome-icon
                            icon="fa-solid fa-eraser"
                            style="font-size: 18px; color: #999"
                            @click="clearContent"
                        ></font-awesome-icon>
                    </div>
                </div>
                <el-input
                    class="textarea-content"
                    ref="textContentRef"
                    v-model="textContent"
                    type="textarea"
                    :autosize="{
                        minRows: 4,
                        maxRows: 8
                    }"
                    show-word-limit
                    resize="none"
                    :placeholder="$t('preview.qingshuru')"
                ></el-input>

                <div class="url-box">
                    <p class="label">{{ $t('preview.tielianjie') }}:</p>
                    <el-input
                        v-model="urlText"
                        placeholder="http://······"
                        clearable
                    ></el-input>
                </div>
            </div>
        </div>

        <transition
            enter-active-class="enter-options-active"
            leave-active-class="leave-options-active"
        >
            <options
                v-if="showMoreOptions"
                :htmlBoxRef="htmlBoxRef"
                @hide="handleHideOptions"
            ></options>
        </transition>
    </div>

    <!-- <transition name="mask">
        <div v-if="imageUrl">
            <div
                class="mask"
                @click="imageUrl = undefined"
            ></div>
            <div class="image-box">
                <p>{{ $t('options.shengchengwenan') }}</p>
                <img
                    :src="imageUrl"
                    alt=""
                />
            </div>
        </div>
    </transition>

    <transition name="mask">
        <div
            v-if="showMobileOptions"
            class="mask"
            @click="showMobileOptions = !showMobileOptions"
        ></div>
    </transition>
    <transition name="option">
        <div
            v-if="showMobileOptions"
            class="sidebar"
        >
            <options :htmlBoxRef="htmlBoxRef"></options>
        </div>
    </transition> -->
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, watch } from 'vue'
    import { useI18n } from 'vue-i18n'
    import options from './options.vue'
    import { imageUrl, configData, backgroundItem, fontItem } from './js/options'
    import QRCode from 'qrcode'
    import { isUrl } from '../utils/tools'
    import { ElMessage } from 'element-plus'
    import simpleOptions from './simpleOptions.vue'
    import eventBus from '../utils/eventBus'
    import { text } from '@fortawesome/fontawesome-svg-core'

    const { t } = useI18n()

    onMounted(() => {
        function GetQueryString(name) {
            let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
            let r = window.location.search.substr(1).match(reg) //获取url中"?"符后的字符串并正则匹配
            let context = ''
            if (r) context = r[2]
            return context ? context : ''
        }

        if (GetQueryString('memo')) {
            textContent.value = decodeURIComponent(GetQueryString('memo'))
        } else {
            textContent.value = t('preview.neirong')
        }
    })

    // data
    const htmlBoxRef = ref(null)
    const textContentRef = ref(null)
    const textContent = ref(t('preview.neirong'))
    const showMobileOptions = ref(false)
    const cardTheme = ref(true)
    const showMoreOptions = ref(localStorage.getItem('showMoreOptions') === 'true')

    // computed
    const customBackground = computed(() => `backgroundColor-${backgroundItem.value}`)
    const customFont = computed(() => `${fontItem.value}`)
    const customStyle = computed(() => {
        let obj = {}
        let cardOpacity = 1
        configData.value.forEach((option) => {
            if (option?.children) {
                option.children.forEach((child) => {
                    if (Array.isArray(child.key)) {
                        child.key.forEach((key) => {
                            obj[key] = `${child.value}px`
                        })
                    } else {
                        if (child.key === 'opacity') {
                            cardOpacity = child.value
                            obj[option.key] = `rgba(${cardTheme.value ? '255,255,255' : '0,0,0'}, ${cardOpacity / 100})`
                        } else if (child.key === 'color') {
                            cardTheme.value = child.value
                            obj[option.key] = `rgba(${cardTheme.value ? '255,255,255' : '0,0,0'}, ${cardOpacity / 100})`
                            obj.color = `${cardTheme.value ? '#333333' : '#ffffff'}`
                        }
                    }
                })
            } else {
                obj[option.key] = `${option?.value || 0}px`
            }
        })
        // 数据持久化
        localStorage.setItem('configData', JSON.stringify(configData.value))
        return obj
    })

    // watch
    const urlQR = ref('')
    const urlText = ref('')
    let timer = null
    watch(urlText, async (newValue) => {
        if (newValue && isUrl(newValue)) {
            const base64Url = await QRCode.toDataURL(urlText.value, {
                width: 248,
                height: 248,
                errorCorrectionLevel: 'H',
                color: {
                    dark: '#778899',
                    light: '#ffffff00'
                }
            })
            urlQR.value = base64Url
        } else if (newValue && !isUrl(newValue)) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            timer = setTimeout(() => {
                ElMessage({
                    message: '链接格式不正确',
                    type: 'warning',
                    showClose: true,
                    grouping: true
                })
            }, 500)
        } else {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
        }
    })

    // methods
    const clearContent = () => {
        textContent.value = ''
        textContentRef.value.focus()
    }
    const handleShowMore = () => {
        showMoreOptions.value = true
        localStorage.setItem('showMoreOptions', true)
    }
    const handleHideOptions = () => {
        showMoreOptions.value = false
        localStorage.setItem('showMoreOptions', false)
    }
</script>

<style lang="scss" scoped>
    .container {
        color: #778899a0;
        width: calc(100% - 80px);
        padding: 20px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        background: var(--current-background-color);
        overflow: hidden;

        .preview {
            position: relative;
            margin-right: 20px;
            width: 600px;
            min-width: 400px;
            z-index: 1;
            transition: all 0.6s ease;

            .exhibit {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                background: var(--current-block-background-color);
                padding: 20px;
                min-height: 300px;
                border-radius: 16px;
                // box-shadow: 2px 2px 50px -20px rgba(0, 0, 0, 0.5);
                // border: 1px solid var(--current-border-color);

                .simple-options {
                    position: absolute;
                    bottom: -16px;
                }
                
                .html-box {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .content-exhibit {
                        font-size: 14px;
                        color: var(--current-font-color);
                        line-height: 26px;
                        letter-spacing: 0.4px;
                        white-space: pre-wrap;
                        word-break: break-word;
                        border: 1px solid hsla(0, 0%, 100%, 0.1);

                        &-footer {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            flex-direction: row-reverse;
                            padding-top: 10px;
                            .time {
                                font-size: 12px;
                                color: #666666;
                            }
                            .urlQR {
                                width: 40px;
                                height: 40px;
                            }
                        }
                    }

                    .watermark {
                        position: absolute;
                        bottom: 10px;
                        right: 10px;
                        font-size: 12px;
                        color: #ffffff;
                        transform: scale(0.8);
                    }
                }
            }

            .content {
                padding: 10px 20px 30px 20px;
                // box-shadow: 2px 2px 50px -20px rgba(0, 0, 0, 0.5);
                // border: 1px solid var(--current-border-color);
                background: var(--current-block-background-color);
                border-radius: 16px;
                margin-top: 20px;
                overflow: hidden;
                .flex-between {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .label {
                    font-size: 14px;
                    color: #666666;
                    font-weight: bold;
                    margin: 0;
                }

                .clean-btn{
                    padding: 0 6px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all .3s;
                    &:hover{
                        background: #f5f5f5;
                    }
                    &:active{
                        transform: scale(0.95);
                    }
                }

                .url-box {
                    .label {
                        padding: 10px 0;
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .textarea-content {
        .el-textarea__inner {
            padding: 8px 12px;
            box-shadow: 0 0 0 2px var(--el-input-border-color, var(--el-border-color)) inset;
            border-radius: 8px;
        }
        .el-textarea__inner::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        .el-textarea__inner::-webkit-scrollbar-thumb {
            border-radius: 3px;
            -moz-border-radius: 3px;
            -webkit-border-radius: 3px;
            background-color: #c3c3c3;
        }
        .el-textarea__inner::-webkit-scrollbar-track {
            background-color: transparent;
        }

        .el-textarea__inner:focus {
            box-shadow: 0 0 0 2px #6b56f680 inset;
        }
    }

    .container{
        .el-input__inner{
            border: 0;
            background: none;
        }
        .el-input__inner:active{
            box-shadow: none;
        }
    }
</style>
