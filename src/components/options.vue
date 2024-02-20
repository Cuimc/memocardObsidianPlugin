<template>
    <div class="options">
        <div
            class="header-menu"
        >
            <el-icon
                class="icon"
                @click="hideOption"
                size="16px"
            >
                <Fold />
            </el-icon>
            <p
                class="header-menu-btn"
                @click="handleReset"
            >
                {{ $t('options.chongzhi') }}
            </p>
        </div>
        <div class="options-container">
            <div class="options-item">
                <span>{{ $t('options.beijing') }}</span>
                <div class="options-img">
                    <div
                        v-for="i in 8"
                        :key="i"
                        :class="backgroundItem == i ? 'active' : ''"
                    >
                        <div
                            :class="[`backgroundColor-${i}`]"
                            @click="changeBackground(i)"
                        ></div>
                    </div>
                </div>
            </div>
            <!-- <div class="options-item">
                <span>{{ $t('options.zitiqiehuan') }}</span>
                <div class="font-options">
                    <span
                        v-for="font in fontOptionsList"
                        :key="font.value"
                        class="font-options-item"
                        :class="fontItem === font.value ? 'active-font' : ''"
                        @click="changeFont(font.value)"
                    >
                        {{ font.label }}
                    </span>
                </div>
            </div> -->
            <div
                class="options-item"
                v-for="option in configData"
                :key="option.label"
            >
                <span>{{ option.label }}</span>
                <template v-if="option.children">
                    <div
                        class="options-item-sub"
                        v-for="subOption in option.children"
                        :key="subOption.label"
                    >
                        <span>{{ subOption.label }}</span>
                        <el-switch
                            v-if="subOption.type === 'switch'"
                            v-model="subOption.value"
                            size="small"
                            :active-text="$t('options.qianse')"
                            :inactive-text="$t('options.shense')"
                            isDark
                        />
                        <el-slider
                            v-else
                            v-model="subOption.value"
                            :max="subOption.max || 100"
                            :min="subOption.min || 0"
                            size="small"
                        ></el-slider>
                    </div>
                </template>
                <el-slider
                    v-else
                    v-model="option.value"
                    :max="option.max || 100"
                    :min="option.min || 0"
                    size="small"
                ></el-slider>
            </div>

            <div class="options-btn">
                <el-button
                    class="clickable-icon"
                    @click="html2Image(2, props.htmlBoxRef)"
                    :loading="copyLoading"
                    :icon="CopyDocument"
                >
                    {{ $t('options.fuzhi') }}
                </el-button>
                <el-button
                    class="clickable-icon"
                    color="#6C56F6"
                    @click="html2Image(1, props.htmlBoxRef)"
                    :loading="downloadLoading"
                    :icon="Download"
                    style="margin-top: 10px; margin-left: 0px;"
                >
                    {{ $t('options.xiazai') }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { defineEmits, computed } from 'vue'
    import { CopyDocument, Download, Fold } from '@element-plus/icons-vue'
    import { html2Image, downloadLoading, copyLoading, configData, backgroundItem, fontItem, handleReset } from './js/options'

    const props = defineProps({
        htmlBoxRef: Object
    })
    const emit = defineEmits(['hide'])

    // data
    const zhFontOptionsList = [
        {
            label: '霞鹜新晰黑',
            value: 'xinxihei'
        },
        {
            label: '未来萤黑',
            value: 'weilaiyinghei'
        },
        {
            label: '玄冬楷书',
            value: 'xuandongkaishu'
        },
        {
            label: '思源宋体',
            value: 'siyuansong'
        }
    ]

    const enFontOptionsList = [
        {
            label: 'Baskervville',
            value: 'Baskervville'
        },
        {
            label: 'Bona Nova',
            value: 'BonaNova'
        },
        {
            label: 'Italianno',
            value: 'Italianno'
        },
        {
            label: 'Josefin Sans',
            value: 'JosefinSans'
        },
        {
            label: 'Libre Baskerville',
            value: 'LibreBaskerville'
        }
    ]
    const langVal = computed(() => localStorage.getItem('langVal'))
    const fontOptionsList = computed(() => (langVal.value === 'en' ? enFontOptionsList : zhFontOptionsList))

    // methods
    const changeBackground = (item) => {
        backgroundItem.value = item
        localStorage.setItem('selectBackgroundItem', backgroundItem.value)
    }

    const hideOption = () => {
        emit('hide')
    }

    const changeFont = (e) => {
        fontItem.value = e
        localStorage.setItem('selectFontItem', fontItem.value)
    }
</script>

<style scoped lang="scss">
    .options {
        position: relative;
        padding: 0 20px 20px;
        border-radius: 16px;
        background: var(--current-block-background-color);
        overflow: hidden;
        width: 170px;
        height: 700px;
        flex-shrink: 0;
        z-index: 0;

        .header-menu {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0 6px;
            border-radius: 4px 0 0 4px;
            cursor: pointer;

            .icon {
                padding: 4px;
                border-radius: 4px;
                transition: all 0.1s;
                color: var(--current-icon-font-color);

                @media (hover: hover) {
                    &:hover {
                        background: var(--current-hover-color);
                    }
                }

                &:active {
                    transform: scale(0.95);
                }
            }

            &-btn {
                font-size: 12px;
                text-align: center;
                padding: 6px 8px;
                border-radius: 4px;
                transition: all 0.1s;
                background: var(--current-hover-color);
                color: var(--current-icon-font-color);
                margin: 0;

                &:active {
                    transform: scale(0.9);
                }
            }
        }

        &-item {
            span {
                display: inline-block;
                margin-bottom: 5px;
                font-size: 14px;
                font-weight: bold;
                color: var(--current-font-color);
            }

            &-sub {
                span {
                    display: inline-block;
                    margin: 10px 0 4px;
                    font-size: 12px;
                    color: #999999;
                }
            }

            .font-options {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-gap: 4px;
                margin-top: 6px;
                &-item {
                    background: var(--current-hover-color);
                    border-radius: 4px;
                    padding: 6px 8px;
                    text-align: center;
                    transition: all 0.1s ease;
                    cursor: pointer;
                    &:active {
                        transform: scale(0.9);
                    }
                }
                .active-font {
                    background: #6c56f6;
                    color: #fff;
                }
            }
        }

        &-img {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 4px;
            margin-top: 4px;

            > div {
                width: 30px;
                border: 2px solid var(--current-block-background-color);
                padding: 2px;
                transition: all 0.1s;
                border-radius: 8px;

                > div {
                    width: 30px;
                    height: 30px;
                    margin: 0;
                    border-radius: 4px;
                    box-shadow: inset 0 0 0 0px #fff, inset 0 0 0 calc(2px + 0px) rgba(0, 0, 0, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                        0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 #0000;
                    cursor: pointer;
                }
            }

            .active {
                border: 2px solid #6c56f6;
            }
        }

        &-btn {
            display: flex;
            flex-direction: column;
            border-top: 1px solid var(--current-border-color);
            padding-top: 14px;
            margin-top: 14px;
        }
    }
</style>

<style lang="scss">
    .el-switch{
        .el-switch__input{
            width: 0;
            margin: 0;
        }
    }
</style>
