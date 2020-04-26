// !! Extending the 'Object' class is an unsafe practice !!
export {};

declare global {
  interface String {
    toCapitalizeCase(): string;
    toTitleCase(): string;
    removeDiacritics(): string;
    clean(): string;
  }

  interface Array<T> {
    isEmpty(): boolean;
  }
}

// <String>.toCapitalizeCase() returns a proper-cased string such as:
// 'maRy had A little Lamb'.toCapitalizeCase() returns 'Mary had a little lamb'
String.prototype.toCapitalizeCase = function (this: string): string {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

// <String>.toTitleCase() returns a proper-cased string such as:
// 'maRy had A little Lamb called jeAn-pIERRE'.toTitleCase() returns 'Mary Had A Little Lamb Called Jean-Pierre'
String.prototype.toTitleCase = function (this: string): string {
  return this.replace(/([^\W_]+[^\s-]*) */g, (word) => word.toCapitalizeCase());
};

// <String>.removeDiacritics() returns the string with all diacritics removed such as:
// 'Il était une fois la crème brûlée de Maël'.removeDiacritics() returns 'Il etait une fois la creme brulee de Mael'
String.prototype.removeDiacritics = function (this: string): string {
  return this.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// <String>.clean() cleans the string of all repeated whitespaces or dashes such as:
// 'This      seems all-------right'.clean() returns 'This seems all-right'
String.prototype.clean = function (this: string): string {
  return this.replace(/([\t\s-])+/g, '$1');
};

// <Array>.isEmpty() returns whether the array is empty or not
// [1, 2, 3, 4, 5].isEmpty() returns false.
Array.prototype.isEmpty = function (this: []): boolean {
  return this.length === 0;
};
