<template>
  <div>
    <div ref="cursor" class="super-cursor">
      <slot/>
    </div>
    <template v-if="trailingCursors.length">
      <div
          v-for="(cursor, index) in trailingCursors"
          :key="index"
          class="super-cursor-trail"
      >
        <div :ref="index" :class="cursor.class"/>
      </div>
    </template>
  </div>
</template>

<script>
'use strict';

import {gsap} from 'gsap';
import {throttle} from 'lodash';

export default {
  name: 'SuperCursor',
  props: {
    throttleDelay: {
      type: Number,
      default: 500
    },
    hoverableElements: {
      type: Array,
      default: () => [
        {
          class: 'super-cursor--hovering',
          elements: 'a, button'
        }
      ]
    },
    trailingCursors: {
      type: Array,
      default: () => []
    },
    mutationObserverOptions: {
      type: Object,
      default: () => {
        return {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: false,
          attributeFilter: ['open']
        };
      }
    }
  },
  data() {
    return {
      hoverables: [],
      throttledSelectHoverables: null,
      mutationObserver: null
    };
  },
  mounted() {
    this.InitSuperCursor();
    this.observeHTML();
  },
  created() {
    this.throttledSelectHoverables = throttle(this.selectHoverables, this?.throttleDelay);
  },
  destroyed() {
    this.mutationObserver.disconnect();

    window.removeEventListener('mousemove', this.updateCursor);
  },
  methods: {
    InitSuperCursor() {
      this.selectHoverables();

      window.addEventListener('mousemove', this.updateCursor);
    },
    updateCursor(e) {
      gsap.to(this.$refs.cursor, {
        duration: 0,
        top: e.clientY,
        left: e.clientX
      });

      this?.trailingCursors?.forEach((cursor, index) => {
        gsap.to(this.$refs[index], Object.assign({
          top: e.clientY,
          left: e.clientX
        }, cursor?.gsap_options));
      });
    },
    observeHTML() {
      this.mutationObserver = new MutationObserver(() => {
        this.throttledSelectHoverables();
      });

      this.mutationObserver.observe(document, this.mutationObserverOptions);
    },
    selectHoverables() {
      this?.hoverableElements?.forEach((select) => {
        this.hoverables = document.querySelectorAll(select.elements);

        this.hoverables.forEach((hoverable) => {
          hoverable.addEventListener('mouseover', () => {
            document.body.classList.add(select.class);
          });
          hoverable.addEventListener('mouseout', () => {
            document.body.classList.remove(select.class);
          });
        });
      });
    }
  }
};
</script>

<style lang="less" src="./super-cursor.less"></style>
