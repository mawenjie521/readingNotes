/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 *
 * https://leetcode-cn.com/problems/plus-one/description/
 *
 * algorithms
 * Easy (39.66%)
 * Likes:    311
 * Dislikes: 0
 * Total Accepted:    63.4K
 * Total Submissions: 159.3K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
 *
 * 最高位数字存放在数组的首位， 数组中每个元素只存储一个数字。
 *
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 *
 * 示例 1:
 *
 * 输入: [1,2,3]
 * 输出: [1,2,4]
 * 解释: 输入数组表示数字 123。
 *
 *
 * 示例 2:
 *
 * 输入: [4,3,2,1]
 * 输出: [4,3,2,2]
 * 解释: 输入数组表示数字 4321。
 *
 *
 */
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  if (digits[0] === 0) {
    return [1];
  }

  digits[digits.length - 1] = digits[digits.length - 1] + 1;

  let flag = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] > 9) {
      digits[i] = 10 - digits[i];
      if (i === 0) {
        flag = true;
      } else {
        digits[i - 1] = digits[i - 1] + 1;
      }
    }
  }

  if (flag) {
    digits.unshift(1);
  }

  return digits;
};
