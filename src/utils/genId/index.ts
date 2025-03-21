/**
 * @desc 生成随机字符串
 * @returns 6位由数字和小写字母组成的随机字符串
 */
export default function genId(): string {
  return Math.random().toString(36).substring(3, 6);
}

console.log(genId());
console.log(genId());
console.log(genId());
