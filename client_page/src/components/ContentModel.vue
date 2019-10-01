<template>
    <a-modal
        title="给作者打赏"
        :visible="visible"
        :footer="null"
        :width="width"
        @cancel="onCancel"
    >
        <slot></slot>
    </a-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ContentModal extends Vue {
@Prop({ default: function() {} })
  onCancel: any;

@Prop({ default: false })
  visible: boolean;

@Prop({ default: 460 })
  width: string;
}
</script>



