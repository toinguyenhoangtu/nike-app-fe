export const classLister = (styles: any, classes: string[]) => {
    return classes.map((className) => styles[className]).join(" ")
}