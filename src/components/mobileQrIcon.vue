<template>
    <el-tooltip
        class="box-item"
        effect="dark"
        :content="$t('preview.saomatips')"
        placement="bottom-end"
    >
        <div
            class="qricon"
            @click="dialogVisible = true"
        >
            <img
                src="@/assets/images/qricon.svg"
                alt=""
            />
        </div>
    </el-tooltip>

    <el-dialog
        v-model="dialogVisible"
        :title="$t('preview.usePhone')"
        width="280px"
        class="my-dialog"
    >
        <div class="dialog-qr">
            <img
                src="@/assets/images/memoqr.png"
                alt=""
                width="150px"
                height="150px"
            />
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const dialogVisible = ref(false)
</script>

<style lang="scss" scoped>
    .qricon {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-top: 20px solid var(--current-background-color);
        border-bottom: 20px solid transparent;
        border-right: 20px solid var(--current-background-color);
        border-left: 20px solid transparent;
        border-radius: 0 16px 0 0;
        cursor: pointer;

        @media (hover: hover) {
            &:hover {
                border-top: 20px solid #ccc;
                border-right: 20px solid #ccc;
            }
        }

        img {
            position: absolute;
            top: -15px;
            right: -15px;
            width: 16px;
            height: 16px;
            color: #fff;
        }
    }

    .dialog-qr {
        p {
            font-size: 12px;
            text-align: center;
            color: #999;
            margin-top: 20px;
        }
        img {
            display: block;
            margin: 0 auto;
        }
    }
</style>
<style lang="scss">
    .my-dialog.el-dialog {
        --el-dialog-border-radius: 10px;
        border-radius: 10px;

        .el-dialog__body {
            padding-top: 10px;
        }
    }
</style>
