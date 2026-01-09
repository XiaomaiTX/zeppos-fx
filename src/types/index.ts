export { FxOptions, Border } from '../fx';

/**
 * 动画样式枚举
 */
export type FxStyle = number;

/**
 * 缓动函数类型
 */
export type EasingFunction = (now_x: number, begin: number, end: number, max_x: number) => number;