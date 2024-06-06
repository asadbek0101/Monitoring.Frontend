export const ArrayFilterByWord = (themeOptions: any[]) => {
    const response = themeOptions.sort(function (a, b) {
        if (a.type < b.type) {
          return -1;
        }
        if (a.type > b.type) {
          return 1;
        }
        return 0;
      });
    return response;
}