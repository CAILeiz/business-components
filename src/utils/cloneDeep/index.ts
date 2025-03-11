/**
 * 深拷贝函数
 *
 * @param value 要深拷贝的值
 * @returns 深拷贝后的值
 */
export default function cloneDeep<T>(value: T): T {
  if (value === null || typeof value !== "object") {
    return value; // 基本类型直接返回
  }

  if (Array.isArray(value)) {
    // 处理数组
    return value.map((item) => cloneDeep(item)) as unknown as T;
  }

  if (value instanceof Date) {
    // 处理 Date 对象
    return new Date(value.getTime()) as unknown as T;
  }

  if (value instanceof RegExp) {
    // 处理 RegExp 对象
    return new RegExp(value.source, value.flags) as unknown as T;
  }

  // 处理普通对象
  const result: Record<string, any> = {};
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      result[key] = cloneDeep(value[key]);
    }
  }

  return result as T;
}

const original = {
  name: "Alice",
  age: 25,
  hobbies: ["reading", "coding"],
  details: {
    address: "123 Main St",
    city: "Wonderland",
  },
  birthDate: new Date(1998, 5, 15),
  regex: /hello/gi,
};

const cloned = cloneDeep(original);

console.log(cloned);
console.log(cloned === original); // false
console.log(cloned.details === original.details); // false
console.log(cloned.hobbies === original.hobbies); // false
console.log(cloned.birthDate === original.birthDate); // false
console.log(cloned.regex === original.regex); // false
