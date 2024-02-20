<template>
    <div class="simple-options">
        <div class="simple-options-content">
            <el-popover
                placement="top"
                width="auto"
                trigger="hover"
                transition="el-zoom-in-top"
                popper-style="borderRadius:8px"
            >
                <template #reference>
                    <div class="simple-options-item">
                        <div
                            class="back-option"
                            :class="customBackground"
                        ></div>
                        <p class="label">{{ $t('options.beijing') }}</p>
                    </div>
                </template>
                <template #default>
                    <div class="back-options">
                        <div
                            v-for="i in 8"
                            :key="i"
                            :class="backgroundItem === i ? 'active-opt' : ''"
                        >
                            <div
                                :class="[`backgroundColor-${i}`]"
                                @click="changeBackground(i)"
                            ></div>
                        </div>
                    </div>
                </template>
            </el-popover>
            <div
                class="simple-options-item"
                @click="changeTopic"
            >
                <div class="icon">
                    <font-awesome-icon
                        :icon="cardTheme ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"
                        style="font-size: 18px"
                    />
                </div>
                <p class="label">{{ $t('options.zhuti') }}</p>
            </div>
            <div
                class="simple-options-item"
                @click="handleShowMore"
            >
                <div class="icon">
                    <font-awesome-icon
                        icon="fa-solid fa-expand"
                        style="font-size: 18px"
                    />
                </div>
                <p class="label">{{ $t('options.gengduo') }}</p>
            </div>
            <div class="line"></div>
            <div
                class="simple-options-item"
                @click="html2Image(2, props.htmlBoxRef)"
            >
                <div class="icon">
                    <el-icon
                        v-if="copyLoading"
                        class="is-loading"
                    >
                        <Loading />
                    </el-icon>
                    <font-awesome-icon
                        v-else
                        icon="fa-solid fa-copy"
                        style="font-size: 18px"
                    />
                </div>
                <p class="label">{{ $t('options.fuzhi') }}</p>
            </div>
            <div
                class="simple-options-item active"
                @click="html2Image(1, props.htmlBoxRef)"
            >
                <div class="icon">
                    <el-icon
                        v-if="downloadLoading"
                        class="is-loading"
                    >
                        <Loading />
                    </el-icon>
                    <font-awesome-icon
                        v-else
                        icon="fa-solid fa-download"
                        style="font-size: 18px"
                    />
                </div>
                <p class="label">{{ $t('options.xiazai') }}</p>
            </div>
            <!-- <template v-else>
                <div
                    class="simple-options-item active"
                    @click="html2Image(1, props.htmlBoxRef)"
                >
                    <div class="icon">
                        <el-icon
                            v-if="downloadLoading"
                            class="is-loading"
                        >
                            <Loading />
                        </el-icon>
                        <font-awesome-icon
                            v-else
                            icon="fa-solid fa-images"
                            style="font-size: 18px"
                        />
                    </div>
                    <p class="label">{{ $t('options.shengcheng') }}</p>
                </div>
            </template> -->
        </div>
    </div>
</template>
<script setup lang="ts">
    import { defineProps, defineEmits, computed } from 'vue'
    import { Loading } from '@element-plus/icons-vue'
    import { html2Image, copyLoading, downloadLoading, configData, backgroundItem } from './js/options'

    const props = defineProps({
        cardTheme: {
            type: Boolean,
            default: false
        },
        htmlBoxRef: Object
    })
    const emit = defineEmits(['showMore'])

    const customBackground = computed(() => `backgroundColor-${backgroundItem.value}`)

    // 打开更多
    const handleShowMore = () => {
        emit('showMore')
    }
    // 选择背景
    const changeBackground = (item) => {
        backgroundItem.value = item
        // localStorage.setItem('selectBackgroundItem', backgroundItem.value)
    }
    // 修改主题
    const changeTopic = () => {
        configData.value.forEach((item) => {
            if (item.key === 'background') {
                item.children.forEach((child) => {
                    if (child.key === 'color') {
                        child.value = !child.value
                    }
                })
            }
        })
    }
</script>

<style lang="scss" scoped>
    .simple-options {
        position: relative;
        background: var(--current-block-background-color);
        border: 2px solid var(--current-border-color);
        padding: 4px;
        border-radius: 12px;

        .simple-options-content {
            display: flex;
            align-items: center;
            justify-content: space-around;
            overflow: hidden;
        }

        .line {
            width: 1px;
            height: 30px;
            background: #eee;
            margin: 0 4px;
        }

        &-item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 6px 16px;
            margin: 0 4px;
            border-radius: 8px;
            transition: all 0.1s ease;
            cursor: pointer;

            @media (hover: hover) {
                &:hover {
                    background: var(--current-hover-color);
                }
            }

            &:active {
                transform: scale(0.9);
            }

            .label {
                font-size: 12px;
                margin: 4px auto 0;
                text-align: center;
                color: var(--current-icon-font-color);
            }
            .icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                color: var(--current-icon-font-color);
            }

            .back-option {
                width: 20px;
                height: 20px;
                border-radius: 8px;
                border: 2px solid #fff;
            }
        }
        .active {
            background: #6c56f6;
            .label {
                color: #fff;
            }
            .icon {
                color: #fff;
            }
        }
    }
</style>
<style lang="scss">
    .back-options {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 6px;
        background: var(--current-block-background-color);
        border-radius: 10px;

        > div {
            border: 2px solid var(--current-block-background-color);
            padding: 2px;
            transition: all 0.1s;
            > div {
                width: 30px;
                height: 30px;
                border-radius: 4px;
                box-shadow: inset 0 0 0 0px #fff, inset 0 0 0 calc(2px + 0px) rgba(0, 0, 0, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                    0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 #0000;
                cursor: pointer;
            }
        }

        .active-opt {
            border: 2px solid #6c56f6;
            border-radius: 8px;
            padding: 2px;
        }
    }
</style>
