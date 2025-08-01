import { disassemble } from "hangul-js";

export const isWritingKoreanLetter = ({
  targetValue,
  value,
  nextValue,
  nextTypedValue,
}: {
  targetValue: string;
  value?: string;
  nextValue?: string;
  nextTypedValue?: string;
}) => {
  if (typeof value === "undefined" || value === targetValue) {
    return true;
  }

  const targetMinUnitOfChar = disassemble(targetValue);
  const minUnitOfChar = disassemble(value);

  if (minUnitOfChar.length > targetMinUnitOfChar.length) {
    if (nextValue === undefined) {
      return false;
    }

    const nextMinUnitOfChar = disassemble(nextValue);

    if (nextTypedValue) {
      const nextTyped자소 = disassemble(nextTypedValue);

      return [...minUnitOfChar, ...nextTyped자소].every((letter, index) => {
        return (
          letter === targetMinUnitOfChar[index] ||
          letter === nextMinUnitOfChar[index - targetMinUnitOfChar.length]
        );
      });
    }

    return minUnitOfChar.every((letter, index) => {
      return (
        letter === targetMinUnitOfChar[index] ||
        letter === nextMinUnitOfChar[index - targetMinUnitOfChar.length]
      );
    });
  }

  return minUnitOfChar.every((letter, index) => {
    return letter === targetMinUnitOfChar[index];
  });
};
