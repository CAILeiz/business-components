export const useTooltipProps = {
  content: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  effect: {
    type: String,
    default: "dark",
  },
  placement: {
    type: String,
    default: "top-start",
  },
  /**
   * @description whether the tooltip content has an arrow
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
};
