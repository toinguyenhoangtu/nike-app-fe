export const classLister = (styles: any, classes: string[]) => {
    return classes.map((className) => styles[className]).join(" ")
}
export const classnames =
  (styleObject: any) =>
  (...classList: any[]) =>
    classList.reduce((list, myClass) => {
      let output = list
      if (styleObject[myClass]) {
        if (list) output += " " // appends a space if list is not empty
        output += styleObject[myClass]
        //Above: append 'myClass' from styleObject to the list if it is defined
      }
      return output
    }, "")
