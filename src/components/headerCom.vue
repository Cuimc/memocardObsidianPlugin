<template>
    <div class="container-header">
        <div class="logo">
            <p class="title">Memo Card</p>
        </div>
        <div class="other-options">
            <el-dropdown
                trigger="click"
                @command="changeLanguage"
            >
                <span class="el-dropdown-link">
                    {{ language }}
                    <el-icon
                        class="el-icon--right"
                        size="small"
                    >
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            v-for="lang in languageList"
                            :key="lang.value"
                            :command="lang"
                            :class="[language === lang.label ? 'lang-active' : '']"
                        >
                            {{ lang.label }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-switch
                v-model="darkMode"
                inline-prompt
                :active-icon="Moon"
                :inactive-icon="Sunny"
                size="large"
                @focus="toggleDark()"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch, onMounted } from 'vue'
    import { Sunny, Moon, ArrowDown } from '@element-plus/icons-vue'
    import { useDark, useToggle } from '@vueuse/core'
    import { useI18n } from 'vue-i18n'
    import eventBus from '../utils/eventBus'

    // vueUse --- useDark
    const darkMode = useDark()
    const toggleDark = useToggle(darkMode)
    const { locale } = useI18n()

    // mounted
    onMounted(() => {
        if (!localStorage.getItem('langLabel') || !localStorage.getItem('langVal')) {
            initLanguage()
        }

        if (darkMode.value) {
            window.document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            window.document.documentElement.setAttribute('data-theme', 'light')
        }
    })

    // watch  暗夜模式相关逻辑
    watch(darkMode, (newVal: any) => {
        if (newVal) {
            window.document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            window.document.documentElement.setAttribute('data-theme', 'light')
        }
    })

    // 多语言相关逻辑
    interface Item {
        label: string
        value: string
        defaultFont: string
    }
    const textContent = ref('')
    const language = ref(localStorage.getItem('langLabel'))
    const languageList = ref([
        {
            label: 'English',
            value: 'en',
            defaultFont: 'Baskervville'
        },
        {
            label: '简体中文',
            value: 'zh',
            defaultFont: 'xinxihei'
        }
    ])

    // 事件监听
    eventBus.on('listenTextContent', (e: string) => {
        textContent.value = e
    })

    const initLanguage = () => {
        const lang = navigator.language.split('-')[0] || 'en'
        const langItem = languageList.value.find((item) => item.value === lang)
        if (langItem) {
            setLanguage(langItem)
        }
    }
    const changeLanguage = (item: Item) => {
        setLanguage(item)
        location.reload()
    }
    const setLanguage = (item: Item) => {
        language.value = item.label
        locale.value = item.value
        localStorage.setItem('selectFontItem', item.defaultFont)
        localStorage.setItem('langVal', item.value)
        localStorage.setItem('langLabel', item.label)
    }
</script>

<style lang="scss" scoped>
    .container-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 800px;
        padding: 20px;
        margin: 0 auto;

        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 26px;
                height: 26px;
                margin-right: 4px;
            }
            .title {
                font-size: 24px;
                font-weight: bold;
                color: var(--current-font-color);
            }
        }

        .other-options {
            display: flex;
            align-items: center;

            .el-dropdown-link {
                display: flex;
                align-items: center;
                margin-right: 20px;
                cursor: pointer;
            }
        }
    }

    .lang-active {
        background: #eeeeee;
    }
</style>
